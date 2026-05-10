import { User, ShoppingBag, Heart, Moon, Sun, Bell, ChevronRight, LogOut, Package, MapPin, CreditCard, HelpCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { apiClient } from '@/api/apiClient';
import TopBar from '@/components/shop/TopBar';
import { useAuth } from '@/lib/AuthContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Package, label: 'My Orders', sub: 'Track your orders', color: 'bg-blue-50 text-blue-500' },
  { icon: MapPin, label: 'Saved Addresses', sub: 'Manage delivery addresses', color: 'bg-emerald-50 text-emerald-500' },
  { icon: CreditCard, label: 'Payment Methods', sub: 'Cards & wallets', color: 'bg-purple-50 text-purple-500' },
  { icon: Bell, label: 'Notifications', sub: 'Manage alerts', color: 'bg-amber-50 text-amber-500' },
  { icon: HelpCircle, label: 'Help & Support', sub: 'FAQs, contact us', color: 'bg-pink-50 text-pink-500' },
];

export default function Profile() {
  const { darkMode, setDarkMode, cart, wishlist, cartTotal } = useStore();
  const { user } = useAuth();

  return (
    <div>
      <TopBar title="Profile" />
      <div className="px-4 pt-5 space-y-5 pb-4">

        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-3xl border border-border p-5 flex items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            {user?.full_name ? (
              <span className="text-2xl font-black text-primary">{user.full_name[0].toUpperCase()}</span>
            ) : (
              <User className="w-7 h-7 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-base font-bold">{user?.full_name || 'Guest User'}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{user?.email || 'Not signed in'}</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">VIP Member</span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Cart Items', value: cart.length, icon: ShoppingBag, color: 'text-primary' },
            { label: 'Saved', value: wishlist.length, icon: Heart, color: 'text-red-500' },
            { label: 'Spent', value: `$${cartTotal.toFixed(0)}`, icon: CreditCard, color: 'text-emerald-500' },
          ].map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="bg-card rounded-2xl border border-border p-4 text-center"
            >
              <Icon className={cn('w-5 h-5 mx-auto mb-1', color)} />
              <p className="text-lg font-black">{value}</p>
              <p className="text-[10px] text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <div className="bg-card rounded-2xl border border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
              {darkMode ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </div>
            <div>
              <p className="text-sm font-semibold">Dark Mode</p>
              <p className="text-xs text-muted-foreground">{darkMode ? 'Currently on' : 'Currently off'}</p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={cn('w-12 h-6 rounded-full transition-colors relative', darkMode ? 'bg-primary' : 'bg-muted')}
          >
            <div className={cn('w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform', darkMode ? 'translate-x-6' : 'translate-x-0.5')} />
          </button>
        </div>

        {/* Menu */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {menuItems.map(({ icon: Icon, label, sub, color }, i) => (
            <motion.button
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              className={cn('w-full flex items-center gap-3 p-4 hover:bg-accent/30 transition-colors text-left', i < menuItems.length - 1 && 'border-b border-border')}
            >
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', color)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={() => apiClient.auth.logout()}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-border text-sm font-semibold text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}