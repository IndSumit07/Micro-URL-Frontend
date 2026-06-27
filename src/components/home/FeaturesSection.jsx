import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link2, BarChart2, Clock, MousePointerClick, Globe, Layers } from 'lucide-react';

const features = [
  {
    icon: Link2,
    title: 'Instant Short Links',
    description:
      'Generate branded, memorable short URLs in milliseconds. Our Redis-powered pipeline ensures zero-latency link creation at any scale.',
    tag: 'Core',
    gradient: 'from-red-500/20 to-transparent',
  },
  {
    icon: BarChart2,
    title: 'Real-Time Analytics',
    description:
      'Watch your clicks pour in live. Every event is streamed via BullMQ workers and aggregated in Supabase for instant dashboard updates.',
    tag: 'Analytics',
    gradient: 'from-orange-500/20 to-transparent',
  },
  {
    icon: Clock,
    title: 'Sub-120ms Redirects',
    description:
      'Micro-URL uses edge-cached Redis lookups to redirect users before they even blink. Performance is never compromised, ever.',
    tag: 'Speed',
    gradient: 'from-yellow-500/20 to-transparent',
  },
  {
    icon: MousePointerClick,
    title: 'Click Heatmaps',
    description:
      'Understand where your audience interacts most. Visualize click clusters across time zones, devices, and geographic regions.',
    tag: 'Insights',
    gradient: 'from-pink-500/20 to-transparent',
  },
  {
    icon: Globe,
    title: 'Geo & Device Tracking',
    description:
      'Know your audience by location, browser, OS, and device. Build campaigns backed by rich demographic intelligence.',
    tag: 'Targeting',
    gradient: 'from-purple-500/20 to-transparent',
  },
  {
    icon: Layers,
    title: 'Enterprise Architecture',
    description:
      'Built on a battle-tested stack: Node.js + BullMQ queues, Redis clusters, and a Supabase PostgreSQL backbone that scales horizontally.',
    tag: 'Infrastructure',
    gradient: 'from-blue-500/20 to-transparent',
  },
];

const FeatureCard = ({ feature, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative h-full p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
        {/* Radial gradient glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
        />

        {/* Inner top border accent */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        <span className="relative z-10 inline-block text-[10px] font-display font-bold tracking-[0.25em] uppercase text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6">
          {feature.tag}
        </span>

        {/* Icon */}
        <div className="relative z-10 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
          <feature.icon className="w-5 h-5 text-white group-hover:text-primary transition-colors duration-300" />
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-lg font-semibold text-white mb-3 font-display tracking-tight group-hover:text-primary transition-colors duration-300">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-sm text-muted leading-relaxed">
          {feature.description}
        </p>

        {/* Bottom right corner accent */}
        <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="features" className="relative py-28 px-6 overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-display font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
            Platform Features
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-gradient tracking-tight uppercase mb-5">
            Everything You Need
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            From link creation to enterprise-grade analytics — Micro-URL gives you the complete toolkit
            to understand, optimize, and scale your digital presence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
