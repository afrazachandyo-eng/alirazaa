import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: "5 Tips for Choosing the Safest Toys for Your Toddler",
      excerpt: "Safety is every parent's top priority. Here's what to look for when shopping for your little one's new favorite playmate.",
      date: "May 15, 2024",
      author: "Dr. Sara Khan",
      image: "https://images.unsplash.com/photo-1519233073523-636270123ca8",
      category: "Parenting"
    },
    {
      id: 2,
      title: "Summer 2024 Fashion Guide for Kids in Pakistan",
      excerpt: "Discover the latest trends in breathable cotton and linen that will keep your children cool and stylish during the heatwave.",
      date: "May 10, 2024",
      author: "Hina Ahmed",
      image: "https://images.unsplash.com/photo-1544126592-807daa2b565b",
      category: "Fashion"
    },
    {
      id: 3,
      title: "The Importance of Montessori Learning at Home",
      excerpt: "How simple wooden blocks and educational toys can accelerate your child's cognitive development from age 2.",
      date: "May 02, 2024",
      author: "Education Expert",
      image: "https://images.unsplash.com/photo-1531644319108-55a641d88c29",
      category: "Education"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pb-32">
       <div className="text-center mb-24">
          <span className="text-[#f06292] font-black uppercase tracking-[0.2em] text-xs mb-4 inline-block">The Parent Hub</span>
          <h1 className="text-5xl font-black text-[#1a1a1a] tracking-tight">LittleHaven <span className="text-[#f06292]">Journal</span></h1>
          <p className="text-[#8e8e8e] mt-4 max-w-lg mx-auto">Expert advice, style guides, and stories for modern Pakistani parents.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((post, idx) => (
             <motion.article 
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="group flex flex-col h-full bg-white rounded-[3rem] border border-[#f5f2ed] overflow-hidden hover:shadow-xl transition-all"
             >
                <div className="aspect-video overflow-hidden">
                   <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                   <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-[#8e8e8e] uppercase tracking-widest">
                      <span className="inline-flex items-center text-[#f06292]"><Tag className="w-3 h-3 mr-1" /> {post.category}</span>
                      <span>{post.date}</span>
                   </div>
                   <h3 className="text-xl font-black text-[#1a1a1a] mb-4 group-hover:text-[#f06292] transition-colors leading-snug">
                      {post.title}
                   </h3>
                   <p className="text-sm text-[#4a4a4a] leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                   </p>
                   <div className="mt-auto pt-6 border-t border-[#f5f2ed] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-pink-100 rounded-full" />
                         <span className="text-[10px] font-bold text-[#1a1a1a]">{post.author}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="text-xs font-bold text-[#f06292] flex items-center hover:translate-x-1 transition-transform">
                         Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                   </div>
                </div>
             </motion.article>
          ))}
       </div>
    </div>
  );
};

export default Blog;
