'use client';

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Rocket, Globe, Brain, Fingerprint, Target, ArrowRight, Sparkles } from 'lucide-react';
import VisionBackground from '@/components/ui/VisionBackground';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💎 CONSTANTS & DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MANIFESTO_QUOTES = [
  "AI should amplify human creativity, not replace it",
  "Technology must serve people with empathy and purpose",
  "Innovation without ethics is just clever engineering",
  "The future belongs to those who build with intention"
];

const PILLARS = [
  {
    id: 'human-ai',
    icon: Brain,
    title: 'Human-Centered AI',
    desc: 'Building intelligent systems that understand context, emotion, and human needs—not just data patterns.',
    accent: 'cyan',
    glowColor: 'rgba(6,182,212,0.5)',
  },
  {
    id: 'global',
    icon: Globe,
    title: 'Global Impact',
    desc: 'Creating solutions that scale across borders, cultures, and communities to solve real-world problems.',
    accent: 'purple',
    glowColor: 'rgba(168,85,247,0.5)',
  },
  {
    id: 'ethics',
    icon: Fingerprint,
    title: 'Ethical Innovation',
    desc: 'Pioneering technology that respects privacy, promotes transparency, and operates with integrity.',
    accent: 'pink',
    glowColor: 'rgba(236,72,153,0.5)',
  }
];
const VENTURES = [
  {
    title: 'AI for Education',
    description: 'Personalized learning systems that adapt to individual needs, making quality education accessible to everyone.',
    status: 'Concept',
  },
  {
    title: 'Creative Intelligence',
    description: 'Platforms that enhance human creativity through AI—helping artists, writers, and makers push boundaries.',
    status: 'Research',
  },
  {
    title: 'Ethical Automation',
    description: 'Automation frameworks that prioritize human wellbeing, job transformation, and sustainable growth.',
    status: 'Exploration',
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎨 UTILITY COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 💎 Premium Card (MVP Optimized - Static)
 */
const HoloCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`relative group rounded-3xl border border-white/10 bg-black/50 backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Static Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.15), transparent 70%)' }}
      />

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Inner Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>

      {/* Ambient Glow Pulse (Simplified) */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </div>
  );
};

/**
  * ✨ Hexagonal Pillar Card with Flip Animation
 */
const PillarCard = ({
  pillar,
  index
}: {
  pillar: typeof PILLARS[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glowBg = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${pillar.glowColor}, transparent 70%)`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.15,
        duration: 0.9,
        type: "spring",
        stiffness: 60,
      }}
      onMouseMove={handleMouseMove}
      className="group perspective-1000"
    >
      <div className="relative h-full p-10 rounded-3xl bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 25px 50px -12px ${pillar.glowColor.replace('0.5', '0.15')}`,
        }}
      >
        {/* Hover Gradient Overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: glowBg }}
        />

        {/* Particle Atmosphere for Each Card */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-${pillar.accent}-400`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Holographic Icon */}
        <motion.div
          className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br from-${pillar.accent}-500/30 to-${pillar.accent}-700/10 flex items-center justify-center mb-8 ring-1 ring-${pillar.accent}-500/50 shadow-lg shadow-${pillar.accent}-500/20`}
          whileHover={{
            scale: 1.15,
            rotate: 360,
            boxShadow: `0 0 30px ${pillar.glowColor}`,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            rotate: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <pillar.icon className={`w-10 h-10 text-${pillar.accent}-300`} />
        </motion.div>

        <h3 className={`text-3xl font-bold mb-5 text-white group-hover:text-${pillar.accent}-200 transition-colors duration-500`}>
          {pillar.title}
        </h3>

        <p className="text-lg text-blue-200/60 leading-relaxed group-hover:text-blue-100/80 transition-colors duration-500">
          {pillar.desc}
        </p>

        {/* Animated Bottom Accent Line */}
        <motion.div
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${pillar.accent}-500 to-transparent`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
        />
      </div>
    </motion.div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 MAIN VISION PAGE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function VisionPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress (Simplified)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ACT 1: Hero Parallax (Simplified)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 50]);

  return (
    <main
      ref={containerRef}
      className="relative min-h-[400vh] bg-[#020202] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🌌 GLOBAL ATMOSPHERIC BACKGROUND LAYERS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <VisionBackground />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🎬 ACT 1: THE ARRIVAL - Hero Section */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-screen flex items-center justify-center sticky top-0 z-10">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="text-center relative z-20 px-6 max-w-6xl"
        >
          {/* Glowing Badge */}
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-12 relative overflow-hidden"
          >
            <Rocket className="w-5 h-5 text-cyan-400 relative z-10" />
            <span className="text-sm font-semibold tracking-[0.15em] text-cyan-100/90 uppercase relative z-10">
              The Future I'm Building
            </span>
          </div>

          {/* Title (Simplified Animation) */}
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-10">
            <div className="flex justify-center gap-6 flex-wrap">
              {['Building', 'The', 'Future'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + i * 0.15,
                    ease: "easeOut",
                  }}
                  className={`inline-block ${word === 'Future'
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-600 drop-shadow-[0_0_40px_rgba(6,182,212,0.4)]'
                    : 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                    }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl sm:text-2xl lg:text-3xl text-blue-200/70 max-w-4xl mx-auto leading-relaxed font-light tracking-wide"
          >
            Constructing intelligent systems that don't just{' '}
            <span className="text-cyan-400 font-semibold">work smart</span>, but{' '}
            <span className="text-purple-400 font-semibold">feel right</span>.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-medium">
            Explore the Vision
          </span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-cyan-500/80 via-purple-500/40 to-transparent rounded-full" />
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🎬 ACT 2: THE DECLARATION - Cinematic Quote */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-20 py-40 px-6 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <HoloCard className="p-14 sm:p-20 lg:p-28 text-center">
            {/* Central Icon */}
            <Target className="w-20 h-20 text-cyan-400 mx-auto mb-10 opacity-80" />

            {/* Main Manifesto Quote */}
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-12 tracking-tight">
                "The best way to predict the future is to{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                    build it
                  </span>
                </span>
                —with intelligence, empathy, and purpose."
              </h2>

              {/* Manifesto Principles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
                {MANIFESTO_QUOTES.map((quote, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 text-left p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-300 border border-transparent hover:border-white/10 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <p className="text-lg sm:text-xl text-blue-100/70 font-light group-hover:text-blue-50 transition-colors">
                      {quote}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </HoloCard>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🎬 ACT 3: THE FOUNDATION - Vision Pillars */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-20 py-40 overflow-hidden bg-black">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-32"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              Core Foundations
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-6 rounded-full" />
            <p className="text-xl text-blue-200/60 max-w-2xl mx-auto">
              The architectural principles guiding every system I build
            </p>
          </motion.div>

          {/* Pillar Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.id} pillar={pillar} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🎬 ACT 4: THE FUTURE - Venture Exploration */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-20 py-40 bg-gradient-to-b from-transparent via-[#0a0a15]/50 to-transparent border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-5 mb-20"
          >
            <Sparkles className="w-10 h-10 text-yellow-400 opacity-80" />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              Future Ventures
            </h2>
          </motion.div>

          {/* Venture Cards */}
          <div className="space-y-8">
            {VENTURES.map((venture, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-10 sm:p-12 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-5">
                        <h3 className="text-3xl sm:text-4xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                          {venture.title}
                        </h3>
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/80 backdrop-blur-sm">
                          {venture.status}
                        </span>
                      </div>
                      <p className="text-lg sm:text-xl text-blue-200/60 max-w-3xl leading-relaxed group-hover:text-blue-100/90 transition-colors">
                        {venture.description}
                      </p>
                    </div>

                    <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-sm shrink-0">
                      <ArrowRight className="w-7 h-7 text-white/60 group-hover:text-cyan-300 transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}