import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import ProductCard from '../components/Section/ProductCard';

const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 pt-4 md:px-8">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] overflow-hidden bg-[#f5f2ed] min-h-[600px] flex flex-col lg:flex-row relative">
          {/* Animated Background Shapes */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-pink-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />

          {/* Text Content */}
          <div className="flex-1 p-10 md:p-20 flex flex-col justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#f06292] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                <Sparkles className="w-3 h-3 mr-2" /> New Collection is here
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-[#1a1a1a] mb-8 leading-[1.1] tracking-tight">
                Everything Your <br /> 
                <span className="text-[#f06292]">Little One</span> Loves
              </h1>
              <p className="text-lg text-[#4a4a4a] mb-10 max-w-lg leading-relaxed">
                Explore our premium collection of baby fashion, educational toys, and essentials sourced for quality and happiness.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="px-8 py-4 bg-[#f06292] text-white rounded-2xl font-bold shadow-lg shadow-pink-200 hover:bg-[#d81b60] transition-all flex items-center group">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/category/toys" className="px-8 py-4 bg-white text-[#1a1a1a] rounded-2xl font-bold border border-[#eee] hover:bg-[#fdfbf7] transition-all">
                  Explore Toys
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 relative min-h-[400px] lg:min-h-0 overflow-hidden">
            <motion.img 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              src="https://images.unsplash.com/photo-1544126592-807daa2b565b?q=80&w=1200&auto=format&fit=crop"
              alt="Cute baby"
              className="absolute inset-0 w-full h-full object-cover lg:object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f5f2ed]/50 lg:bg-gradient-to-r lg:from-[#f5f2ed] lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#f06292] font-bold text-sm uppercase tracking-widest">Discover</span>
            <h2 className="text-4xl font-black text-[#1a1a1a] mt-2 tracking-tight">Shop by Categories</h2>
          </div>
          <Link to="/categories" className="text-sm font-bold text-[#f06292] flex items-center hover:underline">
            View All Categories <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/category/${cat.slug}`} className="group block text-center">
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 shadow-sm border border-[#f0f0f0] bg-white p-1">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors" />
                </div>
                <h3 className="font-bold text-[#1a1a1a] group-hover:text-[#f06292] transition-colors">{cat.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-[#1a1a1a] text-white p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-[#f06292] skew-x-[-15deg] translate-x-[40%] hidden lg:block" />
          
          <div className="z-10 text-center md:text-left mb-8 md:mb-0">
            <span className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 mb-6 inline-block">Flash Sale LIVE Now!</span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Upto 50% Off <br /> on All New Toys</h2>
            <div className="flex justify-center md:justify-start gap-4">
              {[
                { val: timeLeft.hours, label: 'HRS' },
                { val: timeLeft.minutes, label: 'MIN' },
                { val: timeLeft.seconds, label: 'SEC' }
              ].map(t => (
                <div key={t.label} className="bg-white/10 backdrop-blur-md rounded-2xl w-20 h-20 flex flex-col items-center justify-center border border-white/20">
                  <span className="text-2xl font-black">{t.val.toString().padStart(2, '0')}</span>
                  <span className="text-[10px] font-bold opacity-60 tracking-wider">{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="z-10">
            <Link to="/deals" className="px-10 py-5 bg-white text-[#1a1a1a] rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
              Grab the Deal
            </Link>
          </div>
        </div>
      </section>

      {/* TikTok Style Reels Placeholder */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
             <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
             <h3 className="text-2xl font-black text-[#1a1a1a]">Shop the Look</h3>
             <p className="text-xs font-bold text-[#8e8e8e] uppercase tracking-widest">LittleHaven Stories</p>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {[
            { img: 'https://images.unsplash.com/photo-1519233073523-636270123ca8', label: 'Playtime Fun' },
            { img: 'https://images.unsplash.com/photo-1522771917743-289b5fe68635', label: 'Cozy Newborn' },
            { img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7', label: 'School Ready' },
            { img: 'https://images.unsplash.com/photo-1531644319108-55a641d88c29', label: 'Montessori Life' },
            { img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4', label: 'Feeding Time' },
          ].map((reel, i) => (
             <motion.div 
               key={i} 
               whileHover={{ y: -10 }}
               className="flex-shrink-0 w-64 aspect-[9/16] rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-lg border-2 border-white"
             >
                <img src={reel.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-10 left-6 right-6">
                   <p className="text-white font-black text-xl mb-2">{reel.label}</p>
                   <div className="flex items-center text-white/80 text-xs font-bold">
                      <Heart className="w-4 h-4 mr-1 text-pink-400 fill-current" /> 1.2k likes
                   </div>
                </div>
                {/* Play Button Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                   </div>
                </div>
             </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#f06292] font-bold text-sm uppercase tracking-widest">Hot Pick</span>
            <h2 className="text-4xl font-black text-[#1a1a1a] mt-2 tracking-tight">Trending Items</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold text-[#f06292] flex items-center hover:underline">
            View All Store <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#f06292]/5 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Why Parents Trust Us</h2>
            <p className="text-[#4a4a4a] mt-4 max-w-xl mx-auto">Providing quality items specifically curated for Pakistani families.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { icon: <Truck className="w-10 h-10 text-[#f06292]" />, title: 'Fast Delivery', desc: 'Ships within 24-48 hours across Pakistan' },
              { icon: <ShieldCheck className="w-10 h-10 text-blue-500" />, title: 'Premium Quality', desc: 'Hand-picked products from verified sources' },
              { icon: <ShoppingBag className="w-10 h-10 text-orange-500" />, title: 'Easy COD', desc: 'Pay Cash on Delivery at your doorstep' },
              { icon: <Heart className="w-10 h-10 text-red-500" />, title: 'Loved by Kind', desc: 'Ensuring smiles for your little ones' },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#f5f2ed] hover:shadow-md transition-shadow">
                <div className="mb-6">{f.icon}</div>
                <h4 className="text-lg font-bold text-[#1a1a1a] mb-2">{f.title}</h4>
                <p className="text-sm text-[#4a4a4a] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 text-center bg-[#f06292] text-white p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
        <h2 className="text-4xl font-black mb-6">Join our little community!</h2>
        <p className="opacity-80 mb-10 max-w-lg mx-auto">Get exclusive discounts, early access to new collections, and parenting tips right in your inbox.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
          <input 
            type="email" 
            placeholder="Your Email Address" 
            className="flex-grow px-6 py-4 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm placeholder:text-white/60 focus:bg-white focus:text-[#1a1a1a] transition-all outline-none font-medium"
          />
          <button className="px-8 py-4 bg-white text-[#f06292] font-black rounded-2xl hover:bg-pink-50 hover:scale-105 active:scale-95 transition-all shadow-xl">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
