import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import ProductCard from '../components/Section/ProductCard';
import { Search, Filter, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ShopProps {
  initialFilter?: 'new' | 'sale' | string;
}

const Shop: React.FC<ShopProps> = ({ initialFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    typeof initialFilter === 'string' && !['new', 'sale'].includes(initialFilter) ? initialFilter : 'all'
  );
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesNew = initialFilter === 'new' ? p.isNew : true;
      const matchesSale = initialFilter === 'sale' ? p.isSale : true;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesNew && matchesSale && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured/default
    });
  }, [searchTerm, selectedCategory, sortBy, initialFilter, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 space-y-10">
          <div>
            <h4 className="text-lg font-bold text-[#1a1a1a] mb-6">Categories</h4>
            <div className="space-y-3">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={cn(
                  "block text-sm font-medium transition-colors hover:text-[#f06292]",
                  selectedCategory === 'all' ? "text-[#f06292] font-bold" : "text-[#8e8e8e]"
                )}
              >
                All Departments
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn(
                    "block text-sm font-medium transition-colors hover:text-[#f06292]",
                    selectedCategory === cat.slug ? "text-[#f06292] font-bold" : "text-[#8e8e8e]"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-[#1a1a1a] mb-6">Price Range</h4>
            <div className="space-y-4">
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-[#f06292]"
              />
              <div className="flex items-center justify-between text-sm font-bold text-[#1a1a1a]">
                <span>PKR 0</span>
                <span>PKR {priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#f5f2ed] rounded-[2rem] border border-[#eee]">
            <h5 className="font-bold mb-2">Need Help?</h5>
            <p className="text-xs text-[#8e8e8e] mb-4 leading-relaxed">Not sure what to pick for your little one? Chat with our expert.</p>
            <a href="https://wa.me/923000000000" className="text-xs font-bold text-[#f06292] flex items-center hover:underline">
              Contact Support <ArrowRight className="ml-1 w-3 h-3" />
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black text-[#1a1a1a]">
                {selectedCategory === 'all' ? 'All Products' : CATEGORIES.find(c => c.slug === selectedCategory)?.name}
              </h1>
              <p className="text-sm text-[#8e8e8e] mt-1">{filteredProducts.length} items found</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e8e]" />
                <input 
                  type="text" 
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-[#eee] rounded-xl text-sm focus:ring-1 ring-pink-500 outline-none w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative flex-shrink-0">
                <select 
                  className="appearance-none pl-4 pr-10 py-2 border border-[#eee] rounded-xl text-sm font-bold outline-none bg-white focus:ring-1 ring-pink-500 cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8e8e8e] pointer-events-none" />
              </div>

              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden p-2 border border-[#eee] rounded-xl hover:bg-white transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5 text-[#1a1a1a]" />
              </button>
            </div>
          </div>

          {/* Active Filters Bar */}
          {(selectedCategory !== 'all' || searchTerm || priceRange[1] < 10000) && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-[10px] font-bold text-[#8e8e8e] uppercase tracking-wider mr-2">Filtering by:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 bg-pink-50 text-[#f06292] text-xs font-bold rounded-full">
                  {selectedCategory} <X className="ml-1 w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                  "{searchTerm}" <X className="ml-1 w-3 h-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                </span>
              )}
              {priceRange[1] < 10000 && (
                <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">
                  Under {priceRange[1].toLocaleString()} <X className="ml-1 w-3 h-3 cursor-pointer" onClick={() => setPriceRange([0, 10000])} />
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-24 bg-[#fdfbf7] rounded-3xl border-2 border-dashed border-[#eee]">
                <div className="flex justify-center mb-6 text-[#8e8e8e]">
                  <Search className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">No items found</h3>
                <p className="text-[#8e8e8e]">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                    setPriceRange([0, 10000]);
                  }}
                  className="mt-6 px-6 py-3 bg-[#f06292] text-white rounded-xl font-bold hover:bg-[#d81b60] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[100]" onClick={() => setShowMobileFilters(false)}
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 w-full bg-white rounded-t-[2.5rem] p-8 z-[110] shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)}><X className="w-6 h-6" /></button>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="font-bold mb-4">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className={cn("px-4 py-2 rounded-full text-xs font-bold transition-all", selectedCategory === 'all' ? "bg-[#f06292] text-white shadow-lg shadow-pink-100" : "bg-[#f5f2ed] text-[#4a4a4a]")}
                    >
                      All
                    </button>
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={cn("px-4 py-2 rounded-full text-xs font-bold transition-all", selectedCategory === cat.slug ? "bg-[#f06292] text-white shadow-lg shadow-pink-100" : "bg-[#f5f2ed] text-[#4a4a4a]")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-4">Price Range (PKR)</h4>
                  <input 
                    type="range" min="0" max="10000" step="500" value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-[#f06292]"
                  />
                  <div className="flex justify-between font-bold mt-2">
                    <span>0</span>
                    <span>{priceRange[1]}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-4 bg-[#f06292] text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-100"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

import { ArrowRight } from 'lucide-react';
export default Shop;
