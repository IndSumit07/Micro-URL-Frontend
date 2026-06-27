import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How fast is the redirect?',
    a: 'Our Redis-backed lookup typically resolves in under 5ms server-side. Combined with edge caching, end-to-end redirect time averages below 120ms globally — faster than a human blink.',
  },
  {
    q: 'How does real-time click tracking work?',
    a: 'Every click triggers a lightweight event that is immediately enqueued in BullMQ. Worker processes consume the queue and write aggregated analytics to Supabase PostgreSQL, making data available on your dashboard within seconds.',
  },
  {
    q: 'Can I use custom domains?',
    a: 'Yes — Enterprise plan subscribers can configure custom branded domains (e.g., go.yourbrand.com). We provide a simple CNAME setup guide and handle the TLS certificate automatically.',
  },
  {
    q: 'What happens if my short link gets millions of clicks?',
    a: "Micro-URL is architected for horizontal scale. Redis handles the hot lookup path, BullMQ queues absorb traffic spikes without data loss, and Supabase's PostgreSQL cluster handles analytical write throughput at enterprise volume.",
  },
  {
    q: 'Is my data secure?',
    a: 'All data is encrypted at rest and in transit. We use Supabase RLS policies to enforce row-level security, meaning you can only access your own links and analytics. We never sell or share your data.',
  },
  {
    q: 'Can I delete my links and data?',
    a: 'Absolutely. You have full ownership of your data. Delete individual links, bulk-delete campaigns, or permanently purge your account — all via the dashboard or API.',
  },
];

const FaqItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left py-5 px-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4"
      >
        <span className="text-sm font-medium text-white group-hover:text-primary transition-colors duration-300">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-muted" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 text-sm text-muted leading-relaxed border-x border-b border-white/5 rounded-b-xl bg-white/[0.01]">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="faq" className="relative py-28 px-6 overflow-hidden">
      {/* Separator top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary/30 to-transparent" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-display font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-gradient tracking-tight uppercase mb-5">
            Got Questions?
          </h2>
          <p className="text-muted text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            Here are the most common questions about Micro-URL. Don't see yours?{' '}
            <a href="mailto:support@microurl.dev" className="text-primary hover:underline">
              Reach out to us.
            </a>
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
