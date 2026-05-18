import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/mockData';
import ProductCard from './ProductCard';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { motion } from 'motion/react';

interface AIRecommendationsProps {
  currentProductId?: string;
  category?: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ currentProductId, category }) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAIRecommendations = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/ai/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userContext: `User is viewing a ${category || 'general'} product. Product ID: ${currentProductId}`,
            products: PRODUCTS.map(p => ({ id: p.id, name: p.name, category: p.category }))
          })
        });
        
        const data = await response.json();
        if (data.recommendedIds) {
          const recommendedProducts = PRODUCTS.filter(p => data.recommendedIds.includes(p.id));
          setRecommendations(recommendedProducts);
        }
      } catch (err) {
        console.error("AI Recs Failed:", err);
        // Fallback to random products
        const fallback = PRODUCTS.filter(p => p.id !== currentProductId).slice(0, 3);
        setRecommendations(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchAIRecommendations();
  }, [currentProductId, category]);

  if (!loading && recommendations.length === 0) return null;

  return (
    <section className="py-16 bg-[#f06292]/5 rounded-[3rem] p-10 border border-[#f06292]/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-10 opacity-10">
         <BrainCircuit className="w-32 h-32 text-[#f06292]" />
      </div>
      
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-[#f06292] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-pink-100">
           <Sparkles className="w-5 h-5" />
        </div>
        <div>
           <h3 className="text-2xl font-black text-[#1a1a1a]">AI Smart Picks</h3>
           <p className="text-xs font-bold text-[#8e8e8e] uppercase tracking-widest">Personalized by LittleHaven AI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="aspect-[3/4] bg-white/50 animate-pulse rounded-2xl border border-[#eee]" />
          ))
        ) : (
          recommendations.map(p => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </section>
  );
};

export default AIRecommendations;
