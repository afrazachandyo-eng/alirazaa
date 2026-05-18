import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Package, Truck, MapPin, 
  Bike, CheckCircle2, Star, Rocket,
  Cloud, Sparkles, ArrowRight, Gift,
  MessageCircle
} from 'lucide-react';
import { cn, formatPKR } from '../lib/utils';
import { Link } from 'react-router-dom';

const TRACKING_STAGES = [
  { id: 'packed', label: 'Order Packed', icon: <Gift />, color: 'bg-orange-400', desc: 'Your goodies are in the box!' },
  { id: 'ready', label: 'Ready to Fly', icon: <Rocket />, color: 'bg-blue-400', desc: 'Waiting for the magic van.' },
  { id: 'dispatched', label: 'Dispatched', icon: <Truck />, color: 'bg-[#f06292]', desc: 'On the road across Pakistan!' },
  { id: 'city', label: 'Arrived in City', icon: <MapPin />, color: 'bg-purple-500', desc: 'Almost there! Just landed in your city.' },
  { id: 'area', label: 'Arrived in Area', icon: <Cloud />, color: 'bg-sky-400', desc: 'Near your home sweet home.' },
  { id: 'out', label: 'Out for Delivery', icon: <Bike />, color: 'bg-green-500', desc: 'The hero rider is pedaling to your door!' },
  { id: 'delivered', label: 'Delivered', icon: <CheckCircle2 />, color: 'bg-green-600', desc: 'Yay! Time to unbox the happiness.' }
];

