import Header from "@/components/layout/Header";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyWhoSection from "@/components/sections/WhyWhoSection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyWhoSection />
    </main>
  );
}
