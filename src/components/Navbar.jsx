import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Triangle, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center justify-between px-8 py-6 w-full max-w-[1400px] mx-auto absolute top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center cursor-pointer">
        <motion.div 
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.4 }}
          className="text-white"
        >
          <Triangle className="w-6 h-6 fill-white" />
        </motion.div>
      </div>
      
      <div className="hidden md:flex items-center space-x-10 text-[11px] font-display font-bold tracking-[0.2em] text-muted">
        <a href="#" className="hover:text-primary transition-colors uppercase">Pricing</a>
        <a href="#" className="hover:text-primary transition-colors uppercase">FAQ</a>
        <a href="#" className="hover:text-primary transition-colors uppercase">Terms</a>
        <a href="#" className="hover:text-primary transition-colors uppercase">Privacy</a>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full border border-white/10 hover:border-white/30 transition-all bg-white/5 backdrop-blur-md cursor-pointer hover:bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,0,51,0.2)] flex items-center justify-center overflow-hidden w-8 h-8"
          title="Toggle Theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: -10, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 10, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-white" />}
            </motion.div>
          </AnimatePresence>
        </button>
        <Link to={isAuthenticated ? "/dashboard" : "/login"}>
          <button className="p-2 rounded-full border border-white/10 hover:border-white/30 transition-all bg-white/5 backdrop-blur-md cursor-pointer hover:bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,0,51,0.2)]">
            <User className="w-4 h-4 text-white" />
          </button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
