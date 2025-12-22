"use client";

import { useState, useEffect } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { LineupSection } from "@/components/sections/lineup-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FooterSection } from "@/components/sections/footer-section";
import { CurtainRevealLayout } from "@/components/curtain-reveal-layout";
import { KineticMarquee } from "@/components/ui/kinetic-marquee";
import { SpotifyWelcome } from "@/components/spotify-welcome";

export function HomeContent() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Always show welcome screen on page load/refresh
    setShowWelcome(true);
    
    // Reset on page visibility change (handles tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setShowWelcome(true);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleStart = () => {
    setShowWelcome(false);
  };

  const navItems = [
    { name: "DJs", link: "#lineup" },
    { name: "Services", link: "#services" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "FAQ", link: "#faq" },
  ];

  return (
    <>
      {showWelcome && (
        <SpotifyWelcome 
          onStart={handleStart} 
        />
      )}
      
      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />

      <CurtainRevealLayout footer={<FooterSection />}>
        {/* Hero Section - The Hook */}
        <HeroSection />

        {/* Kinetic Marquee - Breaking the grid */}
        <div className="relative z-0 my-4 md:my-0 md:-my-8">
          <KineticMarquee 
            text="DJ SERVICES — WEDDINGS — CORPORATE EVENTS — PRIVATE PARTIES — "
            baseVelocity={0.5}
            skewFactor={0.8}
          />
        </div>

        {/* Lineup Section - Meet the DJs */}
        <LineupSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Kinetic Marquee - Second instance */}
        <div className="relative z-0 my-4 md:my-0 md:-my-8">
          <KineticMarquee 
            text="ENTERTAINMENT YOU WON'T FORGET — BOOK YOUR EVENT TODAY — "
            baseVelocity={-0.4}
            skewFactor={0.6}
          />
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />
      </CurtainRevealLayout>
    </>
  );
}
