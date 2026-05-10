import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const badgeStyles = {
  'Best Seller': 'bg-amber-500 text-white',
  'New': 'bg-emerald-500 text-white',
  'Sale': 'bg-red-500 text-white',
  'Out of Stock': 'bg-gray-400 text-white',
};

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Link to={`/product/${product.id}`} className="block group">
        <div className="relative rounded-2xl overflow-hidden bg-secondary aspect-square mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className={cn('absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full', badgeStyles[product.badge] || 'bg-primary text-white')}>
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-transform active:scale-90"
          >
            <Heart className={cn('w-4 h-4 transition-colors', wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600')} />
          </button>
          {product.inStock && (
            <button
              onClick={(e) => { e.preventDefault(); addToCart(product); }}
              className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">{product.category}</p>
          <p className="text-sm font-semibold leading-tight truncate">{product.name}</p>
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs text-muted-foreground">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}