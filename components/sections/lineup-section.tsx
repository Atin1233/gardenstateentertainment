"use client";

import React, { memo, useState } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { cn } from "@/lib/utils";
import Image from "next/image";

// DJ Card component with hover effects
const DJCard = memo(function DJCard({
  name,
  role,
  imageSrc,
  bio,
}: {
  name: string;
  role: string;
  imageSrc: string;
  bio: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-hover
    >
      {/* Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      
      {/* Neon border glow on hover */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-br from-neon-orange/20 via-neon-pink/20 to-neon-cyan/20"
        )}
        style={{ filter: "blur(20px)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
        {/* Bio - shows on hover */}
        <div
          className={cn(
            "mb-4 transition-all duration-500 ease-out",
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <p className="font-nohemi text-sm text-white/80 leading-relaxed">
            {bio}
          </p>
        </div>

        {/* Name & Role */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-px bg-gradient-to-r from-neon-pink to-transparent" />
            <span className="font-nohemi text-xs uppercase tracking-wider text-neon-cyan">
              {role}
            </span>
          </div>
          <h3 className="font-harmond text-3xl font-bold text-white">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
});

export function LineupSection() {
  const djLineup = [
    {
      name: "Justin",
      role: "DJ",
      imageSrc: "/IMG_5861.JPG",
      bio: "Bringing energy and excitement to every event with a diverse music selection that keeps the dance floor packed.",
    },
    {
      name: "Christian",
      role: "DJ",
      imageSrc: "/IMG_5862.JPG",
      bio: "Specializing in multicultural events and creating the perfect atmosphere for any celebration.",
    },
  ];

  return (
    <section
      id="lineup"
      className="relative min-h-screen w-full py-32 md:py-48 bg-black"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />

      <div className="swiss-container relative z-10">
        {/* Encrypted header */}
        <h2 className="font-harmond text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-8 text-center">
          <EncryptedText
            text="Meet Your DJs"
            encryptedClassName="text-white/30"
            revealedClassName="text-white"
            revealDelayMs={40}
          />
        </h2>

        {/* Description */}
        <div className="space-y-6 font-nohemi text-lg md:text-xl leading-relaxed text-white/60 max-w-3xl mb-16 mx-auto text-center">
          <p>
            Our talented team of DJs brings years of experience and passion to every event. With diverse music knowledge and professional skills, we ensure your celebration is{" "}
            <span className="text-white font-semibold">
              entertainment you won&apos;t forget
            </span>
            .
          </p>
        </div>

        {/* DJ Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {djLineup.map((dj, idx) => (
            <DJCard key={idx} {...dj} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full">
            {[
              { value: "500+", label: "Events Hosted" },
              { value: "10+", label: "Years Experience" },
              { value: "5★", label: "Average Rating" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-harmond text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-orange via-neon-pink to-neon-cyan bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="font-nohemi text-xs uppercase tracking-widest text-white/40 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
