import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import TopBar from '@/components/shop/TopBar';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();
  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <div>
      <TopBar title="My Cart" />
      <div className="px-4 pt-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-4">
              <ShoppingBag className="w-9 h-9 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6">Add items you love to your cart</p>
            <Link to="/shop" className="bg-primary text-primary-foreground text-sm font-bold px-6 py-3 rounded-2xl">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Free shipping banner */}
            {cartTotal < 100 && (
              <div className="bg-accent rounded-2xl px-4 py-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                <p className="text-xs text-accent-foreground">
                  Add <span className="font-bold">${(100 - cartTotal).toFixed(0)}</span> more for free shipping!
                </p>
              </div>
            )}

            {/* Items */}
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="flex gap-4 bg-card rounded-2xl p-3 border border-border"
                >
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-secondary" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <p className="text-sm font-semibold truncate mt-0.5">{item.name}</p>
                    <p className="text-base font-black mt-1">${item.price}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-secondary rounded-full px-2 py-1">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-full bg-card flex items-center justify-center text-sm font-bold">−</button>
                        <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-full bg-card flex items-center justify-center text-sm font-bold">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Summary */}
            <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
              <h3 className="text-sm font-bold">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className={shipping === 0 ? 'text-emerald-500 font-semibold' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-black text-base">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform">
              Checkout — ${total.toFixed(2)} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}