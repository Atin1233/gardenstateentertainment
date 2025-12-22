"use client";

import React, { memo } from "react";

/**
 * Neon Streaks Component
 * Adds subtle animated color streaks across the page using Garden State Entertainment's neon colors
 */
export const NeonStreaks = memo(function NeonStreaks() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" aria-hidden="true">
      {/* Orange horizontal streak - top */}
      <div 
        className="absolute top-1/4 left-0 w-1/3 h-[2px] neon-ambient-glow"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255, 165, 0, 0.3), transparent)',
          filter: 'blur(20px)',
          animationDelay: '0s',
        }}
      />
      
      {/* Pink horizontal streak - middle */}
      <div 
        className="absolute top-1/2 right-0 w-1/2 h-[2px] neon-ambient-glow"
        style={{
          background: 'linear-gradient(to left, transparent, rgba(255, 20, 147, 0.3), transparent)',
          filter: 'blur(25px)',
          animationDelay: '2s',
        }}
      />
      
      {/* Cyan horizontal streak - bottom */}
      <div 
        className="absolute bottom-1/4 left-0 w-2/5 h-[2px] neon-ambient-glow"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(0, 191, 255, 0.3), transparent)',
          filter: 'blur(22px)',
          animationDelay: '4s',
        }}
      />

      {/* Vertical orange streak - left side */}
      <div 
        className="absolute top-0 left-1/4 w-[2px] h-1/3 neon-ambient-glow"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255, 165, 0, 0.25), transparent)',
          filter: 'blur(18px)',
          animationDelay: '1s',
        }}
      />
      
      {/* Vertical cyan streak - right side */}
      <div 
        className="absolute bottom-0 right-1/3 w-[2px] h-2/5 neon-ambient-glow"
        style={{
          background: 'linear-gradient(to top, transparent, rgba(0, 191, 255, 0.25), transparent)',
          filter: 'blur(20px)',
          animationDelay: '3s',
        }}
      />

      {/* Ambient glow orbs */}
      <div 
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full neon-ambient-glow"
        style={{
          background: 'radial-gradient(circle, rgba(255, 20, 147, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      <div 
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full neon-ambient-glow"
        style={{
          background: 'radial-gradient(circle, rgba(0, 191, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animationDelay: '2s',
        }}
      />

      <div 
        className="absolute top-2/3 right-1/3 w-72 h-72 rounded-full neon-ambient-glow"
        style={{
          background: 'radial-gradient(circle, rgba(255, 165, 0, 0.1) 0%, transparent 70%)',
          filter: 'blur(65px)',
          animationDelay: '4s',
        }}
      />
    </div>
  );
});


