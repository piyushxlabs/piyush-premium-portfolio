'use client';

import { motion, useScroll, useTransform, useInView, useMotionValue, useAnimationFrame, useReducedMotion, AnimatePresence, useVelocity, useSpring } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Brain, Database, Cpu, Layers, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { PremiumBox } from '@/components/ui/PremiumBox';
import { useState, useEffect, useRef, useCallback } from 'react';

import { MagneticCursor } from '@/components/ui/MagneticCursor';
import VisionBackground from '@/components/ui/VisionBackground';
import { SynapticNetwork } from '@/components/ui/SynapticNetwork';
import { LiquidGlassTitle } from '@/components/ui/LiquidGlassTitle';

// --- FEATURE 6: CONSCIOUSNESS-READING ADAPTIVE COLORS ---

interface EmotionalMetrics {
  scrollSpeed: number;
  clickFrequency: number;
  cursorSpeed: number;
  idleTime: number;
}

const useEmotionalState = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // State for metrics and color palette
  const [palette, setPalette] = useState({
    primary: 'hsl(180, 100%, 50%)', // Cyan
    accent: 'hsl(270, 100%, 70%)',  // Purple
    glow: 'rgba(6, 182, 212, 0.5)'
  });

  // Refs for tracking without re-renders
  const metrics = useRef<EmotionalMetrics>({
    scrollSpeed: 0,
    clickFrequency: 0,
    cursorSpeed: 0,
    idleTime: 0
  });

  const lastClickTime = useRef(Date.now());
  const clickCount = useRef(0);
  const lastCursorPos = useRef({ x: 0, y: 0 });
  const lastCursorTime = useRef(Date.now());

  useEffect(() => {
    // 1. Track Scroll Speed
    const unsubscribeScroll = scrollVelocity.on('change', (v) => {
      metrics.current.scrollSpeed = Math.abs(v);
      metrics.current.idleTime = 0; // Reset idle
    });

    // 2. Track Clicks
    const handleClick = () => {
      const now = Date.now();
      if (now - lastClickTime.current < 1000) {
        clickCount.current++;
      } else {
        clickCount.current = 1;
      }
      lastClickTime.current = now;
      metrics.current.clickFrequency = clickCount.current;
      metrics.current.idleTime = 0;
    };

    // 3. Track Cursor Speed
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastCursorTime.current;
      if (dt > 50) { // Sample every 50ms
        const dx = e.clientX - lastCursorPos.current.x;
        const dy = e.clientY - lastCursorPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        metrics.current.cursorSpeed = (dist / dt) * 1000; // px per second

        lastCursorPos.current = { x: e.clientX, y: e.clientY };
        lastCursorTime.current = now;
        metrics.current.idleTime = 0;
      }
    };

    // 4. Idle Timer
    const idleInterval = setInterval(() => {
      metrics.current.idleTime += 1;
    }, 1000);

    // 5. Emotional Calculation Loop (Every 2s)
    const calcInterval = setInterval(() => {
      const m = metrics.current;

      // Calculate Energy Score (-1 to 1)
      // High scroll, clicks, cursor = High Energy
      // Long idle = Low Energy
      const energyScore = Math.max(-1, Math.min(1,
        (m.scrollSpeed / 2000) * 0.4 +
        (m.clickFrequency / 5) * 0.3 +
        (m.cursorSpeed / 1000) * 0.3 -
        (m.idleTime / 30) * 0.5
      ));

      // Map to Colors
      // Energy 1 (Excited): Red/Orange (Hue 0-30), High Saturation
      // Energy -1 (Calm): Blue/Deep Cyan (Hue 200-240), Lower Saturation
      // Energy 0 (Neutral): Cyan/Purple (Hue 180/270)

      let primaryHue, accentHue, saturation;

      if (energyScore > 0.2) {
        // Excited State
        const t = (energyScore - 0.2) / 0.8; // 0 to 1
        primaryHue = 180 - (t * 180); // 180 -> 0 (Cyan -> Red)
        accentHue = 270 + (t * 60);   // 270 -> 330 (Purple -> Pink)
        saturation = 100;
      } else if (energyScore < -0.2) {
        // Calm State
        const t = (Math.abs(energyScore) - 0.2) / 0.8; // 0 to 1
        primaryHue = 180 + (t * 40);  // 180 -> 220 (Cyan -> Deep Blue)
        accentHue = 270 - (t * 40);   // 270 -> 230 (Purple -> Navy)
        saturation = 100 - (t * 40);  // 100 -> 60%
      } else {
        // Neutral State
        primaryHue = 180;
        accentHue = 270;
        saturation = 100;
      }

      setPalette({
        primary: `hsl(${primaryHue}, ${saturation}%, 50%)`,
        accent: `hsl(${accentHue}, ${saturation}%, 70%)`,
        glow: `hsla(${primaryHue}, ${saturation}%, 50%, 0.5)`
      });

    }, 2000);

    window.addEventListener('click', handleClick);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      unsubscribeScroll();
      clearInterval(idleInterval);
      clearInterval(calcInterval);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [scrollVelocity]);

  return palette;
};

// --- FEATURE 5: TEMPORAL DISTORTION SCROLL ---

const useTemporalScroll = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const [timeMultiplier, setTimeMultiplier] = useState(1);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const unsubscribe = smoothVelocity.on('change', (velocity) => {
      const absVelocity = Math.abs(velocity);
      const direction = velocity < 0; // true if scrolling up (reverse time)

      setIsReversing(direction);

      if (absVelocity > 1000) {
        setTimeMultiplier(2.5); // Fast-forward
      } else if (absVelocity < 50 && absVelocity > 0) {
        setTimeMultiplier(0.3); // Slow-motion / Bullet time
      } else {
        setTimeMultiplier(1); // Normal time
      }
    });

    return unsubscribe;
  }, [smoothVelocity]);

  return { timeMultiplier, scrollY, scrollYProgress, smoothVelocity, isReversing };
};

// --- FEATURE 3: QUANTUM STATE ARTICLE CARDS ---

