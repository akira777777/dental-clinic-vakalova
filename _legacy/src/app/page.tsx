import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ContactSection } from "@/components/sections/contact-section";
import { DoctorsSection } from "@/components/sections/doctors-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { StatsSection } from "@/components/sections/stats-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { ProcessSection } from "@/components/sections/process-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FloatingBookingButton } from "@/components/ui/floating-booking-button";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ServicesSection />
        <ProcessSection />
        <GallerySection />
        <DoctorsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <FloatingBookingButton />
      <Footer />
    </>
  );
}
