"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Zap, Code2, Brain, Cpu } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";

// const FloatingGeometry = dynamic(() => import("@/components/3d/FloatingGeometry").then(mod => ({ default: mod.FloatingGeometry })), { ssr: false });

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

function ConstellationParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; opacity: number; z: number }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    particlesRef.current = Array.from({ length: 150 }, () => {
      const z = Math.random() * 100;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: (Math.random() * 0.5 + 0.2) * (0.5 + z / 200),
        z
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          particle.vx -= (dx / dist) * force * 0.15;
          particle.vy -= (dy / dist) * force * 0.15;
        }

        particle.x += particle.vx * (1 + particle.z / 300);
        particle.y += particle.vy * (1 + particle.z / 300);
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        const size = 1.5 * (1 + particle.z / 200);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
        ctx.fill();

        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 80) * 0.12 * Math.min(particle.opacity, otherParticle.opacity);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}

function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden md:block"
      animate={{
        x: mousePosition.x - 75,
        y: mousePosition.y - 75,
        opacity: isVisible ? 0.2 : 0,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        opacity: { duration: 0.2 }
      }}
    >
      <div className="w-[150px] h-[150px] rounded-full bg-gradient-radial from-cyan-400 to-transparent blur-3xl" />
    </motion.div>
  );
}

