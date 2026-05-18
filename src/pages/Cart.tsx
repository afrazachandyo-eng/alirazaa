import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ArrowRight, Truck, Info } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { formatPKR, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const shippingFee = cartTotal > 3000 ? 0 : 250;
  const platformFee = 50;
  const grandTotal = cartTotal + shippingFee + platformFee;

  if (cart.length === 0) return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <div className="w-24 h-24 bg-[#f5f2ed] rounded-full flex items-center justify-center mx-auto mb-8">
        <ShoppingBag className="w-10 h-10 text-[#8e8e8e]" />
      </div>
      <h2 className="text-3xl font-black text-[#1a1a1a] mb-4">Your cart is empty!</h2>
      <p className="text-[#4a4a4a] mb-10 max-w-sm mx-auto leading-relaxed">Looks like you haven't added anything to your cart yet. Your little one is waiting!</p>
      <Link to="/shop" className="px-10 py-4 bg-[#f06292] text-white rounded-2xl font-black shadow-xl shadow-pink-100 hover:bg-[#d81b60] transition-all">
        Start Shopping
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pb-32">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#f5f2ed]">
            <h1 className="text-4xl font-black text-[#1a1a1a]">My Bag <span className="text-lg font-bold text-[#8e8e8e] ml-2">({cart.length} items)</span></h1>
            <button 
              onClick={clearCart}
              className="text-xs font-bold text-red-500 hover:underline uppercase tracking-widest"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-[2rem] border border-[#f5f2ed] hover:shadow-sm transition-shadow relative group"
                >
                  {/* Remove Btn */}
                  <button 
                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    className="absolute top-4 right-4 p-2 text-[#8e8e8e] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 border border-[#f5f2ed]">
                    <img src={item.images[0]} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pr-8">
                        <Link to={`/product/${item.id}`} className="hover:text-[#f06292] transition-colors">
                          <h3 className="font-bold text-[#1a1a1a] text-lg">{item.name}</h3>
                        </Link>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {item.selectedSize && <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e8e8e] bg-[#f5f2ed] px-2 py-1 rounded-md">Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e8e8e] bg-[#f5f2ed] px-2 py-1 rounded-md">Color: {item.selectedColor}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center bg-[#fdfbf7] rounded-xl px-1 border border-[#eee]">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="p-2 text-[#4a4a4a] hover:bg-white rounded-lg transition-colors"
                        ><Minus className="w-4 h-4" /></button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          className="p-2 text-[#4a4a4a] hover:bg-white rounded-lg transition-colors"
                        ><Plus className="w-4 h-4" /></button>
                      </div>
                      <span className="font-black text-xl text-[#f06292]">{formatPKR(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Link to="/shop" className="mt-10 inline-flex items-center text-sm font-bold text-[#1a1a1a] hover:text-[#f06292] group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Continue Shopping
          </Link>
        </div>

        {/* Summary Card */}
        <div className="lg:w-96">
          <div className="bg-[#1a1a1a] text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-32">
            <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Subtotal</span>
                <span className="font-bold">{formatPKR(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Shipping</span>
                <span className={cn("font-bold", shippingFee === 0 ? "text-green-400" : "")}>
                  {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-60 flex items-center">Convenience Fee <Info className="w-3 h-3 ml-1 opacity-40" /></span>
                <span className="font-bold">{formatPKR(platformFee)}</span>
              </div>
            </div>

            {shippingFee > 0 && (
              <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-xs">
                <p className="flex items-center text-pink-300 font-bold mb-1 italic">
                  <Truck className="w-3 h-3 mr-2" /> Add PKR {(3000 - cartTotal).toLocaleString()} more for FREE shipping!
                </p>
                <div className="h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(cartTotal / 3000) * 100}%` }} className="h-full bg-pink-400" />
                </div>
              </div>
            )}

            <div className="flex justify-between text-2xl font-black mb-10 pt-6 border-t border-white/10">
              <span>Total</span>
              <span className="text-pink-400">{formatPKR(grandTotal)}</span>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-5 bg-[#f06292] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-pink-500/20 hover:bg-[#ff80ab] hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                Proceed to Checkout <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center justify-center gap-2 opacity-40 grayscale">
                <span className="text-[10px] font-bold uppercase tracking-widest text-center">Available: Cash on Delivery & Local Mobile Wallets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
