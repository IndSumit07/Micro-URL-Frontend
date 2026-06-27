import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Zap, Globe, TrendingUp, Shield, ArrowUpRight } from 'lucide-react';
import usePublicStats from '../../hooks/usePublicStats';

// ─── Animated number (count-up) ──────────────────────────────────────────────
function useCountUp(target, duration = 1600, active = false) {
  const [value, setValue] = useState(0);
  const frame = useRef(null);
  const start = useRef(null);
  const prev  = useRef(0);

  useEffect(() => {
    if (!active || target === 0) return;
    const from = prev.current;
    start.current = null;
    const step = (ts) => {
      if (!start.current) start.current = ts;
      const p = Math.min((ts - start.current) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * e));
      if (p < 1) frame.current = requestAnimationFrame(step);
      else prev.current = target;
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, [target, active, duration]);

  return value;
}

// ─── Magnetic hover card ─────────────────────────────────────────────────────
const MagneticCard = ({ children, className = '' }) => {
  const ref  = useRef(null);
  const x    = useMotionValue(0);
  const y    = useMotionValue(0);
  const sx   = useSpring(x, { stiffness: 200, damping: 20 });
  const sy   = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width  / 2) * 0.08);
    y.set((e.clientY - rect.top  - rect.height / 2) * 0.08);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Scrolling quote ticker ───────────────────────────────────────────────────
const quotes = [
  'no cap — fastest redirects on the internet',
  'it\'s giving enterprise-grade performance',
  'lowkey built different from the rest',
  'not gonna lie — your links deserve better',
  'main character analytics, zero fluff',
  'hyper-optimized performance, no gatekeeping',
  'effortless link management, total main character energy',
  'built for scale, strictly high-key performance',
];

const Ticker = () => (
  <div className="relative overflow-hidden py-3 border-y border-white/5">
    {/* Fade edges */}
    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    <motion.div
      className="flex gap-10 whitespace-nowrap"
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
    >
      {[...quotes, ...quotes].map((q, i) => (
        <span key={i} className="text-[11px] font-display font-bold tracking-[0.15em] text-muted uppercase flex items-center gap-3">
          <span className="text-primary">◆</span>
          {q}
        </span>
      ))}
    </motion.div>
  </div>
);

// ─── Big Quote Card ───────────────────────────────────────────────────────────
const words = ['Lowkey', 'Unmatched.', 'Literally', 'Different.'];

const QuoteCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="relative md:col-span-2 rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] p-8 md:p-10 flex flex-col justify-between min-h-[220px] group cursor-default"
    >
      {/* animated gradient orb */}
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/20 blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-primary/10 blur-[60px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* top label */}
      <span className="relative z-10 text-[10px] font-display font-black tracking-[0.35em] uppercase text-primary mb-6">
        Platform Stats — No Cap
      </span>

      {/* staggered words */}
      <h2 className="relative z-10 font-display text-5xl md:text-7xl font-black leading-none tracking-tighter text-white">
        {words.map((w, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: -60 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-block mr-4 ${i % 2 === 1 ? 'text-gradient' : ''}`}
          >
            {w}
          </motion.span>
        ))}
      </h2>

      {/* bottom tag line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="relative z-10 text-sm text-muted mt-6 max-w-xs"
      >
        Real numbers, zero fluff. Your links perform. We prove it.
      </motion.p>
    </motion.div>
  );
};

// ─── Single stat card ─────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, format, label, accent, index, isInView, isLoading }) => {
  const counted = useCountUp(value, 1600, isInView && !isLoading);
  const display = isLoading
    ? null
    : format(counted, value);

  return (
    <MagneticCard>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-7 overflow-hidden h-full flex flex-col justify-between group hover:border-white/10 transition-all duration-500 cursor-default"
      >
        {/* hover glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
          style={{ background: `radial-gradient(circle at 30% 30%, ${accent}15 0%, transparent 65%)` }}
        />

        {/* top row */}
        <div className="flex items-start justify-between mb-8 relative z-10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
            style={{ background: `${accent}15`, borderColor: `${accent}30` }}
          >
            <Icon className="w-4 h-4" style={{ color: accent }} />
          </div>
          <ArrowUpRight
            className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
          />
        </div>

        {/* value */}
        <div className="relative z-10">
          {isLoading ? (
            <div className="w-20 h-10 rounded-xl bg-white/5 animate-pulse mb-2" />
          ) : (
            <motion.p
              className="font-display text-4xl font-black tracking-tighter text-white mb-1.5 group-hover:text-primary transition-colors duration-300"
              style={{ '--accent': accent }}
            >
              {display}
            </motion.p>
          )}
          <p className="text-[12px] font-medium text-muted tracking-wide">{label}</p>
        </div>

        {/* bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
        />
      </motion.div>
    </MagneticCard>
  );
};

// ─── Vibe card (purely aesthetic Gen Z card) ──────────────────────────────────
const vibes = [
  { tag: '01', text: 'Faster than your last deployment' },
  { tag: '02', text: 'Lowkey the cleanest analytics you\'ve seen' },
  { tag: '03', text: 'Built different. Not up for debate.' },
];

const VibeCard = ({ isInView }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % vibes.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="relative rounded-3xl border border-primary/20 bg-primary/5 p-7 overflow-hidden flex flex-col justify-between min-h-[160px] cursor-default group"
    >
      {/* pulsing bg */}
      <motion.div
        className="absolute inset-0 bg-primary/5 pointer-events-none"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <span className="text-[10px] font-display font-black tracking-[0.35em] uppercase text-primary relative z-10">
        Vibe Check
      </span>

      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="relative z-10"
        >
          <p className="text-[10px] font-display font-black tracking-[0.3em] uppercase text-primary/50 mb-2">{vibes[idx].tag}</p>
          <p className="text-sm font-semibold text-white leading-snug">{vibes[idx].text}</p>
        </motion.div>
      </AnimatePresence>

      {/* progress dots */}
      <div className="flex gap-1.5 relative z-10 mt-4">
        {vibes.map((_, i) => (
          <motion.div
            key={i}
            animate={{ width: i === idx ? 20 : 6, opacity: i === idx ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full bg-primary"
          />
        ))}
      </div>
    </motion.div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { stats, loading } = usePublicStats();

  const statDefs = [
    {
      icon: TrendingUp,
      value: stats?.totalClicks ?? 0,
      format: (v) => {
        if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M+`;
        if (v >= 1_000)     return `${(v / 1_000).toFixed(1)}K+`;
        return `${v}+`;
      },
      label: 'Total Clicks Tracked',
      accent: '#ff0033',
    },
    {
      icon: Zap,
      value: stats?.avgRedirectMs ?? 0,
      format: (v, raw) => raw == null && !loading ? '<120ms' : `${v}ms`,
      label: 'Avg Redirect Speed',
      accent: '#f59e0b',
    },
    {
      icon: Shield,
      value: stats?.activeLinks ?? 0,
      format: (v) => `${v}+`,
      label: 'Active Short Links',
      accent: '#10b981',
    },
    {
      icon: Globe,
      value: 99,
      format: () => '99.9%',
      label: 'Platform Uptime',
      accent: '#6366f1',
    },
  ];

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* section top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto space-y-4">

        {/* ── Row 1: Quote card + first stat ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuoteCard />
          <StatCard {...statDefs[0]} index={0} isInView={isInView} isLoading={loading} />
        </div>

        {/* ── Row 2: Stats + Vibe card ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {statDefs.slice(1).map((s, i) => (
            <StatCard key={s.label} {...s} index={i + 1} isInView={isInView} isLoading={loading} />
          ))}
          <VibeCard isInView={isInView} />
        </div>

        {/* ── Ticker strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="rounded-2xl overflow-hidden border border-white/5"
        >
          <Ticker />
        </motion.div>

        {/* live badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-2 pt-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[11px] text-muted">Live data · refreshes every 30s</span>
        </motion.div>

      </div>
    </section>
  );
};

export default StatsSection;
