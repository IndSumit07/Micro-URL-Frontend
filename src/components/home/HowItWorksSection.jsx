import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const steps = [
  {
    number: '01',
    title: 'Paste Your Long URL',
    description:
      'Drop any URL into the Micro-URL dashboard. Supports any protocol, deep links, UTM parameters — you name it.',
  },
  {
    number: '02',
    title: 'Get Your Short Link Instantly',
    description:
      'Our Redis pipeline generates a unique, collision-safe short code and persists it to Supabase in under 10ms.',
  },
  {
    number: '03',
    title: 'Share & Track in Real-Time',
    description:
      'Share your link anywhere. Watch clicks, referrers, geo data, and device breakdown update live on your dashboard.',
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section ref={ref} id="how-it-works" className="relative py-28 px-6 overflow-hidden">
      {/* Horizontal separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-display font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-gradient tracking-tight uppercase mb-5">
            Up & Running in 60 Seconds
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            No complex setup, no steep learning curve. Three steps to powerful link analytics.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-16 left-[16.66%] right-[16.66%] h-px hidden md:block">
            <div className="h-full bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30" />
            {/* Dot 1 */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
            {/* Dot 2 */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary" />
            {/* Dot 3 */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative group text-center"
            >
              {/* Step number circle */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/30 bg-primary/5 mb-8 mx-auto group-hover:border-primary group-hover:bg-primary/15 transition-all duration-400">
                <span className="font-display text-lg font-black text-primary">{step.number}</span>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping group-hover:border-primary/50" style={{ animationDuration: `${2 + i}s` }} />
              </div>

              <h3 className="font-display text-lg font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/register')}
            className="hero-button rounded-full px-8 py-3.5 flex items-center space-x-3 text-sm font-medium text-white group cursor-pointer"
          >
            <span>{isAuthenticated ? 'Open Dashboard' : 'Create Your First Link'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/70 group-hover:text-white" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
