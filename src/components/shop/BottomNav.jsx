import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, Heart, ShoppingBag, User } from 'lucide-react';
import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const nav = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/shop', icon: Grid3X3, label: 'Shop' },
  { path: '/wishlist', icon: Heart, label: 'Saved' },
  { path: '/cart', icon: ShoppingBag, label: 'Cart' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const { cartCount, wishlist } = useStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom">
      <div className="flex justify-around items-center px-2 py-2">
        {nav.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const badge = path === '/cart' ? cartCount : path === '/wishlist' ? wishlist.length : 0;

          return (
            <Link key={path} to={path} className="flex-1 flex flex-col items-center gap-0.5 py-1 relative group">
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 -m-2 rounded-xl bg-primary/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={cn('w-5 h-5 relative z-10 transition-colors', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} strokeWidth={isActive ? 2.5 : 1.8} />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center z-20">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </div>
              <span className={cn('text-[10px] font-medium transition-colors', isActive ? 'text-primary' : 'text-muted-foreground')}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}