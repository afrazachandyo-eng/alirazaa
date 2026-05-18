import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, ShoppingCart, Heart, Truck, ShieldCheck, 
  ArrowLeft, Minus, Plus, Share2, Package, CheckCircle2 
} from 'lucide-react';
import { PRODUCTS, REVIEWS } from '../data/mockData';
import { useCart } from '../store/CartContext';
import { formatPKR, cn } from '../lib/utils';
import AIRecommendations from '../components/Section/AIRecommendations';
import ProductCard from '../components/Section/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      if (product.sizes?.[0]) setSelectedSize(product.sizes[0]);
      if (product.colors?.[0]) setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h2 className="text-2xl font-bold">Product not found</h2>
      <Link to="/shop" className="mt-4 inline-block text-[#f06292] font-bold">Go back to shop</Link>
    </div>
  );

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pb-32">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-[#8e8e8e] mb-10 overflow-x-auto whitespace-nowrap pb-2">
        <Link to="/" className="hover:text-[#1a1a1a]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#1a1a1a]">Shop</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-[#1a1a1a] capitalize">{product.category.replace('-', ' ')}</Link>
        <span>/</span>
        <span className="text-[#1a1a1a] font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white border border-[#eee] group shadow-sm">
            <motion.img 
              key={selectedImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={product.images[selectedImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.isSale && (
              <span className="absolute top-6 left-6 bg-[#ff9800] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">Flash Sale</span>
            )}
            <button 
              onClick={() => toggleWishlist(product)}
              className={cn(
                "absolute top-6 right-6 p-4 rounded-full shadow-2xl transition-all hover:scale-110",
                isInWishlist(product.id) ? "bg-[#f06292] text-white" : "bg-white text-[#1a1a1a]"
              )}
            >
              <Heart className={cn("w-6 h-6", isInWishlist(product.id) && "fill-current")} />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.concat([product.images[0]]).map((img, idx) => ( // Demo: duplicated for more thumbs
              <button 
                key={idx}
                onClick={() => setSelectedImage(0)}
                className={cn(
                  "flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all",
                  selectedImage === 0 ? "border-[#f06292] scale-95" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-4 tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-[#ff9800]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-current" : "opacity-30")} />
                ))}
                <span className="text-sm font-bold ml-2 text-[#1a1a1a]">{product.rating}</span>
                <span className="text-xs text-[#8e8e8e] ml-1">({product.reviewsCount} verified reviews)</span>
              </div>
              <span className="w-1.5 h-1.5 bg-[#eee] rounded-full" />
              <span className="text-sm font-bold text-green-600">In Stock</span>
            </div>
            
            <div className="flex items-baseline gap-4 mb-8 p-6 bg-[#fdfbf7] rounded-3xl border border-[#f5f2ed]">
              <span className="text-4xl font-black text-[#f06292]">{formatPKR(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-[#8e8e8e] line-through font-medium">{formatPKR(product.originalPrice)}</span>
              )}
              {product.originalPrice && (
                <span className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  Save {Math.round((1 - product.price/product.originalPrice) * 100)}%
                </span>
              )}
            </div>
          </div>

          <div className="space-y-8 mb-10">
            {/* Options */}
            {product.sizes && (
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a] mb-4">Select Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all",
                        selectedSize === size 
                          ? "border-[#f06292] bg-[#f06292]/5 text-[#f06292]" 
                          : "border-[#eee] text-[#4a4a4a] hover:border-[#f06292]/30"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && (
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a] mb-4">Color</h4>
                <div className="flex flex-wrap gap-4">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full border-2 p-1.5 transition-all",
                        selectedColor === color ? "border-[#f06292]" : "border-transparent"
                      )}>
                        <div className="w-full h-full rounded-full bg-stone-300" /> {/* Placeholder color */}
                      </div>
                      <span className={cn("text-[10px] font-bold uppercase", selectedColor === color ? "text-[#f06292]" : "text-[#8e8e8e]")}>{color}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#f5f2ed]">
              <div className="flex items-center bg-white border border-[#eee] rounded-2xl px-2 h-16">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 text-[#4a4a4a] hover:bg-[#f5f2ed] rounded-xl transition-colors"
                ><Minus className="w-5 h-5" /></button>
                <span className="w-12 text-center font-black text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 text-[#4a4a4a] hover:bg-[#f5f2ed] rounded-xl transition-colors"
                ><Plus className="w-5 h-5" /></button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={cn(
                  "flex-1 h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all relative overflow-hidden shadow-2xl",
                  isAdded 
                    ? "bg-green-600 text-white shadow-green-100" 
                    : "bg-[#1a1a1a] text-white shadow-[#1a1a1a]/20 hover:bg-[#f06292] hover:shadow-pink-100 active:scale-[0.98]"
                )}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#fdfbf7] rounded-2xl flex items-start gap-3 border border-[#f5f2ed]">
              <Truck className="w-5 h-5 text-[#f06292] mt-0.5" />
              <div>
                <h5 className="text-xs font-bold mb-1">Fast Shipping</h5>
                <p className="text-[10px] text-[#4a4a4a]">Nationwide Delivery within 3-5 days</p>
              </div>
            </div>
            <div className="p-4 bg-[#fdfbf7] rounded-2xl flex items-start gap-3 border border-[#f5f2ed]">
              <ShieldCheck className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold mb-1">Secure COD</h5>
                <p className="text-[10px] text-[#4a4a4a]">Pay exactly what you see at doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-24">
        <div className="flex items-center space-x-12 border-b border-[#eee] mb-12 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('description')}
            className={cn(
              "pb-4 text-sm font-bold uppercase tracking-widest relative transition-all",
              activeTab === 'description' ? "text-[#f06292]" : "text-[#8e8e8e] hover:text-[#1a1a1a]"
            )}
          >
            Product Story
            {activeTab === 'description' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-[#f06292] rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={cn(
              "pb-4 text-sm font-bold uppercase tracking-widest relative transition-all",
              activeTab === 'reviews' ? "text-[#f06292]" : "text-[#8e8e8e] hover:text-[#1a1a1a]"
            )}
          >
            Reviews ({product.reviewsCount})
            {activeTab === 'reviews' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-[#f06292] rounded-t-full" />}
          </button>
        </div>

        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            {activeTab === 'description' ? (
              <motion.div 
                key="desc"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-[#4a4a4a] leading-relaxed"
              >
                <h3 className="text-xl font-bold text-[#1a1a1a]">Description</h3>
                <p>{product.description}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
                  <li className="flex items-center gap-2 text-sm"><Package className="w-4 h-4 text-[#f06292]" /> 100% Genuine China Sourced</li>
                  <li className="flex items-center gap-2 text-sm"><Package className="w-4 h-4 text-[#f06292]" /> Eco-friendly & Baby-safe</li>
                  <li className="flex items-center gap-2 text-sm"><Package className="w-4 h-4 text-[#f06292]" /> Machine Washable (Fashion)</li>
                  <li className="flex items-center gap-2 text-sm"><Package className="w-4 h-4 text-[#f06292]" /> Premium Finish & Durable</li>
                </ul>
                <div className="p-8 bg-[#f5f2ed] rounded-[2rem] border border-[#eee]">
                  <h4 className="font-bold mb-4">LittleHaven Quality Assurance</h4>
                  <p className="text-sm">We personally vet every item before it reaches your doorstep. If you're not 100% happy with the quality, we offer an easy 7-day exchange policy across Pakistan.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="reviews"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-12"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white rounded-[2.5rem] border border-[#f5f2ed]">
                  <div className="text-center md:pr-12 md:border-r border-[#eee]">
                    <span className="text-6xl font-black text-[#1a1a1a]">{product.rating}</span>
                    <div className="flex text-[#ff9800] mt-2">
                       {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-xs font-bold text-[#8e8e8e] mt-4 uppercase">Overall Rating</p>
                  </div>
                  <div className="flex-grow space-y-3 w-full">
                    {[5, 4, 3, 2, 1].map(star => (
                      <div key={star} className="flex items-center gap-4">
                        <span className="text-xs font-bold text-[#4a4a4a] w-4">{star}</span>
                        <div className="flex-grow h-2 bg-[#f5f2ed] rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            whileInView={{ width: star === 5 ? '85%' : star === 4 ? '12%' : '1%' }} 
                            className="h-full bg-pink-400" 
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#8e8e8e] w-8">{star === 5 ? '85%' : star === 4 ? '12%' : '1%'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  {REVIEWS.map(review => (
                    <div key={review.id} className="pb-8 border-b border-[#f5f2ed]">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img src={review.avatar} className="w-10 h-10 rounded-full border border-[#eee]" />
                          <div>
                            <h5 className="font-bold text-sm">{review.userName}</h5>
                            <span className="text-[10px] text-[#8e8e8e] uppercase font-bold">{new Date(review.date).toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}</span>
                          </div>
                        </div>
                        <div className="flex text-[#ff9800]">
                          {[...Array(5)].map((_, i) => <Star key={i} className={cn("w-3 h-3", i < review.rating ? "fill-current" : "opacity-20")} />)}
                        </div>
                      </div>
                      <p className="text-[#4a4a4a] text-sm italic leading-relaxed">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
                
                <button className="w-full py-4 border-2 border-dashed border-[#eee] rounded-2xl text-[#8e8e8e] font-bold hover:border-[#f06292] hover:text-[#f06292] transition-colors">
                  Load more reviews
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mb-24">
        <AIRecommendations currentProductId={product.id} category={product.category} />
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-3xl font-black text-[#1a1a1a] mb-12">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Sticky Bottom Add to Cart (Mobile) */}
      <div className="fixed bottom-16 left-0 w-full p-4 bg-white/80 backdrop-blur-md lg:hidden z-30 flex gap-4 border-t border-[#eee]">
        <button 
          onClick={() => toggleWishlist(product)}
          className={cn(
            "p-4 rounded-xl border border-[#eee]",
            isInWishlist(product.id) ? "bg-[#f06292] text-white border-none" : "bg-white text-[#1a1a1a]"
          )}
        >
          <Heart className={cn("w-5 h-5", isInWishlist(product.id) && "fill-current")} />
        </button>
        <button 
          onClick={handleAddToCart}
          disabled={isAdded}
          className={cn(
            "flex-grow h-14 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg",
            isAdded ? "bg-green-600 text-white shadow-green-100" : "bg-[#1a1a1a] text-white"
          )}
        >
           {isAdded ? <CheckCircle2 className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
           {isAdded ? "Added!" : formatPKR(product.price)}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
