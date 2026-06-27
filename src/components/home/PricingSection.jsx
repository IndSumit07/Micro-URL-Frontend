import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    tagline: 'Perfect for personal projects',
    price: { monthly: 0, annual: 0 },
    cta: 'Get Started Free',
    ctaVariant: 'outline',
    features: [
      '50 short links / month',
      'Basic click analytics',
      '7-day data retention',
      'Standard redirect speed',
      'Community support',
    ],
    highlight: false,
  },
  {
    name: 'Pro',
    tagline: 'For teams that move fast',
    price: { monthly: 12, annual: 9 },
    cta: 'Start Pro Trial',
    ctaVariant: 'primary',
    features: [
      'Unlimited short links',
      'Real-time analytics dashboard',
      '1-year data retention',
      'Redis-powered sub-120ms redirects',
      'Geo & device tracking',
      'BullMQ queue priority',
      'Email & Slack alerts',
      'Priority support',
    ],
    highlight: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    tagline: 'Scale without limits',
    price: { monthly: 49, annual: 39 },
    cta: 'Contact Sales',
    ctaVariant: 'outline',
    features: [
      'Everything in Pro',
      'Custom branded domains',
      'SSO / SAML authentication',
      'Dedicated Redis cluster',
      'Advanced heatmaps',
      'SLA 99.99% uptime',
      'Custom data retention',
      'Dedicated account manager',
      'Audit logs & compliance',
    ],
    highlight: false,
  },
];

const PricingCard = ({ plan, index, billing }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const navigate = useNavigate();

  const price = billing === 'annual' ? plan.price.annual : plan.price.monthly;
  const displayPrice = price === 0 ? 'Free' : `$${price}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group ${plan.highlight ? 'z-10' : ''}`}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-primary text-white text-[10px] font-display font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(255,0,51,0.5)]">
            {plan.badge}
          </span>
        </div>
      )}

      <div
        className={`relative h-full rounded-2xl p-8 flex flex-col overflow-hidden transition-all duration-500
          ${plan.highlight
            ? 'border-2 border-primary/50 bg-primary/5 shadow-[0_0_60px_rgba(255,0,51,0.15)] group-hover:shadow-[0_0_80px_rgba(255,0,51,0.25)] group-hover:border-primary/80'
            : 'border border-white/8 bg-white/[0.02] group-hover:border-white/15 group-hover:bg-white/[0.04]'
          }`}
      >
        {/* Glow layer for highlighted plan */}
        {plan.highlight && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        )}

        {/* Plan name */}
        <div className="mb-2">
          <span className="text-xs font-display font-bold tracking-[0.3em] uppercase text-primary">{plan.name}</span>
        </div>
        <p className="text-sm text-muted mb-6">{plan.tagline}</p>

        {/* Price */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${billing}-${plan.name}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-2"
            >
              <span className="font-display text-5xl font-black text-white">{displayPrice}</span>
              {price > 0 && <span className="text-muted text-sm">/ mo</span>}
            </motion.div>
          </AnimatePresence>
          {billing === 'annual' && price > 0 && (
            <p className="text-[11px] text-green-400 mt-1">Billed annually — save {Math.round((1 - plan.price.annual / plan.price.monthly) * 100)}%</p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((f, fi) => (
            <motion.li
              key={fi}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + fi * 0.05, duration: 0.4 }}
              className="flex items-start gap-3 text-sm text-muted"
            >
              <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
                <Check className="w-2.5 h-2.5" />
              </span>
              {f}
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/register')}
          className={`w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer
            ${plan.ctaVariant === 'primary'
              ? 'bg-primary text-white hover:bg-red-600 shadow-[0_0_25px_rgba(255,0,51,0.3)] hover:shadow-[0_0_35px_rgba(255,0,51,0.5)] hover:-translate-y-0.5'
              : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5'
            }`}
        >
          {plan.cta}
        </button>
      </div>
    </motion.div>
  );
};

const PricingSection = () => {
  const [billing, setBilling] = useState('monthly');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} id="pricing" className="relative py-28 px-6 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <span className="text-xs font-display font-bold tracking-[0.3em] text-primary uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-gradient tracking-tight uppercase mb-5">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            No hidden fees. No usage surprises. Pick the plan that matches your scale and upgrade anytime.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <span className={`text-sm transition-colors duration-200 ${billing === 'monthly' ? 'text-white' : 'text-muted'}`}>Monthly</span>
          <button
            onClick={() => setBilling(b => b === 'monthly' ? 'annual' : 'monthly')}
            className={`relative w-14 h-7 rounded-full border transition-all duration-300 cursor-pointer
              ${billing === 'annual' ? 'bg-primary border-primary' : 'bg-white/10 border-white/20'}`}
          >
            <motion.div
              animate={{ x: billing === 'annual' ? 28 : 4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
            />
          </button>
          <span className={`text-sm transition-colors duration-200 ${billing === 'annual' ? 'text-white' : 'text-muted'}`}>
            Annual
            <span className="ml-2 text-[10px] bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">Save 25%</span>
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} index={i} billing={billing} />
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-muted mt-10"
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
