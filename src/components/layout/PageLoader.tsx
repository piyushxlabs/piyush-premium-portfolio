"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// --- Types & Configuration ---
type LoadingPhase = "VOID" | "AWAKENING" | "GENESIS_MOMENT" | "CONVERGENCE" | "STABILIZATION" | "INVITATION" | "TRANSCENDENCE";

const COLORS = {
  void: "#050510",
  voidAlt1: "#0a0a1f",
  voidAlt2: "#0f0520",
  cyan: "#22d3ee",
  violet: "#8b5cf6",
  magenta: "#d946ef",
  gold: "#fcd34d",
  white: "#ffffff",
};

const NARRATIVE_TEXTS = [
  { text: "INITIALIZING NEURAL MATRIX...", sub: "▓▓▓▓▓░░░░░ ESTABLISHING UPLINK" },
  { text: "SCANNING DIMENSIONAL COORDINATES...", sub: "FOUND: [ 40.7128° N, 74.0060° W ]" },
  { text: "DECODING FREQUENCY SIGNATURE...", sub: "◆ CREATIVE ◆ VISIONARY ◆ ARCHITECT ◆" },
  { text: "CONSTELLATION ALIGNED", sub: "GATEWAY STABILIZED" },
];

const LOADER_CONFIG = {
  PHYSICS: {
    MOUSE_INFLUENCE_RADIUS: 300,
    MOUSE_PULL_STRENGTH: 3,
    CONNECTION_DISTANCE: { MIN: 60, MAX: 120 },
  },
  TIMING: {
    GENESIS_MOMENT: 1500,
    GENESIS_FREEZE_DURATION: 150,
    BREATHING_CYCLE: 3000,
  },
  PARTICLES: {
    DESKTOP_COUNT: 1200,
    MOBILE_COUNT: 600,
    CONNECTION_SKIP_RATE: { CONVERGENCE: 3, STABILIZATION: 5, DEFAULT: 6 },
  },
};

