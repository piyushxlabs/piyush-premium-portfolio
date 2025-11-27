
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimation, AnimatePresence } from 'framer-motion';
import { Cpu, Activity, GitBranch, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import VisionBackground from '@/components/ui/VisionBackground';

// TYPES
type Experiment = {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Research' | 'Testing';
  tech: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  angle: number;
};

type Principle = {
  id: string;
  text: string;
  x: number;
  y: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

// DATA
const experiments: Experiment[] = [
  {
    id: 'exp-1',
    title: 'Neural Style Transfer',
    description: 'Exploring artistic AI by blending content and style using deep learning—transforming images into unique visual expressions.',
    status: 'Active',
    tech: ['Python', 'TensorFlow', 'CNN'],
    icon: Cpu,
    color: '#22d3ee',
    angle: 0,
  },
  {
    id: 'exp-2',
    title: 'Sentiment Analysis Engine',
    description: 'Building NLP models to understand human emotion in text—analyzing sentiment patterns across social media and reviews.',
    status: 'Research',
    tech: ['NLP', 'BERT', 'PyTorch'],
    icon: Activity,
    color: '#a78bfa',
    angle: 120,
  },
  {
    id: 'exp-3',
    title: 'Automated Data Pipeline',
    description: 'Creating intelligent workflows that clean, transform, and visualize data automatically—making insights accessible.',
    status: 'Testing',
    tech: ['Python', 'Pandas', 'Airflow'],
    icon: GitBranch,
    color: '#2dd4bf',
    angle: 240,
  },
];

const initialPrinciples: Principle[] = [
  { id: 'p1', text: 'Experiment fearlessly', x: 30, y: 30 },
  { id: 'p2', text: 'Build to learn', x: 70, y: 30 },
  { id: 'p3', text: 'Share knowledge', x: 50, y: 70 },
  { id: 'p4', text: 'Question assumptions', x: 50, y: 50 },
];

// CUSTOM CURSOR COMPONENT
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'grab'>('default');

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [data-hover="true"]')) {
        setIsHovering(true);
        if (target.closest('[data-cursor="grab"]')) {
          setCursorVariant('grab');
        } else {
          setCursorVariant('hover');
        }
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const cursorSize = cursorVariant === 'grab' ? 40 : isHovering ? 35 : 28;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen hidden md:block"
      style={{
        marginLeft: -cursorSize / 2,
        marginTop: -cursorSize / 2,
      }}
    >
      <motion.div
        animate={{
          width: cursorSize,
          height: cursorSize,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="relative"
      >
        <div className={`absolute inset-0 rounded-full border transition-all duration-300 ${isHovering ? 'border-cyan-400 bg-cyan-400/20' : 'border-cyan-400/50 bg-cyan-400/10'}`} />
        <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md" />
        {cursorVariant === 'grab' && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0"
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos((i * Math.PI) / 2) * 20, 0],
                  y: [0, Math.sin((i * Math.PI) / 2) * 20, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// LIVING EXPERIMENT ICON (Generative Canvas)
const LivingIcon = ({ experiment }: { experiment: Experiment }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (high DPI)
    const size = 64;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    let animationId: number;
    let time = 0;

    // Experiment-specific animation logic
    const animate = () => {
      time += 0.05;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = experiment.color;
      ctx.strokeStyle = experiment.color;

      if (experiment.id === 'exp-1') {
        // Neural Style Transfer: Morphing Shape
        const points = 8;
        const radius = 15;
        const center = size / 2;

        ctx.beginPath();
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          // Morph between circle and square-ish
          const morph = (Math.sin(time) + 1) / 2; // 0 to 1
          const r = radius + morph * (Math.abs(Math.cos(angle * 4)) * 5);

          const x = center + Math.cos(angle + time * 0.2) * r;
          const y = center + Math.sin(angle + time * 0.2) * r;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.stroke();
      }
      else if (experiment.id === 'exp-2') {
        // Sentiment Analysis: Pulsing/Orbiting Particles
        const center = size / 2;
        const count = 6;

        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + time * 0.5;
          const r = 12 + Math.sin(time * 2 + i) * 4;
          const x = center + Math.cos(angle) * r;
          const y = center + Math.sin(angle) * r;

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Central core
        ctx.beginPath();
        ctx.arc(center, center, 6 + Math.sin(time * 3) * 2, 0, Math.PI * 2);
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      else if (experiment.id === 'exp-3') {
        // Data Pipeline: Flowing Stream
        const count = 5;

        for (let i = 0; i < count; i++) {
          const t = (time * 0.5 + i / count) % 1;
          const x = t * size;
          const y = size / 2 + Math.sin(t * Math.PI * 4) * 8;

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();

          // Trail
          ctx.beginPath();
          ctx.moveTo(x - 5, y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [experiment.id, experiment.color]);

  return (
    <div className="relative w-16 h-16 flex items-center justify-center bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

// ORBITAL EXPERIMENT CARD
const OrbitalExperimentCard = ({ experiment, index }: { experiment: Experiment; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const pulseAnimation = useMemo(() => {
    if (experiment.status === 'Active') {
      return {
        scale: [1, 1.05, 1],
        boxShadow: [
          `0 0 20px ${experiment.color}40`,
          `0 0 40px ${experiment.color}60`,
          `0 0 20px ${experiment.color}40`,
        ],
      };
    } else if (experiment.status === 'Research') {
      return {
        scale: [1, 1.02, 1],
        opacity: [0.9, 1, 0.9],
      };
    } else {
      return {};
    }
  }, [experiment.status, experiment.color]);

  const transitionConfig = useMemo(() => {
    if (experiment.status === 'Active') {
      return { duration: 1.3, repeat: Infinity, ease: 'easeInOut' as const };
    } else if (experiment.status === 'Research') {
      return { duration: 4, repeat: Infinity, ease: 'easeInOut' as const };
    } else {
      return {};
    }
  }, [experiment.status]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        delay: index * 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative group perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-hover="true"
        className="relative min-h-[450px] rounded-3xl overflow-hidden cursor-pointer"
      >
        {/* Glassmorphism base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl" />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${experiment.color}15, transparent 70%)`,
          }}
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 80px ${experiment.color}20`,
          }}
        />

        {/* Content */}
        <div className="relative p-8 h-full flex flex-col z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="p-4 rounded-2xl bg-slate-800/60 border border-white/10 backdrop-blur-sm"
            >
              <LivingIcon experiment={experiment} />
            </motion.div>

            {/* Status badge */}
            <motion.div
              animate={pulseAnimation}
              transition={transitionConfig}
              className="px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md border"
              style={{
                backgroundColor: `${experiment.color}15`,
                borderColor: `${experiment.color}30`,
                color: experiment.color,
              }}
            >
              {experiment.status}
            </motion.div>
          </div>

          {/* Title & Description */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
              {experiment.title}
            </h3>
            <p className="text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
              {experiment.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {experiment.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: `${experiment.color}20`,
                    borderColor: `${experiment.color}50`,
                  }}
                  className="px-3 py-1 text-xs rounded-full bg-slate-800/80 text-slate-300 border border-white/10 backdrop-blur-sm cursor-pointer transition-all"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action button */}
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 text-sm font-bold transition-colors self-start"
            style={{ color: experiment.color }}
          >
            <span>Explore Data</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Decorative glow */}
        <div
          className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: experiment.color }}
        />
      </motion.div>
    </motion.div>
  );
};

// DRAGGABLE PRINCIPLE NODE
const PrincipleNode = ({ principle, index }: { principle: Principle; index: number }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 260, damping: 20 }}
      className="absolute cursor-grab group"
      style={{
        left: `${principle.x}%`,
        top: `${principle.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      data-hover="true"
      data-cursor="grab"
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{
          scale: isDragging ? 1.3 : [1, 1.1, 1],
          opacity: isDragging ? 0.8 : [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 rounded-full border-2 border-cyan-400/30 blur-sm"
        style={{ padding: '20px' }}
      />

      {/* Main node */}
      <div className="relative px-8 py-5 rounded-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-cyan-500/40 shadow-lg group-hover:shadow-cyan-500/50 transition-shadow duration-300">
        {/* Inner particle effect */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              animate={{
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                y: [Math.random() * 50 - 25, Math.random() * 50 - 25],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.6,
              }}
            />
          ))}
        </div>

        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' as const }}
          className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/60 transition-colors duration-300"
          style={{
            borderStyle: 'dashed',
            borderWidth: '2px',
          }}
        />

        {/* Text */}
        <span className="relative z-10 text-sm font-bold text-cyan-100 whitespace-nowrap pointer-events-none select-none">
          {principle.text}
        </span>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Drag trail */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl scale-150"
        />
      )}
    </motion.div>
  );
};

// SINGULARITY CTA
const SingularityCTA = () => {
  const [isNearSingularity, setIsNearSingularity] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
      setIsNearSingularity(distance < 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative flex justify-center items-center py-32 min-h-[600px]">
      {/* Gravitational field visualization */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden">
        {/* Perspective grid */}
        <motion.div
          animate={{
            scale: isNearSingularity ? 1.2 : 1,
            opacity: isNearSingularity ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'perspective(500px) rotateX(60deg)',
          }}
        />

        {/* Concentric rings */}
        {[300, 400, 500].map((size, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: isNearSingularity ? 1.1 : 1,
            }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' as const },
              scale: { duration: 0.6 },
            }}
            className="absolute rounded-full border border-cyan-500/10"
            style={{
              width: size,
              height: size,
            }}
          />
        ))}

        {/* Radial glow */}
        <motion.div
          animate={{
            scale: isNearSingularity ? [1, 1.2, 1] : [1, 1.05, 1],
            opacity: isNearSingularity ? [0.3, 0.5, 0.3] : [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-[600px] h-[600px] bg-gradient-radial from-cyan-500/20 via-cyan-500/5 to-transparent blur-3xl"
        />
      </div>

      {/* The singularity button */}
      <div ref={buttonRef} className="relative z-10">
        <Link href="/connect">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            data-hover="true"
            className="relative group w-56 h-56 rounded-full flex items-center justify-center overflow-hidden"
          >
            {/* Base layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black border-2 border-cyan-500/40 rounded-full" />

            {/* Orbital particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: i % 2 === 0 ? '#22d3ee' : '#a78bfa',
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [
                      Math.cos((i * 45 * Math.PI) / 180) * 80,
                      Math.cos(((i * 45 + 360) * Math.PI) / 180) * 80,
                    ],
                    y: [
                      Math.sin((i * 45 * Math.PI) / 180) * 80,
                      Math.sin(((i * 45 + 360) * Math.PI) / 180) * 80,
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear' as const,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Liquid core effect */}
            <motion.div
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-purple-500/30 to-cyan-500/30 rounded-full blur-2xl"
            />

            {/* Hover glow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full"
              style={{
                boxShadow: '0 0 80px rgba(34, 211, 238, 0.6), inset 0 0 40px rgba(167, 139, 250, 0.4)',
              }}
            />

            {/* Text content */}
            <div className="relative z-10 text-center">
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="block text-xs text-cyan-400 tracking-[0.3em] mb-2 font-medium"
              >
                INITIATE
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="block text-3xl font-bold text-white tracking-wider"
                style={{
                  textShadow: '0 0 20px rgba(34, 211, 238, 0.8)',
                }}
              >
                COLLAB
              </motion.span>
            </div>

            {/* Rotating accent ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' as const }}
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px dashed rgba(34, 211, 238, 0.3)',
                padding: '10px',
              }}
            />
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

// MAIN LAB PAGE
export default function LabPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const gridRotateX = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
  const gridRotateY = useTransform(scrollYProgress, [0, 0.4], [-10, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-slate-200 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100">
      <CustomCursor />
      <VisionBackground />

      {/* HERO SECTION: THE AWAKENING */}
      <section className="relative h-screen flex flex-col justify-center items-center z-10 px-6">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="relative text-center"
            >
              {/* Horizontal divider */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-8 mx-auto max-w-2xl"
              />

              {/* Main title with liquid effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative mb-8"
              >
                <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-slate-600 relative z-10">
                  AI LAB
                </h1>

                {/* Liquid glow effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-0 text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter text-cyan-500/30 blur-2xl"
                  aria-hidden="true"
                >
                  AI LAB
                </motion.div>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-xl md:text-2xl text-cyan-200/70 max-w-3xl mx-auto font-light tracking-wide"
              >
                Where curiosity meets code—exploring the <span className="text-cyan-400 font-medium">sentience</span> of software.
              </motion.p>

              {/* Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                style={{ opacity: heroOpacity }}
                // Yahan maine 'bottom--2' ko change karke 'bottom-10' kar diya hai 👇
                className="absolute bottom--10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
              >
                <span className="text-xs text-cyan-500/60 tracking-[0.3em] uppercase">Scroll to Initialize</span>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[2px] h-16 bg-gradient-to-b from-cyan-500/0 via-cyan-500/60 to-cyan-500/0"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* EXPERIMENTS: CONSTELLATION SYSTEM */}
      <section className="relative py-32 z-10 perspective-2000">
        <div className="container mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-20"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"
            />
            <span className="text-cyan-400 text-sm tracking-widest uppercase font-medium">Current Experiments</span>
          </motion.div>

          {/* Experiment cards grid */}
          <motion.div
            style={{ rotateX: gridRotateX, rotateY: gridRotateY }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 transform-style-3d"
          >
            {experiments.map((exp, i) => (
              <OrbitalExperimentCard key={exp.id} experiment={exp} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRINCIPLES: AXIOM NETWORK */}
      <section className="relative py-32 min-h-[90vh] flex flex-col justify-center z-10">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Section title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
              Lab Principles
            </h2>
            <p className="text-slate-400 text-lg">The axioms that govern this reality</p>
          </motion.div>

          {/* Interactive principle network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full h-[600px] border border-white/10 rounded-3xl bg-gradient-to-br from-slate-900/20 to-slate-800/20 backdrop-blur-sm overflow-hidden shadow-2xl"
          >
            {/* Connection lines (simplified) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Connection lines */}
              <line x1="30%" y1="30%" x2="70%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2" />
              <line x1="70%" y1="30%" x2="50%" y2="70%" stroke="url(#lineGradient)" strokeWidth="2" />
              <line x1="50%" y1="70%" x2="30%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="url(#lineGradient)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="50%" y2="70%" stroke="url(#lineGradient)" strokeWidth="2" />

              {/* Animated particles along lines */}
              {[...Array(12)].map((_, i) => (
                <motion.circle
                  key={i}
                  r="3"
                  fill="#22d3ee"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${i * 0.25}s`}
                  >
                    <mpath xlinkHref={`#path${i % 6}`} />
                  </animateMotion>
                </motion.circle>
              ))}

              {/* Hidden paths for particle animation */}
              <path id="path0" d="M 30% 30% L 70% 30%" fill="none" />
              <path id="path1" d="M 70% 30% L 50% 70%" fill="none" />
              <path id="path2" d="M 50% 70% L 30% 30%" fill="none" />
              <path id="path3" d="M 50% 50% L 30% 30%" fill="none" />
              <path id="path4" d="M 50% 50% L 70% 30%" fill="none" />
              <path id="path5" d="M 50% 50% L 50% 70%" fill="none" />
            </svg>

            {/* Draggable principle nodes */}
            {initialPrinciples.map((p, i) => (
              <PrincipleNode key={p.id} principle={p} index={i} />
            ))}

            {/* Helper text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-xs text-slate-500 tracking-wider uppercase">Drag nodes to explore</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA: SINGULARITY */}
      <section className="relative z-10 pb-32">
        <div className="container mx-auto px-6 text-center">
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-2xl md:text-4xl font-light text-slate-300 italic max-w-4xl mx-auto">
              "Every experiment is a step toward understanding."
            </p>
          </motion.div>

          <SingularityCTA />
        </div>
      </section>
    </main>
  );
}