"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HeroSplash } from "./HeroSplash";

function OrbitalBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative inline-block mb-8"
    >
      <div className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-md">
        <Cpu size={18} className="text-cyan-400" />
        <span className="text-sm font-semibold text-cyan-100 tracking-wide">
          AI Innovator & Future Founder
        </span>
      </div>
    </motion.div>
  );
}

export function CinematicHero() {
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
    return <HeroSplash />;
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <SectionDivider position="top" />

      {/* Background Effects - Optimized */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0a0f1e] to-[#020617]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 py-32 text-center max-w-7xl">
        <OrbitalBadge />

        <div className="mb-12 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight tracking-tight text-slate-100"
          >
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Intelligence
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight text-slate-200"
          >
            with{" "}
            <span className="inline-block min-w-[200px] text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {words[currentWordIndex]}
            </span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
        >
          I'm <span className="text-cyan-400 font-semibold">Piyush</span>, an 18-year-old AI & Data Science learner exploring how technology can create meaningful impact.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/work" className="w-full sm:w-auto">
            <button className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:-translate-y-1">
              <span className="flex items-center justify-center gap-2">
                Explore My Work
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>

          <Link href="/connect" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 border border-slate-700 rounded-full font-semibold text-slate-200 hover:bg-slate-800 hover:border-cyan-500/50 transition-all hover:-translate-y-1">
              Let's Connect
            </button>
          </Link>
        </motion.div>
      </div >
    </section >
  );
}
