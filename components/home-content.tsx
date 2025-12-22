"use client";

import { useState, useEffect, useRef } from "react";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Always show welcome screen on page load/refresh
    setShowWelcome(true);
    
    // Handle visibility change - pause audio when user leaves, show welcome when returning
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause audio when user leaves/switches apps
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          console.log('Audio paused - page hidden');
        }
      } else {
        // Show welcome screen when user returns
        setShowWelcome(true);
      }
    };
    
    // Pause audio when page is about to unload
    const handleBeforeUnload = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    };
    
    // Pause audio when page is hidden (mobile app switching)
    const handlePageHide = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        console.log('Audio paused - page hidden');
      }
    };
    
    // Pause audio when window loses focus (mobile app switching)
    const handleBlur = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        console.log('Audio paused - window blurred');
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Set up audio element
  useEffect(() => {
    if (audioRef.current) {
      // Ensure audio starts at 10 seconds when it's ready
      const handleCanPlay = () => {
        if (audioRef.current && audioRef.current.currentTime < 10) {
          audioRef.current.currentTime = 10;
        }
      };
      
      audioRef.current.addEventListener('canplay', handleCanPlay);
      audioRef.current.addEventListener('loadeddata', handleCanPlay);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplay', handleCanPlay);
          audioRef.current.removeEventListener('loadeddata', handleCanPlay);
        }
      };
    }
  }, []);

  const handleStart = () => {
    setShowWelcome(false);
  };

  // Function to start audio playback (called from SpotifyWelcome)
  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.55; // 55% of user's system volume
      audioRef.current.loop = true;
      
      // Set start time to 10 seconds
      audioRef.current.currentTime = 10;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playing successfully from 10 seconds');
            // Ensure currentTime is set (in case it was reset)
            if (audioRef.current) {
              audioRef.current.currentTime = 10;
            }
          })
          .catch((error) => {
            console.error("Audio play failed:", error);
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 10;
                audioRef.current.play().catch(console.error);
              }
            }, 100);
          });
      }
    }
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
          onPlayAudio={startAudio}
        />
      )}
      
      {/* Persistent audio element - stays in DOM even after welcome screen closes */}
      <audio
        ref={audioRef}
        src="/massive_song.mp3"
        preload="auto"
        loop
        style={{ display: 'none' }}
      />
      
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
