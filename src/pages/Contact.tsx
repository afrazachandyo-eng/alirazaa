import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pb-32">
      <div className="max-w-3xl mb-24">
        <span className="text-[#f06292] font-black uppercase tracking-[0.2em] text-xs mb-6 inline-block">Get in touch</span>
        <h1 className="text-5xl md:text-7xl font-black text-[#1a1a1a] tracking-tight leading-tight">
          We're here to <br /> <span className="text-[#f06292]">Help You</span> smile.
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-12">
          <div>
            <h3 className="text-lg font-black text-[#1a1a1a] mb-8 border-b border-[#eee] pb-4">Our Hub</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-[#f06292] text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-100 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs font-bold text-[#8e8e8e] uppercase tracking-widest mb-1">Call Us</p>
                   <p className="text-lg font-black text-[#1a1a1a] underline decoration-[#f06292] decoration-2 underline-offset-4">021-34567890</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-100 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs font-bold text-[#8e8e8e] uppercase tracking-widest mb-1">WhatsApp</p>
                   <p className="text-lg font-black text-[#1a1a1a] underline decoration-green-500 decoration-2 underline-offset-4">+92 301 2345678</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-xs font-bold text-[#8e8e8e] uppercase tracking-widest mb-1">Email Us</p>
                   <p className="text-lg font-black text-[#1a1a1a] underline decoration-blue-500 decoration-2 underline-offset-4">hello@littlehaven.pk</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-[#1a1a1a] mb-8 border-b border-[#eee] pb-4">Social Presence</h3>
            <div className="flex items-center gap-4">
              {[<Instagram />, <Facebook />, <Twitter />].map((ico, idx) => (
                <button key={idx} className="p-4 bg-white rounded-2xl border border-[#eee] hover:bg-[#f06292] hover:text-white hover:border-[#f06292] transition-all shadow-sm">
                  {React.cloneElement(ico as React.ReactElement<any>, { className: "w-5 h-5" })}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-[#f5f2ed] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-[5rem] -z-0" />
            
            <h3 className="text-2xl font-black text-[#1a1a1a] mb-10 relative z-10">Send us a Message</h3>
            
            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#8e8e8e] ml-1">Your Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-[#fdfbf7] border-none outline-none focus:ring-2 ring-pink-100 font-bold" placeholder="Aliya Khan" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#8e8e8e] ml-1">Email / Phone</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-[#fdfbf7] border-none outline-none focus:ring-2 ring-pink-100 font-bold" placeholder="03XX XXXXXXX" />
                </div>
              </div>
              
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-[#8e8e8e] ml-1">Your Question</label>
                 <textarea className="w-full px-6 py-4 rounded-2xl bg-[#fdfbf7] border-none outline-none focus:ring-2 ring-pink-100 font-bold min-h-[150px]" placeholder="How can we help you today?" />
              </div>

              <button className="w-full py-5 bg-[#1a1a1a] text-white rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 hover:bg-[#f06292] transition-colors group">
                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <section className="mt-32">
         <div className="w-full h-[400px] bg-[#f5f2ed] rounded-[4rem] border border-[#eee] flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <div className="text-center group cursor-pointer">
               <MapPin className="w-12 h-12 text-[#f06292] mx-auto mb-4 group-hover:bounce" />
               <h4 className="text-xl font-black text-[#1a1a1a]">Visit our Warehouse Hub</h4>
               <p className="text-sm text-[#8e8e8e] mt-2">DHA Phase 6, Karachi, Pakistan</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Contact;
