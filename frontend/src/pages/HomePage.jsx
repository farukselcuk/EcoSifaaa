import React from 'react';
import AlternativeTreatmentsSection from '../components/AlternativeTreatmentsSection';
import AppPromotionSection from '../components/AppPromotionSection';
import HeroSection from '../components/HeroSection';
import TestimonialsSection from '../components/TestimonialsSection';
import WhySection from '../components/WhySection';

function HomePage() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <AlternativeTreatmentsSection />
      <AppPromotionSection />
      <TestimonialsSection />
    </>
  );
}

export default HomePage; 