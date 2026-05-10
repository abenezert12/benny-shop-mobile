import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import ProductCard from '@/components/shop/ProductCard';
import TopBar from '@/components/shop/TopBar';

export default function Shop() {
  const urlParams = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(urlParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('default');
  const [showSort, setShowSort] = useState(false);

  const categories = ['All', ...CATEGORIES];

  const filtered = useMemo(() => {
    let result = PRODUCTS;
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [activeCategory, search, sortBy]);

  const sortLabels = { default: 'Sort', 'price-asc': 'Price ↑', 'price-desc': 'Price ↓', rating: 'Top Rated' };

  return (
    <div>
      <TopBar title="Collection" />
      <div className="px-4 pt-4 space-y-4">
        {/* Search */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-secondary text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-secondary text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {sortLabels[sortBy]}
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute right-0 top-full mt-2 bg-card rounded-2xl border border-border shadow-xl z-50 min-w-[140px] overflow-hidden"
                >
                  {Object.entries(sortLabels).map(([k, v]) => (
                    <button
                      key={k}
                      onClick={() => { setSortBy(k); setShowSort(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent transition-colors ${sortBy === k ? 'text-primary font-semibold' : ''}`}
                    >
                      {v}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${activeCategory === cat ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> results
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 pb-4">
          <AnimatePresence mode="wait">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-base font-semibold">No products found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}