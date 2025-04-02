import {
  ContactSection,
  CTASection,
  FAQSection,
  HeroSection,
  PricingSection,
  ProcessSection,
  ServicesSection,
  TestimonialsSection,
  WhyChooseUs,
} from '@/components/features/web-service';

export default function WebDesignPage() {
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <PricingSection />
      <ProcessSection />
      <CTASection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
