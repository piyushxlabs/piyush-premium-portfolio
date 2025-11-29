"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
}

/**
 * MVP Optimized Loader
 * Lightweight, elegant, and fast.
 */
export function PageLoader({ isLoading: externalLoading, onComplete }: PageLoaderProps = {}) {
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fast simulated loading
    const timer = setTimeout(() => {
      setIsComplete(true);
    }, 800); // Reduced from ~3-4s to 0.8s

    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {!isComplete && (
        <motion.div
          key="mvp-loader"
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#020617]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Simple Elegant Spinner */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20" />
              <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
            </div>

            <span className="text-cyan-400/80 text-sm font-mono tracking-[0.2em] uppercase">
              Loading
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}