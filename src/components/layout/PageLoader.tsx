"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 150);

    // Minimum display time for smooth experience
    const minDisplayTime = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup
    return () => {
      clearInterval(progressInterval);
      clearTimeout(minDisplayTime);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)"
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.22, 0.9, 0.36, 1] 
          }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0F172A] overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-[100px]"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px]"
            />
          </div>

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Infinity Symbol with Neural Pulse */}
            <div className="relative w-32 h-16 sm:w-40 sm:h-20">
              {/* Infinity Path */}
              <svg
                viewBox="0 0 160 80"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Glow Effect */}
                <defs>
                  <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Background Path */}
                <motion.path
                  d="M20,40 Q20,20 40,20 Q60,20 60,40 Q60,60 40,60 Q20,60 20,40 M100,40 Q100,20 120,20 Q140,20 140,40 Q140,60 120,60 Q100,60 100,40"
                  fill="none"
                  stroke="url(#infinityGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.3"
                />

                {/* Animated Path */}
                <motion.path
                  d="M20,40 Q20,20 40,20 Q60,20 60,40 Q60,60 40,60 Q20,60 20,40 M100,40 Q100,20 120,20 Q140,20 140,40 Q140,60 120,60 Q100,60 100,40"
                  fill="none"
                  stroke="url(#infinityGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: [0, 1, 1, 0.8],
                  }}
                  transition={{ 
                    pathLength: { duration: 2, ease: "easeInOut" },
                    opacity: { duration: 2, ease: "easeInOut" },
                    repeat: Infinity,
                    repeatDelay: 0.2
                  }}
                />
              </svg>

              {/* Flowing Energy Particles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  initial={{ 
                    offsetDistance: `${i * 20}%`,
                    opacity: 0 
                  }}
                  animate={{
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    offsetPath: "path('M20,40 Q20,20 40,20 Q60,20 60,40 Q60,60 40,60 Q20,60 20,40 M100,40 Q100,20 120,20 Q140,20 140,40 Q140,60 120,60 Q100,60 100,40')",
                  }}
                />
              ))}
            </div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="text-sm font-medium tracking-wider text-cyan-400/80 uppercase"
              >
                Loading Experience
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-48 sm:w-64 h-0.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Radial Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px),
                  radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px, 25px 25px',
                backgroundPosition: '0 0, 25px 25px'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
