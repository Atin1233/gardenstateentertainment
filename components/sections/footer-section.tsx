"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Optimized dotted glow background with neon colors
const DottedGlowBackground = memo(function DottedGlowBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = canvasRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const ctx = el.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stopped = false;
    let isVisible = false;

    const gap = 16;
    const radius = 1;
    const opacity = 0.4;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      el.width = Math.floor(width);
      el.height = Math.floor(height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? false;
        if (isVisible && !raf) {
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.1 }
    );
    io.observe(container);

    let dots: { x: number; y: number; phase: number; color: string }[] = [];

    const colors = ["#FFA500", "#FF1493", "#00BFFF"]; // Neon orange, pink, cyan

    const regenDots = () => {
      dots = [];
      const { width, height } = container.getBoundingClientRect();
      const cols = Math.ceil(width / gap) + 1;
      const rows = Math.ceil(height / gap) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;
          const phase = Math.random() * Math.PI * 2;
          const color = colors[Math.floor(Math.random() * colors.length)];
          dots.push({ x, y, phase, color });
        }
      }
    };

    regenDots();

    const draw = (now: number) => {
      if (stopped || !isVisible) {
        raf = 0;
        return;
      }
      
      const { width, height } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const time = now / 2000;
      for (const d of dots) {
        const mod = (time + d.phase) % 2;
        const lin = mod < 1 ? mod : 2 - mod;
        const a = 0.1 + 0.5 * lin;

        ctx.fillStyle = d.color;
        ctx.globalAlpha = a * opacity;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "absolute", inset: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
});

// Simple CSS-based flipping email/phone
function FlippingContact({ label, value }: { label: string; value: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <a
      href={label.includes("Email") ? `mailto:${value}` : `tel:${value}`}
      className="relative inline-block cursor-pointer perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      data-cursor-hover
    >
      <div
        className="relative preserve-3d transition-transform duration-300"
        style={{
          transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="font-nohemi text-lg md:text-xl text-white/60 hover:text-white transition-colors backface-hidden"
        >
          {label} →
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 font-nohemi text-lg md:text-xl text-white backface-hidden whitespace-nowrap"
          style={{ transform: "rotateX(180deg)" }}
        >
          {value}
        </div>
      </div>
    </a>
  );
}

export function FooterSection() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-black"
    >
      {/* Dotted glow background with neon colors */}
      <DottedGlowBackground className="pointer-events-none opacity-20 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]" />

      {/* Gradient glow from center with neon colors */}
      <div className="absolute inset-0 bg-gradient-radial from-neon-pink/10 via-transparent to-transparent pointer-events-none" />

      <div className="swiss-container relative z-10 py-20 md:py-32">
        <div className="flex flex-col items-center justify-center text-center w-full">
          {/* Big CTA headline */}
          <h2 className="font-harmond text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[12vw] font-bold tracking-tight text-white leading-[0.8] mb-8"
            style={{
              textShadow: "0 0 100px rgba(255,165,0,0.3), 0 0 200px rgba(255,20,147,0.2)",
            }}
          >
            LET&apos;S
            <br />
            CREATE
          </h2>

          {/* Subtext */}
          <p className="font-nohemi text-lg md:text-xl text-white/50 max-w-lg mb-12">
            Ready to make your event unforgettable? Get in touch and let&apos;s start planning.
          </p>

          {/* CTA Button with Magnetic Effect */}
          <MagneticButton
            as="a"
            href="mailto:contact@gardenstate-entertainment.com"
            strength={0.4}
            className="group"
          >
            <span className={cn(
              "inline-flex items-center gap-3 px-8 py-4 rounded-full",
              "bg-gradient-to-r from-neon-orange via-neon-pink to-neon-cyan text-black font-nohemi text-base font-semibold uppercase tracking-wide",
              "transition-all duration-300",
              "group-hover:opacity-90",
              "group-hover:shadow-[0_0_40px_rgba(255,165,0,0.5)]"
            )}>
              Book Your Event
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </MagneticButton>

          {/* Contact info flips */}
          <div className="mt-12 flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <FlippingContact label="Email Us" value="contact@gardenstate-entertainment.com" />
            <FlippingContact label="Call Us" value="(555) 123-4567" />
          </div>

          {/* Social links with magnetic effect */}
          <div className="mt-16 flex items-center gap-6 flex-wrap justify-center">
            {[
              { name: "Instagram", url: "#" },
              { name: "Facebook", url: "#" },
              { name: "TikTok", url: "#" },
              { name: "YouTube", url: "#" },
            ].map((social) => (
              <MagneticButton
                key={social.name}
                as="a"
                href={social.url}
                strength={0.5}
              >
                <span className="font-nohemi text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200 px-2 py-1">
                  {social.name}
                </span>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 w-full py-8 border-t border-white/10">
        <div className="swiss-container">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <p className="font-nohemi text-xs text-white/40">
              © {new Date().getFullYear()} Garden State Entertainment. All rights reserved.
            </p>
            <p className="font-nohemi text-xs text-white/40">
              Entertainment You Won&apos;t Forget
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
