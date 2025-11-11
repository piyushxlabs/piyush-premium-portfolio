'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideUp({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '' 
}: SlideUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 0.9, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
