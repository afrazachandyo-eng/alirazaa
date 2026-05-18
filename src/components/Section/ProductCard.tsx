import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../store/CartContext';
import { formatPKR, cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f0f0f0] flex flex-col h-full"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-[#f06292] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">New</span>
          )}
          {product.isSale && (
            <span className="bg-[#ff9800] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Sale</span>
          )}
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={cn(
              "p-3 rounded-full shadow-lg transition-all hover:scale-110",
              inWishlist ? "bg-[#f06292] text-white" : "bg-white text-[#1a1a1a]"
            )}
          >
            <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="p-3 bg-white text-[#1a1a1a] rounded-full shadow-lg hover:scale-110 transition-all"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-[#8e8e8e] uppercase tracking-widest font-bold font-mono">
            {product.category.replace('-', ' ')}
          </span>
          <div className="flex items-center text-[#ff9800]">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-[10px] ml-1 font-bold">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="hover:text-[#f06292] transition-colors">
          <h3 className="font-bold text-[#1a1a1a] line-clamp-1 mb-2">{product.name}</h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-[#f06292]">{formatPKR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#8e8e8e] line-through">{formatPKR(product.originalPrice)}</span>
            )}
          </div>
          
          <button 
            onClick={() => addToCart(product, 1)}
            className="p-2.5 bg-[#f5f2ed] text-[#4a4a4a] rounded-xl hover:bg-[#f06292] hover:text-white transition-all transform active:scale-95"
            title="Quick add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
