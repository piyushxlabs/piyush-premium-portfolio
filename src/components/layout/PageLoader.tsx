"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types & Configuration ---

interface PageLoaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
}

/**
 * Quantum Crystalline Matrix Loader
 * 
 * A premium, cinematic loading experience featuring:
 * - 3D Holographic Ring System (CSS 3D Transforms)
 * - Crystalline Hexagon Core with Glassmorphism
 * - Organic Particle Swarm
 * - Volumetric Atmospheric Effects
 * - Optimized 60fps Performance
 */
export function PageLoader({ isLoading: externalLoading, onComplete }: PageLoaderProps = {}) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Device detection for performance optimization
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Add loading class to body on mount, remove when loader completes
  useEffect(() => {
    // Add loading class immediately
    if (typeof document !== 'undefined') {
      document.body.classList.add('loading');
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('loading');
      }
    };
  }, []);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Non-linear progress for organic feel
        const increment = Math.random() * 4 + 0.5;
        const newProgress = prev + increment;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 800); // Wait for exit animation trigger
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleExitComplete = () => {
    setIsVisible(false);
    // Remove loading class when loader exits
    if (typeof document !== 'undefined') {
      document.body.classList.remove('loading');
    }
    onComplete?.();
  };

  // Memoize random values to prevent re-renders
  const particles = useMemo(() => {
    const count = isMobile ? 25 : 50; // Performance optimization
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i / count) * Math.PI * 2,
      radius: 100 + Math.random() * 140, // Expanded radius
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
      size: 2 + Math.random() * 3,
      color: i % 3 === 0 ? "#00f5ff" : i % 3 === 1 ? "#bd00ff" : "#ffffff",
    }));
  }, [isMobile]);

  const satellites = useMemo(() => {
    if (isMobile) return []; // Hide on mobile for performance
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (i / 8) * Math.PI * 2,
      distance: 220 + Math.random() * 60, // Pushed outward
      size: 10 + Math.random() * 8,
      duration: 6 + Math.random() * 4,
      delay: i * 0.5,
    }));
  }, [isMobile]);

  const rays = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      rotation: (i / 6) * 360,
      width: 8 + (i % 3) * 4, // Thicker rays
      delay: i * 0.2,
    }));
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {!isComplete && (
        <motion.div
          key="quantum-loader-container"
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#050a14]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d"
          }}
        >
          {/* --- Layer 0: Deep Space Background & Grid --- */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, #1a0b2e 0%, #0a0118 60%, #000000 100%)", // Lightened midtone
              zIndex: 0
            }}
          />

          {/* Isometric Energy Grid - Made Visible */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 245, 255, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 245, 255, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              transform: "perspective(500px) rotateX(60deg) scale(2.5)",
              transformOrigin: "center 40%",
              maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
              zIndex: 1
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transform: "perspective(500px) rotateX(60deg) scale(2.5) translateY(0px)" }}
            transition={{ duration: 1.5 }}
          />

          {/* --- Layer 1: Volumetric Light Rays --- */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 2 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {rays.map((ray) => (
              <motion.div
                key={`ray-${ray.id}`}
                className="absolute top-1/2 left-1/2 origin-bottom"
                style={{
                  width: ray.width,
                  height: "100vmax",
                  background: `linear-gradient(to top, rgba(0, 245, 255, 0) 0%, rgba(0, 245, 255, 0.15) 40%, rgba(0, 0, 0, 0) 100%)`, // Increased opacity
                  transform: `translate(-50%, -100%) rotate(${ray.rotation}deg)`,
                  filter: "blur(8px)",
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, delay: ray.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>

          {/* --- Layer 2: 3D Orbital Ring System (HTML/CSS) --- */}
          {/* Replaced SVG with Divs for true 3D transforms */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 10, transformStyle: "preserve-3d" }}>

            {/* Ring 1: Horizontal Plane */}
            <motion.div
              className="absolute rounded-full border border-cyan-400/60"
              style={{
                width: "min(60vw, 360px)",
                height: "min(60vw, 360px)",
                boxShadow: "0 0 20px rgba(0, 245, 255, 0.3), inset 0 0 20px rgba(0, 245, 255, 0.1)",
                borderWidth: "1px",
              }}
              animate={{ rotateX: [70, 70], rotateZ: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Ring 2: 45 Degree Plane */}
            <motion.div
              className="absolute rounded-full border border-purple-500/60"
              style={{
                width: "min(70vw, 440px)",
                height: "min(70vw, 440px)",
                boxShadow: "0 0 20px rgba(189, 0, 255, 0.3), inset 0 0 20px rgba(189, 0, 255, 0.1)",
                borderWidth: "1px",
              }}
              animate={{ rotateX: [70, 70], rotateY: [45, 45], rotateZ: [0, -360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Ring 3: Vertical-ish Plane */}
            <motion.div
              className="absolute rounded-full border border-cyan-300/50"
              style={{
                width: "min(80vw, 520px)",
                height: "min(80vw, 520px)",
                boxShadow: "0 0 25px rgba(0, 245, 255, 0.2)",
                borderWidth: "2px",
                borderStyle: "dashed",
              }}
              animate={{ rotateX: [60, 60], rotateY: [-45, -45], rotateZ: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* --- Layer 3: Organic Particle Swarm --- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
            {particles.map((p) => (
              <motion.div
                key={`particle-${p.id}`}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                }}
                animate={{
                  x: [
                    Math.cos(p.angle) * p.radius,
                    Math.cos(p.angle + Math.PI) * (p.radius * 0.8),
                    Math.cos(p.angle + Math.PI * 2) * p.radius
                  ],
                  y: [
                    Math.sin(p.angle) * (p.radius * 0.6),
                    Math.sin(p.angle + Math.PI) * p.radius,
                    Math.sin(p.angle + Math.PI * 2) * (p.radius * 0.6)
                  ],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.delay,
                }}
              />
            ))}
          </div>

          {/* --- Layer 4: Geometric Satellites (Visible) --- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 15 }}>
            {satellites.map((s) => (
              <motion.div
                key={`sat-${s.id}`}
                className="absolute"
                style={{
                  width: s.size,
                  height: s.size,
                  background: "rgba(255, 255, 255, 0.2)", // Increased opacity
                  border: "1px solid rgba(0, 245, 255, 0.8)", // Visible border
                  boxShadow: "0 0 15px rgba(0, 245, 255, 0.6)", // Stronger glow
                  backdropFilter: "none", // Removed problematic blur
                }}
                animate={{
                  x: [
                    Math.cos(s.angle) * s.distance,
                    Math.cos(s.angle + Math.PI) * s.distance
                  ],
                  y: [
                    Math.sin(s.angle) * s.distance,
                    Math.sin(s.angle + Math.PI) * s.distance
                  ],
                  rotate: [0, 360],
                  rotateX: [0, 180],
                }}
                transition={{
                  duration: s.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: s.delay,
                }}
              />
            ))}
          </div>

          {/* --- Layer 5: Central Crystalline Core --- */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 30, transformStyle: "preserve-3d" }}>
            {/* Core Glow */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "180px",
                height: "180px",
                background: "radial-gradient(circle, rgba(0, 245, 255, 0.6) 0%, rgba(189, 0, 255, 0.3) 60%, transparent 100%)",
                filter: "blur(30px)",
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Hexagon Crystal */}
            <motion.div
              className="relative flex items-center justify-center"
              style={{
                width: "140px",
                height: "140px",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: [0, 360],
                rotateZ: [0, 10, 0, -10, 0]
              }}
              transition={{
                rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                rotateZ: { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  border: "2px solid rgba(0, 245, 255, 0.8)", // Stronger border
                  boxShadow: "0 0 30px rgba(0, 245, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)",
                }}
              />
              {/* Inner Core */}
              <motion.div
                className="absolute w-12 h-12 rounded-full bg-white"
                style={{
                  boxShadow: "0 0 40px rgba(0, 245, 255, 1), 0 0 80px rgba(189, 0, 255, 0.8)",
                }}
                animate={{ scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* --- Layer 6: Progress UI --- */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            style={{ zIndex: 40 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {/* Progress Bar */}
            <div className="w-[300px] h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"
                style={{ width: `${progress}%`, boxShadow: "0 0 15px rgba(0, 245, 255, 0.8)" }}
              />
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Text */}
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-xs font-medium tracking-[0.2em] font-mono uppercase drop-shadow-[0_0_5px_rgba(0,245,255,0.8)]">
                Initializing Matrix
              </span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-cyan-400"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- Layer 7: Exit Burst (Conditional) --- */}
          {isComplete && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 50 }}
            >
              {/* Shockwave */}
              <motion.div
                className="absolute rounded-full border-2 border-white"
                initial={{ width: 0, height: 0, opacity: 1, borderWidth: 5 }}
                animate={{ width: "150vmax", height: "150vmax", opacity: 0, borderWidth: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {/* Particle Explosion */}
              {Array.from({ length: 30 }).map((_, i) => {
                const angle = (i / 30) * Math.PI * 2;
                return (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * 800,
                      y: Math.sin(angle) * 800,
                      scale: 0,
                      opacity: 0
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                );
              })}

              {/* Flash */}
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.4, times: [0, 0.1, 1] }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}