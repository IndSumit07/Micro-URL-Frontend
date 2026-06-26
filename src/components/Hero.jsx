import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import DashboardMockup from './DashboardMockup';

const Hero = () => {
  return (
    <div className="relative min-h-screen pt-40 px-6 overflow-hidden flex flex-col items-center">
      {/* Background elements */}
      <div className="bg-shader"></div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="poly-left"></div>
      <div className="poly-right"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center"
      >
        {/* Badge */}
        <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm cursor-default hover:bg-white/10 transition-colors">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-5 h-5 rounded-full border border-black bg-white/20 flex items-center justify-center overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="text-xs text-gray-300 font-medium tracking-wide">40+ Positive Reviews</span>
        </div>

        {/* Headings */}
        <h2 className="font-display text-lg md:text-2xl text-muted font-bold mb-2 tracking-[0.2em] uppercase">
          Micro-URL Platform
        </h2>
        <h1 className="font-display text-4xl md:text-[68px] font-black text-gradient mb-6 tracking-tight leading-[1.1] uppercase">
          Track Every Click In Real-Time
        </h1>
        
        {/* Paragraph */}
        <p className="text-sm md:text-[15px] text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Create powerful short links instantly. Our enterprise-grade backend built with Redis, BullMQ, and Supabase processes massive click volumes seamlessly so you never miss critical analytics.
        </p>

        {/* CTA */}
        <button className="hero-button rounded-full px-8 py-3.5 flex items-center space-x-3 text-sm font-medium text-white group cursor-pointer">
          <span>Start Shortening Links</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white/70 group-hover:text-white" />
        </button>
      </motion.div>

      {/* Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 50 }}
        className="w-full relative z-10 pb-20"
      >
        <DashboardMockup />
      </motion.div>

      {/* Bottom fade for Dashboard overlap to ensure it matches the cropped feel in the image */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default Hero;
