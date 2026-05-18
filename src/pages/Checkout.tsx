import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import { formatPKR, cn } from '../lib/utils';
import { 
  CheckCircle2, CreditCard, Truck, User, 
  MapPin, Phone, MessageSquare, ShieldCheck, 
  ChevronRight, ArrowLeft 
} from 'lucide-react';
import { motion } from 'motion/react';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Karachi',
    notes: ''
  });

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Peshawar', 'Quetta', 'Sialkot'];
  
  const shippingFee = cartTotal > 3000 ? 0 : 250;
  const platformFee = 50;
  const grandTotal = cartTotal + shippingFee + platformFee;

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);
    // Simulate API call
    setTimeout(() => {
      setIsOrdering(false);
      clearCart();
      setStep(3); // Success step
    }, 2500);
  };

  if (cart.length === 0 && step !== 3) return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      <Link to="/shop" className="text-[#f06292] font-bold">Back to Shop</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pb-32">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Main Checkout Flow */}
        <div className="flex-1">
          {step < 3 && (
            <div className="flex items-center space-x-4 mb-12 overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide">
              <div className={cn("flex items-center", step >= 1 ? "text-[#f06292]" : "text-[#8e8e8e]")}>
                <span className={cn("w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm mr-2", step >= 1 ? "border-[#f06292] bg-[#f06292] text-white" : "border-[#eee]")}>1</span>
                <span className="font-bold text-sm">Shipping</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#eee]" />
              <div className={cn("flex items-center", step >= 2 ? "text-[#f06292]" : "text-[#8e8e8e]")}>
                <span className={cn("w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm mr-2", step >= 2 ? "border-[#f06292] bg-[#f06292] text-white" : "border-[#eee]")}>2</span>
                <span className="font-bold text-sm">Payment</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#eee]" />
              <div className={cn("flex items-center text-[#8e8e8e]")}>
                <span className="w-8 h-8 rounded-full border-2 border-[#eee] flex items-center justify-center font-bold text-sm mr-2">3</span>
                <span className="font-bold text-sm">Review</span>
              </div>
            </div>
          )}

          {step === 1 && (
            <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#f5f2ed] shadow-sm">
              <h2 className="text-3xl font-black text-[#1a1a1a] mb-2">Shipping Information</h2>
              <p className="text-[#8e8e8e] text-sm mb-10 tracking-tight uppercase font-bold">Where should we send your happiness?</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8e8e8e]" />
                      <input 
                        type="text" 
                        required
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#fdfbf7] border-none focus:ring-1 ring-[#f06292] outline-none font-medium"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Phone Number (WhatsApp Preferred)</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8e8e8e]" />
                      <input 
                        type="tel" 
                        required
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#fdfbf7] border-none focus:ring-1 ring-[#f06292] outline-none font-medium"
                        placeholder="03XX XXXXXXX"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Delivery Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-[#8e8e8e]" />
                    <textarea 
                      required
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#fdfbf7] border-none focus:ring-1 ring-[#f06292] outline-none font-medium min-h-[120px]"
                      placeholder="Street address, Apartment, etc."
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">City</label>
                    <select 
                      className="w-full px-6 py-4 rounded-2xl bg-[#fdfbf7] border-none focus:ring-1 ring-[#f06292] outline-none font-bold"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    >
                      {cities.map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Order Notes (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8e8e8e]" />
                      <input 
                        type="text" 
                        className="w-full pl-12 pr-6 py-4 rounded-2xl bg-[#fdfbf7] border-none focus:ring-1 ring-[#f06292] outline-none font-medium"
                        placeholder="e.g. Near Big Mosque"
                        value={formData.notes}
                        onChange={e => setFormData({...formData, notes: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.name || !formData.phone || !formData.address}
                    className="w-full py-5 bg-[#1a1a1a] text-white rounded-2xl font-black text-lg hover:bg-[#f06292] transition-all shadow-xl shadow-black/10 disabled:opacity-50 disabled:hover:bg-[#1a1a1a]"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            </section>
          )}

          {step === 2 && (
            <section className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#f5f2ed] shadow-sm">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center text-xs font-bold text-[#8e8e8e] hover:text-[#1a1a1a] mb-8 uppercase tracking-widest"
              >
                <ArrowLeft className="w-3 h-3 mr-2" /> Back to Shipping
              </button>
              
              <h2 className="text-3xl font-black text-[#1a1a1a] mb-2">Payment Method</h2>
              <p className="text-[#8e8e8e] text-sm mb-10 tracking-tight uppercase font-bold font-mono">Safe & Reliable Payments</p>
              
              <div className="space-y-6">
                <div className="p-6 bg-[#f06292]/5 border-2 border-[#f06292] rounded-[2rem] flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#f06292] rounded-2xl flex items-center justify-center text-white">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#1a1a1a]">Cash on Delivery</h4>
                      <p className="text-xs text-[#4a4a4a]">Pay when you receive the package</p>
                    </div>
                  </div>
                  <CheckCircle2 className="text-[#f06292] w-6 h-6" />
                </div>

                <div className="p-6 bg-[#fdfbf7] border border-[#eee] rounded-[2rem] flex items-center justify-between opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-[#eee] rounded-2xl flex items-center justify-center text-[#8e8e8e]">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-[#1a1a1a]">Online Payment</h4>
                      <p className="text-xs text-[#4a4a4a]">Easypaisa, JazzCash, or Cards (Coming Soon)</p>
                    </div>
                  </div>
                </div>

                <div className="pt-10">
                  <div className="p-6 bg-blue-50 rounded-2xl flex items-start gap-3 border border-blue-100 mb-8">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-[11px] text-blue-800 leading-relaxed">
                      Your order is protected by <strong>LittleHaven Guarantee</strong>. We only release payments to our suppliers after you receive and confirm your package quality.
                    </p>
                  </div>

                  <button 
                    onClick={handleOrder}
                    disabled={isOrdering}
                    className={cn(
                      "w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl transition-all",
                      isOrdering ? "bg-[#8e8e8e] cursor-wait" : "bg-[#f06292] text-white hover:bg-[#d81b60] shadow-pink-200"
                    )}
                  >
                    {isOrdering ? (
                      <>
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>Confirm Order (Pay On Delivery)</>
                    )}
                  </button>
                </div>
              </div>
            </section>
          )}

          {step === 3 && (
            <motion.section 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-16 rounded-[3rem] border border-green-100 shadow-2xl text-center"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-black text-[#1a1a1a] mb-4">Order Placed Successfully!</h2>
              <p className="text-[#4a4a4a] text-lg mb-10 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>! Your order #LH-{Math.floor(Math.random() * 90000 + 10000)} is on its way. We'll contact you on <strong>{formData.phone}</strong> for confirmation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/account" className="px-10 py-4 bg-[#1a1a1a] text-white rounded-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all">
                  Track Order
                </Link>
                <Link to="/" className="px-10 py-4 border-2 border-[#eee] text-[#1a1a1a] rounded-2xl font-black hover:bg-[#fdfbf7] hover:scale-105 active:scale-95 transition-all">
                  Back to Home
                </Link>
              </div>
            </motion.section>
          )}
        </div>

        {/* Sidebar Order Summary */}
        {step < 3 && (
          <aside className="lg:w-96">
            <div className="bg-[#f5f2ed] p-8 rounded-[2.5rem] sticky top-32 border border-[#eee]">
              <h3 className="text-lg font-black text-[#1a1a1a] mb-6 border-b border-[#eee] pb-4">In Your Bag</h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto mb-8 scrollbar-hide pr-2">
                {cart.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-white flex-shrink-0">
                      <img src={item.images[0]} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-sm font-bold text-[#1a1a1a] line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-[#8e8e8e] font-bold uppercase">{item.quantity}x • {item.selectedSize}</p>
                    </div>
                    <span className="text-sm font-black text-[#1a1a1a]">{formatPKR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-[#eee]">
                <div className="flex justify-between text-xs font-bold text-[#4a4a4a]">
                  <span>Items</span>
                  <span>{formatPKR(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#4a4a4a]">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? "text-green-600" : ""}>{shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-[#4a4a4a]">
                  <span>Extra Fees</span>
                  <span>{formatPKR(platformFee)}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-[#f06292] pt-4 mt-2 border-t border-[#eee]">
                  <span>Total</span>
                  <span>{formatPKR(grandTotal)}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white rounded-2xl border border-[#eee] flex items-center gap-3">
                <Truck className="w-5 h-5 text-pink-400" />
                <p className="text-[10px] font-bold text-[#4a4a4a]">Estimated delivery within 4-7 working days. Items sourced from China to Pakistan with care.</p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Checkout;
