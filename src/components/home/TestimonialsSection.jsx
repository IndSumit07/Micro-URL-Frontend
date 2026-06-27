import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      '"Micro-URL replaced three separate tools we were using. The real-time analytics alone saved us hours of reporting every week."',
    name: 'Sophia Reeves',
    role: 'Head of Growth · Vercel',
    avatar: 'https://i.pravatar.cc/100?img=47',
    stars: 5,
  },
  {
    quote:
      '"I was skeptical about another URL shortener, but the sub-120ms redirects are genuinely impressive. Our ad campaigns saw a 12% conversion lift."',
    name: 'Marcus Chen',
    role: 'Performance Engineer · Shopify',
    avatar: 'https://i.pravatar.cc/100?img=33',
    stars: 5,
  },
  {
    quote:
      '"The BullMQ architecture means even during our product launch spike of 400K clicks, nothing dropped. Absolute reliability."',
    name: 'Amara Osei',
    role: 'CTO · Launchpad Labs',
    avatar: 'https://i.pravatar.cc/100?img=56',
    stars: 5,
  },
  {
    quote:
      '"Geo tracking is surprisingly detailed. We now tailor our campaigns by region based on click-density data from Micro-URL."',
    name: 'Lena Kovač',
    role: 'Digital Marketing Lead · N26',
    avatar: 'https://i.pravatar.cc/100?img=23',
    stars: 5,
  },
  {
    quote:
      '"Setup took under 5 minutes. The dashboard is clean, fast, and the analytics update in real-time. Just what we needed."',
    name: 'James Okafor',
    role: 'Founder · MedLink Africa',
    avatar: 'https://i.pravatar.cc/100?img=12',
    stars: 5,
  },
  {
    quote:
      '"Pricing is fair and transparent. I moved from bit.ly and haven\'t looked back. The data retention on the Pro plan is exactly what our compliance team needed."',
    name: 'Priya Nair',
    role: 'Data Analyst · Razorpay',
    avatar: 'https://i.pravatar.cc/100?img=44',
    stars: 5,
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-0.5 mb-5">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-primary fill-primary" viewBox="0 0 20 20">
        <path d="M10 1l2.928 6.088L20 8.118l-5 4.977 1.18 7.024L10 16.902l-6.18 3.217L5 13.095 0 8.118l7.072-1.03z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ t, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative break-inside-avoid"
    >
      <div className="relative p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quote icon */}
        <div className="absolute top-5 right-5 text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
          <Quote className="w-8 h-8 fill-current" />
        </div>

        {/* Stars */}
        <StarRating count={t.stars} />

        {/* Quote text */}
        <p className="text-sm text-muted leading-relaxed mb-6 italic">
          {t.quote}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-10 h-10 rounded-full border border-white/10 object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-white">{t.name}</p>
            <p className="text-[11px] text-muted">{t.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-28 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-display font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-gradient tracking-tight uppercase mb-5">
            Loved By Builders
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of developers, marketers, and teams who rely on Micro-URL every day.
          </p>
        </motion.div>

        {/* Testimonial Grid — Masonry-like via columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
