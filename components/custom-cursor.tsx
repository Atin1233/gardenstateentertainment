"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for hover capability
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setIsMobile(!hasHover);
    
    if (!hasHover) return;

    // Mouse move handler - update cursor position directly (no smoothing)
    const onMouseMove = (e: MouseEvent) => {
      // Update cursor position immediately with no inertia
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (!isVisible) setIsVisible(true);
    };

    // Hover detection - debounced
    let hoverTimeout: NodeJS.Timeout;
    const onMouseOver = (e: MouseEvent) => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        const target = e.target as HTMLElement;
        const isInteractive = 
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          target.hasAttribute('data-cursor-hover');
        setIsHovering(isInteractive);
      }, 10);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      clearTimeout(hoverTimeout);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] mix-blend-difference"
      style={{
        opacity: isVisible ? 1 : 0,
        willChange: 'transform',
      }}
    >
      <div
        ref={dotRef}
        className="rounded-full bg-white transition-[width,height,margin] duration-200 ease-out"
        style={{
          width: isHovering ? 48 : 12,
          height: isHovering ? 48 : 12,
          marginLeft: isHovering ? -24 : -6,
          marginTop: isHovering ? -24 : -6,
        }}
      />
    </div>
  );
}