function OrbitalBadge() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 1.2,
        delay: 0.2,
        type: "spring",
        stiffness: 80,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative inline-block mb-8"
    >
      <motion.div
        className="relative"
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-cyan-400/30"
            style={{
              scale: 1 + i * 0.2,
            }}
            animate={{
              rotate: isHovered ? 360 : 0,
              opacity: [0.2, 0.6, 0.2],
              borderColor: [`rgba(6, 182, 212, ${0.2 + i * 0.1})`, `rgba(168, 85, 247, ${0.2 + i * 0.1})`, `rgba(6, 182, 212, ${0.2 + i * 0.1})`]
            }}
            transition={{
              rotate: { duration: 25 - i * 6, repeat: Infinity, ease: "linear" },
              opacity: { duration: 3, repeat: Infinity, delay: i * 0.6 },
              borderColor: { duration: 4, repeat: Infinity }
            }}
          />
        ))}

        <div className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border border-cyan-400/30 backdrop-blur-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)]">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Cpu size={18} className="text-cyan-400" />
          </motion.div>

          <motion.span
            className="text-sm font-semibold text-white tracking-wide"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: "linear-gradient(90deg, #fff, #06b6d4, #a855f7, #fff)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Innovator & Future Founder
          </motion.span>

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [0, Math.cos(i * Math.PI / 6) * 70],
                y: [0, Math.sin(i * Math.PI / 6) * 70],
                opacity: [0, 0.9, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isHoveringIntelligence, setIsHoveringIntelligence] = useState(false);
  const [ctaDistance, setCtaDistance] = useState(1000);

  const words = ["Impact", "Innovation", "Purpose", "Vision", "Future"];

  // const { scrollY } = useScroll(); // COMMENTED OUT - Causing scroll jitter
  // const y1 = useTransform(scrollY, [0, 500], [0, -150]); // COMMENTED OUT - Causing scroll jitter
  // const yBuilding = useTransform(scrollY, [0, 500], [0, -100]); // COMMENTED OUT - Causing scroll jitter
  // const yIntelligence = useTransform(scrollY, [0, 500], [0, -50]); // COMMENTED OUT - Causing scroll jitter
  // const yWith = useTransform(scrollY, [0, 500], [0, -30]); // COMMENTED OUT - Causing scroll jitter
  // const y2 = useTransform(scrollY, [0, 500], [0, -80]); // COMMENTED OUT - Causing scroll jitter
  // const opacity = useTransform(scrollY, [0, 1400], [1, 0]); // COMMENTED OUT - Causing scroll fade/invisibility

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ctaRef.current) return;
      const rect = ctaRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      setCtaDistance(distance);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="container relative z-10 mx-auto px-6 py-32 text-center">
          
          {/* NOTE: 
            1. h1 ko 'flex flex-col' bana diya hai taaki content stack ho.
            2. 'items-center' se text horizontally centered rahega.
            3. 'gap-y-4' dono lines ke beech vertical spacing add karta hai.
          */}
          <h1 className="text-6xl lg:text-8xl font-heading font-bold flex flex-col items-center gap-y-4">
            
            {/* Pehli line: "Hey I Am Piyush" */}
            {/* Isko ek div mein wrap kiya hai taaki yeh ek saath rahe */}
            <div className="leading-tight">
              <span className="text-slate-100">𝓗𝓔𝓨 𝓘 𝓐𝓜 </span>
              {/* '/n' hata diya hai */}
              <span className="text-gradient-heading">𝓟𝓘𝓨𝓤𝓢𝓗</span>
            </div>
            
            {/* Doosri line: "Welcome To My Portfolio" */}
            {/* NOTE:
              Iski font size thodi choti kar di hai (text-4xl lg:text-6xl)
              aur weight normal (font-normal) kar diya hai.
              Yeh visual hierarchy ke liye accha lagta hai (title bada, subtitle thoda chota).
            */}
            <span className="text-4xl lg:text-6xl text-slate-100 font-normal">
            𝓦𝓔𝓛𝓒𝓞𝓜𝓔 𝓣𝓞 𝓜𝓨 𝓟𝓞𝓡𝓣𝓕𝓞𝓛𝓘𝓞
            </span>
  
          </h1>
        </div>
      </section>
    );
  }

  return (
    <>
      <CursorGlow />
      
      <motion.section
        ref={containerRef}
        // style={{ opacity }} // COMMENTED OUT - Causing scroll fade/invisibility
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
          />

          {[
            { size: "w-[500px] h-[500px]", pos: "top-10 -left-20", color: "cyan", delay: 0, blur: "blur-[100px]" },
            { size: "w-[400px] h-[400px]", pos: "bottom-20 -right-20", color: "purple", delay: 1, blur: "blur-[90px]" },
            { size: "w-[350px] h-[350px]", pos: "top-1/3 right-10", color: "pink", delay: 2, blur: "blur-[80px]" },
            { size: "w-[300px] h-[300px]", pos: "bottom-1/3 left-10", color: "blue", delay: 1.5, blur: "blur-[70px]" },
          ].map((orb, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.15, 0.35, 0.15],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                delay: orb.delay,
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute ${orb.size} ${orb.pos} bg-${orb.color}-500/20 rounded-full ${orb.blur}`}
            />
          ))}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-400/20"
                style={{
                  width: "400px",
                  height: "400px",
                }}
                animate={{
                  scale: [0, 3, 3],
                  opacity: [0.6, 0.2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <ConstellationParticles />

          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-24 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-30px`,
              }}
              animate={{
                y: ["0vh", "110vh"],
                opacity: [0, 1, 0],
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

        {/* <div className="absolute inset-0 hidden md:block">
          <Suspense fallback={null}>
            <FloatingGeometry />
          </Suspense>
        </div> */}

        <motion.div
          // style={{ y: y1 }} // COMMENTED OUT - Causing scroll jitter
          className="container relative z-10 mx-auto px-6 md:px-12 py-32 text-center max-w-7xl"
        >
          <OrbitalBadge />

          <div className="mb-12 space-y-6 relative" style={{ perspective: "1200px" }}>
            <motion.div
              initial={{ opacity: 0, y: 80, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold leading-[1.05] tracking-tight"
                style={{
                  textShadow: "0 0 80px rgba(6, 182, 212, 0.3)",
                }}
              >
                <motion.span
                  // style={{ y: yBuilding }} // COMMENTED OUT - Causing scroll jitter
                  className="inline-block text-slate-100/90 blur-[0.3px]"
                >
                  {"Building".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, rotateX: -90, y: 50 }}
                      animate={{ opacity: 1, rotateX: 0, y: 0 }}
                      transition={{
                        delay: 0.6 + Math.abs(i - 4) * 0.05,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
                {" "}
                
                <motion.span
                  // style={{ y: yIntelligence }} // COMMENTED OUT - Causing scroll jitter
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  onHoverStart={() => setIsHoveringIntelligence(true)}
                  onHoverEnd={() => setIsHoveringIntelligence(false)}
                  whileHover={{
                    letterSpacing: "0.05em",
                    textShadow: "2px 0 0 #06b6d4, -2px 0 0 #ec4899, 0 0 50px rgba(6,182,212,0.9)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 relative cursor-pointer"
                >
                  {"Intelligence".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, rotateX: -90, y: 50 }}
                      animate={{ opacity: 1, rotateX: 0, y: 0 }}
                      transition={{
                        delay: 0.7 + Math.abs(i - 6) * 0.05,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                  
                  {[...Array(8)].map((_, idx) => (
                    <motion.span
                      key={idx}
                      className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 0.4, 0],
                        scale: [1, 1.03, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: idx * 0.4,
                      }}
                    >
                      Intelligence
                    </motion.span>
                  ))}

                  <AnimatePresence>
                    {isHoveringIntelligence && (
                      <>
                        {[...Array(25)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                              x: (Math.random() - 0.5) * 120,
                              y: -Math.random() * 100 - 20,
                              opacity: [0, 1, 0],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 1.8,
                              delay: i * 0.03,
                              ease: "easeOut",
                            }}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: "50%",
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.span>
              </motion.h1>

              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10"
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            <motion.div
              // style={{ y: yWith }} // COMMENTED OUT - Causing scroll jitter
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.5,
                delay: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold leading-[1.1] tracking-tight"
            >
              <span className="text-slate-200">with </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{
                    opacity: 0,
                    y: 60,
                    rotateX: -90,
                    filter: "blur(15px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -60,
                    rotateX: 90,
                    filter: "blur(15px)",
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 relative"
                  style={{
                    filter: "drop-shadow(0 0 25px rgba(168, 85, 247, 0.6))",
                  }}
                >
                  {words[currentWordIndex]}
                  
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-purple-400 rounded-full"
                      initial={{ x: 0, y: 0, opacity: 0 }}
                      animate={{
                        x: (Math.random() - 0.5) * 60,
                        y: (Math.random() - 0.5) * 60,
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.05,
                        ease: "easeOut"
                      }}
                      style={{
                        left: `${50}%`,
                        top: `${50}%`,
                      }}
                    />
                  ))}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            // style={{ y: y2 }} // COMMENTED OUT - Causing scroll jitter
            className="mb-16 relative"
          >
            <motion.div
              className="inline-block relative backdrop-blur-2xl bg-white/[0.03] rounded-3xl px-8 py-6 border border-white/10 overflow-hidden"
              animate={{
                scale: [1, 1.005, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
              
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light relative z-10">
                I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold">Piyush</span>, an 18-year-old AI & Data Science learner
                <br className="hidden sm:block" />
                exploring how technology can create meaningful impact
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 px-4"
          >
            <Link href="/work" className="w-full sm:w-auto">
              <motion.button
                ref={ctaRef}
                animate={{
                  scale: ctaDistance < 150 ? 1.08 : ctaDistance < 300 ? 1.03 : 1,
                  rotateZ: ctaDistance < 150 ? 2 : 0,
                }}
                whileHover={{
                  y: -6,
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-12 py-5 text-lg font-semibold rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                  boxShadow: `0 0 ${Math.max(40, 120 - ctaDistance/3)}px rgba(6, 182, 212, ${Math.min(0.8, 0.3 + (300 - ctaDistance)/600)}), 0 20px 40px -10px rgba(0,0,0,0.5)`,
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                      "linear-gradient(135deg, #8b5cf6, #ec4899)",
                      "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5,
                  }}
                />

                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${10 + i * 5.5}%`,
                      top: "50%",
                    }}
                    animate={{
                      y: [0, -35, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: "easeOut"
                    }}
                  />
                ))}

                <span className="relative z-10 flex items-center justify-center gap-3 text-slate-900 font-bold">
                  Explore My Work
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <ArrowRight size={22} />
                  </motion.div>
                </span>
              </motion.button>
            </Link>

            <Link href="/connect" className="w-full sm:w-auto">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -6,
                  borderColor: "rgba(6, 182, 212, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-10 py-5 text-lg font-semibold rounded-full border-2 border-cyan-400/30 bg-transparent backdrop-blur-2xl overflow-hidden"
                style={{
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.15)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <span className="relative z-10 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Let's Connect
                </span>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-6 max-w-6xl mx-auto px-4 sm:px-6"
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              
              <motion.line
                x1="25%" y1="50%"
                x2="50%" y2="50%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              />
              
              <motion.line
                x1="50%" y1="50%"
                x2="75%" y2="50%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
              />
              
              <motion.line
                x1="75%" y1="50%"
                x2="87.5%" y2="50%"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 2.4, duration: 1 }}
              />
            </svg>

            {[
              { value: "18", label: "Years Old", icon: Sparkles, color: "cyan" },
              { value: "AI/ML", label: "Focus Area", icon: Brain, color: "purple" },
              { value: "∞", label: "Learning", icon: Zap, color: "pink" },
              { value: "Future", label: "Founder", icon: Code2, color: "blue" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1.7 + index * 0.1,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.05,
                }}
                className="relative group cursor-pointer"
                style={{ zIndex: 1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="relative backdrop-blur-2xl bg-white/[0.03] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 group-hover:border-cyan-400/40 shadow-2xl overflow-hidden transition-all duration-300"
                  animate={{
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <motion.div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-3 sm:p-4 shadow-lg relative"
                      style={{
                        boxShadow: `0 10px 40px -10px rgba(${stat.color === 'cyan' ? '6, 182, 212' : stat.color === 'purple' ? '168, 85, 247' : stat.color === 'pink' ? '236, 72, 153' : '59, 130, 246'}, 0.6)`,
                      }}
                      whileHover={{
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent rounded-2xl" />
                      <stat.icon className="w-full h-full text-slate-900 relative z-10" strokeWidth={2.5} />

                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-1 h-1 bg-${stat.color}-400 rounded-full`}
                          style={{
                            left: "50%",
                            top: "50%",
                          }}
                          animate={{
                            x: [0, Math.cos(i * Math.PI / 5) * 35],
                            y: [0, Math.sin(i * Math.PI / 5) * 35],
                            opacity: [0, 0.9, 0],
                            scale: [0, 1.2, 0],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            delay: i * 0.12,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </motion.div>

                    <motion.div
                      className="text-4xl sm:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
                      animate={{
                        backgroundPosition: ["0%", "100%", "0%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                    >
                      <AnimatedNumber
                        value={stat.value === "18" ? 18 : stat.value}
                        delay={1.7 + index * 0.1}
                      />
                    </motion.div>

                    <div className="text-sm sm:text-base text-slate-300 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold group-hover:text-cyan-400 transition-colors">
              Scroll to explore
            </span>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="relative p-3 rounded-full border-2 border-cyan-400/30 group-hover:border-cyan-400 bg-white/5 backdrop-blur-xl transition-all">
                <ChevronDown className="w-5 h-5 text-cyan-400" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-slate-950/60" />
          
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                rgba(255,255,255,0.03) 0px,
                transparent 1px,
                transparent 2px,
                rgba(255,255,255,0.03) 3px
              )`,
            }}
          />
          
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute w-px h-screen bg-gradient-to-b from-cyan-400/5 via-transparent to-transparent"
              style={{
                left: `${20 + i * 30}%`,
                top: "-10%",
                transform: `rotate(25deg)`,
                filter: "blur(40px)",
              }}
              animate={{
                opacity: [0.02, 0.05, 0.02],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 1.5,
              }}
            />
          ))}
        </div>
      </motion.section>
    </>
  );
}
