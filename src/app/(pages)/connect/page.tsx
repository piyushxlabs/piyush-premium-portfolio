'use client';

/**
 * 🌟 PROJECT CODENAME: QUANTUM CONVERGENCE
 * A Revolutionary Transformation of Digital Connection
 * 
 * DESIGN PILLARS:
 * 1. Asymmetric Harmony — Beauty in deliberate imbalance
 * 2. Kinetic Stillness — Motion that feels intentional

 * 3. Haptic Illusion — Visual feedback so convincing you feel it
 * 4. Narrative Space — Every pixel tells part of a story
 * 5. Invisible Complexity — Sophisticated systems hidden behind elegant simplicity
 */

import { useState, FormEvent, useEffect, useRef, useMemo } from 'react';
import { Send, Sparkles, Check, Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { socialLinks } from '@/config/social-links';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💎 CONSTANTS & DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BADGE_VARIANTS = [
  "Open to collaboration",
  "Building the future, one idea at a time",
  "Let's make something impossible",
  "Where innovation meets execution",
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎨 UTILITY COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 🌌 Particle Nebula with Proximity Connections
 * Creates organic floating network visualization
 */
const ParticleNebula = ({ cursorPosition }: { cursorPosition: { x: number; y: number } }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate stable particles
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map(() => ({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Cursor interaction (gentle repulsion)
        const dx = particle.x - cursorPosition.x;
        const dy = particle.y - cursorPosition.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          particle.x += (dx / dist) * force * 2;
          particle.y += (dy / dist) * force * 2;
        }

        // Draw particle
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections within proximity
        particles.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3;
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
    };
  }, [particles, cursorPosition]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

/**
 * 💫 Animated Gradient Orb
 */
const GradientOrb = ({
  delay = 0,
  color = 'cyan',
  position = { x: 20, y: 20 },
}: {
  delay?: number;
  color?: 'cyan' | 'lavender' | 'teal';
  position?: { x: number; y: number };
}) => {
  const colors = {
    cyan: 'from-cyan-400/30 via-cyan-500/20 to-transparent',
    lavender: 'from-purple-400/30 via-purple-500/20 to-transparent',
    teal: 'from-teal-400/30 via-teal-500/20 to-transparent',
  };

  return (
    <motion.div
      className={`absolute w-[700px] h-[700px] rounded-full bg-gradient-radial ${colors[color]} blur-[120px] pointer-events-none`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      animate={{
        x: [0, 120, -80, 0],
        y: [0, -80, 120, 0],
        scale: [1, 1.25, 0.9, 1],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 25 + delay * 2,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
};

/**
 * 🌟 Volumetric Light Rays
 * Creates cinematic light shafts piercing through darkness
 */
const VolumetricLightRays = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-full origin-top"
          style={{
            left: `${15 + i * 15}%`,
            background: 'linear-gradient(to bottom, rgba(34, 211, 238, 0.15), transparent 70%)',
            transform: `rotate(${-20 + i * 8}deg)`,
            transformOrigin: 'top center',
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/**
 * 🌀 Gravitational Lensing Effect
 * Space warps around cursor creating reality distortion
 */
const GravitationalLens = ({ cursorPosition }: { cursorPosition: { x: number; y: number } }) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none mix-blend-screen"
      style={{
        left: cursorPosition.x - 150,
        top: cursorPosition.y - 150,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

/**
 * 💎 Constellation Core - CSS 3D Geometric Visualization
 * Floating icosphere with glowing edges and particle system
 */
const ConstellationCore = ({
  cursorPosition,
  formFocused,
}: {
  cursorPosition: { x: number; y: number };
  formFocused: boolean;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 960;
    const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 540;

    const deltaX = (cursorPosition.x - centerX) / centerX;
    const deltaY = (cursorPosition.y - centerY) / centerY;

    setTilt({
      x: deltaY * 15,  // Max 15 degree tilt
      y: deltaX * 15,
    });
  }, [cursorPosition]);

  return (
    <motion.div
      className="hidden lg:block relative w-72 h-72"
      style={{ perspective: '1200px' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Main geometric shape */}
      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        animate={{
          rotateZ: 360,
        }}
        transition={{
          rotateZ: {
            duration: formFocused ? 30 : 60,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {/* Wireframe edges - creating icosphere effect */}
        <div className="absolute inset-0">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-8 border-2 border-cyan-400/40 rounded-full"
            animate={{
              borderColor: formFocused ? 'rgba(34, 211, 238, 0.8)' : 'rgba(34, 211, 238, 0.4)',
            }}
            style={{ transformStyle: 'preserve-3d' }}
          />

          {/* Middle cross-sections */}
          {[0, 45, 90].map((rotation) => (
            <motion.div
              key={rotation}
              className="absolute inset-12 border border-purple-400/30 rounded-full"
              style={{
                transform: `rotateY(${rotation}deg)`,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                borderColor: formFocused
                  ? ['rgba(167, 139, 250, 0.3)', 'rgba(167, 139, 250, 0.6)', 'rgba(167, 139, 250, 0.3)']
                  : 'rgba(167, 139, 250, 0.3)',
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}

          {/* Center vertex indicators */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute w-2 h-2 rounded-full bg-cyan-400"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translateX(${Math.cos((angle * Math.PI) / 180) * 80}px) translateY(${Math.sin((angle * Math.PI) / 180) * 80}px)`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Internal particle system */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => {
            const angle = (i * 360) / 20;
            const radius = 40 + Math.random() * 40;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [
                    Math.cos((angle * Math.PI) / 180) * radius,
                    Math.cos(((angle + 180) * Math.PI) / 180) * radius,
                    Math.cos((angle * Math.PI) / 180) * radius,
                  ],
                  y: [
                    Math.sin((angle * Math.PI) / 180) * radius,
                    Math.sin(((angle + 180) * Math.PI) / 180) * radius,
                    Math.sin((angle * Math.PI) / 180) * radius,
                  ],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 8 + i * 0.3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-purple-500/10 to-transparent blur-2xl"
        animate={{
          scale: formFocused ? [1, 1.3, 1] : [1, 1.15, 1],
          opacity: formFocused ? [0.4, 0.7, 0.4] : [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Lens flare effect */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full blur-md"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

/**
 * ✨ Quantum Badge Component
 */
const QuantumBadge = ({
  text,
  onClick
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/60 backdrop-blur-xl border border-cyan-400/20 overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {/* Animated flowing border */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(34, 211, 238, 0.6), transparent)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Sparkles icon with elastic animation */}
      <motion.div
        animate={{
          rotate: [0, 12, -12, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Sparkles className="w-5 h-5 text-cyan-400 relative z-10" />
      </motion.div>

      {/* Text with glitch reveal */}
      <motion.span
        className="text-sm font-medium text-slate-100 relative z-10 tracking-wide"
        key={text}
        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.span>

      {/* Pulsating glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl -z-10"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 MAIN CONNECT PAGE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function ConnectPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [badgeText, setBadgeText] = useState(BADGE_VARIANTS[0]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Cursor tracking with spring physics
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSpring = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 300, damping: 28 });

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // Gradient rotation based on mouse position
  const gradientRotation = useTransform(
    [cursorX, cursorY],
    ([x, y]) => {
      const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 960;
      const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 540;
      const angle = Math.atan2(Number(y) - centerY, Number(x) - centerX) * (180 / Math.PI);
      return angle + 135;
    }
  );

  // Map the rotation angle directly to a CSS gradient string
const animatedGradient = useTransform(
  gradientRotation,
  (deg) => `linear-gradient(${deg}deg, #22d3ee, #c084fc, #ec4899)`
);
  // Badge text cycling
  const handleBadgeClick = () => {
    const currentIndex = BADGE_VARIANTS.indexOf(badgeText);
    const nextIndex = (currentIndex + 1) % BADGE_VARIANTS.length;
    setBadgeText(BADGE_VARIANTS[nextIndex]);
  };

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://web-production-aa2a6.up.railway.app/form-submit',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Name: formState.name,
            Email: formState.email,
            Message: formState.message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020817] text-white overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🌌 MULTI-LAYERED DIMENSIONAL FIELD */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Layer 1: Deep Space */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#0a0a20] to-[#020817]" />

        {/* Layer 2: Film Grain Texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Layer 3: Volumetric Light Rays */}
        <VolumetricLightRays />

        {/* Layer 4: Animated Gradient Orbs */}
        <GradientOrb delay={0} color="cyan" position={{ x: 15, y: 20 }} />
        <GradientOrb delay={7} color="lavender" position={{ x: 70, y: 40 }} />
        <GradientOrb delay={14} color="teal" position={{ x: 40, y: 70 }} />

        {/* Layer 5: Particle Nebula */}
        <ParticleNebula cursorPosition={cursorPosition} />

        {/* Layer 6: Gravitational Lensing */}
        <GravitationalLens cursorPosition={cursorPosition} />

        {/* Layer 5: Scanlines */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #22d3ee 2px, #22d3ee 4px)',
          }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,8,23,0.8)_100%)]" />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 📄 CONTENT CONTAINER */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="container mx-auto px-6 pt-32 pb-20 max-w-7xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          {/* Quantum Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="inline-block mb-8"
          >
            <AnimatePresence mode="wait">
              <QuantumBadge text={badgeText} onClick={handleBadgeClick} key={badgeText} />
            </AnimatePresence>
          </motion.div>

          {/* Cinematic Title with Kinetic Typography */}
          <div className="relative mb-8">
          <motion.h1
  className="z-50 text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-8 relative text-white"
  style={{
    backgroundImage: animatedGradient, // Apply the transformed motion value here
    WebkitBackgroundClip: 'text',
    // WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    // color: 'transparent', // Fallback
    display: 'inline-block', // Ensures the gradient clipping works correctly on all browsers
  }}
>
              {/* "Let's" - Particle materialization */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 0.8, duration: 0.8, type: 'spring', stiffness: 100 }}
                className="inline-block mr-4"
              >
                Let's
              </motion.span>

              {/* "Build" - Digital glitch */}
              <motion.span
                initial={{ opacity: 0, x: -60, filter: 'blur(20px)', skewX: -10 }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)', skewX: 0 }}
                transition={{ delay: 1.2, duration: 0.6, type: 'spring', stiffness: 80 }}
                className="inline-block mr-4"
              >
                Build
              </motion.span>

              {/* "Together" - Origami unfold */}
              <motion.span
                initial={{ opacity: 0, rotateX: 90, transformOrigin: 'center bottom' }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ delay: 1.6, duration: 1, type: 'spring', stiffness: 60 }}
                className="inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                Together
              </motion.span>
            </motion.h1>

            {/* Title ambient glow */}
            <motion.div
              className="absolute inset-0 blur-[100px] opacity-30 -z-10"
              style={{
                background: 'linear-gradient(135deg, #22d3ee, #c084fc, #ec4899)',
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Subtitle with Staggered Reveal */}
          <div className="max-w-3xl mx-auto space-y-2">
            {[
              "Whether you're a mentor, collaborator, or fellow innovator",
              "— I'd love to connect and explore how we can create",
              "something meaningful.",
            ].map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.8 + index * 0.2,
                  duration: 0.8,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="text-xl lg:text-2xl text-slate-400 leading-relaxed"
                style={{
                  letterSpacing: index === 0 ? '0.02em' : '0.01em',
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 💎 CONSTELLATION CORE 3D ELEMENT */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="flex justify-center mb-16">
          <ConstellationCore
            cursorPosition={cursorPosition}
            formFocused={focusedField !== null}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 📋 HOLOGRAPHIC FORM SECTION */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <motion.div
            className="lg:col-span-7 order-2 lg:order-1"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.div
              className="relative rounded-3xl p-10 backdrop-blur-2xl border border-cyan-400/10 overflow-hidden"
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
              }}
              animate={{
                borderRadius: ['24px', '32px', '28px', '24px'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{
                scale: focusedField ? 1 : 1.01,
              }}
            >
              {/* Noise texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                }}
              />

              {/* Shimmer border animation */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  x: ['-100%', '100%'],
                }}
                transition={{
                  opacity: { duration: 2, repeat: Infinity },
                  x: { duration: 4, repeat: Infinity, ease: 'linear' },
                }}
              />

              <motion.h2
                className="text-3xl font-black mb-3 text-slate-100 tracking-tight"
                animate={{
                  letterSpacing: ['0em', '0.02em', '0em'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                }}
              >
                Send a Message
              </motion.h2>
              <p className="text-slate-400 mb-10 text-lg">
                Share your ideas, questions, or just say hello.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
                  /* 🎉 SUCCESS CEREMONY */
                  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    className="py-20 text-center"
                  >
                    {/* Holographic success container with orbiting rings */}
                    <motion.div
                      className="relative w-28 h-28 mx-auto mb-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 12 }}
                    >
                      {/* Orbiting rings */}
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 border-2 border-cyan-400 rounded-full"
                          initial={{ scale: 1, opacity: 1 }}
                          animate={{
                            scale: [1, 1.8, 2.5],
                            opacity: [1, 0.6, 0],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: 'easeOut',
                          }}
                        />
                      ))}

                      {/* Checkmark container */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400 rounded-full backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.6)]">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: 0.3,
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                          }}
                        >
                          <Check className="w-14 h-14 text-cyan-300" strokeWidth={3} />
                        </motion.div>
                      </div>

                      {/* Particle burst */}
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: Math.cos((i * Math.PI * 2) / 12) * 80,
                            y: Math.sin((i * Math.PI * 2) / 12) * 80,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                        />
                      ))}
                    </motion.div>

                    <motion.h3
                      className="text-3xl font-black mb-3 text-slate-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      Message Sent Successfully!
                    </motion.h3>
                    <motion.p
                      className="text-slate-400 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      I'll reach out soon. Thank you for connecting!
                    </motion.p>
                  </motion.div>
                ) : (
                  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
                  /* 📝 HOLOGRAPHIC FORM */
                  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-10"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: focusedField ? 1 : 0.95 }}
                  >
                    {/* Name Input */}
                    <div className="relative">
                      <motion.input
                        id="name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full px-0 py-5 bg-transparent border-0 border-b border-slate-700/40 outline-none transition-all duration-400 text-slate-100 text-lg placeholder:text-transparent focus:border-cyan-400"
                        placeholder="Your Name"
                      />

                      <motion.label
                        htmlFor="name"
                        className="absolute left-0 top-5 text-slate-500 pointer-events-none transition-all duration-400 peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-cyan-400/80"
                        animate={
                          focusedField === 'name'
                            ? { rotateX: [-5, 0], opacity: [0.6, 1], scale: [0.95, 1] }
                            : {}
                        }
                        transition={{ duration: 0.4 }}
                      >
                        Your Name
                      </motion.label>

                      {/* Animated underline */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: focusedField === 'name' ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{ originX: 0.5 }}
                      />

                      {/* Particle burst on focus */}
                      <AnimatePresence>
                        {focusedField === 'name' && (
                          <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                  x: Math.cos((i * Math.PI * 2) / 10) * 40,
                                  y: Math.sin((i * Math.PI * 2) / 10) * 40,
                                  opacity: 0,
                                }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <motion.input
                        id="email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full px-0 py-5 bg-transparent border-0 border-b border-slate-700/40 outline-none transition-all duration-400 text-slate-100 text-lg placeholder:text-transparent focus:border-cyan-400"
                        placeholder="Email Address"
                      />

                      <motion.label
                        htmlFor="email"
                        className="absolute left-0 top-5 text-slate-500 pointer-events-none transition-all duration-400 peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-cyan-400/80"
                        animate={
                          focusedField === 'email'
                            ? { rotateX: [-5, 0], opacity: [0.6, 1], scale: [0.95, 1] }
                            : {}
                        }
                        transition={{ duration: 0.4 }}
                      >
                        Email Address
                      </motion.label>

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: focusedField === 'email' ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{ originX: 0.5 }}
                      />

                      <AnimatePresence>
                        {focusedField === 'email' && (
                          <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1.5 h-1.5 bg-purple-500 rounded-full"
                                initial={{ x: 0, y: 0, opacity: 1 }}
                                animate={{
                                  x: Math.cos((i * Math.PI * 2) / 10) * 40,
                                  y: Math.sin((i * Math.PI * 2) / 10) * 40,
                                  opacity: 0,
                                }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Message Textarea */}
                    <div className="relative">
                      <motion.textarea
                        id="message"
                        required
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="peer w-full px-0 py-5 bg-transparent border-0 border-b border-slate-700/40 outline-none transition-all duration-400 text-slate-100 text-lg placeholder:text-transparent resize-none focus:border-cyan-400"
                        placeholder="Your Message"
                        style={{
                          backgroundImage:
                            focusedField === 'message'
                              ? 'linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px)'
                              : 'none',
                          backgroundSize: '100% 32px',
                        }}
                      />

                      <motion.label
                        htmlFor="message"
                        className="absolute left-0 top-5 text-slate-500 pointer-events-none transition-all duration-400 peer-focus:-translate-y-8 peer-focus:text-sm peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-cyan-400/80"
                        animate={
                          focusedField === 'message'
                            ? { rotateX: [-5, 0], opacity: [0.6, 1], scale: [0.95, 1] }
                            : {}
                        }
                        transition={{ duration: 0.4 }}
                      >
                        Your Message
                      </motion.label>

                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: focusedField === 'message' ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{ originX: 0.5 }}
                      />

                      {/* Character counter */}
                      <AnimatePresence>
                        {formState.message.length > 50 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-2 right-0 text-xs font-mono tabular-nums"
                            style={{
                              color:
                                formState.message.length > 450
                                  ? '#ef4444'
                                  : formState.message.length > 350
                                    ? '#fbbf24'
                                    : '#22d3ee',
                            }}
                          >
                            {formState.message.length} / 500
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                    {/* 🚀 QUANTUM BUTTON (Gravitational Attractor) */}
                    {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                    <motion.button
                      ref={buttonRef}
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full px-10 py-5 rounded-2xl font-black text-lg overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                      whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {/* Animated gradient mesh background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        style={{
                          backgroundSize: '200% 100%',
                        }}
                      />

                      {/* Pulsating outer glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-cyan-400/30 blur-2xl -z-10"
                        animate={{
                          opacity: [0.4, 0.8, 0.4],
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />

                      {/* Magnetic field rings (hover) */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0 border-2 border-white/40 rounded-2xl"
                            animate={{
                              scale: [1, 1.15, 1.3],
                              opacity: [0.6, 0.3, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.25,
                            }}
                          />
                        ))}
                      </motion.div>

                      <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: 'linear',
                              }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <motion.div
                              animate={{
                                x: [0, 4, 0],
                              }}
                              transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                            >
                              <Send className="w-5 h-5" />
                            </motion.div>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          {/* 🌐 ORBITAL SOCIAL NETWORK */}
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <motion.div
            className="lg:col-span-5 order-1 lg:order-2 space-y-5"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.6, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -40 : 40,
                  rotateZ: index % 2 === 0 ? -4 : 4,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotateZ: 0,
                }}
                transition={{
                  delay: 2.6 + index * 0.15,
                  type: 'spring',
                  stiffness: 80,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.04,
                  rotateY: 8,
                  rotateZ: index % 2 === 0 ? 2 : -2,
                  y: -6,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
                className="group relative block rounded-3xl p-7 backdrop-blur-2xl border border-cyan-400/10 overflow-hidden cursor-pointer"
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  transformStyle: 'preserve-3d',
                  perspective: '1200px',
                }}
              >
                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  initial={false}
                />

                {/* Shine sweep effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />

                <div className="flex items-center gap-5 relative z-10">
                  {/* Holographic icon */}
                  <motion.div
                    className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-4 shadow-xl shadow-cyan-500/30"
                    whileHover={{
                      scale: 1.2,
                      rotateY: 20,
                      boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Icon glow pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-cyan-400/40 blur-lg"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.5, 0.9, 0.5],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    <social.icon className="w-full h-full text-slate-900 relative z-10" />

                    {/* Orbiting particle ring */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                          style={{
                            top: '50%',
                            left: '50%',
                          }}
                          animate={{
                            x: Math.cos((i * Math.PI * 2) / 6) * 40,
                            y: Math.sin((i * Math.PI * 2) / 6) * 40,
                            rotate: 360,
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Text content */}
                  <div className="flex-1">
                    <motion.h3
                      className="font-bold text-lg mb-1 text-slate-100 group-hover:text-cyan-300 transition-colors"
                      whileHover={{ x: 6 }}
                    >
                      {social.label}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors"
                      whileHover={{ x: 6 }}
                    >
                      {social.label === 'Email'
                        ? 'piyushjaguri13@gmail.com'
                        : social.label === 'GitHub'
                          ? 'View my code'
                          : social.label === 'LinkedIn'
                            ? 'Connect professionally'
                            : social.label === 'Twitter'
                              ? 'Follow my journey'
                              : 'Visual journey'}
                    </motion.p>
                  </div>
                </div>

                {/* Connection line visualization */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {/* 📌 FOOTER INFO BOX */}
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <motion.div
          className="mt-24 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          <motion.div
            className="relative rounded-3xl p-8 backdrop-blur-2xl border border-cyan-400/10 overflow-hidden"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Breathing ambient glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5"
              animate={{
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <p className="text-slate-300 text-base leading-relaxed relative z-10">
              <span className="text-cyan-400 font-bold">Currently exploring:</span>{' '}
              AI automation, intelligent systems, and human-centered design. Always
              open to meaningful conversations about technology and innovation.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* 🖱️ CUSTOM CURSOR (Desktop Only) */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-white"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Trailing light effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/20 blur-md"
          animate={{
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </main>
  );
}
