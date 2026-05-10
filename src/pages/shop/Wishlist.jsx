import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/shop/ProductCard';
import TopBar from '@/components/shop/TopBar';

export default function Wishlist() {
  const { wishlist } = useStore();

  return (
    <div>
      <TopBar title="Saved Items" />
      <div className="px-4 pt-4">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-4">
              <Heart className="w-9 h-9 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold">No saved items yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6">Tap the ❤️ on any product to save it here</p>
            <Link to="/shop" className="bg-primary text-primary-foreground text-sm font-bold px-6 py-3 rounded-2xl">
              Browse Products
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-4">{wishlist.length} saved items</p>
            <div className="grid grid-cols-2 gap-4">
              <AnimatePresence>
                {wishlist.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}