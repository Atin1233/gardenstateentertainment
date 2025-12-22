"use client";

import React, { memo } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { cn } from "@/lib/utils";

// Service card component
const ServiceCard = memo(function ServiceCard({
  icon,
  title,
  description,
  features,
}: {
  icon: string;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div
      className={cn(
        "group relative p-8 rounded-2xl border border-white/10 bg-white/5",
        "hover:border-neon-cyan/30 hover:bg-white/10",
        "transition-all duration-500"
      )}
      data-cursor-hover
    >
      {/* Neon glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-orange/10 via-neon-pink/10 to-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-5xl mb-6">{icon}</div>
        
        {/* Title */}
        <h3 className="font-harmond text-2xl md:text-3xl font-bold text-white mb-4">
          {title}
        </h3>
        
        {/* Description */}
        <p className="font-nohemi text-base text-white/70 leading-relaxed mb-6">
          {description}
        </p>
        
        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 font-nohemi text-sm text-white/60">
              <span className="text-neon-cyan mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export function ServicesSection() {
  const services = [
    {
      icon: "💍",
      title: "Wedding DJ Services",
      description: "Make your special day unforgettable with our professional wedding DJ services tailored to your vision.",
      features: [
        "Custom music planning & consultation",
        "Professional MC services",
        "Premium sound & lighting equipment",
        "First dance & special moment coordination",
      ],
    },
    {
      icon: "🎉",
      title: "Private Parties",
      description: "From birthdays to anniversaries, we bring the energy and create memories that last a lifetime.",
      features: [
        "Birthday parties & Sweet 16s",
        "Anniversary celebrations",
        "Graduation parties",
        "Customized playlists for any age group",
      ],
    },
    {
      icon: "💼",
      title: "Corporate Events",
      description: "Professional entertainment solutions for your business events, conferences, and company celebrations.",
      features: [
        "Holiday parties & team building events",
        "Product launches & networking events",
        "Professional presentation setup",
        "Versatile music selection for all audiences",
      ],
    },
    {
      icon: "🎵",
      title: "Full Production",
      description: "State-of-the-art equipment and lighting to elevate any event to the next level.",
      features: [
        "Premium DJ equipment & sound systems",
        "Dynamic LED lighting packages",
        "Fog machines & special effects",
        "Wireless microphones & PA systems",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative min-h-screen w-full py-32 md:py-48 bg-black"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />

      <div className="swiss-container relative z-10">
        <div className="swiss-grid">
          {/* Section label */}
          <div className="col-span-4 md:col-span-2 lg:col-span-3 mb-12 md:mb-0">
            <span className="font-nohemi text-xs font-medium uppercase tracking-[0.3em] text-white/40">
              What We Do
            </span>
            <div className="mt-4 w-12 h-px bg-gradient-to-r from-neon-orange to-neon-pink" />
          </div>

          {/* Main content */}
          <div className="col-span-4 md:col-span-6 lg:col-span-9">
            {/* Encrypted header */}
            <h2 className="font-harmond text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-8">
              <EncryptedText
                text="Our Services"
                encryptedClassName="text-white/30"
                revealedClassName="text-white"
                revealDelayMs={40}
              />
            </h2>

            {/* Description */}
            <div className="space-y-6 font-nohemi text-lg md:text-xl leading-relaxed text-white/60 max-w-3xl mb-16">
              <p>
                Garden State Entertainment specializes in creating{" "}
                <span className="text-white font-semibold">
                  unforgettable experiences
                </span>{" "}
                for every type of event. Our professional DJs and state-of-the-art equipment ensure your celebration is perfect from start to finish.
              </p>
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {services.map((service, idx) => (
                <ServiceCard key={idx} {...service} />
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 font-nohemi text-base font-semibold uppercase tracking-wider text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
                data-cursor-hover
              >
                <span className="relative z-10">Get a Free Quote</span>
                <span className="relative z-10 text-xl">→</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-orange/20 via-neon-pink/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


