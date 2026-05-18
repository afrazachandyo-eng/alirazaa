import React from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, Truck, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pb-32 overflow-hidden">
      {/* Hero */}
      <section className="relative pt-12 pb-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#f06292]/10 text-[#f06292] text-xs font-black uppercase tracking-widest mb-8"
          >
            Since 2024
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-[#1a1a1a] mb-10 leading-tight tracking-tight"
          >
            Redefining <span className="text-[#f06292]">Little</span> Moments in Pakistan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#4a4a4a] leading-relaxed max-w-2xl mx-auto"
          >
            LittleHaven started with a simple belief: every child in Pakistan deserves the best, and every parent deserves a trustworthy place to find it. We bridge the gap between premium global quality and local convenience.
          </motion.p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative z-10 border-8 border-white">
              <img src="https://images.unsplash.com/photo-1544126592-807daa2b565b?q=80&w=1200" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-100 rounded-[3rem] -z-10" />
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-blue-50 rounded-full -z-10 blur-2xl" />
          </div>
          
          <div className="space-y-10">
            <h2 className="text-4xl font-black text-[#1a1a1a] tracking-tight leading-tight">Hand-picked by Parents, <br /> For Parents.</h2>
            <p className="text-[#4a4a4a] leading-loose">
              Our journey began when we struggled to find reliable, high-quality baby essentials that weren't overpriced. We realized that many Pakistani parents were looking for the same: premium items sourced globally but locally affordable.
            </p>
            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                 <h4 className="text-3xl font-black text-[#f06292]">50k+</h4>
                 <p className="text-xs font-bold text-[#8e8e8e] uppercase tracking-widest">Happy Little Customers</p>
               </div>
               <div className="space-y-2">
                 <h4 className="text-3xl font-black text-[#f06292]">100%</h4>
                 <p className="text-xs font-bold text-[#8e8e8e] uppercase tracking-widest">Quality Verified</p>
               </div>
            </div>
            <div className="pt-6">
               <Link to="/shop" className="px-10 py-4 bg-[#1a1a1a] text-white rounded-2xl font-black shadow-xl hover:bg-[#f06292] transition-colors inline-block">
                 Start Your Journey
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f5f2ed] py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <ShieldCheck className="w-8 h-8" />, title: 'Uncompromising Safety', desc: 'Every toy and essential is BPA-free, non-toxic and tested for Pakistani safety standards.' },
                { icon: <Sparkles className="w-8 h-8" />, title: 'Curated Elegance', desc: 'We don\'t just sell products; we sell aesthetics that compliment your modern home.' },
                { icon: <Star className="w-8 h-8" />, title: 'Customer First', desc: 'Our dedicated WhatsApp support is available 7 days a week to help with your choices.' },
              ].map((v, i) => (
                <div key={i} className="text-center p-10 bg-white rounded-[3rem] border border-white shadow-sm hover:shadow-md transition-shadow">
                   <div className="w-16 h-16 bg-[#f06292]/10 text-[#f06292] rounded-3xl flex items-center justify-center mx-auto mb-8">
                      {v.icon}
                   </div>
                   <h3 className="text-xl font-black text-[#1a1a1a] mb-4">{v.title}</h3>
                   <p className="text-sm text-[#4a4a4a] leading-relaxed">{v.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
