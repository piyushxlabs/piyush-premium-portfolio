// File: [piyush-premium-portfolio\src\app\(pages)\about\page.tsx]

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Heart, Lightbulb, Target } from 'lucide-react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { PremiumBox } from '@/components/ui/PremiumBox';

const values = [
  { 
    icon: Sparkles, 
    title: 'Curiosity', 
    description: 'Always exploring how intelligence works in humans and machines',
    expandedText: 'Asking questions, testing assumptions, and diving deep into how intelligence emerges—from neurons to neural networks.'
  },
  { 
    icon: Heart, 
    title: 'Empathy', 
    description: 'Building technology that feels human and serves people',
    expandedText: 'Technology should enhance human connection, not replace it. Every system I build considers the human experience first.'
  },
  { 
    icon: Lightbulb, 
    title: 'Innovation', 
    description: 'Blending ideas, tools, and logic to create something new',
    expandedText: 'Innovation happens at intersections—combining unexpected disciplines to create breakthrough solutions.'
  },
  { 
    icon: Target, 
    title: 'Purpose', 
    description: 'Every project exists to make life better, not just smarter',
    expandedText: 'Intelligence without purpose is just computation. I build systems that solve real problems for real people.'
  },
];

const journey = [
  { 
    phase: 'The Spark', 
    story: 'It started with a question: How can machines think, learn, and understand like humans? That curiosity became my compass.',
    color: 'cyan'
  },
  { 
    phase: 'The Journey', 
    story: 'From Python basics to neural networks, I explored AI through experiments, failures, and breakthroughs—learning that intelligence is built, not given.',
    color: 'purple'
  },
  { 
    phase: 'The Purpose', 
    story: 'I realized AI isn\'t just technology—it\'s a reflection of how we think and dream. My mission: create systems that enhance creativity and empower people.',
    color: 'blue'
  },
  { 
    phase: 'The Vision', 
    story: 'Building AI startups that combine innovation with impact—tools that don\'t just automate work, but amplify human potential.',
    color: 'violet'
  },
];

// Particle component for background
const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${particle.opacity})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{ zIndex: 0 }}
    />
  );
};

// Custom cursor component
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full pointer-events-none mix-blend-difference hidden lg:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        zIndex: 9999,
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.8), rgba(0, 229, 255, 0) 70%)',
        filter: 'blur(8px)',
      }}
    />
  );
};

