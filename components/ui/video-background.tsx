"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  videoSrc: string;
  className?: string;
  overlayOpacity?: number;
  children?: React.ReactNode;
}

export function VideoBackground({
  videoSrc,
  className,
  overlayOpacity = 0.6,
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mount and handle mobile autoplay
    if (videoRef.current) {
      const video = videoRef.current;
      
      // CRITICAL: Set muted before anything else (required for autoplay)
      video.muted = true;
      video.volume = 0;
      
      // Set additional properties for mobile
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('x-webkit-airplay', 'deny');
      video.setAttribute('muted', 'true');
      
      // Force play function
      const playVideo = async () => {
        try {
          // Ensure muted state
          video.muted = true;
          video.volume = 0;
          
          // Try to play
          await video.play();
          
          // If successful, ensure it stays playing
          if (video.paused) {
            video.play().catch(() => {});
          }
        } catch (error) {
          console.log("Video autoplay attempt:", error);
          
          // On mobile, try again after any user interaction
          const playOnInteraction = () => {
            video.muted = true;
            video.volume = 0;
            video.play().catch(() => {});
          };
          
          // Listen for first interaction
          const events = ['touchstart', 'touchend', 'click', 'scroll'];
          events.forEach(eventType => {
            document.addEventListener(eventType, playOnInteraction, { once: true, passive: true });
          });
        }
      };
      
      // Multiple play attempts with increasing delays
      playVideo();
      setTimeout(playVideo, 50);
      setTimeout(playVideo, 200);
      setTimeout(playVideo, 500);
      
      // Also try when page becomes visible (handles tab switching)
      const handleVisibilityChange = () => {
        if (!document.hidden && video.paused) {
          playVideo();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      // Try on window load
      if (document.readyState === 'complete') {
        setTimeout(playVideo, 100);
      } else {
        window.addEventListener('load', () => setTimeout(playVideo, 100), { once: true });
      }
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        className="absolute inset-0 w-full h-full object-cover [&::-webkit-media-controls]:!hidden [&::-webkit-media-controls-enclosure]:!hidden [&::-webkit-media-controls-panel]:!hidden [&::-webkit-media-controls-start-playback-button]:!hidden"
        style={{
          objectPosition: "center",
          pointerEvents: "none",
        }}
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
        onLoadedMetadata={(e) => {
          // Force play when metadata loads
          const video = e.currentTarget;
          video.muted = true;
          video.volume = 0;
          video.play().catch(() => {});
        }}
        onCanPlay={(e) => {
          // Force play when video can play
          const video = e.currentTarget;
          video.muted = true;
          video.volume = 0;
          if (video.paused) {
            video.play().catch(() => {});
          }
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Transparent overlay to block all interactions with video */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      />

      {/* Dimming overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-[2]"
        style={{
          opacity: overlayOpacity,
        }}
      />

      {/* Optional gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none z-[3]" />
      
      {/* Content layer */}
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}
