import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, PinIcon } from 'lucide-react';
import { useCart } from '../../store/CartContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Deals', path: '/deals' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
    )}>
      {/* Top Banner */}
      {!isScrolled && (
        <div className="bg-[#f06292] text-white text-center py-1 text-xs font-medium tracking-wide">
          FREE SHIPPING ON ORDERS ABOVE PKR 3,000! 🚚
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between mt-1">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          id="mobile-menu-btn"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-[#f06292] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-200 group-hover:scale-105 transition-transform">
            LH
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#1a1a1a] hidden sm:block">
            Little<span className="text-[#f06292]">Haven</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-sm font-medium text-[#4a4a4a] hover:text-[#f06292] transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f06292] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center bg-[#f5f2ed] rounded-full px-4 py-2 hover:ring-1 ring-[#f06292]/20 transition-all">
            <Search className="w-4 h-4 text-[#8e8e8e]" />
            <input 
              type="text" 
              placeholder="Search toys, clothes..." 
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32 xl:w-48 placeholder-[#8e8e8e]"
            />
          </div>

          <Link to="/wishlist" className="p-2 hover:bg-[#f5f2ed] rounded-full relative transition-colors">
            <Heart className="w-5 h-5 text-[#4a4a4a]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full border-2 border-white" />
            )}
          </Link>

          <Link to="/cart" className="p-2 hover:bg-[#f5f2ed] rounded-full relative transition-colors">
            <ShoppingCart className="w-5 h-5 text-[#4a4a4a]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f06292] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/account" className="p-2 bg-[#f06292] text-white rounded-full transition-all hover:scale-105 active:scale-95 shadow-md shadow-pink-100 hidden sm:flex">
            <User className="w-5 h-5" />
          </Link>
          <button className="sm:hidden p-2 hover:bg-[#f5f2ed] rounded-full transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#f06292] rounded-full flex items-center justify-center text-white font-bold">LH</div>
                  <span className="text-xl font-bold tracking-tight">LittleHaven</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} id="close-mobile-menu">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-medium text-[#1a1a1a] hover:text-[#f06292] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="absolute bottom-10 left-6 right-6">
                <div className="p-4 bg-[#fdfbf7] rounded-2xl border border-[#f5f2ed]">
                  <p className="text-xs text-[#8e8e8e] mb-2 uppercase tracking-widest font-semibold">Support</p>
                  <a href="https://wa.me/923000000000" className="flex items-center text-[#1a1a1a] font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
