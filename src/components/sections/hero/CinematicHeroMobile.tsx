"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Zap, Code2, Brain, Cpu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function AnimatedNumber({ value, delay }: { value: string | number; delay: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    setInView(true);
  }, []);
  
  useEffect(() => {
    if (!inView || typeof value !== "number") return;
    
    const duration = 1500;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    setTimeout(animate, delay * 1000);
  }, [inView, value, delay]);
  
  if (typeof value === "string") return <>{value}</>;
  
  return <>{displayValue}</>;
}

function SimpleBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative inline-block mb-6"
    >
      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 backdrop-blur-sm">
        <Cpu size={16} className="text-cyan-400" />
        <span className="text-xs font-semibold text-white">
          AI Innovator & Future Founder
        </span>
      </div>
    </motion.div>
  );
}

export function CinematicHeroMobile() {
  const [mounted, setMounted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ["Impact", "Innovation", "Purpose", "Vision", "Future"];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="container relative z-10 mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl font-heading font-bold">
            <span className="text-slate-100">Building </span>
            <span className="text-gradient-heading">Intelligence</span>
          </h1>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />

        {[
          { size: "w-[300px] h-[300px]", pos: "top-10 -left-10", color: "cyan", blur: "blur-[60px]" },
          { size: "w-[250px] h-[250px]", pos: "bottom-20 -right-10", color: "purple", blur: "blur-[50px]" },
        ].map((orb, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute ${orb.size} ${orb.pos} bg-${orb.color}-500/20 rounded-full ${orb.blur}`}
          />
        ))}

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-16 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
            }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-6 py-24 text-center max-w-7xl"
      >
        <SimpleBadge />

        <div className="mb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight">
              <span className="text-slate-100">Building </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                Intelligence
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-4xl font-heading font-bold"
          >
            <span className="text-slate-200">with </span>
            <motion.span
              key={currentWordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            >
              {words[currentWordIndex]}
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-12"
        >
          <div className="inline-block backdrop-blur-sm bg-white/[0.02] rounded-2xl px-6 py-4 border border-white/10">
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold">Piyush</span>, an 18-year-old AI & Data Science learner
              <br className="hidden sm:block" />
              exploring how technology can create meaningful impact
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col gap-4 mb-16 px-4"
        >
          <Link href="/work" className="w-full">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full px-10 py-4 text-base font-semibold rounded-full"
              style={{
                background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
              }}
            >
              <span className="flex items-center justify-center gap-2 text-slate-900 font-bold">
                Explore My Work
                <ArrowRight size={20} />
              </span>
            </motion.button>
          </Link>

          <Link href="/connect" className="w-full">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full px-10 py-4 text-base font-semibold rounded-full border-2 border-cyan-400/30 bg-transparent backdrop-blur-sm"
            >
              <span className="text-cyan-400">
                Let's Connect
              </span>
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="grid grid-cols-2 gap-3 max-w-2xl mx-auto px-4"
        >
          {[
            { value: "18", label: "Years Old", icon: Sparkles, color: "cyan" },
            { value: "AI/ML", label: "Focus Area", icon: Brain, color: "purple" },
            { value: "∞", label: "Learning", icon: Zap, color: "pink" },
            { value: "Future", label: "Founder", icon: Code2, color: "blue" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.2 + index * 0.1,
                duration: 0.5,
              }}
              className="backdrop-blur-sm bg-white/[0.02] rounded-xl p-5 border border-white/10"
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-3"
                  style={{
                    boxShadow: `0 8px 30px -8px rgba(${stat.color === 'cyan' ? '6, 182, 212' : stat.color === 'purple' ? '168, 85, 247' : stat.color === 'pink' ? '236, 72, 153' : '59, 130, 246'}, 0.5)`,
                  }}
                >
                  <stat.icon className="w-full h-full text-slate-900" strokeWidth={2.5} />
                </div>

                <div className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  <AnimatedNumber
                    value={stat.value === "18" ? 18 : stat.value}
                    delay={1.2 + index * 0.1}
                  />
                </div>

                <div className="text-xs text-slate-300 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Scroll
          </span>
          <div className="p-2 rounded-full border-2 border-cyan-400/30 bg-white/5 backdrop-blur-sm">
            <ChevronDown className="w-4 h-4 text-cyan-400" />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