export default function AboutPage() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const aboutInView = useInView(aboutSectionRef, { once: true, amount: 0.3 });
  const quoteInView = useInView(quoteRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0A0E1A] via-[#0F1419] to-[#0A0E1A]">
      {/* Particle Field Background */}
      <ParticleField />
      
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-lavender/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* HERO SECTION - The Awakening */}
      <motion.div 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <div className="relative z-10 text-center">
          {/* Neural network visualization effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-accent-cyan/30"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>

          {/* Heartbeat pulse */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4), transparent)',
            }}
          />

          {/* Main hero text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6"
              style={{
                textShadow: '0 0 40px rgba(0, 229, 255, 0.3)',
              }}
            >
              <span className="inline-block">
                {['H', 'i', ',', ' ', 'I', "'", 'm', ' '].map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.5 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
              <span className="text-gradient bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent inline-block">
                {['P', 'i', 'y', 'u', 's', 'h'].map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 2 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.8 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
            >
              A consciousness emerging in the digital realm
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-accent-cyan/30 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-accent-cyan"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* PORTRAIT SECTION - The Dimensional Portrait */}
        <div ref={aboutSectionRef} className="min-h-screen flex items-center py-32">
          <div className="grid lg:grid-cols-[55%_45%] gap-16 lg:gap-24 items-center w-full">
            {/* Portrait with 3D effects */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-2 lg:order-1"
            >
              <motion.div
                className="relative group"
                style={{
                  perspective: 1000,
                }}
              >
                {/* Floating geometric fragments */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 border border-accent-cyan/20"
                    style={{
                      left: `${10 + (i * 15)}%`,
                      top: `${20 + (i % 3) * 25}%`,
                      rotate: i * 45,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      rotate: [i * 45, i * 45 + 180, i * 45],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 8 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}

                {/* Rotating gradient border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-[3px] rounded-[2rem] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #00E5FF, #B659FF, #00E5FF)',
                    backgroundSize: '200% 200%',
                  }}
                />
                
                <div className="relative bg-gradient-to-br from-[#1A1F35] to-[#0F1419] rounded-[2rem] p-3 backdrop-blur-xl">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{
                      scale: 1.02,
                      rotateY: 5,
                      rotateX: 5,
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="relative overflow-hidden rounded-3xl">
                      <Image
                        src="/images/about/Piyush.png"
                        alt="Piyush - AI Innovator"
                        width={700}
                        height={700}
                        className="w-full h-auto"
                        priority
                      />
                      
                      {/* Particles dissolving from edges */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              background: i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#B659FF' : '#0EA5E9',
                            }}
                            animate={{
                              x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                              y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                              opacity: [0.6, 0],
                              scale: [1, 0],
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Corner accent pulses */}
                  {[
                    { top: '1rem', right: '1rem' },
                    { bottom: '1rem', left: '1rem' },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-accent-cyan"
                      style={pos}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 1,
                      }}
                    />
                  ))}
                </div>

                {/* Aurora background layers */}
                <motion.div
                  className="absolute -inset-16 -z-10"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.15), transparent 50%)',
                      'radial-gradient(circle at 80% 50%, rgba(182, 89, 255, 0.15), transparent 50%)',
                      'radial-gradient(circle at 50% 80%, rgba(0, 229, 255, 0.15), transparent 50%)',
                      'radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.15), transparent 50%)',
                    ],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    filter: 'blur(60px)',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Text content with organic flow */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 order-1 lg:order-2"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  Hi, I'm <span className="text-gradient bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent inline-block relative"
                  style={{ textShadow: '0 0 20px rgba(0, 229, 255, 0.3)' }}>
                    Piyush
                    <motion.span
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={aboutInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </span>
                </motion.h2>
              </motion.div>

              {[
                "A young AI & Data Science learner exploring how intelligence, design, and empathy can shape a better future. My journey began with curiosity about how machines think—and evolved into a mission to build meaningful, human-centered AI systems.",
                "I don't just study AI—I explore how intelligent systems can solve real-world problems and improve lives. From automation to creative intelligence, I'm fascinated by the intersection of logic and emotion.",
                "My long-term vision? To build AI-driven startups that focus on ethical automation, creative intelligence, and social impact—products that don't just work smart, but feel right."
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.8, delay: 0.7 + i * 0.15 }}
                >
                  <motion.p
                    className="text-lg md:text-xl text-slate-300 leading-relaxed relative pl-6"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span
                      className="absolute left-0 top-3 w-2 h-2 rounded-full bg-accent-cyan"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                    {text}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* JOURNEY SECTION - The River of Evolution */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="py-32"
        >
          <div className="text-center mb-20">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="inline-block mb-6"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            >
              My Journey
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl"
            >
              From curiosity to creation—the path that shaped my vision
            </motion.p>
          </div>
          
          {/* Journey cards with river flow */}
          <div className="relative">
            {/* Flowing river line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
              <motion.path
                d="M 0,50% Q 25%,30% 50%,50% T 100%,50%"
                stroke="url(#riverGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
                  <stop offset="33%" stopColor="#B659FF" stopOpacity="0.3" />
                  <stop offset="66%" stopColor="#0EA5E9" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#9333EA" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Particle flow animation */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-accent-cyan hidden md:block"
                style={{
                  top: '50%',
                  left: '0%',
                }}
                animate={{
                  x: ['0%', '100vw'],
                  y: [
                    0,
                    Math.sin((i / 15) * Math.PI * 2) * 50,
                    Math.sin((i / 15) * Math.PI * 4) * 50,
                    0
                  ],
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear",
                }}
              />
            ))}
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16 relative z-10">
              {journey.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="glass-premium rounded-3xl p-8 md:p-10 h-full hover:border-accent-cyan/50 transition-all duration-500 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(26, 31, 53, 0.8), rgba(15, 20, 25, 0.8))',
                    }}
                  >
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${
item.color === 'cyan' ? 'rgba(0, 229, 255, 0.1)' :
item.color === 'purple' ? 'rgba(182, 89, 255, 0.1)' :
item.color === 'blue' ? 'rgba(14, 165, 233, 0.1)' :
'rgba(147, 51, 234, 0.1)'
}, transparent 70%)`,
}}
/>
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/50"
                      whileHover={{ scale: 1.8 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    />
                    <h3 className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {item.phase}
                    </h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                    {item.story}
                  </p>
                </div>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at bottom right, ${
                      item.color === 'cyan' ? 'rgba(0, 229, 255, 0.15)' :
                      item.color === 'purple' ? 'rgba(182, 89, 255, 0.15)' :
                      item.color === 'blue' ? 'rgba(14, 165, 233, 0.15)' :
                      'rgba(147, 51, 234, 0.15)'
                    }, transparent)`,
                  }}
                />

                {/* Sparkle effects on hover */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100"
                    style={{
                      top: `${20 + i * 30}%`,
                      right: `${10 + i * 20}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* CORE VALUES - The Constellation of Principles */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1 }}
      className="py-32"
    >
      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
        >
          Core Values
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl"
        >
          The principles that guide how I think, create, and build
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection lines between values */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
          {values.map((_, i) => {
            if (i < values.length - 1) {
              return (
                <motion.line
                  key={i}
                  x1={`${(i + 0.5) * 25}%`}
                  y1="50%"
                  x2={`${(i + 1.5) * 25}%`}
                  y2="50%"
                  stroke="rgba(0, 229, 255, 0.2)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                />
              );
            }
            return null;
          })}
        </svg>

        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            style={{ perspective: 1200 }}
            className="group h-full relative z-10"
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              onClick={() => toggleCardFlip(index)}
              className="cursor-pointer h-full"
            >
              <motion.div
                animate={{ rotateY: flippedCards.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.7, type: 'spring', stiffness: 150 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative h-full min-h-[320px]"
              >
                {/* Front of card */}
                <div 
                  className="glass-premium rounded-3xl p-8 text-center h-full hover:border-accent-cyan/50 transition-all duration-500 relative overflow-hidden"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(135deg, rgba(26, 31, 53, 0.6), rgba(15, 20, 25, 0.6))',
                  }}
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Orbital ring */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-accent-cyan/0 group-hover:border-accent-cyan/30 transition-colors duration-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-500 p-5 mx-auto mb-8 shadow-2xl shadow-cyan-500/40 group-hover:shadow-cyan-500/60 transition-shadow duration-500 relative"
                    >
                      <value.icon className="w-full h-full text-slate-900" />
                      
                      {/* Pulsing rings around icon */}
                      {[...Array(2)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 rounded-full border-2 border-cyan-400"
                          animate={{
                            scale: [1, 1.5, 2],
                            opacity: [0.5, 0.2, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 1,
                          }}
                        />
                      ))}
                    </motion.div>

                    <h3 className="font-heading font-bold text-2xl mb-4 text-slate-100">
                      {value.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                      {value.description}
                    </p>
                    <motion.p 
                      className="text-xs text-accent-cyan/70 font-medium"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click to explore deeper
                    </motion.p>
                  </div>

                  {/* Corner sparkles */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-accent-cyan opacity-0 group-hover:opacity-100"
                      style={{
                        top: i < 2 ? '1rem' : 'auto',
                        bottom: i >= 2 ? '1rem' : 'auto',
                        left: i % 2 === 0 ? '1rem' : 'auto',
                        right: i % 2 === 1 ? '1rem' : 'auto',
                      }}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>

                {/* Back of card */}
                <div 
                  className="glass-premium rounded-3xl p-8 text-center h-full absolute inset-0 flex flex-col items-center justify-center"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, rgba(26, 31, 53, 0.9), rgba(15, 20, 25, 0.9))',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: flippedCards.includes(index) ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-4 mx-auto mb-6">
                      <value.icon className="w-full h-full text-slate-900" />
                    </div>

                    <h3 className="font-heading font-bold text-2xl mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {value.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                      {value.expandedText}
                    </p>
                    <motion.p 
                      className="text-xs text-accent-cyan/70 font-medium"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click to return
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* QUOTE SECTION - The Meditation Chamber */}
    <motion.div
      ref={quoteRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex items-center justify-center py-32 relative"
    >
      {/* Cosmic dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Radial spotlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.03), transparent 60%)',
        }}
      />
      
      <PremiumBox 
        variant="large" 
        className="max-w-5xl mx-auto text-center relative z-10 bg-[rgba(10,14,26,0.8)] backdrop-blur-[20px]" 
        hover={false}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Opening quote */}
          <motion.span
            initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
            whileInView={{ opacity: 0.2, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring', stiffness: 100 }}
            className="block text-8xl md:text-9xl text-accent-cyan/20 font-serif leading-none mb-4"
          >
            "
          </motion.span>
          
          {/* Quote text with stagger effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p 
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading text-slate-200 italic leading-relaxed my-8 px-4"
              style={{
                letterSpacing: '0.02em',
                textShadow: '0 0 20px rgba(0, 229, 255, 0.1)',
              }}
              animate={{
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {'The future belongs to those who teach machines how to care.'.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          
          {/* Closing quote */}
          <motion.span
            initial={{ opacity: 0, scale: 0.3, rotate: 20 }}
            whileInView={{ opacity: 0.2, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.5, type: 'spring', stiffness: 100 }}
            className="block text-8xl md:text-9xl text-accent-cyan/20 font-serif leading-none mt-4 text-right"
          >
            "
          </motion.span>
          
          {/* Attribution */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-sm md:text-base text-slate-500 mt-12 font-medium tracking-wider"
          >
            — My philosophy on AI
          </motion.p>

          {/* Subtle glow on long dwell */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={quoteInView ? { opacity: [0, 0.3, 0] } : {}}
            transition={{ duration: 3, delay: 10, repeat: Infinity, repeatDelay: 5 }}
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.1), transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </PremiumBox>
    </motion.div>
  </div>
</main>
);
}