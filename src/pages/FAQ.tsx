import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Plus, Minus, Search, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      q: "What is your delivery time within Pakistan?",
      a: "For major cities like Karachi, Lahore, and Islamabad, delivery usually takes 3-5 working days. For other regions, it may take up to 7 working days. All our premium items are shipped with tracked courier services."
    },
    {
      q: "Do you offer Cash on Delivery (COD)?",
      a: "Yes! We offer Cash on Delivery nationwide across Pakistan. You can pay the courier rider exactly the amount displayed on your order confirmation at your doorstep."
    },
    {
      q: "How do you source your products?",
      a: "We hand-pick the highest quality kids and baby items from trusted manufacturers in China, similar to the curation models like Markaz but with a premium LittleHaven touch. Each product undergoes a quality check before being listed."
    },
    {
      q: "What is your return and exchange policy?",
      a: "We offer a 7-day easy exchange policy if you receive a damaged product or the wrong size. Simply reach out to our WhatsApp support with your order ID and a photo of the item."
    },
    {
      q: "Are the toys safe for my children?",
      a: "Absolutely. Safety is our top priority. All our educational toys and essentials are made from non-toxic, BPA-free materials and meet international child safety standards."
    }
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 pb-32">
       <div className="text-center mb-16">
          <HelpCircle className="w-12 h-12 text-[#f06292] mx-auto mb-6" />
          <h1 className="text-4xl font-black text-[#1a1a1a] mb-4">How can we help?</h1>
          <p className="text-[#8e8e8e]">Got questions? We've got answers. If you can't find what you're looking for, reach out on WhatsApp.</p>
       </div>

       <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8e8e8e]" />
          <input 
            type="text" 
            placeholder="Search FAQs..." 
            className="w-full pl-16 pr-8 py-5 rounded-3xl bg-white border border-[#f5f2ed] shadow-sm outline-none focus:ring-2 ring-pink-50 font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
       </div>

       <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => (
             <div key={idx} className="bg-white rounded-3xl border border-[#f5f2ed] overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                   <span className="font-bold text-[#1a1a1a] group-hover:text-[#f06292] transition-colors">{faq.q}</span>
                   <div className={cn("p-2 rounded-xl transition-all", openIndex === idx ? "bg-[#f06292] text-white" : "bg-[#fdfbf7] text-[#8e8e8e]")}>
                      {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                   </div>
                </button>
                <AnimatePresence>
                   {openIndex === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                         <div className="p-8 pt-0 text-sm text-[#4a4a4a] leading-loose border-t border-[#fdfbf7] font-medium italic">
                            {faq.a}
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          ))}
       </div>

       <div className="mt-20 p-10 bg-[#1a1a1a] text-white rounded-[3rem] text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4">Still have questions?</h3>
            <p className="opacity-60 mb-8 max-w-sm mx-auto text-sm">Our team is available every day from 10 AM to 10 PM PKT.</p>
            <a href="https://wa.me/923012345678" className="px-10 py-4 bg-[#f06292] text-white rounded-2xl font-black inline-flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-pink-500/20">
               <MessageCircle className="w-6 h-6" /> Chat with us
            </a>
          </div>
       </div>
    </div>
  );
};

export default FAQ;
