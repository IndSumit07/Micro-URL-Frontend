import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-8 mx-auto"
        >
          <Sparkles className="w-7 h-7 text-primary" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-black text-gradient tracking-tight uppercase mb-6"
        >
          Start Tracking Every Click
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Join thousands of teams that trust Micro-URL to power their link intelligence.
          Free to start. No credit card. Scale when you're ready.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
            className="hero-button rounded-full px-10 py-4 flex items-center gap-3 text-sm font-semibold text-white group cursor-pointer"
          >
            <span>{isAuthenticated ? 'Go to Dashboard' : 'Get Started for Free'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/70 group-hover:text-white" />
          </button>

          <button
            onClick={() => navigate('/login')}
            className="px-10 py-4 rounded-full border border-white/10 text-sm font-semibold text-muted hover:text-white hover:border-white/25 transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-xs text-muted"
        >
          {['No credit card required', '14-day free trial', '99.9% uptime SLA', 'Cancel anytime'].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span>{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