export function PageLoader() {
  const [phase, setPhase] = useState<LoadingPhase>("VOID");
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isReturningVisitor, setIsReturningVisitor] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("night");
  
  // Mouse Physics with Spring
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Time-based color palette
  const getTimeBasedColors = () => {
    const palettes = {
      morning: { primary: "#fbbf24", secondary: "#fb923c" },
      afternoon: { primary: "#22d3ee", secondary: "#38bdf8" },
      evening: { primary: "#a855f7", secondary: "#d946ef" },
      night: { primary: "#22d3ee", secondary: "#8b5cf6" },
    };
    return palettes[timeOfDay];
  };

  // Detect time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTimeOfDay("morning");
    else if (hour >= 12 && hour < 18) setTimeOfDay("afternoon");
    else if (hour >= 18 && hour < 22) setTimeOfDay("evening");
    else setTimeOfDay("night");
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Return visitor detection
  useEffect(() => {
    const hasVisited = localStorage.getItem("portfolio_visited");
    if (hasVisited) {
      setIsReturningVisitor(true);
    } else {
      localStorage.setItem("portfolio_visited", "true");
    }
  }, []);

  // --- Enhanced Particle System with 3 States ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 600 : 1200;

    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      vx: number;
      vy: number;
      vz: number;
      life: number;
      maxLife: number;
      color: string;
      baseX: number;
      baseY: number;
      state: "dormant" | "awakening" | "transcendent";
      twinkleSpeed: number;
      angle: number;
      orbitRadius: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.z = Math.random() * 300 - 150;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.vz = (Math.random() - 0.5) * 0.1;
        this.life = Math.random() * 100;
        this.maxLife = 100 + Math.random() * 150;
        this.state = "dormant";
        this.twinkleSpeed = 0.5 + Math.random() * 1.5;
        this.angle = Math.random() * Math.PI * 2;
        this.orbitRadius = 100 + Math.random() * 200;
        
        this.color = COLORS.cyan;
      }

      updateState(currentPhase: LoadingPhase) {
        if (currentPhase === "VOID") {
          this.state = "dormant";
          this.color = COLORS.cyan;
        } else if (currentPhase === "AWAKENING" || currentPhase === "CONVERGENCE") {
          this.state = Math.random() > 0.5 ? "awakening" : "dormant";
          this.color = this.state === "awakening" ? COLORS.cyan : COLORS.violet;
        } else if (currentPhase === "STABILIZATION" || currentPhase === "INVITATION") {
          this.state = "transcendent";
          this.color = Math.random() > 0.7 ? COLORS.gold : COLORS.cyan;
        }
      }

      update(mouse: { x: number; y: number }, width: number, height: number, currentPhase: LoadingPhase) {
        // State-based behavior
        this.updateState(currentPhase);

        // Orbital drift
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Gravitational Lensing (Mouse Interaction)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 300;
        const force = Math.max(0, (maxDistance - distance) / maxDistance);

        if (distance < maxDistance && currentPhase !== "TRANSCENDENCE") {
          const pullStrength = force * 3;
          this.x += forceDirectionX * pullStrength;
          this.y += forceDirectionY * pullStrength;
          
          // Create turbulence
          this.vx += (Math.random() - 0.5) * 0.05;
          this.vy += (Math.random() - 0.5) * 0.05;
        }

        // Constellation Formation (CONVERGENCE phase)
        if (currentPhase === "CONVERGENCE" || currentPhase === "STABILIZATION") {
          const centerX = width / 2;
          const centerY = height / 2;
          const targetX = centerX + Math.cos(this.angle) * this.orbitRadius;
          const targetY = centerY + Math.sin(this.angle) * this.orbitRadius;
          
          this.x += (targetX - this.x) * 0.02;
          this.y += (targetY - this.y) * 0.02;
          
          this.angle += 0.001;
        }

        // Explosion effect (TRANSCENDENCE)
        if (currentPhase === "TRANSCENDENCE") {
          const centerX = width / 2;
          const centerY = height / 2;
          const explosionAngle = Math.atan2(this.y - centerY, this.x - centerX);
          this.x += Math.cos(explosionAngle) * 20;
          this.y += Math.sin(explosionAngle) * 20;
          this.size *= 0.92;
        }

        // Wrap around screen
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        if (this.y < -50) this.y = height + 50;
        if (this.y > height + 50) this.y = -50;

        // Life cycle for twinkling
        this.life += this.twinkleSpeed;
        if (this.life >= this.maxLife) this.life = 0;
      }

      draw(ctx: CanvasRenderingContext2D, breathingPhase: number = 0) {
        // Asynchronous twinkling
        const opacity = Math.abs(Math.sin((this.life / this.maxLife) * Math.PI));
        const stateMultiplier = this.state === "dormant" ? 0.3 : this.state === "awakening" ? 0.7 : 1;
        const breathingMultiplier = 0.85 + (Math.sin(breathingPhase) * 0.15);
        
        ctx.globalAlpha = opacity * stateMultiplier * breathingMultiplier;
        
        // Size based on z-depth (parallax)
        const scale = 1 + (this.z / 300);
        const renderedSize = this.size * scale;
        
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, renderedSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      // Trailing effect instead of clear
      ctx.fillStyle = "rgba(5, 5, 16, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const mouseObj = { x: smoothMouseX.get(), y: smoothMouseY.get() };

      // Sort by z for depth
      particles.sort((a, b) => a.z - b.z);

      const breathingPhase = Date.now() * 0.002;
      particles.forEach((p) => {
        p.update(mouseObj, canvas.width, canvas.height, phase);
        p.draw(ctx, breathingPhase);
      });

      // Neural connection lines (only during certain phases)
      if (phase === "CONVERGENCE" || phase === "STABILIZATION") {
        const skipRate = phase === "CONVERGENCE" ? LOADER_CONFIG.PARTICLES.CONNECTION_SKIP_RATE.CONVERGENCE : LOADER_CONFIG.PARTICLES.CONNECTION_SKIP_RATE.STABILIZATION;
        
        for (let i = 0; i < particles.length; i += skipRate) {
          for (let j = i + 1; j < particles.length; j += skipRate) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < LOADER_CONFIG.PHYSICS.CONNECTION_DISTANCE.MAX) {
              const opacity = 1 - (distance / LOADER_CONFIG.PHYSICS.CONNECTION_DISTANCE.MAX);
              ctx.globalAlpha = opacity * 0.2;
              ctx.lineWidth = distance < LOADER_CONFIG.PHYSICS.CONNECTION_DISTANCE.MIN ? 1 : 0.5;
              
              const gradient = ctx.createLinearGradient(
                particles[i].x, particles[i].y,
                particles[j].x, particles[j].y
              );
              gradient.addColorStop(0, particles[i].color);
              gradient.addColorStop(1, particles[j].color);
              ctx.strokeStyle = gradient;
              
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [smoothMouseX, smoothMouseY, phase]);

  // --- Narrative Timeline with GSAP-style sequencing ---
  useEffect(() => {
    if (isReturningVisitor) {
      setPhase("INVITATION");
      setTextIndex(3);
      setProgress(100);
      return;
    }

    const t1 = setTimeout(() => {
      setPhase("AWAKENING");
      setTextIndex(0);
    }, 500);

    const tGenesis = setTimeout(() => {
      setPhase("GENESIS_MOMENT");
      setTimeout(() => setPhase("CONVERGENCE"), LOADER_CONFIG.TIMING.GENESIS_FREEZE_DURATION);
    }, LOADER_CONFIG.TIMING.GENESIS_MOMENT);

    const t2 = setTimeout(() => {
      setTextIndex(1);
    }, 1700);

    const t3 = setTimeout(() => {
      setTextIndex(2);
    }, 2800);

    const t4 = setTimeout(() => {
      setPhase("STABILIZATION");
      setTextIndex(3);
    }, 4000);

    const t5 = setTimeout(() => {
      setPhase("INVITATION");
    }, 5500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(prev + Math.random() * 3 + 1, 100);
      });
    }, 80);

    // Text glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000 + Math.random() * 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(tGenesis);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
    };
  }, [isReturningVisitor]);

  // Custom cursor tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
  }, [mouseX, mouseY]);

  const handleEnter = () => {
    setPhase("TRANSCENDENCE");
    
    // White flash effect
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  const handleSkip = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      } else if ((e.key === "Enter" || e.key === " ") && phase === "INVITATION") {
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [phase, handleSkip]);

  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={containerRef}
        key="loader-container"
        className="fixed inset-0 z-[99999] overflow-hidden cursor-none font-mono"
        onMouseMove={handleMouseMove}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.voidAlt1} 0%, ${COLORS.void} 50%, ${COLORS.voidAlt2} 100%)`
        }}
      >
        {/* Custom Cursor */}
        <div
          ref={cursorRef}
          className="fixed w-8 h-8 pointer-events-none z-[100000] mix-blend-difference"
          style={{
            transform: "translate(-50%, -50%)",
            transition: "width 0.3s, height 0.3s"
          }}
        >
          <div className="relative w-full h-full">
            <motion.div
              className="absolute inset-0 border border-cyan-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.3, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: "3s" }} />
          </div>
        </div>

        {/* --- Layer 0: Animated Noise & Film Grain --- */}
        <motion.div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px"
          }}
        />

        {/* Aurora Borealis Gradients - Counter Rotating */}
        <motion.div 
          className="absolute top-[-30%] left-[-30%] w-[80vw] h-[80vw] rounded-full blur-[150px] mix-blend-screen pointer-events-none opacity-20"
          style={{
            background: `radial-gradient(circle, ${COLORS.violet} 0%, ${COLORS.magenta} 50%, transparent 70%)`
          }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 120, 0],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute bottom-[-30%] right-[-30%] w-[80vw] h-[80vw] rounded-full blur-[150px] mix-blend-screen pointer-events-none opacity-15"
          style={{
            background: `radial-gradient(circle, ${COLORS.cyan} 0%, ${COLORS.violet} 50%, transparent 70%)`
          }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -120, 0],
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div 
          className="absolute top-[50%] left-[50%] w-[60vw] h-[60vw] rounded-full blur-[120px] mix-blend-screen pointer-events-none opacity-10"
          style={{
            background: `radial-gradient(circle, ${COLORS.magenta} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)"
          }}
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Holographic Scan Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-5"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.03) 2px, rgba(34, 211, 238, 0.03) 4px)"
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px 100px"]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* --- Layer 1: Canvas Nebula (3D Particles) --- */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-10 pointer-events-none"
        />

        {/* --- Layer 2: Main Content --- */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full w-full p-4 select-none">
          
          {/* 1. The Living Constellation */}
          <motion.div 
            className="relative w-72 h-72 md:w-[28rem] md:h-[28rem] flex items-center justify-center mb-16"
            animate={{
              rotateZ: phase === "TRANSCENDENCE" ? 180 : 0
            }}
            transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1] }}
          >
            
            {/* Sacred Geometry Background Rings */}
            <motion.div 
              className="absolute inset-0 border-[0.5px] border-cyan-500/5 rounded-full"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ 
                scale: phase === "VOID" ? 0.7 : 1,
                opacity: phase === "VOID" ? 0 : 0.3,
                rotate: phase === "TRANSCENDENCE" ? 360 : 0
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            <motion.div 
              className="absolute inset-8 border-[0.5px] border-violet-500/8 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div 
              className="absolute inset-16 border-[0.5px] border-magenta-500/5 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Circular Progress Ring (Quantum Timeline) */}
            {phase !== "INVITATION" && phase !== "TRANSCENDENCE" && (
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.1)"
                  strokeWidth="0.5"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="95"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="597"
                  initial={{ strokeDashoffset: 597 }}
                  animate={{ strokeDashoffset: 597 - (597 * progress) / 100 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={COLORS.cyan} />
                    <stop offset="50%" stopColor={COLORS.violet} />
                    <stop offset="100%" stopColor={COLORS.magenta} />
                  </linearGradient>
                </defs>
              </svg>
            )}

            {/* Main Constellation Structure - Hexagonal Sacred Geometry */}
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              <defs>
                <filter id="glow-constellation">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.8" />
                  <stop offset="50%" stopColor={COLORS.violet} stopOpacity="0.6" />
                  <stop offset="100%" stopColor={COLORS.magenta} stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Connection Lines - Form the constellation structure */}
              <motion.g filter="url(#glow-constellation)">
                {[
                  // Outer hexagon
                  "M100,30 L145,62.5",
                  "M145,62.5 L145,137.5",
                  "M145,137.5 L100,170",
                  "M100,170 L55,137.5",
                  "M55,137.5 L55,62.5",
                  "M55,62.5 L100,30",
                  // Inner connections to center
                  "M100,30 L100,100",
                  "M145,62.5 L100,100",
                  "M145,137.5 L100,100",
                  "M100,170 L100,100",
                  "M55,137.5 L100,100",
                  "M55,62.5 L100,100",
                  // Diagonal cross connections
                  "M145,62.5 L55,137.5",
                  "M145,137.5 L55,62.5",
                ].map((d, i) => (
                  <motion.path
                    key={`line-${i}`}
                    d={d}
                    stroke="url(#lineGradient)"
                    strokeWidth="0.8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: phase === "VOID" ? 0 : 1,
                      opacity: phase === "TRANSCENDENCE" ? 0 : [0.4, 0.8, 0.4],
                    }}
                    transition={{ 
                      pathLength: { duration: 1.8, delay: 0.8 + (i * 0.08), ease: [0.68, -0.55, 0.265, 1.55] },
                      opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                ))}
              </motion.g>

              {/* Energy Streams - Traveling particles along lines */}
              {phase !== "VOID" && phase !== "TRANSCENDENCE" && (
                <>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.circle
                      key={`stream-${i}`}
                      r="1.5"
                      fill={COLORS.cyan}
                      filter="url(#glow-constellation)"
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{
                        duration: 4,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        offsetPath: "path('M100,30 L145,62.5 L145,137.5 L100,170 L55,137.5 L55,62.5 Z')"
                      }}
                    />
                  ))}
                </>
              )}

              {/* Constellation Nodes (Stars) */}
              {[
                { cx: 100, cy: 30, r: 2.5 },
                { cx: 145, cy: 62.5, r: 2.5 },
                { cx: 145, cy: 137.5, r: 2.5 },
                { cx: 100, cy: 170, r: 2.5 },
                { cx: 55, cy: 137.5, r: 2.5 },
                { cx: 55, cy: 62.5, r: 2.5 },
                { cx: 100, cy: 100, r: 5 }, // Center core - larger
              ].map((node, i) => (
                <g key={`node-${i}`}>
                  {/* Glow ring */}
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r * 3}
                    fill="none"
                    stroke={i === 6 ? COLORS.white : COLORS.cyan}
                    strokeWidth="0.5"
                    opacity="0.2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: phase === "VOID" ? 0 : [1, 1.5, 1],
                      opacity: phase === "VOID" ? 0 : [0.2, 0.4, 0.2],
                    }}
                    transition={{ 
                      delay: 1.2 + (i * 0.12),
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Star node */}
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill={i === 6 ? COLORS.white : COLORS.cyan}
                    filter="url(#glow-constellation)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: phase === "VOID" ? 0 : [1, 1.2, 1],
                      opacity: phase === "TRANSCENDENCE" ? 0 : [0.8, 1, 0.8],
                    }}
                    transition={{ 
                      delay: 1.2 + (i * 0.12),
                      duration: 2 + (i * 0.2),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </g>
              ))}

              {/* Central Core Vortex */}
              {(phase === "STABILIZATION" || phase === "INVITATION") && (
                <motion.g>
                  {[0, 1, 2].map((i) => (
                    <motion.circle
                      key={`vortex-${i}`}
                      cx="100"
                      cy="100"
                      r={8 + i * 6}
                      fill="none"
                      stroke={COLORS.cyan}
                      strokeWidth="0.5"
                      opacity="0.3"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.5],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.g>
              )}
            </svg>

            {/* Portal Gateway - Appears when ready */}
            <AnimatePresence>
              {(phase === "STABILIZATION" || phase === "INVITATION") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ scale: 15, opacity: 0 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.22, 0.9, 0.36, 1]
                  }}
                  className="absolute inset-0"
                >
                  <motion.div
                    className="absolute inset-0 border-[1px] border-cyan-400/40 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                      boxShadow: `0 0 30px ${COLORS.cyan}40, inset 0 0 30px ${COLORS.cyan}20`
                    }}
                  />
                  
                  <motion.div
                    className="absolute inset-4 border-[1px] border-dashed border-violet-400/30 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Volumetric Light Beams */}
            {phase !== "VOID" && (
              <>
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={`beam-${i}`}
                    className="absolute top-1/2 left-1/2 w-1 h-full origin-bottom"
                    style={{
                      background: `linear-gradient(to top, ${COLORS.cyan}20, transparent)`,
                      transform: `translate(-50%, -100%) rotate(${i * 72}deg)`,
                      filter: "blur(20px)"
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ 
                      opacity: [0.1, 0.3, 0.1],
                      scaleY: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 4 + i,
                      delay: i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>

          {/* 2. Terminal Narrative Text with Glitch Effect */}
          <div className="relative h-32 flex flex-col items-center justify-center text-center space-y-3 z-30 px-4">
            <AnimatePresence mode="wait">
              {phase !== "TRANSCENDENCE" && (
                <motion.div
                  key={`text-${textIndex}`}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    filter: glitchActive ? "blur(2px)" : "blur(0px)",
                  }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 0.9, 0.36, 1] }}
                  className="relative"
                >
                  {/* Main text with glitch layers */}
                  <div className="relative">
                    <motion.p 
                      className="text-cyan-400 text-xs md:text-sm lg:text-base tracking-[0.25em] font-bold uppercase"
                      animate={{
                        textShadow: glitchActive 
                          ? [
                              "2px 0 0 #ff0000, -2px 0 0 #00ffff",
                              "-2px 0 0 #ff0000, 2px 0 0 #00ffff",
                              "2px 0 0 #ff0000, -2px 0 0 #00ffff"
                            ]
                          : "0 0 0 transparent"
                      }}
                      transition={{ duration: 0.1 }}
                    >
                      {`> ${NARRATIVE_TEXTS[textIndex].text}`}
                    </motion.p>
                    
                    {/* Glitch overlay effect */}
                    {glitchActive && (
                      <>
                        <motion.p 
                          className="absolute inset-0 text-cyan-400 text-xs md:text-sm lg:text-base tracking-[0.25em] font-bold uppercase opacity-70"
                          style={{ 
                            left: "2px",
                            color: "#ff0000",
                            clipPath: "inset(0 0 80% 0)"
                          }}
                        >
                          {`> ${NARRATIVE_TEXTS[textIndex].text.split('').map(c => 
                            Math.random() > 0.9 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : c
                          ).join('')}`}
                        </motion.p>
                        
                        <motion.p 
                          className="absolute inset-0 text-cyan-400 text-xs md:text-sm lg:text-base tracking-[0.25em] font-bold uppercase opacity-70"
                          style={{ 
                            left: "-2px",
                            color: "#00ffff",
                            clipPath: "inset(80% 0 0 0)"
                          }}
                        >
                          {`> ${NARRATIVE_TEXTS[textIndex].text.split('').map(c => 
                            Math.random() > 0.9 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : c
                          ).join('')}`}
                        </motion.p>
                      </>
                    )}
                  </div>

                  {/* Subtitle */}
                  <motion.p 
                    className="text-violet-400/70 text-[10px] md:text-xs tracking-[0.2em] mt-2 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {NARRATIVE_TEXTS[textIndex].sub}
                  </motion.p>

                  {/* Frosted glass container effect */}
                  <div 
                    className="absolute inset-0 -z-10 rounded-lg"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(34, 211, 238, 0.1)",
                      boxShadow: `0 0 20px ${COLORS.cyan}10`
                    }}
                  />

                  {/* Scan line effect over text */}
                  <motion.div
                    className="absolute inset-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Progress percentage indicator */}
            {phase !== "INVITATION" && phase !== "TRANSCENDENCE" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 mt-6"
              >
                <motion.span 
                  className="text-[11px] md:text-xs text-cyan-400/60 tabular-nums tracking-wider font-bold"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {Math.floor(progress)}% COMPLETE
                </motion.span>
              </motion.div>
            )}
          </div>

          {/* 3. The Gateway Button - Hexagonal Portal Invitation */}
          <AnimatePresence>
            {phase === "INVITATION" && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: [0.22, 0.9, 0.36, 1] }}
                className="mt-16 relative group cursor-pointer"
                onClick={handleEnter}
              >
                {/* Magnetic field particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <motion.div
                      key={`orbit-${i}`}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                        filter: `blur(1px)`,
                        boxShadow: `0 0 4px ${COLORS.cyan}`
                      }}
                      animate={{
                        x: [
                          Math.cos((i / 8) * Math.PI * 2) * 80,
                          Math.cos((i / 8) * Math.PI * 2) * 100,
                          Math.cos((i / 8) * Math.PI * 2) * 80,
                        ],
                        y: [
                          Math.sin((i / 8) * Math.PI * 2) * 80,
                          Math.sin((i / 8) * Math.PI * 2) * 100,
                          Math.sin((i / 8) * Math.PI * 2) * 80,
                        ],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Hexagonal Button Frame */}
                <div className="relative">
                  {/* Outer hexagon with rotation */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <svg viewBox="0 0 200 100" className="w-64 md:w-80 h-20 md:h-24">
                      <defs>
                        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.6" />
                          <stop offset="50%" stopColor={COLORS.violet} stopOpacity="0.8" />
                          <stop offset="100%" stopColor={COLORS.cyan} stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      <motion.path
                        d="M50,10 L150,10 L180,50 L150,90 L50,90 L20,50 Z"
                        fill="none"
                        stroke="url(#hexGradient)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    </svg>
                  </motion.div>

                  {/* Inner glow layer */}
                  <motion.div
                    className="absolute -inset-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse at center, ${COLORS.cyan}20 0%, transparent 70%)`,
                      filter: "blur(20px)"
                    }}
                  />

                  {/* Main button content */}
                  <motion.button
                    className="relative px-12 md:px-16 py-4 md:py-5 bg-transparent overflow-hidden"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    style={{
                      clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)"
                    }}
                  >
                    {/* Background layers */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-violet-900/10 to-cyan-900/10"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"]
                      }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                    />

                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(34, 211, 238, 0.2)",
                      }}
                    />

                    {/* Button text */}
                    <div className="relative flex items-center justify-center gap-3">
                      <motion.span
                        className="text-cyan-300 group-hover:text-white text-xs md:text-sm tracking-[0.4em] font-bold transition-colors duration-300"
                        animate={{
                          textShadow: [
                            `0 0 10px ${COLORS.cyan}60`,
                            `0 0 20px ${COLORS.cyan}80`,
                            `0 0 10px ${COLORS.cyan}60`
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ► ENTER THE REALM
                      </motion.span>
                    </div>

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    />
                  </motion.button>

                  {/* Pulsing glow rings */}
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={`ring-${i}`}
                      className="absolute inset-0 border border-cyan-400/20 rounded-full pointer-events-none"
                      style={{
                        clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)"
                      }}
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{
                        scale: [1, 1.3, 1.3],
                        opacity: [0.5, 0, 0]
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.6,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>

                {/* Hover instruction hint */}
                <motion.p
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] text-cyan-400/40 tracking-widest"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  CLICK TO TRANSCEND
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* --- Layer 3: Reality Fracture Exit Transition --- */}
        <AnimatePresence>
          {phase === "TRANSCENDENCE" && (
            <>
              {/* White flash */}
              <motion.div
                className="absolute inset-0 z-50 bg-white pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.4, times: [0, 0.1, 0.2, 1] }}
              />

              {/* Chromatic aberration split */}
              <motion.div
                className="absolute inset-0 z-40"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 mix-blend-screen"
                  style={{ backgroundColor: "#ff0000" }}
                  animate={{ x: [0, -20, -40] }}
                  transition={{ duration: 0.8 }}
                />
                <motion.div
                  className="absolute inset-0 mix-blend-screen"
                  style={{ backgroundColor: "#00ffff" }}
                  animate={{ x: [0, 20, 40] }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>

              {/* Kaleidoscope shatter effect */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                  key={`shard-${i}`}
                  className="absolute inset-0 z-30"
                  style={{
                    background: `linear-gradient(${i * 45}deg, ${COLORS.void} 0%, ${COLORS.voidAlt1} 100%)`,
                    clipPath: `polygon(
                      ${50 + Math.cos((i / 8) * Math.PI * 2) * 50}% ${50 + Math.sin((i / 8) * Math.PI * 2) * 50}%,
                      50% 50%,
                      ${50 + Math.cos(((i + 1) / 8) * Math.PI * 2) * 50}% ${50 + Math.sin(((i + 1) / 8) * Math.PI * 2) * 50}%
                    )`
                  }}
                  initial={{ scale: 1, rotate: 0, opacity: 1 }}
                  animate={{
                    scale: 3,
                    rotate: (i % 2 === 0 ? 1 : -1) * 45,
                    opacity: 0,
                    x: Math.cos((i / 8) * Math.PI * 2) * 500,
                    y: Math.sin((i / 8) * Math.PI * 2) * 500,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.05,
                    ease: [0.87, 0, 0.13, 1]
                  }}
                />
              ))}

              {/* Portal expansion */}
              <motion.div
                className="absolute inset-0 z-20 flex items-center justify-center"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 20, opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 0.9, 0.36, 1] }}
              >
                <div 
                  className="w-20 h-20 rounded-full border-2 border-cyan-400"
                  style={{
                    boxShadow: `0 0 60px ${COLORS.cyan}, inset 0 0 60px ${COLORS.cyan}`
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Skip button (accessibility) */}
        <motion.button
          onClick={handleSkip}
          className="fixed bottom-8 right-8 z-[100000] text-[10px] text-cyan-400/50 hover:text-cyan-400 tracking-widest transition-colors px-4 py-2 border border-cyan-400/20 hover:border-cyan-400/40 rounded backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ESC TO SKIP
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}