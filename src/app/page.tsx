import Header from "@/components/layout/Header";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyWhoSection from "@/components/sections/WhyWhoSection";
import ServicesSection from "@/components/sections/ServicesSection";
import OurTeamSection from "@/components/sections/OurTeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import InfiniteSlider from "@/components/ui/InfiniteSlider";
import ClarifySection from "@/components/sections/ClarifySection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyWhoSection />
      <section className="py-26 md:py-28 lg:py-30">
        <InfiniteSlider />
      </section>
      <ServicesSection />
      <OurTeamSection />
      <TestimonialsSection />
      <ClarifySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
