import React from 'react';
import Hero from '../components/Hero';
import StatsSection from '../components/home/StatsSection';
import TechStackSection from '../components/home/TechStackSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

import FaqSection from '../components/home/FaqSection';
import CtaSection from '../components/home/CtaSection';
import Footer from '../components/home/Footer';

const LandingPage = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <StatsSection />

      {/* Tech Stack Marquee */}
      <TechStackSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <CtaSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
