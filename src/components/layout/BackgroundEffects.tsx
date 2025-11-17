// BackgroundEffects — Premium Cinematic Aurora Background System
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base Gradient Foundation */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Aurora Layer 1 - Primary */}
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.12) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 30%, rgba(34, 211, 238, 0.18) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(167, 139, 250, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 10%, rgba(34, 211, 238, 0.12) 0%, transparent 50%), radial-gradient(circle at 50% 90%, rgba(167, 139, 250, 0.18) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.12) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Aurora Layer 2 - Secondary Flow */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 60%, rgba(20, 184, 166, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(99, 102, 241, 0.06) 0%, transparent 60%)',
            'radial-gradient(ellipse at 60% 20%, rgba(20, 184, 166, 0.10) 0%, transparent 60%), radial-gradient(ellipse at 40% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)',
            'radial-gradient(ellipse at 80% 70%, rgba(20, 184, 166, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 30%, rgba(99, 102, 241, 0.10) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 60%, rgba(20, 184, 166, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(99, 102, 241, 0.06) 0%, transparent 60%)'
          ]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Interactive Mouse Glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0.1) 30%, transparent 70%)',
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Floating Atmospheric Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, rgba(34, 211, 238, 0.05) 40%, transparent 70%)',
          filter: 'blur(40px)'
        }}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/6 w-80 h-80 rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, rgba(167, 139, 250, 0.04) 40%, transparent 70%)',
          filter: 'blur(50px)'
        }}
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          scale: [1.1, 1, 1.1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-2/3 left-2/3 w-64 h-64 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0.03) 40%, transparent 70%)',
          filter: 'blur(35px)'
        }}
        animate={{
          y: [-15, 15, -15],
          x: [-15, 15, -15],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 12,
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
