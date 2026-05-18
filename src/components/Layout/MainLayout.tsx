import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../UI/WhatsAppButton';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-[#eee] flex justify-around items-center py-3 px-2 lg:hidden z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <Link to="/" className="flex flex-col items-center">
          <Home className="w-5 h-5 text-[#1a1a1a]" />
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </Link>
        <Link to="/shop" className="flex flex-col items-center">
          <ShoppingBag className="w-5 h-5 text-[#8e8e8e]" />
          <span className="text-[10px] mt-1 text-[#8e8e8e]">Shop</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center relative">
          <ShoppingCart className="w-5 h-5 text-[#8e8e8e]" />
          <span className="text-[10px] mt-1 text-[#8e8e8e]">Cart</span>
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[8px] px-1 rounded-full">3</span>
        </Link>
        <Link to="/account" className="flex flex-col items-center">
          <User className="w-5 h-5 text-[#8e8e8e]" />
          <span className="text-[10px] mt-1 text-[#8e8e8e]">Account</span>
        </Link>
      </nav>
    </div>
  );
};

import { Link } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';

export default MainLayout;
