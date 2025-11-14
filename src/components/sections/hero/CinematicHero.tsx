"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Zap, Code2, Brain } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { ParticleField } from "@/components/3d/ParticleField";

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

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

      {/* 3D Particle Background - PRESERVED */}
      <div className="hidden md:block absolute inset-0 z-0 opacity-30">
        <ParticleField />
      </div>

      {/* Main Content Container */}
      <motion.div
        style={{ opacity, scale, y }}
        className="container relative z-10 mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-32 text-center"
      >
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

        {/* Cinematic Typography Hero - PARALLAX REMOVED */}
        <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3">
          {/* Line 1: Building Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.5,
              ease: [0.22, 0.9, 0.36, 1],
            }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[1.1] tracking-tight">
              <span className="inline-block text-white">
                Building{" "}
              </span>
              <span className="inline-block text-gradient-heading">
                Intelligence
              </span>
            </h1>
          </motion.div>
          
          {/* Line 2: with [Rotating Word] */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.7,
              ease: [0.22, 0.9, 0.36, 1],
            }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] tracking-tight"
          >
            <span className="text-white">with </span>
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

        {/* Premium Subtitle - FIXED "PIYUSH" VISIBILITY */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 0.9, 0.36, 1] }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-muted max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            I'm <span className="text-white font-semibold">Piyush</span>, an 18-year-old AI & Data Science learner
            <br className="hidden sm:block" />
            exploring how technology can create meaningful impact
          </p>
        </motion.div>

        {/* Premium CTA Buttons - MATCHED THEME */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 0.9, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20 px-4"
        >
          {/* Primary CTA - Explore My Work - GHOST STYLE */}
          <Link href="/work" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-accent-cyan to-accent-lavender font-heading font-semibold text-base overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] transition-shadow"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-background">
                Explore My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </Link>
          
          {/* Secondary CTA - Let's Connect - GHOST STYLE */}
          <Link href="/connect" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(34, 211, 238, 1)",
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl border-2 border-accent-cyan/40 bg-transparent backdrop-blur-xl hover:bg-accent-cyan/5 transition-all duration-300 font-heading font-semibold text-sm sm:text-base group"
            >
              <span className="text-white group-hover:text-accent-cyan transition-colors">
                Let's Connect
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Premium Stats Grid - FULLY REDESIGNED */}
        {/* Stats Grid */}
        <motion.div
  // कंटेनर एनिमेशन की गति वही रखी गई है
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
  className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto px-6"
>
  {[
    { value: "18", label: "Years Old", icon: Sparkles },
    { value: "AI/ML", label: "Focus Area", icon: Brain },
    { value: "∞", label: "Learning", icon: Zap },
    { value: "Future", label: "Founder", icon: Code2 },
  ].map((stat, index) => (
    <motion.div
      key={stat.label}
      // एंट्री एनिमेशन की गति वही रखी गई है
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.0 + index * 0.05,
        duration: 1.5,
        type: "spring",
        stiffness: 100,
        damping: 14,
      }}
      whileHover={{
        y: -8, // थोड़ा कम ऊपर उठे
        scale: 1.025, // थोड़ा कम बड़ा हो
        boxShadow: "0 15px 30px rgba(34, 211, 238, 0.2)",
      }}
      // FASTEST REACTION FIX: CSS ट्रांज़िशन को सबसे तेज़ 'duration-75' (75ms) पर सेट किया गया है
      className="relative bg-glass backdrop-blur-xl rounded-2xl p-4 border border-overlay-medium hover:border-accent-cyan/60 transition-all duration-75 group cursor-pointer overflow-hidden transform-gpu"
    >
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center h-full"> 
        
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          // ICON REACTION FIX: आइकन मोशन को सबसे तेज़ 0.1s पर सेट किया गया है
          transition={{ duration: 0.1 }} 
          className="p-2 rounded-full bg-overlay-medium/50 mb-2"
        >
          <stat.icon className="w-5 h-5 text-accent-cyan" /> 
        </motion.div>
        
        <div className="text-4xl md:text-5xl font-heading font-black text-gradient-heading mb-1 transition-colors duration-75">
          {stat.value}
        </div>
        
        <div className="text-sm text-muted">
          {stat.label}
        </div>
      </div>
    </motion.div>
  ))}
</motion.div>
      </motion.div>

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
