// src/utils/motionVariants.ts — Shared Framer Motion variants
import type { Variants } from "framer-motion";

const EASE_CB: [number, number, number, number] = [0.22, 0.9, 0.36, 1];

export const fadeIn = (
  direction: "up" | "down" | "left" | "right" = "up",
  delay = 0,
): Variants => {
  const distance = 40;
  const dir: Record<"up" | "down" | "left" | "right", { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };
  return {
    hidden: { opacity: 0, ...(dir[direction] ?? { y: distance }) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: EASE_CB, delay },
    },
  };
};

export const slideUp = (distance = 40, delay = 0): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_CB, delay },
  },
});

export const scaleIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE_CB, delay },
  },
});

export const staggerContainer = (delayChildren = 0.2, staggerChildren = 0.1): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
      ease: EASE_CB,
    },
  },
});


