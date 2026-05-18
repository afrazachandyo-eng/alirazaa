import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, Truck, RefreshCcw } from 'lucide-react';

interface PolicyPageProps {
  type: 'Shipping' | 'Returns' | 'Privacy' | 'Terms';
}

const PolicyPage: React.FC<PolicyPageProps> = ({ type }) => {
  const content = {
    Shipping: {
      icon: <Truck className="w-12 h-12 text-blue-500" />,
      title: "Shipping & Delivery Policy",
      sections: [
        { h: "Domestic Delivery (Pakistan)", p: "We deliver across all major cities and rural areas in Pakistan. Standard delivery time is 3-7 business days depending on your location." },
        { h: "Shipping Charges", p: "Free delivery on all orders above PKR 3,000. For orders below this amount, a flat shipping fee of PKR 250 applies." },
        { h: "Order Tracking", p: "Once your order is shipped, you will receive a tracking ID via SMS and WhatsApp to monitor your package journey." }
      ]
    },
    Returns: {
      icon: <RefreshCcw className="w-12 h-12 text-[#f06292]" />,
      title: "Returns & Exchanges",
      sections: [
        { h: "7-Day Exchange Window", p: "If you receive a faulty product, wrong size, or incorrect item, you can request an exchange within 7 days of delivery." },
        { h: "Condition of Item", p: "Items must be unused, in their original packaging, and with tags attached to be eligible for exchange." },
        { h: "Process", p: "Contact our WhatsApp support with your order number and photos of the item. We will arrange a reverse pickup if applicable." }
      ]
    },
    Privacy: {
      icon: <ShieldCheck className="w-12 h-12 text-green-500" />,
      title: "Privacy Policy",
      sections: [
        { h: "Data Collection", p: "We collect only necessary information like name, phone number, and address to fulfill your orders." },
        { h: "Data Protection", p: "Your personal data is encrypted and never shared with third parties for marketing purposes." },
        { h: "Cookies", p: "We use basic cookies to improve your shopping experience and remember your cart." }
      ]
    },
    Terms: {
      icon: <FileText className="w-12 h-12 text-gray-500" />,
      title: "Terms & Conditions",
      sections: [
        { h: "Orders", p: "By placing an order, you agree to provide accurate information and accept our delivery terms." },
        { h: "Pricing", p: "We reserve the right to change prices without prior notice due to fluctuations in sourcing costs." },
        { h: "Liability", p: "LittleHaven is a bridge between global sourcing and local families. We ensure quality, but specific product usage is the responsibility of the caregiver." }
      ]
    }
  };

  const active = content[type];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 pb-32">
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="text-center mb-20"
       >
          <div className="flex justify-center mb-6">{active.icon}</div>
          <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">{active.title}</h1>
          <p className="text-[#8e8e8e] mt-4 uppercase text-xs font-bold tracking-widest leading-loose">Effective Date: June 2024 • LittleHaven Pakistan</p>
       </motion.div>

       <div className="space-y-12">
          {active.sections.map((section, idx) => (
             <div key={idx} className="bg-white p-10 rounded-[3rem] border border-[#f5f2ed] shadow-sm">
                <h3 className="text-xl font-black text-[#1a1a1a] mb-6">{section.h}</h3>
                <p className="text-[#4a4a4a] leading-loose">{section.p}</p>
             </div>
          ))}
       </div>

       <div className="mt-20 p-8 pt-0 border-t border-[#f5f2ed] text-center">
          <p className="text-sm text-[#8e8e8e] mb-2 font-medium italic">Have more questions about our policies?</p>
          <div className="flex justify-center gap-4">
             <a href="https://wa.me/923012345678" className="text-[#f06292] font-black hover:underline underline-offset-4">Chat with Support</a>
             <span className="text-[#eee]">|</span>
             <a href="mailto:legal@littlehaven.pk" className="text-[#f06292] font-black hover:underline underline-offset-4">Email Legal</a>
          </div>
       </div>
    </div>
  );
};

export default PolicyPage;
