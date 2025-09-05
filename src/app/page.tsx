"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhyWhoSection from "@/components/sections/WhyWhoSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/sections/PricingSection";
import OurTeamSection from "@/components/sections/OurTeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import InfiniteSlider from "@/components/ui/InfiniteSlider";
import ClarifySection from "@/components/sections/ClarifySection";
import PromotionalBanner from "@/components/ui/PromotionalBanner";
import { useModal } from "@/components/providers/ModalProvider";

// Component that handles search params
function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const { openModal } = useModal();

  useEffect(() => {
    if (searchParams?.get("auth") === "required") {
      openModal("auth");
    }
  }, [searchParams, openModal]);

  return null;
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>
      <PromotionalBanner />
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyWhoSection />
      <section className="py-26 md:py-28 lg:py-30">
        <InfiniteSlider />
      </section>
      <ServicesSection />
      <PricingSection />
      <OurTeamSection />
      <TestimonialsSection />
      <ClarifySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
