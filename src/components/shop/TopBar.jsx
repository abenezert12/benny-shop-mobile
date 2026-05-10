import { Link } from 'react-router-dom';
import { Sun, Moon, Bell } from 'lucide-react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopBar({ title, right }) {
  const { darkMode, setDarkMode } = useStore();

  return (
    <div className="sticky top-0 z-40 bg-card/90 backdrop-blur-xl border-b border-border px-4 py-3 flex items-center justify-between">
      {title ? (
        <h1 className="text-lg font-bold tracking-tight">{title}</h1>
      ) : (
        <Link to="/" className="text-xl font-black tracking-tighter text-foreground">BENNY</Link>
      )}
      <div className="flex items-center gap-2">
        {right}
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setDarkMode((prev) => !prev)}
          className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={darkMode ? 'dark' : 'light'}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.div>
          </AnimatePresence>
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center bg-secondary text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>
      </div>
    </div>
  );
}