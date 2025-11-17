"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Zap, Code2, Brain } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";

const FloatingGeometry = dynamic(() => import("@/components/3d/FloatingGeometry").then(mod => ({ default: mod.FloatingGeometry })), { ssr: false });

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic word rotation
  const words = ["Impact", "Empathy", "Purpose", "Innovation", "Vision"];

  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Layers - PRESERVED */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-accent-cyan/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-accent-lavender/20 rounded-full blur-3xl"
        />
      </div>

      {/* 3D Floating Geometry Background */}
      <div className="absolute inset-0 w-full h-full z-[-1] opacity-50 pointer-events-none select-none hidden md:block overflow-visible">
        <Suspense fallback={null}>
          <FloatingGeometry />
        </Suspense>
      </div>

      {/* Main Content Container */}
      <div className="container relative z-10 mx-auto px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-32 text-center max-w-7xl">
        {/* Premium Floating Badge - FIXED VISIBILITY */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.3,
            type: "spring",
            stiffness: 100,
          }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/5 border border-accent-cyan/30 backdrop-blur-xl mb-6 sm:mb-8 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_50px_rgba(34,211,238,0.3)] transition-all duration-500 cursor-default"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={16} className="text-accent-cyan" />
          </motion.div>
          <span className="text-xs sm:text-sm font-medium text-white">
            AI Innovator & Future Founder
          </span>
        </motion.div>

        {/* Enhanced Cinematic Typography Hero */}
        <div className="mb-8 sm:mb-10 space-y-3 sm:space-y-4">
          {/* Line 1: Building Intelligence - ENHANCED HIERARCHY */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.5,
              ease: [0.22, 0.9, 0.36, 1],
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[1.05] tracking-tight">
              <span className="inline-block text-slate-100">
                Building{" "}
              </span>
              <span className="inline-block text-gradient-heading relative text-[1.15em] drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                Intelligence
              </span>
            </h1>
          </motion.div>
          
          {/* Line 2: with [Rotating Word] - ENHANCED */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.7,
              ease: [0.22, 0.9, 0.36, 1],
            }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] tracking-tight"
          >
            <span className="text-slate-100">with </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ 
                  opacity: 0, 
                  y: 40, 
                  filter: "blur(10px)",
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                }}
                exit={{ 
                  opacity: 0, 
                  y: -40, 
                  filter: "blur(10px)",
                }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.22, 0.9, 0.36, 1],
                }}
                className="inline-block text-gradient-heading"
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Spotlight Background Behind Headline */}
        <div className="absolute inset-0 bg-gradient-radial from-accent-cyan/5 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* Enhanced Premium Subtitle - Improved Visibility */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 0.9, 0.36, 1] }}
          className="mb-12 sm:mb-14 relative z-10"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-200 max-w-[60ch] mx-auto leading-relaxed px-4 font-light">
            I'm <span className="text-slate-100 font-semibold">Piyush</span>, an 18-year-old AI & Data Science learner
            <br className="hidden sm:block" />
            exploring how technology can create meaningful impact
          </p>
        </motion.div>

        {/* Premium CTA Buttons - ENHANCED DESIGN */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 0.9, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 sm:mb-20 px-4"
        >
          {/* Primary CTA - Premium Gradient Button with Magnetic Effect */}
          <Link href="/work" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ 
                scale: 1.04, 
                y: -4,
                boxShadow: "0 0 60px rgba(34, 211, 238, 0.6)"
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
              }}
              className="group relative w-full sm:w-auto px-10 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-accent-cyan via-accent-lavender to-accent-cyan bg-[length:200%_100%] text-background shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:bg-[position:100%_0] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>
          
          {/* Secondary CTA - Ghost Button with Animated Border */}
          <Link href="/connect" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                y: -4,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
              }}
              className="group relative w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full border-2 border-accent-cyan/30 bg-transparent backdrop-blur-xl hover:bg-accent-cyan/5 hover:border-accent-cyan transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 via-accent-lavender/10 to-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 text-slate-100 group-hover:text-accent-cyan transition-colors">
                Let's Connect
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Enhanced Premium Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto px-6"
        >
          {[
            { value: "18", label: "Years Old", icon: Sparkles },
            { value: "AI/ML", label: "Focus Area", icon: Brain },
            { value: "∞", label: "Learning", icon: Zap },
            { value: "Future", label: "Founder", icon: Code2 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 14,
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              transition={{ duration: 0.2 }}
              className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-cyan-500/20 hover:border-accent-cyan/60 shadow-xl shadow-cyan-500/5 hover:shadow-cyan-500/20 transition-all duration-200 group cursor-pointer overflow-hidden"
            >
              <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center h-full">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-3 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-200">
                  <stat.icon className="w-full h-full text-slate-900" />
                </div>
                <div className="text-4xl md:text-5xl font-heading font-bold text-gradient-heading mb-1">
                  {stat.value}
                </div>
                <div className="text-base text-slate-300">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Premium Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-[10px] sm:text-xs text-muted uppercase tracking-wider group-hover:text-accent-cyan transition-colors hidden sm:block">
            Scroll to explore
          </span>
          <motion.div 
            className="p-2 rounded-full border border-accent-cyan/30 group-hover:border-accent-cyan group-hover:bg-accent-cyan/10 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
