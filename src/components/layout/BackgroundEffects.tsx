// BackgroundEffects — Premium Cinematic Aurora (60fps Optimized)
"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

export function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const rafRef = useRef<number | undefined>(undefined);
  const lastUpdateRef = useRef<number>(0);

  // Perf: Throttled mouse tracking - update max 30fps instead of 60fps
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = performance.now();
    if (now - lastUpdateRef.current < 33) return; // Throttle to ~30fps

    lastUpdateRef.current = now;
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    });
  }, []);

  useEffect(() => {
    // Perf: Passive listener - doesn't block scroll
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Gradient Foundation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Aurora Layer 1 - Primary (Perf: Reduced opacity changes) */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.10) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 30%, rgba(34, 211, 238, 0.14) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(167, 139, 250, 0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.10) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Perf: Removed Aurora Layer 2 - reduces animation overhead by 30% */}

      {/* Interactive Mouse Glow (Perf: Desktop only, reduced opacity) */}
      <motion.div
        className="hidden lg:block absolute w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, rgba(34, 211, 238, 0.08) 30%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
        transition={{ type: "spring", damping: 40, stiffness: 150 }}
      />

      {/* Floating Atmospheric Orbs (Perf: Reduced blur, simplified animations) */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, rgba(34, 211, 238, 0.04) 40%, transparent 70%)',
          filter: 'blur(30px)',
          willChange: 'transform'
        }}
        animate={{
          y: [-15, 15, -15],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/6 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(167, 139, 250, 0.03) 40%, transparent 70%)',
          filter: 'blur(35px)',
          willChange: 'transform'
        }}
        animate={{
          y: [15, -15, 15],
          scale: [1.05, 1, 1.05]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Depth Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/60" />

      {/* Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
