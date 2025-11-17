"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if user has set prefers-reduced-motion: reduce
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Motion variants that respect reduced motion preferences
 */
export const motionVariants = {
  // Fade in animation
  fadeIn: (prefersReducedMotion: boolean) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { 
      duration: prefersReducedMotion ? 0.01 : 0.6,
      ease: [0.22, 0.9, 0.36, 1]
    }
  }),

  // Slide up animation
  slideUp: (prefersReducedMotion: boolean) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      duration: prefersReducedMotion ? 0.01 : 0.6,
      ease: [0.22, 0.9, 0.36, 1]
    }
  }),

  // Scale in animation
  scaleIn: (prefersReducedMotion: boolean) => ({
    initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      duration: prefersReducedMotion ? 0.01 : 0.5,
      ease: [0.22, 0.9, 0.36, 1]
    }
  }),

  // Stagger children animation
  staggerChildren: (prefersReducedMotion: boolean) => ({
    animate: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  }),

  // Hover animation
  hover: (prefersReducedMotion: boolean) => ({
    whileHover: prefersReducedMotion ? {} : { 
      y: -4, 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  })
};