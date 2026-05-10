import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, Star, ShoppingBag, Share2, Check, Truck, RotateCcw, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '@/lib/products';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/shop/ProductCard';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return <div className="p-8 text-center"><p>Product not found</p><Link to="/shop" className="text-primary">Back to shop</Link></div>;

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== id).slice(0, 4);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pb-6">
      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-square bg-secondary overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={product.images[activeImg]}
              alt={product.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Back btn */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center shadow"
        >
          <Heart className={cn('w-5 h-5 transition-colors', wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600')} />
        </button>

        {/* Thumbnail strip */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={cn('w-1.5 h-1.5 rounded-full transition-all', i === activeImg ? 'bg-primary w-4' : 'bg-white/60')}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="px-4 pt-5 space-y-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
              <h1 className="text-xl font-black leading-tight">{product.name}</h1>
            </div>
            <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('w-3.5 h-3.5', i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200')} />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-2xl font-black">${product.price}</span>
          {product.originalPrice && <span className="text-base text-muted-foreground line-through">${product.originalPrice}</span>}
          {product.badge === 'Sale' && (
            <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

        {/* Perks */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Truck, label: 'Free Shipping', sub: 'Over $100' },
            { icon: RotateCcw, label: '30-Day Returns', sub: 'Easy returns' },
            { icon: Shield, label: '2-yr Warranty', sub: 'Included' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="bg-secondary rounded-2xl p-3 text-center">
              <Icon className="w-4 h-4 mx-auto mb-1 text-primary" />
              <p className="text-[10px] font-semibold leading-tight">{label}</p>
              <p className="text-[9px] text-muted-foreground">{sub}</p>
            </div>
          ))}
        </div>

        {/* Qty + Cart */}
        <div className="flex gap-3 pt-2">
          <div className="flex items-center gap-2 bg-secondary rounded-2xl px-3 py-2">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-7 h-7 rounded-full bg-card flex items-center justify-center text-lg font-bold">−</button>
            <span className="w-6 text-center text-sm font-bold">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="w-7 h-7 rounded-full bg-card flex items-center justify-center text-lg font-bold">+</button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold transition-all duration-300',
              !product.inStock ? 'bg-muted text-muted-foreground cursor-not-allowed' :
              added ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 active:scale-[0.98]'
            )}
          >
            {added ? <><Check className="w-4 h-4" /> Added!</> : !product.inStock ? 'Out of Stock' : <><ShoppingBag className="w-4 h-4" /> Add to Cart — ${(product.price * qty).toFixed(0)}</>}
          </button>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="pt-4">
            <h3 className="text-base font-bold mb-3">You might also like</h3>
            <div className="grid grid-cols-2 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}