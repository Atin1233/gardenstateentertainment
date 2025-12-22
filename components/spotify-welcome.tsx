"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SpotifyWelcomeProps {
  onStart: () => void;
}

export function SpotifyWelcome({ onStart }: SpotifyWelcomeProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (isAnimating) return; // Prevent multiple triggers
    
    // Use requestAnimationFrame to ensure state update triggers animation
    requestAnimationFrame(() => {
      setIsAnimating(true);
      
      // Call onStart after animation completes
      setTimeout(() => {
        onStart();
      }, 1200);
    });
  };
  
  // Handle touch events separately to ensure they work
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleStart(e);
  };
  
  // Also handle touch end as fallback
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAnimating) {
      handleStart(e);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden",
        "bg-[#0a0a0a]",
        isAnimating && "spotify-exit-animation"
      )}
      style={{
        transform: isAnimating ? "scale(1.5)" : "scale(1)",
        opacity: isAnimating ? 0 : 1,
        filter: isAnimating ? "blur(40px)" : "blur(0px)",
        transition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 1.2s cubic-bezier(0.76, 0, 0.24, 1), filter 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
        WebkitTransform: isAnimating ? "scale(1.5)" : "scale(1)",
        WebkitFilter: isAnimating ? "blur(40px)" : "blur(0px)",
        WebkitTransition: "transform 1.2s cubic-bezier(0.76, 0, 0.24, 1), opacity 1.2s cubic-bezier(0.76, 0, 0.24, 1), filter 1.2s cubic-bezier(0.76, 0, 0.24, 1)",
        willChange: "transform, opacity, filter",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d",
        pointerEvents: isAnimating ? "none" : "auto",
      }}
    >
      {/* Brand color accent overlays */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Orange accent - top left */}
        <div 
          className="absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.08]"
          style={{
            background: "radial-gradient(circle at center, #CC8400 0%, transparent 70%)",
          }}
        />
        
        {/* Pink accent - top right */}
        <div 
          className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.06]"
          style={{
            background: "radial-gradient(circle at center, #CC1075 0%, transparent 70%)",
          }}
        />
        
        {/* Cyan accent - bottom left */}
        <div 
          className="absolute bottom-0 left-0 w-[450px] h-[450px] opacity-[0.07]"
          style={{
            background: "radial-gradient(circle at center, #0099CC 0%, transparent 70%)",
          }}
        />
        
        {/* Orange accent - bottom right */}
        <div 
          className="absolute bottom-0 right-0 w-[350px] h-[350px] opacity-[0.05]"
          style={{
            background: "radial-gradient(circle at center, #CC8400 0%, transparent 70%)",
          }}
        />
        
        {/* Center glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04]"
          style={{
            background: "radial-gradient(circle at center, #CC1075 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Radial warp overlay */}
      {isAnimating && (
        <div
          className="fixed inset-0 z-[10001] pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, black 100%)",
            WebkitAnimation: "radialWarp 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards",
            animation: "radialWarp 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
        />
      )}
      
      {/* Glitch lines */}
      {isAnimating && (
        <>
          <div
            className="fixed inset-0 z-[10002] pointer-events-none"
            style={{
              background: "linear-gradient(0deg, transparent 0%, rgba(204,132,0,0.3) 50%, transparent 100%)",
              backgroundSize: "100% 4px",
              WebkitAnimation: "glitchScan 0.3s linear infinite",
              animation: "glitchScan 0.3s linear infinite",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
            }}
          />
          <div
            className="fixed inset-0 z-[10002] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(204,16,117,0.2) 50%, transparent 100%)",
              backgroundSize: "4px 100%",
              WebkitAnimation: "glitchScanHorizontal 0.4s linear infinite",
              animation: "glitchScanHorizontal 0.4s linear infinite",
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
            }}
          />
        </>
      )}

      <div 
        className="relative w-full h-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 md:p-12"
        style={{
          transform: isAnimating ? "scale(0.8)" : "scale(1)",
          WebkitTransform: isAnimating ? "scale(0.8)" : "scale(1)",
          transition: "transform 1s cubic-bezier(0.76, 0, 0.24, 1)",
          WebkitTransition: "transform 1s cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
          perspective: "1000px",
          WebkitPerspective: "1000px",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleStart}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="absolute top-6 left-6 text-white/60 hover:text-white active:text-white transition-colors touch-manipulation"
          aria-label="Close"
          style={{
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Three dots menu */}
        <button
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          aria-label="Menu"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>

        {/* Album Cover */}
        <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] mb-8 md:mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-orange-300 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <Image
              src="/logo.JPG"
              alt="Garden State Entertainment"
              width={400}
              height={400}
              className="w-full h-full object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-8 md:mb-12 space-y-2">
          <h1 className="font-harmond text-3xl md:text-5xl font-bold text-white tracking-tight">
            UNPAUSE TO GET THE
            <br />
            PARTY STARTED
          </h1>
          <p className="font-nohemi text-base md:text-lg text-white/70">
            Garden State Entertainment
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-6">
          <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-0 bg-white rounded-full" />
          </div>
          <div className="flex justify-between mt-2 font-nohemi text-xs text-white/60">
            <span>0:00</span>
            <span>∞</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 md:gap-8 mb-8">
          <button className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 6v12l10-6z" />
              <path d="M19 6v12" strokeWidth="2" stroke="currentColor" fill="none" />
            </svg>
          </button>

          <button className="text-white/60 hover:text-white transition-colors">
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm10 0l-8 6 8 6V6z" />
            </svg>
          </button>

          {/* Play Button */}
          <button
            onClick={handleStart}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="group relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg touch-manipulation"
            aria-label="Play"
            style={{
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              userSelect: 'none',
              WebkitUserSelect: 'none',
            }}
          >
            <svg className="w-8 h-8 md:w-10 md:h-10 text-[#0a0a0a] ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

          <button className="text-white/60 hover:text-white transition-colors">
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 18h2V6h-2zm-10 0l8-6-8-6v12z" />
            </svg>
          </button>

          <button className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Bottom Icons */}
        <div className="flex items-center gap-8 md:gap-12 text-white/60">
          <button className="hover:text-white transition-colors">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>

          <button className="hover:text-white transition-colors">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          <button className="hover:text-white transition-colors">
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Lyrics Button */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <button 
            className="text-white font-nohemi text-sm md:text-base font-semibold px-6 py-3 rounded-lg transition-colors relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, rgba(204,132,0,0.2) 0%, rgba(204,16,117,0.2) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span className="relative z-10">Lyrics</span>
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "linear-gradient(135deg, rgba(204,132,0,0.3) 0%, rgba(204,16,117,0.3) 100%)",
              }}
            />
          </button>
          
          <div className="flex gap-4">
            <button className="text-white/60 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
            <button className="text-white/60 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