const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    
    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      setOrderData({
        id: orderId.toUpperCase(),
        currentStage: 5, // "Out for Delivery" for extra fun
        customer: 'Afraz احمد',
        total: 5400,
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 pb-32 relative overflow-hidden">
      {/* Decorative Floating Clouds */}
      <motion.div 
        animate={{ x: [-20, 20, -20] }} 
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute top-20 right-10 text-sky-200/40 pointer-events-none"
      >
        <Cloud className="w-32 h-32 fill-current" />
      </motion.div>
      <motion.div 
        animate={{ x: [20, -20, 20] }} 
        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        className="absolute top-60 left-10 text-sky-200/30 pointer-events-none"
      >
        <Cloud className="w-24 h-24 fill-current" />
      </motion.div>

      <div className="text-center mb-16 relative z-10">
        <motion.div 
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1] 
          }} 
          transition={{ repeat: Infinity, duration: 5 }}
          className="w-24 h-24 bg-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-[#f06292] shadow-xl shadow-pink-50"
        >
          <Rocket className="w-12 h-12" />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black text-[#1a1a1a] mb-4 tracking-tight">The Magic <span className="text-[#f06292]">Tracker</span></h1>
        <p className="text-[#8e8e8e] max-w-sm mx-auto font-bold uppercase tracking-widest text-[10px]">Follow the adventure of your surprise box!</p>
      </div>

      {/* Tracking Input */}
      <section className="max-w-xl mx-auto mb-20 relative z-10">
        <form onSubmit={handleTrack} className="bg-white p-3 rounded-[3rem] border-4 border-[#f5f2ed] shadow-2xl flex gap-3">
          <input 
            type="text" 
            placeholder="Type your Order ID here..." 
            className="flex-grow px-8 py-4 bg-transparent border-none outline-none font-bold text-[#1a1a1a] placeholder:text-[#8e8e8e]/30"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="px-10 py-4 bg-[#f06292] text-white rounded-[2.5rem] font-black flex items-center gap-3 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-pink-200"
          >
            {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Find it!'}
            <Sparkles className="w-5 h-5" />
          </button>
        </form>
      </section>

      <AnimatePresence mode="wait">
        {orderData ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12 relative z-10"
          >
            {/* Success Header */}
            <div className="bg-[#fdfbf7] p-10 rounded-[4rem] border-4 border-dashed border-pink-100 relative overflow-hidden">
               <div className="absolute -top-10 -right-10 opacity-10">
                  <Gift className="w-64 h-64 text-pink-500" />
               </div>
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      <span className="px-4 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest">Safe & Secure</span>
                      <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">Coming Soon</span>
                    </div>
                    <h2 className="text-4xl font-black text-[#1a1a1a] mb-2">{orderData.id}</h2>
                    <p className="text-[#4a4a4a] font-black text-lg">Hello, <span className="text-[#f06292]">{orderData.customer}!</span></p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-[#f5f2ed] shadow-sm">
                    <p className="text-[10px] font-black uppercase text-[#8e8e8e] mb-1">Happiness Worth</p>
                    <p className="text-3xl font-black text-[#f06292]">{formatPKR(orderData.total)}</p>
                  </div>
               </div>
            </div>

            {/* The Visual Journey */}
            <div className="bg-white p-10 md:p-20 rounded-[5rem] border-4 border-[#f5f2ed] shadow-sm relative overflow-hidden">
               {/* Background Decorative Particles */}
               <div className="absolute inset-0 pointer-events-none opacity-20">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 180, 270, 360]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-dashed border-pink-200 rounded-full"
                  />
                  <motion.div 
                    animate={{ 
                      y: [0, -100, 0],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-sky-100 rounded-full blur-3xl"
                  />
               </div>

               {/* The Adventure Path (Road) */}
               <div className="absolute left-10 md:left-24 top-20 bottom-20 w-4 bg-[#fdfbf7] rounded-full hidden md:block overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${((orderData.currentStage + 0.5) / TRACKING_STAGES.length) * 100}%` }}
                    transition={{ duration: 2.5, ease: "backOut" }}
                    className="w-full bg-gradient-to-b from-orange-300 via-[#f06292] to-green-400 rounded-full relative"
                  >
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-1/2 bg-white/20 blur-sm"
                    />
                  </motion.div>
               </div>
               
               <div className="space-y-24 relative z-10">
                  {TRACKING_STAGES.map((stage, idx) => {
                    const isCompleted = idx < orderData.currentStage;
                    const isCurrent = idx === orderData.currentStage;
                    const isPending = idx > orderData.currentStage;

                    return (
                      <motion.div 
                        key={stage.id} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-8 md:gap-16 relative"
                      >
                         {/* Icon/Circle container with custom animations based on type */}
                         <div className={cn(
                           "w-28 h-28 rounded-[3rem] flex items-center justify-center flex-shrink-0 transition-all duration-700 shadow-2xl relative z-20 border-4 border-white",
                           isCompleted ? "bg-green-100 text-green-600 rotate-6 scale-90" : 
                           isCurrent ? `${stage.color} text-white scale-125 ring-8 ring-pink-50/50 shadow-pink-200` :
                           "bg-[#fdfbf7] text-[#8e8e8e]/40 grayscale opacity-50"
                         )}>
                            <motion.div
                              animate={isCurrent ? {
                                rotate: stage.id === 'ready' ? [0, 360] : [0, 10, -10, 0],
                                scale: stage.id === 'packed' ? [1, 1.2, 1] : 1,
                                y: stage.id === 'out' ? [0, -10, 0] : 0
                              } : {}}
                              transition={{ 
                                repeat: Infinity, 
                                duration: stage.id === 'ready' ? 5 : 2,
                                ease: "easeInOut"
                              }}
                            >
                               {isCompleted ? <CheckCircle2 className="w-12 h-12" /> : React.cloneElement(stage.icon as React.ReactElement<any>, { className: "w-12 h-12" })}
                            </motion.div>
                            
                            {isCurrent && (
                              <div className="absolute -top-14 left-1/2 -translate-x-1/2">
                                <motion.div 
                                  animate={{ y: [0, -10, 5, 0], scale: [1, 1.1, 1] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  className="bg-[#1a1a1a] text-white text-[10px] font-black px-3 py-1.5 rounded-xl relative whitespace-nowrap shadow-xl"
                                >
                                  ✨ MAGIC HAPPENING HERE!
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1a1a] rotate-45" />
                                </motion.div>
                              </div>
                            )}

                            {/* Decorative particles for current stage */}
                            {isCurrent && [...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                animate={{
                                  x: [0, Math.cos(i) * 50],
                                  y: [0, Math.sin(i) * 50],
                                  opacity: [1, 0],
                                  scale: [1, 0]
                                }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                              />
                            ))}
                         </div>

                         {/* Moving Rider for Current Stage */}
                         {isCurrent && (
                            <motion.div 
                              initial={{ x: -100, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              className="absolute -left-36 top-10 hidden xl:flex flex-col items-center gap-2"
                            >
                               <motion.div 
                                 animate={{ 
                                   rotate: [-10, 10, -10],
                                   y: [0, -5, 0]
                                 }} 
                                 transition={{ repeat: Infinity, duration: 0.6 }}
                               >
                                  <Bike className="w-20 h-20 text-[#f06292]" />
                               </motion.div>
                               <div className="w-16 h-2 bg-black/5 rounded-full blur-sm" />
                            </motion.div>
                         )}

                         {/* Content Section */}
                         <motion.div 
                            animate={isCurrent ? { 
                              scale: [1, 1.02, 1],
                              backgroundColor: ["#ffffff", "#fdfbf7", "#ffffff"]
                            } : {}}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className={cn(
                              "flex-grow transition-all duration-500 p-10 rounded-[3.5rem] border-2",
                              isCurrent ? "shadow-xl border-[#f06292]/10" : "border-transparent",
                              isPending ? "grayscale opacity-30" : "opacity-100"
                            )}>
                            <h3 className={cn("text-3xl font-black mb-3 tracking-tight", isCurrent ? "text-[#1a1a1a]" : "text-[#8e8e8e]")}>
                              {stage.label}
                            </h3>
                            <p className={cn("text-lg font-medium leading-relaxed", isCurrent ? "text-[#4a4a4a]" : "text-[#8e8e8e]/60")}>
                              {stage.desc}
                            </p>
                            
                            {isCurrent && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 flex flex-wrap justify-center md:justify-start gap-3"
                              >
                                <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl border-2 border-pink-100 text-[10px] font-black uppercase tracking-widest text-[#f06292]">
                                  <Sparkles className="w-4 h-4" /> Live Tracking Active
                                </div>
                                <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-2xl border-2 border-sky-100 text-[10px] font-black uppercase tracking-widest text-sky-500">
                                  <Rocket className="w-4 h-4" /> Priority Express
                                </div>
                              </motion.div>
                            )}
                         </motion.div>
                      </motion.div>
                    );
                  })}
               </div>
            </div>

            {/* Fun Footer */}
            <div className="max-w-2xl mx-auto p-12 bg-gradient-to-br from-[#1a1a1a] to-stone-800 text-white rounded-[4rem] text-center shadow-3xl relative overflow-hidden group">
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                 className="absolute -top-10 -left-10 opacity-5"
               >
                 <Rocket className="w-48 h-48" />
               </motion.div>
               
               <h4 className="text-3xl font-black mb-4 relative z-10">Lost in Adventure?</h4>
               <p className="opacity-60 text-base mb-10 leading-relaxed max-w-sm mx-auto relative z-10">If your package is taking a nap or playing hide and seek, our team is here to help find it!</p>
               
               <a href="https://wa.me/923012345678" className="px-12 py-5 bg-[#f06292] text-white rounded-[2rem] font-black inline-flex items-center gap-4 hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-pink-500/40 relative z-10">
                  <MessageCircle className="w-6 h-6" /> Talk to a Human
               </a>
            </div>
          </motion.div>
        ) : !isSearching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center pt-20"
          >
            <div className="inline-block p-16 bg-white rounded-[5rem] border-4 border-dashed border-[#f5f2ed] relative">
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="mb-8"
               >
                 <Rocket className="w-20 h-20 text-pink-100 mx-auto" />
               </motion.div>
               <h3 className="text-xl font-black text-[#1a1a1a] mb-2 tracking-tight">Your order is shy!</h3>
               <p className="text-[10px] font-black text-[#8e8e8e] uppercase tracking-widest">Enter the secret ID above to find it.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackOrder;
