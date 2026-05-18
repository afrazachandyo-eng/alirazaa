import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f2ed] pt-16 pb-8 border-t border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-[#f06292] rounded-full flex items-center justify-center text-white font-bold">LH</div>
              <span className="text-xl font-bold tracking-tight text-[#1a1a1a]">LittleHaven</span>
            </Link>
            <p className="text-[#4a4a4a] text-sm leading-relaxed mb-6">
              Pakistan's favorite stop for premium kids & baby essentials. Trusted by 50,000+ parents across the nation. Quality sourced with love.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 bg-white rounded-full text-[#1a1a1a] hover:bg-[#f06292] hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full text-[#1a1a1a] hover:bg-[#f06292] hover:text-white transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full text-[#1a1a1a] hover:bg-[#f06292] hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#1a1a1a] font-bold mb-6">Shop Categories</h4>
            <ul className="space-y-4">
              <li><Link to="/category/kids-clothing" className="text-sm text-[#4a4a4a] hover:text-[#f06292] transition-colors">Kids Clothing</Link></li>
              <li><Link to="/category/baby-clothing" className="text-sm text-[#4a4a4a] hover:text-[#f06292] transition-colors">Baby Essentials</Link></li>
              <li><Link to="/category/toys" className="text-sm text-[#4a4a4a] hover:text-[#f06292] transition-colors">Toys & Educational</Link></li>
              <li><Link to="/category/footwear" className="text-sm text-[#4a4a4a] hover:text-[#f06292] transition-colors">Footwear</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#1a1a1a] font-bold mb-6">Customer Support</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-[#4a4a4a] hover:text-[#f06292] transition-colors">About Us</Link></li>
              <li><Link to="/track" className="text-sm text-[#f06292] font-bold hover:underline transition-colors flex items-center">Track My Joy ✨</Link></li>
              <li><Link to="/faq" className="text-sm text-[#4a4a4a] hover:text-[#f06292] transition-colors">FAQs</Link></li>
              <li><Link to="/shipping-policy" className="text-sm text-[#4a4a4a] hover:text-[#f06292] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-sm text-[#4a4a4a] hover:text-[#f06292] transition-colors">Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#1a1a1a] font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-[#4a4a4a] mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white border-none rounded-l-xl px-4 py-3 text-sm focus:ring-1 ring-pink-500 w-full"
              />
              <button className="bg-[#f06292] text-white px-6 rounded-r-xl font-bold hover:bg-[#d81b60] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#e2e2e2] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8e8e8e]">
            © {new Date().getFullYear()} LittleHaven Pakistan. All rights reserved. Built for parents, with love.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-[10px] uppercase tracking-widest text-[#8e8e8e] font-bold">Payments:</span>
            <div className="flex space-x-2 grayscale opacity-60">
              <div className="px-2 py-1 bg-white rounded-md text-[10px] font-bold border border-[#ddd]">COD</div>
              <div className="px-2 py-1 bg-white rounded-md text-[10px] font-bold border border-[#ddd]">EASYPAISA</div>
              <div className="px-2 py-1 bg-white rounded-md text-[10px] font-bold border border-[#ddd]">JAZZCASH</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
