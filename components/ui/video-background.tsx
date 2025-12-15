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
      
      // Set additional properties for mobile
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('x-webkit-airplay', 'deny');
      
      // Force play with a slight delay for mobile browsers
      const playVideo = () => {
        video.play().catch((error) => {
          console.log("Video autoplay failed:", error);
          // Retry after user interaction
          const playOnInteraction = () => {
            video.play().catch(console.error);
            document.removeEventListener('touchstart', playOnInteraction);
            document.removeEventListener('click', playOnInteraction);
          };
          document.addEventListener('touchstart', playOnInteraction, { once: true });
          document.addEventListener('click', playOnInteraction, { once: true });
        });
      };
      
      // Try to play immediately
      playVideo();
      
      // Also try after a short delay
      setTimeout(playVideo, 100);
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
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          objectPosition: "center",
          pointerEvents: "none",
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dimming overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none"
        style={{
          opacity: overlayOpacity,
        }}
      />

      {/* Optional gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70 pointer-events-none" />
      
      {/* Content layer */}
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
}
