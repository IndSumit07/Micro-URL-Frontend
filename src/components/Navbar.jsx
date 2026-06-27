import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Triangle, Sun, Moon, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Features',     href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ',          href: '#faq' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex items-center justify-between px-8 py-6 w-full max-w-[1400px] mx-auto absolute top-0 left-0 right-0 z-50"
    >
      {/* Logo + Brand */}
      <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.4 }}>
          <Triangle className="w-5 h-5 fill-white" />
        </motion.div>
        <span className="font-display text-[11px] font-black tracking-[0.25em] uppercase text-white">
          Micro-URL
        </span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center space-x-8 text-[11px] font-display font-bold tracking-[0.2em] text-muted">
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className="hover:text-primary transition-colors duration-200 uppercase relative group"
          >
            {label}
            {/* Underline micro-animation */}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center space-x-3">
        {/* Theme toggle */}
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
              {theme === 'dark'
                ? <Sun className="w-4 h-4 text-white" />
                : <Moon className="w-4 h-4 text-white" />
              }
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Get Started / Dashboard CTA */}
        <button
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
          className="hidden sm:flex items-center gap-2 hero-button rounded-full px-5 py-2 text-[11px] font-display font-bold tracking-[0.15em] uppercase text-white group cursor-pointer"
        >
          <span>{isAuthenticated ? 'Dashboard' : 'Get Started'}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-white/70 group-hover:text-white" />
        </button>

        {/* User icon */}
        <Link to={isAuthenticated ? '/dashboard' : '/login'}>
          <button className="p-2 rounded-full border border-white/10 hover:border-white/30 transition-all bg-white/5 backdrop-blur-md cursor-pointer hover:bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,0,51,0.2)]">
            <User className="w-4 h-4 text-white" />
          </button>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
