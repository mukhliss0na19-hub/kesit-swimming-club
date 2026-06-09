import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import ProgramSection from "@/components/homepage/ProgramSection";
import WhyKesit from "@/components/homepage/WhyKesit";
import AchievementSection from "@/components/homepage/AchievementSection";
import GallerySection from "@/components/homepage/GallerySection";
import CTASection from "@/components/homepage/CTASection";
import FloatingWhatsApp from "@/components/homepage/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <HeroSection />

      <WhyKesit />

      <ProgramSection />

      <AchievementSection />

      <GallerySection />

      <CTASection />

      <Footer />

      <FloatingWhatsApp />
    </>
  );
}