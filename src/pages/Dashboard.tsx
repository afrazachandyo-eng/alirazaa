import React, { useState } from 'react';
import { useCart } from '../store/CartContext';
import { formatPKR, cn } from '../lib/utils';
import { 
  User, Package, Heart, LogOut, Settings, 
  MapPin, Bell, ChevronRight, ShoppingBag, 
  Clock, Truck, CheckCircle, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/Section/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const Dashboard: React.FC = () => {
  const { wishlist } = useCart();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  const orders = [
    { id: '#LH-54231', date: 'Oct 12, 2024', status: 'Delivered', total: 4250, items: 3 },
    { id: '#LH-54332', date: 'Dec 05, 2024', status: 'Processing', total: 2100, items: 1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Profile Sidebar */}
        <aside className="lg:w-80 space-y-6">
          <div className="bg-[#f5f2ed] rounded-[2.5rem] p-8 text-center border border-[#eee]">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 border-4 border-pink-100 flex items-center justify-center p-2 relative overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=afraz" className="w-full h-full rounded-full object-cover" />
               <div className="absolute bottom-0 right-0 p-1.5 bg-green-500 rounded-full border-4 border-white" />
            </div>
            <h3 className="text-xl font-black text-[#1a1a1a]">Afraz Ahmed</h3>
            <p className="text-xs font-bold text-[#8e8e8e] mt-1 uppercase tracking-wider">Premium Member</p>
            
            <div className="flex justify-center gap-4 mt-8">
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-sm">
                  <Package className="w-5 h-5 text-orange-400" />
                </div>
                <span className="text-[10px] font-bold text-[#8e8e8e]">Orders</span>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-sm">
                  <Heart className="w-5 h-5 text-pink-400" />
                </div>
                <span className="text-[10px] font-bold text-[#8e8e8e]">{wishlist.length}</span>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform shadow-sm">
                  <Bell className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-[#8e8e8e]">3</span>
              </div>
            </div>
          </div>

          <nav className="bg-white rounded-[2.5rem] p-4 border border-[#f5f2ed] space-y-1">
            <button 
              onClick={() => setActiveTab('orders')}
              className={cn("w-full flex items-center p-4 rounded-2xl transition-colors", activeTab === 'orders' ? "bg-[#f06292] text-white" : "hover:bg-[#fdfbf7] text-[#4a4a4a]")}>
              <Package className="w-5 h-5 mr-4" />
              <span className="font-bold">My Orders</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={cn("w-full flex items-center p-4 rounded-2xl transition-colors", activeTab === 'wishlist' ? "bg-[#f06292] text-white" : "hover:bg-[#fdfbf7] text-[#4a4a4a]")}>
              <Heart className="w-5 h-5 mr-4" />
              <span className="font-bold">Wishlist</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={cn("w-full flex items-center p-4 rounded-2xl transition-colors", activeTab === 'profile' ? "bg-[#f06292] text-white" : "hover:bg-[#fdfbf7] text-[#4a4a4a]")}>
              <User className="w-5 h-5 mr-4" />
              <span className="font-bold">Settings</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
            </button>
            <button className="w-full flex items-center p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5 mr-4" />
              <span className="font-bold">Sign Out</span>
            </button>
          </nav>
        </aside>

        {/* Tab Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="orders">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-[#1a1a1a]">Order History</h2>
                  <div className="bg-white px-4 py-2 rounded-xl flex items-center border border-[#eee]">
                    <Search className="w-4 h-4 text-[#8e8e8e] mr-2" />
                    <input type="text" placeholder="Find an order" className="bg-transparent border-none focus:ring-0 text-sm w-32 outline-none" />
                  </div>
                </div>

                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-[#f5f2ed] hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-lg font-black text-[#1a1a1a]">{order.id}</span>
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                              order.status === 'Delivered' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                            )}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-[#8e8e8e]">{order.date} • {order.items} Items</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-[#8e8e8e] uppercase">Total Amount</p>
                          <span className="text-2xl font-black text-[#f06292]">{formatPKR(order.total)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#fdfbf7] rounded-2xl border border-[#f5f2ed]">
                        <div className="flex items-center gap-6">
                           <div className="flex -space-x-3">
                             {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />)}
                           </div>
                           <p className="text-sm font-bold text-[#4a4a4a]">Items arriving shortly</p>
                        </div>
                        <Link to="/track" className="px-6 py-2 bg-white text-[#1a1a1a] border border-[#eee] rounded-xl text-sm font-bold hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm">
                          Track Joy
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'wishlist' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="wishlist">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black text-[#1a1a1a]">Saved Items</h2>
                  <span className="bg-[#f06292] text-white text-xs font-bold px-3 py-1 rounded-full">{wishlist.length}</span>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {wishlist.map(product => <ProductCard key={product.id} product={product} />)}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-[#fdfbf7] rounded-[3rem] border-2 border-dashed border-[#eee]">
                    <Heart className="w-12 h-12 text-[#8e8e8e] mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-[#1a1a1a]">Your wishlist is lonely.</h3>
                    <p className="text-sm text-[#8e8e8e] mb-8">Save items here to watch for price drops!</p>
                    <Link to="/shop" className="px-8 py-3 bg-[#f06292] text-white rounded-xl font-bold shadow-lg shadow-pink-100 hover:scale-105 transition-all">Go Shopping</Link>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} key="profile">
                <h2 className="text-3xl font-black text-[#1a1a1a] mb-8">Account Settings</h2>
                <div className="bg-white p-8 rounded-[2.5rem] border border-[#f5f2ed] space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-[#8e8e8e] ml-1">Full Name</label>
                        <input type="text" className="w-full px-6 py-4 rounded-2xl bg-[#fdfbf7] border-none font-bold" defaultValue="Afraz Ahmed" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-[#8e8e8e] ml-1">Email Address</label>
                        <input type="email" className="w-full px-6 py-4 rounded-2xl bg-[#fdfbf7] border-none font-bold" defaultValue="afraz@example.com" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-[#8e8e8e] ml-1">WhatsApp Number</label>
                      <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-[#fdfbf7] border-none font-bold" defaultValue="+92 301 2345678" />
                   </div>
                   <div className="pt-6 border-t border-[#f5f2ed]">
                      <button className="px-10 py-4 bg-[#1a1a1a] text-white rounded-2xl font-black hover:bg-[#f06292] transition-colors shadow-xl">
                        Update Information
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
