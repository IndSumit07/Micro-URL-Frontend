import React from 'react';
import { motion } from 'framer-motion';
import { Triangle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Inline social icons — avoids lucide-react version naming issues entirely
const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const TwitterXIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);


const footerLinks = {
  Product: [
    { label: 'Features', href: '#' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Changelog', href: '#' },
    { label: 'Roadmap', href: '#' },
    { label: 'Status', href: '#', badge: 'Live' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#', badge: 'Hiring' },
    { label: 'Press Kit', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Developers: [
    { label: 'API Docs', href: '#' },
    { label: 'SDKs', href: '#' },
    { label: 'Webhooks', href: '#' },
    { label: 'Open Source', href: '#', external: true },
    { label: 'GitHub', href: 'https://github.com', external: true },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'GDPR', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

const socialLinks = [
  { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: TwitterXIcon, href: 'https://twitter.com', label: 'Twitter' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: MailIcon, href: 'mailto:hello@microurl.dev', label: 'Email' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-8 bg-primary/10 blur-xl pointer-events-none" />

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1 space-y-5">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
                className="text-primary"
              >
                <Triangle className="w-5 h-5 fill-primary" />
              </motion.div>
              <span className="font-display text-sm font-black text-white tracking-widest uppercase">
                Micro-URL
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-sm text-muted leading-relaxed">
              Enterprise-grade URL shortening and click analytics. Built for speed, designed for scale.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -2, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-center hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                >
                  <s.icon className="w-3.5 h-3.5 text-muted hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-[11px] font-display font-bold tracking-[0.25em] uppercase text-white">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors duration-200 group w-fit"
                    >
                      {link.label}
                      {link.external && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-1 transition-transform duration-200" />
                      )}
                      {link.badge && (
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
                          link.badge === 'Live'
                            ? 'text-green-400 border-green-500/30 bg-green-500/10'
                            : 'text-primary border-primary/30 bg-primary/10'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className="border border-white/5 rounded-2xl p-6 mb-10 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-white mb-1">Stay in the loop</p>
            <p className="text-xs text-muted">Get product updates, tips, and performance insights.</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-200"
            />
            <button className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-red-600 transition-colors duration-200 shadow-[0_0_20px_rgba(255,0,51,0.2)] hover:shadow-[0_0_30px_rgba(255,0,51,0.4)] whitespace-nowrap cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-xs text-muted">
            © {currentYear} Micro-URL. All rights reserved. Built with ❤️ and Redis.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            {/* Status indicator */}
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
