import { Variants } from 'framer-motion';

/**
 * Reusable Framer Motion animation variants
 * Following Neural Horizon design principles: smooth, elegant, purposeful
 */

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 0.9, 0.36, 1] }
  },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.9, 0.36, 1] }
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 0.9, 0.36, 1] }
  },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 0.9, 0.36, 1] }
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 0.9, 0.36, 1] }
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.9, 0.36, 1] }
  },
};

export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3, ease: [0.22, 0.9, 0.36, 1] }
  },
};

export const hoverGlowVariants: Variants = {
  rest: { 
    boxShadow: '0 0 0 rgba(34, 211, 238, 0)',
  },
  hover: { 
    boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
    transition: { duration: 0.3 }
  },
};
