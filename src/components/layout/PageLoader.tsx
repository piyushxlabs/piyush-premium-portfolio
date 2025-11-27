"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types & Configuration ---
// Keeping it simple as per the new design philosophy

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Non-linear progress simulation
        const increment = Math.random() * 4 + 0.5;
        const newProgress = prev + increment;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500); // Slight delay at 100%
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleExitComplete = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {!isComplete && (
        <motion.div
          key="neural-bloom-loader"
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* --- Layer 0: Deep Gradient Background --- */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, #0a0e1a 0%, #050a0f 100%)"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* --- Layer 1: Ambient Glow --- */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(77, 208, 225, 0.03) 0%, transparent 60%)"
            }}
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* --- Layer 2: Subtle Noise Texture --- */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px"
            }}
          />

          {/* --- Layer 3: Dendrite Branch System --- */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4dd0e1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7c4dff" stopOpacity="0.7" />
              </linearGradient>

              <filter id="branchGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.g
              style={{ transformOrigin: "center" }}
              animate={{
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Branch 1 - Top */}
              <motion.path
                d="M 50% 50% Q 50% 35%, 50% 20%"
                stroke="url(#branchGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="url(#branchGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.7, 1, 0.8, 0.9]
                }}
                exit={{
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
                }}
                transition={{
                  pathLength: { duration: 1.8, delay: 0.2, ease: "easeInOut" },
                  opacity: { duration: 4, delay: 0.2, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Branch 2 - Top Right */}
              <motion.path
                d="M 50% 50% Q 60% 38%, 70% 25%"
                stroke="url(#branchGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="url(#branchGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.7, 1, 0.8, 0.9]
                }}
                exit={{
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
                }}
                transition={{
                  pathLength: { duration: 2.2, delay: 0.35, ease: "easeInOut" },
                  opacity: { duration: 4, delay: 0.35, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Branch 3 - Right */}
              <motion.path
                d="M 50% 50% Q 63% 50%, 75% 50%"
                stroke="url(#branchGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="url(#branchGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.7, 1, 0.8, 0.9]
                }}
                exit={{
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
                }}
                transition={{
                  pathLength: { duration: 1.5, delay: 0.5, ease: "easeInOut" },
                  opacity: { duration: 4, delay: 0.5, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Branch 4 - Bottom Right */}
              <motion.path
                d="M 50% 50% Q 60% 62%, 70% 75%"
                stroke="url(#branchGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="url(#branchGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.7, 1, 0.8, 0.9]
                }}
                exit={{
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
                }}
                transition={{
                  pathLength: { duration: 2.5, delay: 0.65, ease: "easeInOut" },
                  opacity: { duration: 4, delay: 0.65, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Branch 5 - Bottom */}
              <motion.path
                d="M 50% 50% Q 50% 65%, 50% 80%"
                stroke="url(#branchGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="url(#branchGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.7, 1, 0.8, 0.9]
                }}
                exit={{
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
                }}
                transition={{
                  pathLength: { duration: 1.9, delay: 0.8, ease: "easeInOut" },
                  opacity: { duration: 4, delay: 0.8, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Branch 6 - Bottom Left */}
              <motion.path
                d="M 50% 50% Q 40% 62%, 30% 75%"
                stroke="url(#branchGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="url(#branchGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.7, 1, 0.8, 0.9]
                }}
                exit={{
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
                }}
                transition={{
                  pathLength: { duration: 2.3, delay: 0.95, ease: "easeInOut" },
                  opacity: { duration: 4, delay: 0.95, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Branch 7 - Left */}
              <motion.path
                d="M 50% 50% Q 37% 50%, 25% 50%"
                stroke="url(#branchGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="url(#branchGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.7, 1, 0.8, 0.9]
                }}
                exit={{
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
                }}
                transition={{
                  pathLength: { duration: 1.7, delay: 1.1, ease: "easeInOut" },
                  opacity: { duration: 4, delay: 1.1, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Branch 8 - Top Left */}
              <motion.path
                d="M 50% 50% Q 40% 38%, 30% 25%"
                stroke="url(#branchGradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                filter="url(#branchGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.7, 1, 0.8, 0.9]
                }}
                exit={{
                  pathLength: 0,
                  opacity: 0,
                  transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
                }}
                transition={{
                  pathLength: { duration: 2.1, delay: 1.25, ease: "easeInOut" },
                  opacity: { duration: 4, delay: 1.25, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Synapse Pulses */}
              {progress > 20 && (
                <>
                  <motion.circle
                    r="2"
                    fill="#00e5ff"
                    filter="url(#branchGlow)"
                    style={{ offsetPath: "path('M 50% 50% Q 50% 35%, 50% 20%')" }}
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{
                      offsetDistance: ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      offsetDistance: { duration: 1.2, ease: "linear", repeat: Infinity, repeatDelay: 0.6, delay: 0 },
                      opacity: { duration: 1.2, times: [0, 0.1, 0.9, 1], repeat: Infinity, repeatDelay: 0.6, delay: 0 },
                      scale: { duration: 0.3, repeat: Infinity, repeatDelay: 1.5, delay: 0 }
                    }}
                  />
                  <motion.circle
                    r="2"
                    fill="#b388ff"
                    filter="url(#branchGlow)"
                    style={{ offsetPath: "path('M 50% 50% Q 63% 50%, 75% 50%')" }}
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{
                      offsetDistance: ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      offsetDistance: { duration: 1, ease: "linear", repeat: Infinity, repeatDelay: 0.8, delay: 0.5 },
                      opacity: { duration: 1, times: [0, 0.1, 0.9, 1], repeat: Infinity, repeatDelay: 0.8, delay: 0.5 },
                      scale: { duration: 0.3, repeat: Infinity, repeatDelay: 1.5, delay: 0.5 }
                    }}
                  />
                  <motion.circle
                    r="2"
                    fill="#00e5ff"
                    filter="url(#branchGlow)"
                    style={{ offsetPath: "path('M 50% 50% Q 50% 65%, 50% 80%')" }}
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{
                      offsetDistance: ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      offsetDistance: { duration: 1.3, ease: "linear", repeat: Infinity, repeatDelay: 0.5, delay: 0.8 },
                      opacity: { duration: 1.3, times: [0, 0.1, 0.9, 1], repeat: Infinity, repeatDelay: 0.5, delay: 0.8 },
                      scale: { duration: 0.3, repeat: Infinity, repeatDelay: 1.5, delay: 0.8 }
                    }}
                  />
                  <motion.circle
                    r="2"
                    fill="#b388ff"
                    filter="url(#branchGlow)"
                    style={{ offsetPath: "path('M 50% 50% Q 37% 50%, 25% 50%')" }}
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{
                      offsetDistance: ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      offsetDistance: { duration: 0.9, ease: "linear", repeat: Infinity, repeatDelay: 1, delay: 1.1 },
                      opacity: { duration: 0.9, times: [0, 0.1, 0.9, 1], repeat: Infinity, repeatDelay: 1, delay: 1.1 },
                      scale: { duration: 0.3, repeat: Infinity, repeatDelay: 1.5, delay: 1.1 }
                    }}
                  />
                </>
              )}
            </motion.g>
          </svg>

          {/* --- Layer 4: Central Neuron Core --- */}
          <motion.div
            className="absolute"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            {/* Core glow aura */}
            <motion.div
              className="absolute"
              style={{
                width: "80px",
                height: "80px",
                left: "-40px",
                top: "-40px",
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)",
                filter: "blur(20px)",
                borderRadius: "50%"
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 1.15, 1],
                opacity: [0, 1, 0.9, 1, 0.9]
              }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
              }}
              transition={{
                scale: {
                  duration: 2.5,
                  times: [0, 0.3, 0.65, 1],
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 3,
                  times: [0, 0.3, 0.5, 0.7, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />

            {/* Core neuron body */}
            <motion.div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#ffffff",
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(77, 208, 225, 0.4)",
                position: "relative",
                left: "-6px",
                top: "-6px"
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 1.15, 1],
                opacity: [0, 1, 0.9, 1, 0.9]
              }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
              }}
              transition={{
                scale: {
                  duration: 2.5,
                  times: [0, 0.3, 0.65, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                },
                opacity: {
                  duration: 3,
                  times: [0, 0.3, 0.5, 0.7, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }}
            />
          </motion.div>

          {/* --- Layer 5: Progress Indicator --- */}
          <motion.div
            className="absolute"
            style={{
              bottom: "clamp(60px, 12vh, 100px)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
            transition={{
              opacity: { duration: 0.6, delay: 0.5 },
              y: { duration: 0.6, delay: 0.5, ease: "easeOut" }
            }}
          >
            {/* Progress line container */}
            <div
              style={{
                width: "clamp(180px, 40vw, 240px)",
                height: "2px",
                background: "rgba(176, 190, 197, 0.15)",
                borderRadius: "999px",
                overflow: "hidden",
                position: "relative"
              }}
            >
              {/* Filled progress */}
              <motion.div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #4dd0e1 0%, #7c4dff 100%)",
                  borderRadius: "999px",
                  boxShadow: "0 0 10px rgba(77, 208, 225, 0.6)"
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Status text */}
            <motion.p
              className="text-sm font-light"
              style={{
                color: "#b0bec5",
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "0.05em"
              }}
              animate={{
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Growing connections...
            </motion.p>
          </motion.div>

        </motion.div>
      )}

      {/* --- Layer 6: Exit Particle Burst --- */}
      {isComplete && (
        <motion.div key="exit-particles" className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center">
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            const distance = 200 + Math.random() * 100;

            return (
              <motion.div
                key={`exit-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: "4px",
                  height: "4px",
                  background: i % 2 === 0 ? "#4dd0e1" : "#7c4dff",
                  boxShadow: `0 0 10px ${i % 2 === 0 ? "#4dd0e1" : "#7c4dff"}`,
                  left: "50%",
                  top: "50%"
                }}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  scale: 0,
                  opacity: 0
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
              />
            );
          })}

          {/* Central Flash */}
          <motion.div
            className="absolute rounded-full bg-white"
            style={{ width: "20px", height: "20px" }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}