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
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("gse-visited");
    if (!hasVisited) {
      setShowWelcome(true);
    }
  }, []);

  const handleStart = () => {
    localStorage.setItem("gse-visited", "true");
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
      {showWelcome && <SpotifyWelcome onStart={handleStart} />}
      
      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />

      <CurtainRevealLayout footer={<FooterSection />}>
        {/* Hero Section - The Hook */}
        <HeroSection />

        {/* Kinetic Marquee - Breaking the grid */}
        <div className="relative -my-8 md:-my-12 z-0">
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
        <div className="relative -my-8 md:-my-12 z-0">
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
