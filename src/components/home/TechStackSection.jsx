import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Tech stack logos as inline SVGs or text-based representations
const techStack = [
  { name: 'Redis', color: '#DC382D', desc: 'Ultra-fast caching' },
  { name: 'BullMQ', color: '#FF6B35', desc: 'Queue processing' },
  { name: 'Supabase', color: '#3ECF8E', desc: 'Database & Auth' },
  { name: 'Node.js', color: '#339933', desc: 'Runtime backend' },
  { name: 'React', color: '#61DAFB', desc: 'UI framework' },
  { name: 'Vite', color: '#BD34FE', desc: 'Build tooling' },
  { name: 'PostgreSQL', color: '#4169E1', desc: 'Data persistence' },
  { name: 'Vercel', color: '#ffffff', desc: 'Edge deployment' },
];

const TechStackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative py-16 px-6 overflow-hidden">
      {/* Section separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-[11px] font-display font-bold tracking-[0.3em] uppercase text-muted mb-10"
        >
          Powered By World-Class Technology
        </motion.p>

        {/* Scrolling marquee container */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex gap-4"
            style={{ animation: 'marquee 25s linear infinite' }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={i}
                className="shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 cursor-default group"
              >
                {/* Color dot indicator */}
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}60` }}
                />
                <span className="text-sm font-semibold text-white whitespace-nowrap">{tech.name}</span>
                <span className="text-[11px] text-muted whitespace-nowrap hidden group-hover:block">{tech.desc}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TechStackSection;