// SVG Filters for Particle Dissolution
const QuantumFilters = () => (
  <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
    <defs>
      <filter id="quantum-particle-dissolve">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="quantum-glow">
        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

type QuantumState = 'solid' | 'particle' | 'wireframe';

// Displaced Shadow System
const DisplacedShadows = ({ collapsed, timeMultiplier }: { collapsed: boolean, timeMultiplier: number }) => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {/* Cyan Shadow -> Primary Color */}
      <motion.div
        className="absolute inset-0 rounded-3xl blur-[40px]"
        style={{ backgroundColor: 'var(--color-primary)', opacity: 0.2 }}
        animate={collapsed ? { x: 0, y: 0, opacity: 0.4 } : {
          x: [10, -5, 10],
          y: [15, -10, 15],
          rotate: [0, 360],
        }}
        transition={collapsed ? { duration: 0.4 } : {
          rotate: { duration: 20 / timeMultiplier, repeat: Infinity, ease: "linear" },
          x: { duration: 10 / timeMultiplier, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 12 / timeMultiplier, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      {/* Magenta Shadow -> Accent Color */}
      <motion.div
        className="absolute inset-0 rounded-3xl blur-[40px]"
        style={{ backgroundColor: 'var(--color-accent)', opacity: 0.2 }}
        animate={collapsed ? { x: 0, y: 0, opacity: 0.4 } : {
          x: [-8, 12, -8],
          y: [12, -8, 12],
          rotate: [0, -360],
        }}
        transition={collapsed ? { duration: 0.4 } : {
          rotate: { duration: 25 / timeMultiplier, repeat: Infinity, ease: "linear" },
          x: { duration: 15 / timeMultiplier, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 18 / timeMultiplier, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      {/* Yellow Shadow -> Kept as contrast */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-yellow-400/10 blur-[40px]"
        animate={collapsed ? { x: 0, y: 0, opacity: 0.3 } : {
          x: [5, -10, 5],
          y: [-10, 5, -10],
          rotate: [0, 360],
        }}
        transition={collapsed ? { duration: 0.4 } : {
          rotate: { duration: 30 / timeMultiplier, repeat: Infinity, ease: "linear" },
          x: { duration: 20 / timeMultiplier, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 22 / timeMultiplier, repeat: Infinity, ease: "easeInOut" }
        }}
      />
    </div>
  );
};

// --- FEATURE 7: HOLOGRAPHIC CARD PREVIEW ---

const ScanLineOverlay = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-50 mix-blend-overlay opacity-50">
    <motion.div
      className="w-full h-[20%] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"
      animate={{ top: ['-20%', '120%'] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      style={{ position: 'absolute' }}
    />
    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
  </div>
);

const FloatingTag = ({ text, index }: { text: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.4 + (index * 0.1), type: "spring" }}
    className="inline-block px-2 py-0.5 text-[10px] font-mono text-cyan-300 border border-cyan-500/30 rounded bg-cyan-950/50 backdrop-blur-sm mr-2 mb-2 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
    style={{ transform: 'translateZ(20px)' }}
  >
    {text}
  </motion.div>
);

const HolographicPreview = ({ article, isHovered, mousePosition }: { article: any, isHovered: boolean, mousePosition: { x: number, y: number } }) => {
  // Calculate tilt based on mouse position (0-1)
  // Map 0-1 to -10 to 10 degrees
  const tiltX = (mousePosition.y - 0.5) * 20;
  const tiltY = (mousePosition.x - 0.5) * -20;

  // Get icon based on category
  const getIcon = (category: string) => {
    if (category.includes('AI') || category.includes('Ethics')) return <Brain className="w-12 h-12 text-cyan-400" />;
    if (category.includes('Data') || category.includes('Learning')) return <Database className="w-12 h-12 text-purple-400" />;
    if (category.includes('Automation')) return <Cpu className="w-12 h-12 text-emerald-400" />;
    return <Sparkles className="w-12 h-12 text-amber-400" />;
  };

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20, filter: "blur(10px)" }}
          animate={{
            opacity: 1,
            scale: 1,
            y: -40, // Float above
            rotateX: tiltX,
            rotateY: tiltY,
            filter: "blur(0px)"
          }}
          exit={{ opacity: 0, scale: 0.8, y: 10, filter: "blur(10px)" }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            transformStyle: 'preserve-3d',
            position: 'absolute',
            inset: -20, // Extend bounds
            zIndex: 50,
            perspective: '1000px'
          }}
          className="pointer-events-none"
        >
          {/* Hologram Volume Container */}
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col items-center justify-center p-6 text-center">

            {/* 3D Layers */}

            {/* Layer 1: Icon (Back) */}
            <motion.div
              style={{ transform: 'translateZ(40px)' }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="mb-4 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
            >
              {getIcon(article.category)}
            </motion.div>

            {/* Layer 2: Title (Middle) */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ transform: 'translateZ(60px)' }}
              className="text-lg font-bold text-white mb-2 text-shadow-glow"
            >
              {article.title}
            </motion.h3>

            {/* Layer 3: Metadata (Front) */}
            <motion.div
              style={{ transform: 'translateZ(80px)' }}
              className="flex flex-wrap justify-center gap-2"
            >
              <FloatingTag text={article.category} index={0} />
              <FloatingTag text={article.readTime} index={1} />
              <FloatingTag text={article.date} index={2} />
            </motion.div>

            {/* Holographic Effects */}
            <ScanLineOverlay />

            {/* Glitch/Chromatic Aberration Effect Layers */}
            <motion.div
              className="absolute inset-0 border-2 border-red-500/20 rounded-3xl"
              animate={{ x: [-2, 2, -2], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-blue-500/20 rounded-3xl"
              animate={{ x: [2, -2, 2], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}
            />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- FEATURE 8: GRAVITATIONAL TEXT DISTORTION ---

const GravitationalText = ({ text, className }: { text: string; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  // Physics state (mutable)
  const physics = useRef(text.split('').map(() => ({
    x: 0, y: 0, vx: 0, vy: 0
  })));

  // Motion values for performance (avoid React renders)
  const motionValues = useRef(text.split('').map(() => ({
    x: useMotionValue(0),
    y: useMotionValue(0),
    scaleX: useMotionValue(1),
  }))).current;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useAnimationFrame(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    physics.current.forEach((p, i) => {
      const span = lettersRef.current[i];
      if (!span) return;

      // Calculate origin position relative to viewport
      const originX = containerRect.left + span.offsetLeft + (span.offsetWidth / 2);
      const originY = containerRect.top + span.offsetTop + (span.offsetHeight / 2);

      // Current actual position
      const currentX = originX + p.x;
      const currentY = originY + p.y;

      const dx = mouse.current.x - currentX;
      const dy = mouse.current.y - currentY;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      // Gravitational Pull (Inverse Square Law)
      if (dist < 250 && dist > 5) {
        const force = 2000 / (distSq + 100);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        p.vx += fx * 0.8;
        p.vy += fy * 0.8;
      }

      // Spring back to origin
      const k = 0.08; // Stiffness
      const damping = 0.85; // Friction

      const springX = -p.x * k;
      const springY = -p.y * k;

      p.vx += springX;
      p.vy += springY;

      p.vx *= damping;
      p.vy *= damping;

      p.x += p.vx;
      p.y += p.vy;

      // Update MotionValues
      motionValues[i].x.set(p.x);
      motionValues[i].y.set(p.y);

      // Stretch effect based on velocity (Liquid metal effect)
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      motionValues[i].scaleX.set(1 + speed * 0.03);
    });
  });

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          ref={el => { lettersRef.current[i] = el; }}
          style={{
            x: motionValues[i].x,
            y: motionValues[i].y,
            scaleX: motionValues[i].scaleX,
            display: 'inline-block',
            transformOrigin: 'center'
          }}
          className="relative"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
};

// --- FEATURE 11: AMBIENT SOUNDSCAPE ---

const useWebAudio = () => {
  const audioContext = useRef<AudioContext | null>(null);
  const droneNode = useRef<OscillatorNode | null>(null);
  const masterGain = useRef<GainNode | null>(null);
  const droneGain = useRef<GainNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initialize = useCallback(() => {
    if (isInitialized) return;

    try {
      // @ts-ignore - WebKit prefix support
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();

      // Master gain for overall volume control
      masterGain.current = audioContext.current.createGain();
      masterGain.current.connect(audioContext.current.destination);
      masterGain.current.gain.value = 0;

      // Drone oscillator setup
      droneGain.current = audioContext.current.createGain();
      droneGain.current.gain.value = 0.03; // Very quiet drone
      droneGain.current.connect(masterGain.current);

      droneNode.current = audioContext.current.createOscillator();
      droneNode.current.type = 'sine';
      droneNode.current.frequency.value = 60;
      droneNode.current.connect(droneGain.current);
      droneNode.current.start();

      setIsInitialized(true);
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }, [isInitialized]);

  const enable = useCallback(() => {
    if (!audioContext.current) initialize();
    if (!masterGain.current || !audioContext.current) return;

    const currentTime = audioContext.current.currentTime;
    masterGain.current.gain.cancelScheduledValues(currentTime);
    masterGain.current.gain.setValueAtTime(masterGain.current.gain.value, currentTime);
    masterGain.current.gain.linearRampToValueAtTime(1, currentTime + 2);
  }, [initialize]);

  const disable = useCallback(() => {
    if (!masterGain.current || !audioContext.current) return;

    const currentTime = audioContext.current.currentTime;
    masterGain.current.gain.cancelScheduledValues(currentTime);
    masterGain.current.gain.setValueAtTime(masterGain.current.gain.value, currentTime);
    masterGain.current.gain.linearRampToValueAtTime(0, currentTime + 1.5);
  }, []);

  const playChime = useCallback((frequency: number = 800, pan: number = 0) => {
    if (!audioContext.current || !masterGain.current) return;

    try {
      const currentTime = audioContext.current.currentTime;
      const osc = audioContext.current.createOscillator();
      const gain = audioContext.current.createGain();
      const panner = audioContext.current.createStereoPanner?.();

      osc.type = 'triangle';
      osc.frequency.value = frequency;

      osc.connect(gain);

      if (panner) {
        panner.pan.value = Math.max(-1, Math.min(1, pan));
        gain.connect(panner);
        panner.connect(masterGain.current);
      } else {
        gain.connect(masterGain.current);
      }

      gain.gain.setValueAtTime(0.08, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.4);

      osc.frequency.setValueAtTime(frequency, currentTime);
      osc.frequency.linearRampToValueAtTime(frequency * 1.5, currentTime + 0.05);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.8, currentTime + 0.4);

      osc.start(currentTime);
      osc.stop(currentTime + 0.4);
    } catch (error) {
      console.warn('Error playing chime:', error);
    }
  }, []);

  const playClick = useCallback(() => {
    if (!audioContext.current || !masterGain.current) return;

    try {
      const currentTime = audioContext.current.currentTime;
      const osc = audioContext.current.createOscillator();
      const gain = audioContext.current.createGain();

      osc.type = 'sine';
      osc.frequency.value = 1200;
      osc.connect(gain);
      gain.connect(masterGain.current);

      gain.gain.setValueAtTime(0.05, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.8);

      osc.frequency.setValueAtTime(1200, currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, currentTime + 0.8);

      osc.start(currentTime);
      osc.stop(currentTime + 0.8);
    } catch (error) {
      console.warn('Error playing click:', error);
    }
  }, []);

  const modulateDronePitch = useCallback((scrollProgress: number) => {
    if (!droneNode.current || !audioContext.current) return;

    try {
      const targetFreq = 60 - (scrollProgress * 20); // 60Hz to 40Hz
      const currentTime = audioContext.current.currentTime;
      droneNode.current.frequency.cancelScheduledValues(currentTime);
      droneNode.current.frequency.setValueAtTime(droneNode.current.frequency.value, currentTime);
      droneNode.current.frequency.linearRampToValueAtTime(targetFreq, currentTime + 0.2);
    } catch (error) {
      console.warn('Error modulating drone:', error);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);

  return { enable, disable, playChime, playClick, modulateDronePitch, isInitialized };
};

const AmbientSoundscape = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { enable, disable, playChime, playClick, modulateDronePitch } = useWebAudio();

  useEffect(() => {
    if (isEnabled && scrollYProgress) {
      const unsubscribe = scrollYProgress.on('change', (progress: number) => {
        modulateDronePitch(progress);
      });
      return unsubscribe;
    }
  }, [isEnabled, scrollYProgress, modulateDronePitch]);

  const handleToggle = () => {
    if (isEnabled) {
      disable();
      setIsEnabled(false);
    } else {
      enable();
      setIsEnabled(true);
      playChime(800, 0);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-slate-900/80 backdrop-blur-lg border transition-colors duration-300"
      style={{ borderColor: isEnabled ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle ambient sound"
      title={isEnabled ? 'Disable ambient sound' : 'Enable ambient sound'}
    >
      <motion.div
        animate={{
          rotate: isEnabled ? 0 : 0,
          opacity: isEnabled ? 1 : 0.5
        }}
        transition={{ duration: 0.3 }}
      >
        {isEnabled ? (
          <Volume2 className="w-6 h-6 transition-colors duration-300" style={{ color: 'var(--color-primary)' }} />
        ) : (
          <VolumeX className="w-6 h-6 text-slate-400" />
        )}
      </motion.div>

      {/* Pulse ring when enabled */}
      {isEnabled && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: 'var(--color-primary)' }}
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      )}
    </motion.button>
  );
};

// --- FEATURE 9: BIOLUMINESCENT READING PROGRESS ---

const BioluminescentProgress = () => {
  const { scrollYProgress } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Create a wiggly path based on window height
  const pathD = `M 2,0 
    Q 8,${windowHeight * 0.1} 2,${windowHeight * 0.2} 
    Q -4,${windowHeight * 0.3} 2,${windowHeight * 0.4} 
    Q 8,${windowHeight * 0.5} 2,${windowHeight * 0.6} 
    Q -4,${windowHeight * 0.7} 2,${windowHeight * 0.8} 
    Q 8,${windowHeight * 0.9} 2,${windowHeight}`;

  return (
    <motion.div
      className="fixed left-0 top-0 h-full w-12 pointer-events-none z-50 hidden md:block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="bioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="1" />
            <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.2" />
          </linearGradient>
          <filter id="bioGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background faint path */}
        <path
          d={pathD}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          fill="none"
        />

        {/* Active progress path */}
        <motion.path
          d={pathD}
          stroke="url(#bioGradient)"
          strokeWidth="6"
          fill="none"
          style={{ pathLength }}
          filter="url(#bioGlow)"
          strokeLinecap="round"
        />

        {/* Head Particle */}
        <motion.circle
          r="4"
          fill="#fff"
          style={{
            offsetPath: `path('${pathD}')`,
            offsetDistance: useTransform(pathLength, v => `${v * 100}%`)
          } as any}
          animate={{
            r: [4, 6, 4],
            filter: ["drop-shadow(0 0 4px var(--color-primary))", "drop-shadow(0 0 8px var(--color-primary))", "drop-shadow(0 0 4px var(--color-primary))"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Floating Particles System (Simple) */}
      <ParticlesEmitter progress={scrollYProgress} />
    </motion.div>
  );
};

const ParticlesEmitter = ({ progress }: { progress: any }) => {
  // Simplified particle effect for performance
  return (
    <motion.div
      className="absolute left-0 top-0 w-full h-full pointer-events-none"
      style={{ opacity: useTransform(progress, [0, 0.1], [0, 1]) }}
    >
      {/* Particles would go here - simplified for this step to maintain focus on the main indicator */}
    </motion.div>
  );
};

// Quantum Card Component
function QuantumCard({ children, className, timeMultiplier = 1, article }: { children: React.ReactNode; className?: string; timeMultiplier?: number; article?: any }) {
  const [state, setState] = useState<QuantumState>('solid');
  const [isHovered, setIsHovered] = useState(false);
  const [isPhasing, setIsPhasing] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };

  // State Transition Cycle
  useEffect(() => {
    if (isHovered) {
      setState('solid');
      return;
    }

    let duration = 3000 / timeMultiplier;
    if (state === 'particle') duration = 2000 / timeMultiplier;
    if (state === 'wireframe') duration = 2000 / timeMultiplier;

    const timer = setTimeout(() => {
      setState(prev => {
        if (prev === 'solid') return 'particle';
        if (prev === 'particle') return 'wireframe';
        return 'solid';
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [state, isHovered, timeMultiplier]);

  // Random Quantum Phase (Tunneling)
  useEffect(() => {
    if (isHovered) return;

    const triggerPhase = () => {
      if (Math.random() > 0.7) { // 30% chance every check
        setIsPhasing(true);
        setTimeout(() => setIsPhasing(false), 600 / timeMultiplier);
      }
      // Schedule next check
      timeout = setTimeout(triggerPhase, (Math.random() * 15000 + 5000) / timeMultiplier);
    };

    let timeout = setTimeout(triggerPhase, 10000);
    return () => clearTimeout(timeout);
  }, [isHovered, timeMultiplier]);

  return (
    <motion.div
      className={`relative group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      animate={{
        scale: isHovered ? 1.02 : 1,
        z: isHovered ? 20 : 0,
        opacity: isPhasing ? 0.6 : 1,
        x: isPhasing ? [0, -5, 5, 0] : 0,
        filter: isPhasing ? ["blur(0px)", "blur(4px)", "blur(0px)"] : "blur(0px)",
      }}
      transition={{
        scale: { duration: 0.4, ease: "circOut" },
        z: { duration: 0.4 },
        opacity: { duration: 0.6 },
        x: { duration: 0.6, times: [0, 0.2, 0.8, 1] },
        filter: { duration: 0.6 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <DisplacedShadows collapsed={isHovered} timeMultiplier={timeMultiplier} />

      {/* Holographic Preview Layer */}
      {article && <HolographicPreview article={article} isHovered={isHovered} mousePosition={mousePos} />}

      {/* Container for Layers */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 h-full">

        {/* Solid Layer (Glass) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 z-10"
          animate={{ opacity: state === 'solid' || isHovered ? 1 : 0 }}
          transition={{ duration: 0.8 / timeMultiplier }}
        />

        {/* Particle Layer (Dissolution) */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          animate={{ opacity: state === 'particle' && !isHovered ? 1 : 0 }}
          transition={{ duration: 0.8 / timeMultiplier }}
        >
          <div className="absolute inset-0 border-2 rounded-3xl"
            style={{
              borderColor: 'var(--color-primary)',
              opacity: 0.3,
              filter: 'url(#quantum-particle-dissolve)'
            }} />
          {/* Simulated particles via noise texture overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
        </motion.div>

        {/* Wireframe Layer (Holographic) */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          animate={{ opacity: state === 'wireframe' && !isHovered ? 1 : 0 }}
          transition={{ duration: 0.8 / timeMultiplier }}
        >
          <div className="absolute inset-0 border rounded-3xl"
            style={{
              borderColor: 'var(--color-primary)',
              opacity: 0.5,
              boxShadow: '0 0 15px var(--color-glow)'
            }} />
          {/* Scanline */}
          <motion.div
            className="absolute inset-0 h-[20%]"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-primary), transparent)', opacity: 0.1 }}
            animate={{ top: ['-20%', '120%'] }}
            transition={{ duration: 2 / timeMultiplier, repeat: Infinity, ease: "linear" }}
          />
          {/* Corner Nodes */}
          <div className="absolute top-0 left-0 w-2 h-2 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary)' }} />
          <div className="absolute top-0 right-0 w-2 h-2 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary)' }} />
          <div className="absolute bottom-0 left-0 w-2 h-2 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary)' }} />
          <div className="absolute bottom-0 right-0 w-2 h-2 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary)' }} />

          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </motion.div>

        {/* Content Container */}
        <motion.div
          className="relative z-20 p-6 md:p-8"
          animate={{ opacity: (state === 'wireframe' || state === 'particle') && !isHovered ? 0.7 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- FEATURE 4: NEURAL PATHWAY CATEGORY FILTER ---

interface NeuralConnection {
  id: string;
  path: string;
  isActive: boolean;
}

const NeuralCategoryFilter = ({
  categories,
  activeCategory,
  onSelect,
  timeMultiplier = 1
}: {
  categories: string[];
  activeCategory: string;
  onSelect: (c: string) => void;
  timeMultiplier?: number;
}) => {
  const [connections, setConnections] = useState<NeuralConnection[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const prevCategory = useRef(activeCategory);

  // Create connection on category change
  useEffect(() => {
    if (prevCategory.current === activeCategory) return;

    const fromBtn = buttonRefs.current[prevCategory.current];
    const toBtn = buttonRefs.current[activeCategory];
    const container = containerRef.current;

    if (fromBtn && toBtn && container) {
      const containerRect = container.getBoundingClientRect();
      const fromRect = fromBtn.getBoundingClientRect();
      const toRect = toBtn.getBoundingClientRect();

      // Calculate relative coordinates
      const startX = fromRect.left - containerRect.left + fromRect.width / 2;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2;
      const endX = toRect.left - containerRect.left + toRect.width / 2;
      const endY = toRect.top - containerRect.top + toRect.height / 2;

      // Organic Bezier Curve
      const dist = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      // Add randomness to control point for organic feel
      const curvature = Math.min(dist * 0.5, 100);
      const angle = Math.atan2(endY - startY, endX - startX);
      const perpAngle = angle + Math.PI / 2;

      const cp1x = midX + Math.cos(perpAngle) * curvature;
      const cp1y = midY + Math.sin(perpAngle) * curvature;

      const pathData = `M ${startX},${startY} Q ${cp1x},${cp1y} ${endX},${endY}`;

      setConnections(prev => {
        // Mark old connections as inactive (memory traces)
        const updated = prev.map(c => ({ ...c, isActive: false }));
        // Add new connection
        return [...updated.slice(-3), { // Keep last 3 traces
          id: `${prevCategory.current}-${activeCategory}-${Date.now()}`,
          path: pathData,
          isActive: true
        }];
      });
    }

    prevCategory.current = activeCategory;
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="relative mb-20 py-8">
      {/* Neural Pathways Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
        <defs>
          <filter id="neural-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
        <AnimatePresence>
          {connections.map((conn) => (
            <g key={conn.id}>
              {/* Connection Path */}
              <motion.path
                d={conn.path}
                fill="none"
                stroke={conn.isActive ? "url(#neural-gradient)" : "rgba(255,255,255,0.1)"}
                strokeWidth={conn.isActive ? 2 : 1}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: conn.isActive ? 1 : 0.2
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 / timeMultiplier, ease: "circOut" }}
                style={{ filter: conn.isActive ? "url(#neural-glow)" : "none" }}
              />

              {/* Electrical Pulse (Only on active) */}
              {conn.isActive && (
                <motion.circle
                  r="3"
                  fill="#fff"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 0.6 / timeMultiplier,
                    ease: "linear",
                    repeat: 2,
                    repeatDelay: 0.2
                  }}
                  style={{
                    offsetPath: `path('${conn.path}')`,
                    filter: "drop-shadow(0 0 4px var(--color-primary))"
                  } as any}
                />
              )}
            </g>
          ))}
        </AnimatePresence>
      </svg>

      {/* Neural Nodes (Buttons) */}
      <div className="flex flex-wrap justify-center gap-6 relative z-10">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <motion.button
              key={category}
              ref={el => { buttonRefs.current[category] = el; }}
              onClick={() => onSelect(category)}
              className="relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Node Core */}
              <div className={`
                relative w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-500
                ${isActive
                  ? 'bg-slate-900 border-2 shadow-[0_0_20px_var(--color-glow)]'
                  : 'bg-slate-900/50 border border-white/10'
                }
              `}
                style={{ borderColor: isActive ? 'var(--color-primary)' : undefined }}
              >
                {/* Inner Synapse */}
                <div className={`
                  w-2 h-2 rounded-full transition-all duration-500
                  ${isActive ? 'shadow-[0_0_10px_currentColor]' : 'bg-slate-600'}
                `}
                  style={{ backgroundColor: isActive ? 'var(--color-primary)' : undefined, color: isActive ? 'var(--color-primary)' : undefined }}
                />

                {/* Pulse Ring */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: 'var(--color-primary)', opacity: 0.3 }}
                    animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                    transition={{ duration: 1.5 / timeMultiplier, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Label */}
              <span className={`
                absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium whitespace-nowrap
                transition-colors duration-300
                ${isActive ? '' : 'text-slate-400 group-hover:text-white'}
              `}
                style={{ color: isActive ? 'var(--color-primary)' : undefined }}
              >
                {category}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

// --- FEATURE 14: REALITY ANCHOR MICRO-INTERACTIONS ---

interface Ripple {
  id: string;
  x: number;
  y: number;
}

const ClickRipple = ({ x, y }: { x: number; y: number }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0.8 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: 100,
        height: 100,
        borderRadius: '50%',
        border: '2px solid var(--color-primary)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        boxShadow: '0 0 20px var(--color-glow)'
      }}
    />
  );
};

const useScreenShake = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const shake = useCallback(() => {
    let frame = 0;
    const maxFrames = 10;

    const animate = () => {
      if (frame >= maxFrames) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const intensity = (1 - frame / maxFrames) * 2; // Decay
      setOffset({
        x: (Math.random() - 0.5) * intensity,
        y: (Math.random() - 0.5) * intensity
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return { offset, shake };
};

// --- FEATURE 13: ACCESSIBILITY & PERFORMANCE OPTIMIZATION ---

const usePerformanceMode = () => {
  const [mode, setMode] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    // Detect device capability
    const memory = (navigator as any).deviceMemory || 8;
    const cores = navigator.hardwareConcurrency || 4;
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile || memory < 4 || cores < 4) {
      setMode('low');
    } else if (memory < 8 || cores < 8) {
      setMode('medium');
    }
  }, []);

  return mode;
};

const useKeyboardShortcuts = (onEscapePress?: () => void) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Focus filter on '/' key
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        const filterButton = document.querySelector<HTMLElement>('[data-filter-button]');
        if (filterButton) filterButton.focus();
      }

      // Escape key to clear/close
      if (e.key === 'Escape' && onEscapePress) {
        onEscapePress();
      }

      // Arrow navigation for article cards
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        const cards = document.querySelectorAll('[data-article-card]');
        const focusedIndex = Array.from(cards).findIndex(el =>
          el.contains(document.activeElement)
        );

        if (focusedIndex !== -1) {
          e.preventDefault();
          const nextIndex = e.key === 'ArrowDown'
            ? Math.min(focusedIndex + 1, cards.length - 1)
            : Math.max(focusedIndex - 1, 0);

          (cards[nextIndex] as HTMLElement).focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onEscapePress]);
};

// --- FEATURE 12: DIMENSIONAL DEPTH FOG ---

const DepthFog = ({
  children,
  depth = 0,
  className = ""
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) => {
  // Map depth (-100 to 100) to fog opacity (0.6 to 0)
  // Background (depth -100): max fog
  // Foreground (depth 100): no fog
  const fogOpacity = Math.max(0, Math.min(0.6, (depth * -1 + 100) / 200 * 0.6));
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${depth}px)`
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}

      {/* Atmospheric fog overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, 
            rgba(10,14,26,0) 0%, 
            rgba(10,14,26,${fogOpacity * 0.7}) 60%,
            rgba(10,14,26,${fogOpacity}) 100%
          )`,
          mixBlendMode: 'multiply'
        }}
        animate={{
          opacity: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* Subtle cyan fog tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(6, 182, 212, ${fogOpacity * 0.05}) 0%,
            transparent 70%
          )`
        }}
        animate={{
          opacity: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </motion.div>
  );
};

// Physics-enabled word component
function PhysicsWord({
  idea,
  mouseX,
  mouseY,
  index,
  timeMultiplier = 1
}: {
  idea: { text: string; x: string; y: string; delay: number; duration: number };
  mouseX: any;
  mouseY: any;
  index: number;
  timeMultiplier?: number;
}) {
  const wordRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useAnimationFrame(() => {
    if (!wordRef.current) return;

    const rect = wordRef.current.getBoundingClientRect();
    const wordCenterX = rect.left + rect.width / 2;
    const wordCenterY = rect.top + rect.height / 2;

    const dx = mouseX.get() - wordCenterX;
    const dy = mouseY.get() - wordCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 200 && distance > 0) {
      const force = (200 - distance) / 200;
      setOffset({
        x: -dx * force * 0.3,
        y: -dy * force * 0.3
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  });

  return (
    <motion.div
      ref={wordRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.12, 0.12, 0],
        y: [20, -20, -20, -60],
        x: offset.x,
        rotateX: [0, 5, 0, -5, 0],
        rotateZ: [0, 3, 0, -3, 0],
        scale: [0.95, 1.05, 0.95],
      }}
      transition={{
        opacity: {
          duration: idea.duration / timeMultiplier,
          delay: idea.delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: idea.duration / timeMultiplier,
          delay: idea.delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        x: {
          type: "spring",
          stiffness: 150,
          damping: 20,
        },
        rotateX: {
          duration: (25 + index * 2) / timeMultiplier,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotateZ: {
          duration: (20 + index * 1.5) / timeMultiplier,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: (15 + index) / timeMultiplier,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        position: "absolute",
        left: idea.x,
        top: `calc(${idea.y} + ${offset.y}px)`,
        transformStyle: "preserve-3d",
      }}
      className="text-xl md:text-3xl font-heading font-bold text-accent-lavender/25 blur-[0.5px]"
    >
      {idea.text}
    </motion.div>
  );
}

// Floating Ideas Component
function FloatingIdeas({ timeMultiplier = 1 }: { timeMultiplier?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const ideas = [
    { text: "Innovation", x: "8%", y: "15%", delay: 0, duration: 28 },
    { text: "Intelligence", x: "88%", y: "12%", delay: 2, duration: 32 },
    { text: "Vision", x: "12%", y: "75%", delay: 1, duration: 30 },
    { text: "Purpose", x: "85%", y: "70%", delay: 3, duration: 34 },
    { text: "Creative Power", x: "50%", y: "20%", delay: 1.5, duration: 29 },
    { text: "Future Architecture", x: "65%", y: "45%", delay: 2.5, duration: 31 },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {ideas.map((idea, i) => (
        <DepthFog key={i} depth={-50}>
          <PhysicsWord
            idea={idea}
            mouseX={mouseX}
            mouseY={mouseY}
            index={i}
            timeMultiplier={timeMultiplier}
          />
        </DepthFog>
      ))}
    </div>
  );
}

// Magnetic Button Component
function MagneticButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setMagneticPos({ x, y });
  };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setMagneticPos({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      animate={{
        x: magneticPos.x,
        y: magneticPos.y,
        scale: isHovered ? 1.02 : 1
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        scale: { duration: 0.2 }
      }}
      className="flex items-center gap-2 font-medium group-hover:gap-4 transition-all duration-300"
      style={{
        filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
        color: 'var(--color-primary)'
      }}
    >
      <span>Read more</span>
      <motion.div
        animate={{
          x: isHovered ? 12 : [0, 5, 0]
        }}
        transition={
          isHovered
            ? { duration: 0.2 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
}

const thoughts = [
  {
    title: 'The Ethics of AI: Building Intelligence with Responsibility',
    excerpt: 'Exploring how we can create AI systems that not only solve problems but do so with empathy, transparency, and ethical consideration.',
    date: 'Dec 2024',
    readTime: '5 min read',
    category: 'AI Ethics',
    slug: 'ethics-of-ai',
    keywords: ['ethics', 'responsibility', 'humanity', 'transparency', 'future']
  },
  {
    title: 'From Data to Insight: My Journey in Machine Learning',
    excerpt: 'Lessons learned from building ML models, understanding patterns, and discovering how data tells stories we never expected.',
    date: 'Nov 2024',
    readTime: '7 min read',
    category: 'Learning',
    slug: 'data-to-insight',
    keywords: ['data', 'patterns', 'learning', 'discovery', 'future']
  },
  {
    title: 'Automation with Purpose: Beyond Efficiency',
    excerpt: 'Why automation should amplify human creativity rather than replace it—and how we can design systems that empower people.',
    date: 'Oct 2024',
    readTime: '6 min read',
    category: 'Automation',
    slug: 'automation-purpose',
    keywords: ['automation', 'creativity', 'humanity', 'efficiency', 'systems']
  },
];

// --- FEATURE 10: THOUGHT CONSTELLATION CONNECTIONS ---

interface Connection {
  source: string;
  target: string;
  strength: number;
  sharedKeywords: string[];
}

const calculateSemanticSimilarity = (a1: any, a2: any): { score: number, keywords: string[] } => {
  let score = 0;
  const sharedKeywords = a1.keywords.filter((k: string) => a2.keywords.includes(k));

  if (a1.category === a2.category) score += 0.5;
  score += sharedKeywords.length * 0.2;

  return { score: Math.min(1, score), keywords: sharedKeywords };
};

const ThoughtConstellation = ({ articles, hoveredSlug, cardRefs }: { articles: typeof thoughts, hoveredSlug: string | null, cardRefs: any }) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Generate connections graph
  useEffect(() => {
    const newConnections: Connection[] = [];
    for (let i = 0; i < articles.length; i++) {
      for (let j = i + 1; j < articles.length; j++) {
        const { score, keywords } = calculateSemanticSimilarity(articles[i], articles[j]);
        if (score > 0.1) {
          newConnections.push({
            source: articles[i].slug,
            target: articles[j].slug,
            strength: score,
            sharedKeywords: keywords
          });
        }
      }
    }
    setConnections(newConnections);
  }, [articles]);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Helper to get card center relative to SVG
  const getCardCenter = (slug: string) => {
    const el = cardRefs.current[slug];
    if (!el || !svgRef.current) return { x: 0, y: 0 };

    const cardRect = el.getBoundingClientRect();
    const svgRect = svgRef.current.getBoundingClientRect();

    return {
      x: cardRect.left - svgRect.left + cardRect.width / 2,
      y: cardRect.top - svgRect.top + cardRect.height / 2
    };
  };

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
    >
      <defs>
        <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.8" />
        </linearGradient>
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <AnimatePresence>
        {connections.map((conn, i) => {
          const isActive = hoveredSlug === conn.source || hoveredSlug === conn.target;
          const isRelated = hoveredSlug && (hoveredSlug === conn.source || hoveredSlug === conn.target);

          // Only render if we have positions
          const start = getCardCenter(conn.source);
          const end = getCardCenter(conn.target);

          if (start.x === 0 || end.x === 0) return null;

          // Bezier curve
          const midY = (start.y + end.y) / 2;
          const dist = Math.abs(end.y - start.y);
          const controlOffset = 100 + (dist * 0.1); // Curve out more for distant cards

          // Alternating curve direction for visual interest
          const direction = i % 2 === 0 ? 1 : -1;

          const cp1 = { x: start.x - (controlOffset * direction), y: start.y + (dist * 0.2) };
          const cp2 = { x: end.x - (controlOffset * direction), y: end.y - (dist * 0.2) };

          const pathD = `M ${start.x},${start.y} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${end.x},${end.y}`;

          return (
            <g key={`${conn.source}-${conn.target}`}>
              {/* Base Connection Line */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#constellationGradient)"
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray="4, 6"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{
                  opacity: isActive ? 0.6 : 0.1,
                  pathLength: 1
                }}
                transition={{ duration: 0.8, ease: "circOut" }}
              />

              {/* Active Pulse */}
              {isActive && (
                <motion.circle
                  r="3"
                  fill="#fff"
                  filter="url(#starGlow)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 1.5,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  style={{ offsetPath: `path('${pathD}')` } as any}
                />
              )}

              {/* Keyword Stars along the path */}
              {conn.sharedKeywords.map((keyword, k) => {
                const t = (k + 1) / (conn.sharedKeywords.length + 1);
                // Approximate position on curve (simplified for performance)
                // Ideally we'd use getPointAtLength but that's expensive in render loop
                // We'll use CSS offset-path for positioning if supported, or just hide them for now to keep it clean
                // Actually, let's use offset-distance which is supported in modern browsers

                return (
                  <motion.g key={`${conn.source}-${conn.target}-${keyword}`}>
                    <motion.circle
                      r={isActive ? 4 : 2}
                      fill={isActive ? "#fff" : "var(--color-primary)"}
                      filter="url(#starGlow)"
                      style={{
                        offsetPath: `path('${pathD}')`,
                        offsetDistance: `${t * 100}%`
                      } as any}
                      animate={{
                        scale: isActive ? [1, 1.5, 1] : 1,
                        opacity: isActive ? 1 : 0.4
                      }}
                      transition={{
                        scale: { duration: 0.6, repeat: Infinity, repeatDelay: 0.2 * k }
                      }}
                    />
                    {/* Tooltip for keyword - only visible on active */}
                    {isActive && (
                      <motion.text
                        dy={-10}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize="10"
                        style={{
                          offsetPath: `path('${pathD}')`,
                          offsetDistance: `${t * 100}%`
                        } as any}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {keyword}
                      </motion.text>
                    )}
                  </motion.g>
                );
              })}
            </g>
          );
        })}
      </AnimatePresence>
    </svg>
  );
};

const categories = ['All', 'AI Ethics', 'Learning', 'Automation', 'Innovation'];

export default function ThoughtsPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const shouldReduceMotion = useReducedMotion();
  const performanceMode = usePerformanceMode();
  const { offset, shake } = useScreenShake();
  useKeyboardShortcuts(() => setActiveCategory('All'));

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Feature 6: Emotional State Hook
  const { primary, accent, glow } = useEmotionalState();

  // Feature 5: Temporal Scroll Hook
  const { timeMultiplier, scrollY, isReversing, scrollYProgress } = useTemporalScroll();

  // Parallax Transforms (disabled if reduced motion)
  const titleY = useTransform(scrollY, [0, 1000], shouldReduceMotion ? [0, 0] : [0, -300]);
  const floatingIdeasY = useTransform(scrollY, [0, 1000], shouldReduceMotion ? [0, 0] : [0, -2500]);
  const backgroundY = useTransform(scrollY, [0, 1000], shouldReduceMotion ? [0, 0] : [0, 500]);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  // Click ripple handler
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (shouldReduceMotion) return;

    const newRipple: Ripple = {
      id: Math.random().toString(),
      x: e.clientX,
      y: e.clientY
    };
    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 800);
  }, [shouldReduceMotion]);

  // Category selection with shake effect
  const handleCategorySelect = useCallback((category: string) => {
    if (!shouldReduceMotion) shake();
    setActiveCategory(category);
  }, [shouldReduceMotion, shake]);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-cyan-400 focus:border focus:border-cyan-400 focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Click Ripples */}
      {!shouldReduceMotion && ripples.map(ripple => (
        <ClickRipple key={ripple.id} x={ripple.x} y={ripple.y} />
      ))}

      <motion.main
        className="relative min-h-screen pt-32 pb-20 overflow-hidden transition-colors duration-[3000ms] ease-in-out"
        style={{
          '--color-primary': primary,
          '--color-accent': accent,
          '--color-glow': glow,
          x: offset.x,
          y: offset.y
        } as React.CSSProperties}
        onClick={handleClick}
      >
        <QuantumFilters />
        <VisionBackground />
        {!shouldReduceMotion && performanceMode !== 'low' && <SynapticNetwork />}
        {!shouldReduceMotion && <MagneticCursor />}
        {!shouldReduceMotion && <BioluminescentProgress />}
        {!shouldReduceMotion && performanceMode === 'high' && <AmbientSoundscape scrollYProgress={scrollYProgress} />}
        <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />

        {/* Floating Ideas Background (Fast Time Zone) */}
        <motion.div style={{ y: floatingIdeasY }} className="absolute inset-0 pointer-events-none z-0 will-change-transform">
          <FloatingIdeas timeMultiplier={timeMultiplier * 2} />
        </motion.div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10" id="main-content" role="main" aria-label="Articles and blog posts">
          {/* Title Area (Slow Time Zone) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 / timeMultiplier }} // Time dilation applied
            style={{ y: titleY }}
            className="text-center mb-20 will-change-transform"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border mb-6 transition-colors duration-[3000ms]"
              style={{ borderColor: 'var(--color-primary)', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              <BookOpen className="w-4 h-4 transition-colors duration-[3000ms]" style={{ color: 'var(--color-primary)' }} />
              <span className="text-sm text-muted">Reflections & Insights</span>
            </div>

            <LiquidGlassTitle />

            <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
              Exploring AI, innovation, and the intersection of technology with humanity
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center"
            role="complementary"
            aria-label="Newsletter signup"
          >
            <PremiumBox variant="large" className="max-w-2xl mx-auto text-center" hover={false}>
              <Sparkles className="w-8 h-8 mx-auto mb-4 transition-colors duration-[3000ms]" style={{ color: 'var(--color-primary)' }} />
              <p className="text-lg text-slate-300 leading-relaxed">
                More thoughts coming soon. Subscribe to stay updated on my journey exploring AI, innovation, and the future of intelligent systems.
              </p>
            </PremiumBox>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
