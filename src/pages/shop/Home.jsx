import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import ProductCard from '@/components/shop/ProductCard';
import TopBar from '@/components/shop/TopBar';
import { useAuth } from '@/lib/AuthContext';

const categoryImages = {
  Electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80',
  Clothing: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
  Accessories: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
  Shoes: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=80',
};

export default function Home() {
  const featured = PRODUCTS.filter(p => ['e1', 'c3', 'e6', 'a3'].includes(p.id));
  const newArrivals = PRODUCTS.filter(p => p.badge === 'New');

  return (
    <div>
      <TopBar />
      <div className="px-4 pt-5 space-y-8 pb-4">

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl overflow-hidden h-52"
        >
          <img
            src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=800&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-end p-6">
            <span className="text-xs font-semibold text-white/70 uppercase tracking-widest mb-1">New Season</span>
            <h2 className="text-2xl font-black text-white leading-tight mb-3">Elevate Your<br />Everyday</h2>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white text-black text-xs font-bold px-4 py-2 rounded-full w-fit hover:bg-white/90 transition-colors">
              Shop Now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        {/* Search Bar */}
        <Link to="/shop" className="flex items-center gap-3 bg-secondary rounded-2xl px-4 py-3">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search products...</span>
        </Link>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">Shop by Category</h2>
            <Link to="/shop" className="text-xs text-primary font-semibold flex items-center gap-1">
              All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link to={`/shop?category=${cat}`} className="flex flex-col items-center gap-2 group">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-secondary">
                    <img src={categoryImages[cat]} alt={cat} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="text-[11px] font-medium text-center leading-tight">{cat}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h2 className="text-base font-bold">Featured</h2>
            </div>
            <Link to="/shop" className="text-xs text-primary font-semibold flex items-center gap-1">
              See All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold">New Arrivals</h2>
              <Link to="/shop?category=New" className="text-xs text-primary font-semibold flex items-center gap-1">
                See All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {newArrivals.map((p, i) => (
                <div key={p.id} className="w-40 shrink-0">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brand Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden h-40"
        >
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" alt="Brand" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
            <p className="text-white text-base font-black leading-tight">Crafted with intention.<br />Built to last.</p>
            <Link to="/shop" className="mt-3 text-xs font-semibold text-white border border-white/50 rounded-full px-4 py-1.5 hover:bg-white/10 transition-colors">
              Discover our process
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}