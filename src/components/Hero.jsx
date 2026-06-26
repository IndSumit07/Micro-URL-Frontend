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
      {/* Background SVG Geometrics (Matches Image exactly) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Left Side Geometrics */}
        <div className="absolute top-[15%] -left-[500px] md:-left-[400px] lg:-left-[350px] w-[650px] h-[650px] bg-gradient-to-br from-[#000000] to-[#ff0033]/20 border-r-[3px] border-b-[3px] border-[#ff0033]/30 rounded-[32px] rotate-45 opacity-70" />
        <div className="absolute top-[25%] -left-[450px] md:-left-[350px] lg:-left-[300px] w-[550px] h-[550px] bg-gradient-to-br from-[#0a0000] via-[#220005] to-[#ff0033] border-r-[4px] border-b-[4px] border-[#ff0033] shadow-[0_0_150px_rgba(255,0,51,0.5),inset_0_0_50px_rgba(255,0,51,0.3)] rounded-[32px] rotate-45 opacity-100" />

        {/* Right Side Geometrics */}
        <div className="absolute top-[15%] -right-[500px] md:-right-[400px] lg:-right-[350px] w-[650px] h-[650px] bg-gradient-to-tl from-[#000000] to-[#ff0033]/20 border-t-[3px] border-l-[3px] border-[#ff0033]/30 rounded-[32px] rotate-45 opacity-70" />
        <div className="absolute top-[25%] -right-[450px] md:-right-[350px] lg:-right-[300px] w-[550px] h-[550px] bg-gradient-to-tl from-[#0a0000] via-[#220005] to-[#ff0033] border-t-[4px] border-l-[4px] border-[#ff0033] shadow-[0_0_150px_rgba(255,0,51,0.5),inset_0_0_50px_rgba(255,0,51,0.3)] rounded-[32px] rotate-45 opacity-100" />
      </div>

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
        className="w-full relative z-10 pb-20 flex justify-center"
      >
        {/* Deep red ambient glow behind the dashboard */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[500px] bg-gradient-to-b from-[#ff0033]/40 via-[#ff0033]/5 to-transparent blur-[100px] -z-10" />
        
        <DashboardMockup />
      </motion.div>

      {/* Bottom fade for Dashboard overlap to ensure it matches the cropped feel in the image */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default Hero;
