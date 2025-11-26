'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Rocket, Globe, Brain, Fingerprint, Target, ArrowRight, Sparkles } from 'lucide-react';

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
 * 🌌 Enhanced Geometric Particle Field
 * Renders mix of shapes with depth and parallax
 */
const ParticleField = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 3,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
      rotation: Math.random() * 360,
      blur: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
          }}
          animate={{
            y: [0, -150, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
            rotate: [p.rotation, p.rotation + 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {p.shape === 'circle' && (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/80 to-blue-600/80" />
          )}
          {p.shape === 'square' && (
            <div className="w-full h-full bg-gradient-to-br from-purple-400/60 to-pink-600/60" style={{ transform: `rotate(${p.rotation}deg)` }} />
          )}
          {p.shape === 'triangle' && (
            <div
              className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-cyan-500/70"
              style={{ transform: `rotate(${p.rotation}deg)` }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

/**
 * 🌫️ Cinematic Fog Layer
 */
const FogLayer = ({
  color = "from-blue-500/20",
  delay = 0,
  duration = 25,
  direction = 'horizontal'
}: {
  color?: string;
  delay?: number;
  duration?: number;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
}) => {
  const movement = direction === 'horizontal'
    ? { x: ['-30%', '30%', '-30%'], y: ['-5%', '5%', '-5%'] }
    : direction === 'vertical'
      ? { x: ['-5%', '5%', '-5%'], y: ['-30%', '30%', '-30%'] }
      : { x: ['-20%', '20%', '-20%'], y: ['-20%', '20%', '-20%'] };

  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-br ${color} blur-[120px] opacity-20 mix-blend-screen pointer-events-none`}
      animate={{
        ...movement,
        scale: [1, 1.3, 1],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

/**
 * 💎 Premium Holographic Card with Advanced 3D Tilt
 */
const HoloCard = ({
  children,
  className = "",
  accentColor = "cyan"
}: {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowBg = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 40%)`;
  const borderGlow = useMotionTemplate`radial-gradient(450px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.4), transparent 40%)`;

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, z: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative group rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl overflow-hidden ${className}`}
    >
      {/* Animated Border Glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: borderGlow }}
      />

      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: glowBg }}
      />

      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Inner Content with 3D Transform */}
      <div className="relative z-20 h-full" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>

      {/* Ambient Glow Pulse */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
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

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ACT 1: Hero Parallax
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 150]);

  // Background Parallax
  const bgGridY = useTransform(scrollYProgress, [0, 1], [0, 800]);
  const particleY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Quote Card Parallax & 3D Effects
  const quoteScale = useTransform(scrollYProgress, [0.15, 0.3], [0.9, 1]);
  const quoteOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.6, 0.7], [0, 1, 1, 0]);
  const quoteRotateX = useTransform(scrollYProgress, [0.15, 0.25], [15, 0]);

  // Portal Effect at End
  const portalScale = useTransform(scrollYProgress, [0.85, 1], [0.8, 1.2]);
  const portalOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  return (
    <main
      ref={containerRef}
      className="relative min-h-[500vh] bg-[#020202] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🌌 GLOBAL ATMOSPHERIC BACKGROUND LAYERS */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="fixed inset-0 z-0">
        {/* Base Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#050510] to-[#020202]" />

        {/* Infinite Receding Grid (Far Layer Z-5) */}
        <motion.div
          style={{ y: bgGridY }}
          className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(6,182,212,0.03)_1.5px,transparent_1.5px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] opacity-30"
        />

        {/* Starfield */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Cinematic Fog Layers (Z-4, Z-3) */}
        <FogLayer color="from-indigo-900/30 to-blue-900/20" delay={0} duration={35} direction="diagonal" />
        <FogLayer color="from-cyan-900/20 to-purple-900/30" delay={8} duration={40} direction="horizontal" />
        <FogLayer color="from-purple-900/25 to-pink-900/15" delay={15} duration={45} direction="vertical" />

        {/* Geometric Particle Field (Z-2) */}
        <motion.div style={{ y: particleY }} className="absolute inset-0">
          <ParticleField />
        </motion.div>

        {/* Volumetric Light Rays (Z-1) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-40 mix-blend-screen pointer-events-none" />

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,2,2,0.8)_100%)]" />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🎬 ACT 1: THE ARRIVAL - Hero Section */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative h-screen flex items-center justify-center sticky top-0 z-10">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="text-center relative z-20 px-6 max-w-6xl"
        >
          {/* Glowing Badge with Ring Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-12 relative overflow-hidden"
          >
            {/* Rotating Ring Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-500/50"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            <Rocket className="w-5 h-5 text-cyan-400 relative z-10" />
            <span className="text-sm font-semibold tracking-[0.15em] text-cyan-100/90 uppercase relative z-10">
              The Future I'm Building
            </span>
          </motion.div>

          {/* Title with Particle Assembly Effect */}
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-10">
            <div className="flex justify-center gap-6 flex-wrap">
              {['Building', 'The', 'Future'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 120,
                    rotateX: 90,
                    filter: 'blur(30px)',
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: 0.3 + i * 0.25,
                    type: "spring",
                    stiffness: 50,
                    damping: 12,
                  }}
                  className={`inline-block ${word === 'Future'
                    ? 'text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-600 drop-shadow-[0_0_40px_rgba(6,182,212,0.6)]'
                    : 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    }`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>

          {/* Subtitle with Typewriter Effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1.8 }}
            className="text-xl sm:text-2xl lg:text-3xl text-blue-200/70 max-w-4xl mx-auto leading-relaxed font-light tracking-wide"
          >
            Constructing intelligent systems that don't just{' '}
            <span className="text-cyan-400 font-semibold">work smart</span>, but{' '}
            <span className="text-purple-400 font-semibold">feel right</span>.
          </motion.p>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
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
      <section className="relative z-20 py-40 px-6">
        <motion.div
          style={{
            scale: quoteScale,
            opacity: quoteOpacity,
            rotateX: quoteRotateX,
          }}
          className="container mx-auto max-w-6xl"
        >
          <HoloCard className="p-14 sm:p-20 lg:p-28 text-center">
            {/* Pulsing Central Icon */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Target className="w-20 h-20 text-cyan-400 mx-auto mb-10" />
            </motion.div>

            {/* Main Manifesto Quote */}
            <div className="relative">
              {/* Decorative Circuit Lines */}
              <div className="absolute -left-[5%] sm:-left-[8%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />
              <div className="absolute -right-[5%] sm:-right-[8%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-purple-500/40 to-transparent" />

              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-12 tracking-tight">
                "The best way to predict the future is to{' '}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                    build it
                  </span>
                  {/* Underline Glow */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
                —with intelligence, empathy, and purpose."
              </h2>

              {/* Manifesto Principles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
                {MANIFESTO_QUOTES.map((quote, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.15, duration: 0.8 }}
                    className="flex items-start gap-4 text-left p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-500 border border-transparent hover:border-white/10 group"
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0"
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(6,182,212,0.8)',
                          '0 0 20px rgba(6,182,212,1)',
                          '0 0 10px rgba(6,182,212,0.8)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-lg sm:text-xl text-blue-100/70 font-light group-hover:text-blue-50 transition-colors">
                      {quote}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </HoloCard>
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🎬 ACT 3: THE FOUNDATION - Vision Pillars */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-20 py-40 overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-32"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              Core Foundations
            </h2>
            <motion.div
              className="w-32 h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <p className="text-xl text-blue-200/60 max-w-2xl mx-auto">
              The architectural principles guiding every system I build
            </p>
          </motion.div>

          {/* Pillar Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto" style={{ perspective: 1500 }}>
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.id} pillar={pillar} index={i} />
            ))}
          </div>

          {/* Connection Lines Between Pillars */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[2px] pointer-events-none opacity-30 hidden md:block">
            <motion.line
              x1="16%"
              y1="50%"
              x2="50%"
              y2="50%"
              stroke="url(#gradient1)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.line
              x1="50%"
              y1="50%"
              x2="84%"
              y2="50%"
              stroke="url(#gradient2)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.7 }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(6,182,212,0)" />
                <stop offset="50%" stopColor="rgba(6,182,212,0.6)" />
                <stop offset="100%" stopColor="rgba(168,85,247,0)" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(168,85,247,0)" />
                <stop offset="50%" stopColor="rgba(236,72,153,0.6)" />
                <stop offset="100%" stopColor="rgba(236,72,153,0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🎬 ACT 4: THE FUTURE - Venture Exploration */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-20 py-40 bg-gradient-to-b from-transparent via-[#0a0a15]/50 to-transparent backdrop-blur-sm border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center gap-5 mb-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10 text-yellow-400" />
            </motion.div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              Future Ventures
            </h2>
          </motion.div>

          {/* Venture Cards */}
          <div className="space-y-8">
            {VENTURES.map((venture, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.2, duration: 0.9 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-10 sm:p-12 hover:border-white/20 transition-all duration-700 hover:shadow-[0_0_60px_rgba(6,182,212,0.15)]">
                  {/* Animated Background Orb */}
                  <motion.div
                    className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-[100px] transition-opacity duration-1000"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

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

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 45 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all duration-500 backdrop-blur-sm shrink-0"
                    >
                      <ArrowRight className="w-7 h-7 text-white/60 group-hover:text-cyan-300 transition-colors" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🎬 ACT 5: THE PORTAL - CTA Section */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Portal Ring Effect */}
        <motion.div
          style={{ scale: portalScale, opacity: portalOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Multiple Expanding Rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-500/30"
              style={{
                width: `${400 + i * 200}px`,
                height: `${400 + i * 200}px`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: i % 2 === 0 ? [0, 360] : [360, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Central Glow Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
        </motion.div>

        {/* CTA Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          {/* Main Heading with Gradient Fade */}
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-10 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/30">
            Ready to Build?
          </h2>

          <p className="text-xl sm:text-2xl lg:text-3xl text-blue-200/70 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
            Let's create the technology that defines the next era of{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold">
                human innovation
              </span>
              {/* Animated Underline */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>
          </p>

          {/* CTA Button with Advanced Hover Effects */}
          <a href="/connect" className="group relative inline-flex items-center justify-center">
            {/* Outer Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative px-12 py-6 bg-[#020202] rounded-full border-2 border-white/20 text-xl sm:text-2xl font-bold text-white flex items-center gap-4 overflow-hidden backdrop-blur-xl group-hover:border-cyan-400/50 transition-all duration-500"
            >
              {/* Inner Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
                Start the Journey
              </span>

              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-7 h-7 relative z-10 group-hover:text-cyan-400 transition-colors" />
              </motion.div>
            </motion.button>
          </a>

          {/* Bottom Accent Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 1.5 }}
            className="mt-12 text-sm text-white/30 tracking-[0.2em] uppercase"
          >
            The Future Awaits
          </motion.p>
        </motion.div>

        {/* Upward Flowing Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
              }}
              animate={{
                y: [0, -1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </section>

    </main>
  );
}