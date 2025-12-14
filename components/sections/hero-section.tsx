"use client";

import React, { memo, useEffect, useState } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { VideoBackground } from "@/components/ui/video-background";
import Image from "next/image";

// Animated corner brackets
const CornerBrackets = memo(function CornerBrackets() {
  return (
    <>
      {/* Top left bracket with neon glow */}
      <div className="absolute top-8 left-8 md:top-16 md:left-16 w-16 h-16 md:w-24 md:h-24">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan/50 to-transparent" />
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-neon-cyan/50 to-transparent" />
      </div>
      
      {/* Top right bracket with neon glow */}
      <div className="absolute top-8 right-8 md:top-16 md:right-16 w-16 h-16 md:w-24 md:h-24">
        <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-neon-pink/50 to-transparent" />
        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-neon-pink/50 to-transparent" />
      </div>
      
      {/* Bottom left bracket with neon glow */}
      <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 w-16 h-16 md:w-24 md:h-24">
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-orange/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-neon-orange/50 to-transparent" />
      </div>
      
      {/* Bottom right bracket with neon glow */}
      <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 w-16 h-16 md:w-24 md:h-24">
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-neon-cyan/50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-neon-cyan/50 to-transparent" />
      </div>
    </>
  );
});

export function HeroSection() {
  const words = [
    "Weddings",
    "Private Parties", 
    "Corporate Events",
    "Sweet 16s",
  ];

  // Simple mount animation state
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <VideoBackground 
        videoSrc="/EAE66DEE-8DB3-4D46-93C4-02A1CFE42ED4.mp4"
        overlayOpacity={0.45}
        className="absolute inset-0"
      />
      
      {/* Corner brackets for design feel */}
      <CornerBrackets />

      {/* Additional gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 swiss-container w-full">
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }}
        >
          {/* Logo */}
          <div
            className="mb-8 md:mb-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s',
            }}
          >
            <Image
              src="/logo.JPG"
              alt="Garden State Entertainment"
              width={400}
              height={400}
              className="w-64 md:w-96 h-auto"
              priority
            />
          </div>

          {/* Main headline */}
          <h1
            className="font-harmond text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] text-white mb-6"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s',
              textShadow: '0 0 80px rgba(255,255,255,0.3), 0 0 40px rgba(255,165,0,0.2)',
            }}
          >
            ENTERTAINMENT
          </h1>

          {/* Slogan */}
          <p
            className="font-nohemi text-xl md:text-2xl lg:text-3xl font-light text-white/90 mb-8"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out 0.6s, transform 0.8s ease-out 0.6s',
              textShadow: '0 0 20px rgba(255,255,255,0.2)',
            }}
          >
            You Won&apos;t Forget
          </p>

          {/* Flip words line */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 mt-4"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s',
            }}
          >
            <span className="font-nohemi text-lg md:text-xl lg:text-2xl text-white/80">
              Unforgettable
            </span>
            <FlipWords
              words={words}
              className="font-nohemi text-lg md:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-neon-orange via-neon-pink to-neon-cyan bg-clip-text text-transparent"
              duration={3000}
            />
          </div>

          {/* CTA Button */}
          <div
            className="mt-12"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.8s ease-out 1s, transform 0.8s ease-out 1s',
            }}
          >
            <a
              href="#contact"
              className="group relative px-8 py-4 font-nohemi text-sm md:text-base font-semibold uppercase tracking-wider text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 inline-block"
              data-cursor-hover
            >
              <span className="relative z-10">Book Your Event</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-orange/20 via-neon-pink/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{
          opacity: mounted ? 1 : 0,
          transition: 'opacity 1s ease-out 1.2s',
        }}
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="font-nohemi text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent scroll-indicator" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
