"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, MessageSquare, Calendar, ArrowRight, Check, User, AtSign, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Me",
    description: "piyushjaguri13@gmail.com",
    href: "mailto:piyushjaguri13@gmail.com",
    primary: true,
    hoverText: "Click to copy",
  },
  {
    icon: MessageSquare,
    title: "Let's Chat",
    description: "Quick questions or collaboration ideas",
    href: "/connect",
    primary: false,
    hoverText: "Usually replies within 2 hours",
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a time that works for you",
    href: "/connect",
    primary: false,
    hoverText: "View available time slots",
  },
];

const cardPositions: Record<string, { angle: number; radius: number; lineAngle?: number }> = {
  // Angle -90 screen par TOP-CENTER hota hai
  "Email Me": { angle: -135, radius: 550, lineAngle:242 },
  // Angle 30 screen par BOTTOM-RIGHT hota hai
  "Let's Chat": { angle: 5, radius: 300, lineAngle: 10},
  // Angle 150 (na ki 210) screen par BOTTOM-LEFT hota hai
  "Schedule a Call": { angle: 160, radius: 500, lineAngle: 143 },
};

const cardLineOffsets: Record<string, number> = {
  "Email Me": 50,
  "Let's Chat": -270,
  "Schedule a Call": 10,
};


function ConstellationParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    opacity: number;
  }>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particleCount = 800;

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    }));

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

        if (dist < 150) {
          const force = (150 - dist) / 150;
          particle.vx -= (dx / dist) * force * 0.2;
          particle.vy -= (dy / dist) * force * 0.2;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 120) * 0.15;
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
      style={{ opacity: 0.6 }}
    />
  );
}

function CentralNexus({ isHovered }: { isHovered: number | null }) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 hidden md:block">
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/40 via-purple-500/40 to-pink-500/40 backdrop-blur-xl border border-white/10"
          animate={{
            scale: isHovered !== null ? [1, 1.2, 1] : [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: "0 0 60px rgba(6, 182, 212, 0.4), inset 0 2px 4px rgba(255,255,255,0.1)"
          }}
        />
        
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-500/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -inset-8 rounded-full border-2 border-cyan-400/20"
          animate={{
            scale: [1, 1.5],
            opacity: [0.6, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-6 h-6 rounded-full bg-white"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.6)",
                "0 0 40px rgba(6, 182, 212, 0.8)",
                "0 0 20px rgba(6, 182, 212, 0.6)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
            style={{
              scale: 1 + i * 0.3,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [1 + i * 0.3, 1.5 + i * 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut",
            }}
          />
        ))}

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orbit-${i}`}
            className="absolute w-2 h-2 rounded-full bg-cyan-400"
            style={{
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: Math.cos((i * Math.PI * 2) / 8) * 100,
              y: Math.sin((i * Math.PI * 2) / 8) * 100,
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function ContactCard({ method, index, onHover, isHovered, hoveredCard }: any) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (method.title === "Email Me") {
      navigator.clipboard.writeText("piyushjaguri13@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const position = cardPositions[method.title];
  const angle = position.angle;
  const radius = position.radius;
  const xPos = Math.cos((angle * Math.PI) / 180) * radius;
  const yPos = Math.sin((angle * Math.PI) / 180) * radius;
  const lineAngle = position.lineAngle || angle;
  const isPrimary = method.primary;

  const cardEdgeOffset = cardLineOffsets[method.title];
  const lineRadius = radius - cardEdgeOffset;
  const lineX1_base = Math.cos((lineAngle * Math.PI) / 180) * lineRadius;
  const lineY1_base = Math.sin((lineAngle * Math.PI) / 180) * lineRadius;
  const lineY1_hover = lineY1_base - 10;



  return (
    <>
      {!isMobile && (
        <motion.svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          viewBox="-800 -400 1600 800"
          preserveAspectRatio="xMidYMid meet"
          style={{ zIndex: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredCard === index ? 0.8 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <defs>
            <linearGradient id={`lineGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
            </linearGradient>
            <filter id={`glow-${index}`}>
              <feGaussianBlur stdDeviation={hoveredCard === index ? "4" : "2"} result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <motion.path
              id={`line-path-${index}`}
              d={`M ${lineX1_base} ${lineY1_base} L 0 0`}
              fill="none"
              animate={{
                d: `M ${lineX1_base} ${hoveredCard === index ? lineY1_hover : lineY1_base} L 0 0`
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </defs>
          <motion.line
            x1={lineX1_base}
            x2="0"
            y2="0"
            stroke={`url(#lineGrad-${index})`}
            strokeWidth={hoveredCard === index ? "4" : "2.5"}
            filter={`url(#glow-${index})`}
            initial={{ pathLength: 0, y1: lineY1_base }}
            animate={{ 
              pathLength: 1,
              y1: hoveredCard === index ? lineY1_hover : lineY1_base
            }}
            transition={{ 
              pathLength: { duration: 1, delay: 0.5 + index * 0.1 },
              y1: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
            }}
          />
          {hoveredCard === index && [0, 1, 2].map((dotIndex) => (
            <motion.circle
              key={dotIndex}
              r="3"
              fill="rgb(6, 182, 212)"
              filter="drop-shadow(0 0 8px rgb(6, 182, 212))"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <animateMotion
                dur={`${3 + dotIndex}s`}
                repeatCount="indefinite"
                begin={`${dotIndex * 0.8}s`}
              >
                <mpath href={`#line-path-${index}`} />
              </animateMotion>
            </motion.circle>
          ))}
        </motion.svg>
      )}

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
        whileInView={{ 
          opacity: 1, 
          scale: isMobile ? (isPrimary ? 1.08 : 1) : (isPrimary ? 1.15 : 1),
          x: isMobile ? 0 : xPos,
          y: isMobile ? 0 : yPos,
        }}
        viewport={{ once: true }}
        transition={{ 
          delay: 0.6 + index * 0.15, 
          duration: 0.8,
          type: "spring",
          stiffness: 80,
        }}
        style={isMobile ? {} : {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onHoverStart={() => onHover(index)}
        onHoverEnd={() => onHover(null)}
        className={`${isMobile ? 'relative w-full min-h-[200px]' : 'absolute left-1/2 top-1/2'} group ${isPrimary ? 'md:w-80' : 'md:w-72'}`}
      >
        <Link 
          href={method.href} 
          onClick={(e) => {
            if (method.title === "Email Me") {
              e.preventDefault();
              handleClick();
            }
          }}
          className="block"
        >
          <motion.div
            className={`backdrop-blur-3xl rounded-3xl border shadow-2xl relative overflow-hidden ring-1 ring-inset ring-white/10 ${
              isMobile 
                ? (isPrimary ? 'p-9 bg-white/[0.06] border-2 border-cyan-400/30' : 'p-7 bg-white/[0.04] border border-white/10')
                : (isPrimary ? 'p-12 bg-white/[0.04] border border-white/10' : 'p-10 bg-white/[0.04] border border-white/10')
            }`}
            whileHover={{ 
              borderColor: "rgba(6, 182, 212, 0.6)",
              y: isMobile ? 0 : -10,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              boxShadow: hoveredCard === index 
                ? "0 12px 24px rgba(0,0,0,0.5), 0 24px 72px rgba(6,182,212,0.4), 0 0 60px rgba(6,182,212,0.3)"
                : "0 4px 12px rgba(0,0,0,0.4), 0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"
              animate={{
                opacity: hoveredCard === index ? 0.2 : 0,
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                opacity: { duration: 0.3 },
                backgroundPosition: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
            />

            {hoveredCard === index && (
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(6,182,212,0.3)",
                    "0 0 40px rgba(6,182,212,0.5)",
                    "0 0 20px rgba(6,182,212,0.3)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {hoveredCard === index && [...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{ x: "50%", y: "50%", opacity: 0 }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.02,
                  ease: [0.22, 1, 0.36, 1]
                }}
              />
            ))}

            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: "url(data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
              }}
            />

            <div className="relative z-10">
              <motion.div 
                className={`mx-auto rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-2xl relative ${
                  isMobile
                    ? (isPrimary ? 'w-20 h-20 p-5 mb-5' : 'w-18 h-18 p-5 mb-5')
                    : (isPrimary ? 'w-24 h-24 p-5 mb-6' : 'w-20 h-20 p-4 mb-5')
                }`}
                style={{
                  boxShadow: "0 8px 32px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.3), inset 0 2px 4px rgba(255,255,255,0.1)",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  y: [-3, 3, -3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 10,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                      rotate: 360
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1,
                      ease: "linear"
                    }}
                  />
                ))}

                {method.title === "Email Me" && (
                  <motion.div
                    animate={hoveredCard === index ? {
                      rotateX: [-10, 0],
                    } : {}}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Mail className="w-full h-full text-slate-900" strokeWidth={2.5} />
                    {hoveredCard === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <motion.div
                          className="w-3 h-2 bg-yellow-300 rounded-sm"
                          animate={{ scale: [0, 1], opacity: [0, 1] }}
                          transition={{ delay: 0.3 }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {method.title === "Let's Chat" && (
                  <div className="relative w-full h-full">
                    <MessageSquare className="w-full h-full text-slate-900" strokeWidth={2.5} />
                    {hoveredCard === index && (
                      <div className="absolute bottom-2 left-2 flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-1 bg-slate-900 rounded-full"
                            animate={{
                              y: [0, -3, 0],
                              opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {method.title === "Schedule a Call" && (
                  <motion.div
                    animate={hoveredCard === index ? {
                      rotateY: [0, 180],
                    } : {}}
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Calendar className="w-full h-full text-slate-900" strokeWidth={2.5} />
                  </motion.div>
                )}

                {method.title === "Email Me" && copied && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <Check className="w-6 h-6 text-white" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-500"
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.5, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>

              <h3 className={`font-heading font-bold text-slate-100 text-center ${
                isMobile ? 'mb-4' : 'mb-3'
              } ${isPrimary ? (isMobile ? 'text-2xl' : 'text-3xl') : 'text-xl'}`}>
                {method.title}
              </h3>
              
              <p className={`text-slate-300 text-center leading-relaxed ${
                isMobile ? 'mb-3' : 'mb-2'
              } ${isPrimary ? 'text-base' : 'text-sm'}`}>
                {method.description}
              </p>

              <AnimatePresence>
                {hoveredCard === index && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs text-cyan-400 text-center font-medium"
                  >
                    {method.hoverText}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
}

function DirectMessageForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validFields, setValidFields] = useState({ name: false, email: false, message: false });

  const wordCount = formData.message.trim().split(/\s+/).filter(Boolean).length;
  const getMotivationalText = () => {
    if (wordCount === 0) return "";
    if (wordCount < 50) return "Great start!";
    if (wordCount < 150) return "Almost there!";
    return "Perfect!";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  const validateField = (field: string, value: string) => {
    if (field === "name") return value.length >= 2;
    if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (field === "message") return value.length >= 10;
    return false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
          onClick={onClose}
        >
          {isSuccess && (
            <motion.div className="absolute inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: "50%",
                    top: "50%",
                    background: `hsl(${Math.random() * 360}, 70%, 60%)`
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.random() - 0.5) * 800,
                    y: (Math.random() - 0.5) * 800,
                    opacity: [1, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl backdrop-blur-2xl bg-white/[0.05] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 200%" }}
            />

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-heading font-bold text-slate-100">
                  Send a <span className="text-gradient-heading">Direct Message</span>
                </h3>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <span className="text-slate-400 text-xl">×</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: focusedField === "name" ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <motion.label
                        className="absolute left-12 text-slate-400 text-sm pointer-events-none transition-all px-2"
                        animate={{
                          top: formData.name || focusedField === "name" ? "-8px" : "50%",
                          y: formData.name || focusedField === "name" ? 0 : "-50%",
                          fontSize: formData.name || focusedField === "name" ? "0.75rem" : "1rem",
                          left: formData.name || focusedField === "name" ? "12px" : "48px",
                          background: formData.name || focusedField === "name" ? "linear-gradient(to bottom, transparent 50%, rgb(15, 23, 42) 50%)" : "transparent"
                        }}
                      >
                        Your name
                      </motion.label>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <User className="w-5 h-5 text-slate-400" />
                        {validFields.name && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-2 h-2 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 -rotate-90">
                        <circle
                          cx="20"
                          cy="20"
                          r="15"
                          fill="none"
                          stroke="rgba(6, 182, 212, 0.2)"
                          strokeWidth="2"
                        />
                        <motion.circle
                          cx="20"
                          cy="20"
                          r="15"
                          fill="none"
                          stroke="rgb(6, 182, 212)"
                          strokeWidth="2"
                          strokeDasharray={`${2 * Math.PI * 15}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 15 }}
                          animate={{
                            strokeDashoffset: 2 * Math.PI * 15 * (1 - Math.min(formData.name.length / 50, 1))
                          }}
                        />
                      </svg>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          setValidFields({ ...validFields, name: validateField("name", e.target.value) });
                        }}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-transparent focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="relative">
                  <motion.div
                    animate={{
                      scale: focusedField === "email" ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative">
                      <motion.label
                        className="absolute left-12 text-slate-400 text-sm pointer-events-none transition-all px-2"
                        animate={{
                          top: formData.email || focusedField === "email" ? "-8px" : "50%",
                          y: formData.email || focusedField === "email" ? 0 : "-50%",
                          fontSize: formData.email || focusedField === "email" ? "0.75rem" : "1rem",
                          left: formData.email || focusedField === "email" ? "12px" : "48px",
                          background: formData.email || focusedField === "email" ? "linear-gradient(to bottom, transparent 50%, rgb(15, 23, 42) 50%)" : "transparent"
                        }}
                      >
                        your.email@example.com
                      </motion.label>
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <AtSign className="w-5 h-5 text-slate-400" />
                        {validFields.email && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -right-1 -top-1"
                          >
                            <motion.div
                              className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center"
                              animate={{
                                scale: [1, 1.2, 1],
                                boxShadow: ["0 0 0 0 rgba(34, 197, 94, 0.4)", "0 0 0 8px rgba(34, 197, 94, 0)", "0 0 0 0 rgba(34, 197, 94, 0)"]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Check className="w-3 h-3 text-green-500" />
                            </motion.div>
                          </motion.div>
                        )}
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setValidFields({ ...validFields, email: validateField("email", e.target.value) });
                        }}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-transparent focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="relative">
                  <motion.div
                    animate={{
                      scale: focusedField === "message" ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.label
                      className="absolute left-4 text-slate-400 text-sm pointer-events-none transition-all z-10 px-2"
                      animate={{
                        top: formData.message || focusedField === "message" ? "-8px" : "16px",
                        fontSize: formData.message || focusedField === "message" ? "0.75rem" : "1rem",
                        background: formData.message || focusedField === "message" ? "linear-gradient(to bottom, transparent 50%, rgb(15, 23, 42) 50%)" : "transparent"
                      }}
                    >
                      Your message...
                    </motion.label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        setValidFields({ ...validFields, message: validateField("message", e.target.value) });
                      }}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-transparent focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <AnimatePresence>
                        {wordCount > 0 && (
                          <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className={`text-xs font-medium ${
                              wordCount < 50 ? "text-cyan-400" : wordCount < 150 ? "text-purple-400" : "text-green-400"
                            }`}
                          >
                            {getMotivationalText()}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <span className="text-xs text-slate-500">{wordCount} words</span>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full"
                    />
                  ) : isSuccess ? (
                    <>
                      <Check className="w-6 h-6" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ContactSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [sectionHovered, setSectionHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ctaDistance = useMotionValue(1000);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const ctaX = useSpring(mouseX, springConfig);
  const ctaY = useSpring(mouseY, springConfig);

  const ctaScale = useTransform(ctaDistance, [200, 100, 0], [1.02, 1.05, 1.08]);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSpring = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const cursorYSpring = useSpring(cursorY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.02);
    mouseY.set((e.clientY - centerY) * 0.02);

    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);

    if (ctaRef.current) {
      const ctaRect = ctaRef.current.getBoundingClientRect();
      const ctaCenterX = ctaRect.left + ctaRect.width / 2;
      const ctaCenterY = ctaRect.top + ctaRect.height / 2;
      const dist = Math.sqrt(Math.pow(e.clientX - ctaCenterX, 2) + Math.pow(e.clientY - ctaCenterY, 2));
      ctaDistance.set(dist);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 md:py-48 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setSectionHovered(true)}
      onMouseLeave={() => setSectionHovered(false)}
    >
      <motion.div 
        className="absolute w-96 h-96 rounded-full bg-cyan-400/20 blur-[100px] pointer-events-none hidden md:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%"
        }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent opacity-60 pointer-events-none" style={{ transform: "translateZ(-3px)", willChange: "transform" }} />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-[800px] h-[600px] bg-gradient-radial from-purple-500/10 to-transparent blur-[60px] opacity-40 pointer-events-none"
        style={{ transform: "translateZ(-3px)" }}
        animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/10 to-transparent blur-[60px] opacity-40 pointer-events-none"
        style={{ transform: "translateZ(-3px)" }}
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10 hidden md:block"
          style={{
            width: `${300 + i * 150}px`,
            height: `${300 + i * 150}px`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="absolute inset-0 hidden md:block" style={{ transform: "translateZ(0)" }}>
        <ConstellationParticles />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6 relative"
          >
            <motion.span
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm md:text-base font-semibold shadow-lg"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.3)",
                  "0 0 30px rgba(6, 182, 212, 0.5)",
                  "0 0 20px rgba(6, 182, 212, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.span
                className="relative w-2 h-2 rounded-full bg-cyan-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute inset-0 rounded-full border-2 border-cyan-400"
                    animate={{
                      scale: [1, 2.5],
                      opacity: [0.8, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6
                    }}
                  />
                ))}
              </motion.span>
              Let's Connect
            </motion.span>
            <motion.div 
              className="absolute top-full left-1/2 w-px h-8 bg-gradient-to-b from-cyan-400/50 to-transparent md:hidden"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-8 leading-tight"
            >
              {["Let's Build Something ", "Extraordinary", " Together"].map((text, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                  className={i === 1 ? "relative inline-block" : "inline-block"}
                >
                  {i === 1 ? (
                    <span className="relative">
                      <motion.span
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(135deg, rgb(6, 182, 212), rgb(168, 85, 247))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        animate={sectionHovered ? {
                          textShadow: [
                            "2px 0 0 rgba(255,0,0,0.3), -2px 0 0 rgba(0,255,255,0.3)",
                            "-2px 0 0 rgba(255,0,0,0.3), 2px 0 0 rgba(0,255,255,0.3)",
                            "2px 0 0 rgba(255,0,0,0.3), -2px 0 0 rgba(0,255,255,0.3)"
                          ]
                        } : {}}
                        transition={{ duration: 0.3, repeat: sectionHovered ? Infinity : 0 }}
                      >
                        {text}
                      </motion.span>
                      <span
                        style={{
                          background: "linear-gradient(135deg, rgb(6, 182, 212), rgb(168, 85, 247))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {text}
                      </span>
                      {sectionHovered && [...Array(15)].map((_, pi) => (
                        <motion.span
                          key={pi}
                          className="absolute w-1 h-1 bg-cyan-400 rounded-full pointer-events-none"
                          initial={{ 
                            x: "50%", 
                            y: "50%",
                            opacity: 0 
                          }}
                          animate={{
                            x: `${50 + (Math.random() - 0.5) * 200}%`,
                            y: `${50 + (Math.random() - 0.5) * 200}%`,
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: pi * 0.1,
                            ease: [0.22, 1, 0.36, 1]
                          }}
                        />
                      ))}
                    </span>
                  ) : text}
                </motion.span>
              ))}
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6"
          >
            Open to meaningful collaborations, AI innovation, and visionary projects shaping the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="relative inline-block"
          >
            <motion.p
              className="italic text-sm text-slate-400 px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/5 relative"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              "Every great collaboration begins with a single message."
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-purple-400/30"
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.5, 0],
                    rotate: i === 0 ? 0 : 180
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "linear"
                  }}
                />
              ))}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          whileHover={{ scale: 1.05 }} // <-- YEH LINE ADD KAREIN
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative mb-24 md:mb-32 max-w-5xl mx-auto cursor-pointer" // <-- cursor-pointer add karein
        >
          <motion.div 
            className="h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent relative"
          >
            {[0, 0.25, 0.5, 0.75, 1].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-cyan-400 top-1/2 -translate-y-1/2"
                style={{ left: `${pos * 100}%` }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
          
          <motion.p 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-slate-900 text-xs uppercase tracking-wider text-slate-500 text-center backdrop-blur-sm border border-white/5 rounded-full whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <span className="hidden md:inline">Building Something Meaningful Together</span>
            <span className="md:hidden">Meaningful Connections</span>
          </motion.p>
        </motion.div>

        <div className="relative mb-24 md:mb-32" style={{ willChange: "transform" }}>
          {isMobile ? (
            <div className="relative max-w-md mx-auto px-6 pt-20 pb-24">
              <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
              
              <motion.div 
                className="absolute left-10 w-2 h-2 bg-cyan-400 rounded-full -translate-x-[3px]"
                animate={{ y: [0, 600] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ filter: "drop-shadow(0 0 8px rgb(6, 182, 212))" }}
              />
              
              <div className="space-y-10">
                {contactMethods.map((method, index) => (
                  <div key={method.title} className="relative flex items-start gap-6">
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex-shrink-0 mt-8"
                      style={{ 
                        boxShadow: "0 0 20px rgba(6,182,212,0.6)",
                        marginLeft: "24px"
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 20px rgba(6,182,212,0.6)",
                          "0 0 30px rgba(6,182,212,0.8)",
                          "0 0 20px rgba(6,182,212,0.6)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    
                    <svg className="absolute left-[28px] top-10 w-8 h-1" style={{ overflow: "visible" }}>
                      <defs>
                        <linearGradient id="mobileLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      <motion.line
                        x1="0" y1="0" x2="32" y2="0"
                        stroke="url(#mobileLineGradient)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                      />
                    </svg>
                    
                    <div className="flex-1">
                      <ContactCard
                        method={method}
                        index={index}
                        onHover={setHoveredCard}
                        isHovered={hoveredCard}
                        hoveredCard={hoveredCard}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative h-[700px]">
              <CentralNexus isHovered={hoveredCard} />
              
              {contactMethods.map((method, index) => (
                <ContactCard
                  key={method.title}
                  method={method}
                  index={index}
                  onHover={setHoveredCard}
                  isHovered={hoveredCard}
                  hoveredCard={hoveredCard}
                />
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => setIsFormOpen(true)}
            className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium group inline-flex items-center gap-2"
          >
            <span>Prefer a direct message?</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 1, duration: 0.8, type: "spring" }}
          className="text-center relative"
          style={{ willChange: "transform" }}
        >
          <Link href="/connect">
            <motion.div
              ref={ctaRef}
              style={{ 
                x: ctaX, 
                y: ctaY,
                scale: ctaScale
              }}
              onHoverStart={() => setCtaHovered(true)}
              onHoverEnd={() => setCtaHovered(false)}
              whileTap={{ scale: 0.5 }}
              className="inline-flex items-center gap-3 px-10 py-5 text-xl font-semibold rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_100%] text-slate-900 relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />

              <motion.div
                animate={{
                  scale: ctaHovered ? [1, 1.3, 1] : [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 blur-2xl -z-10"
              />

              {ctaHovered && [...Array(8)].map((_, i) => (
                <motion.svg
                  key={i}
                  className="absolute w-32 h-32 pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    x: "-50%",
                    y: "-50%"
                  }}
                >
                  <motion.path
                    d={`M 50 50 Q ${50 + Math.cos(i * Math.PI / 4) * 30} ${50 + Math.sin(i * Math.PI / 4) * 30}, ${50 + Math.cos(i * Math.PI / 4) * 60} ${50 + Math.sin(i * Math.PI / 4) * 60}`}
                    stroke="rgba(6, 182, 212, 0.5)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  />
                </motion.svg>
              ))}

              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={ctaHovered ? {
                    x: [0, Math.cos(i * Math.PI / 4) * 60],
                    y: [0, Math.sin(i * Math.PI / 4) * 60],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}

              <AnimatePresence mode="wait">
                <motion.span
                  key={ctaHovered ? "hovered" : "normal"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 flex items-center gap-3"
                >
                  {ctaHovered ? "Let's Create Magic ✨" : "Start the Conversation"}
                  <motion.div
                    animate={{
                      x: [0, 4, 0],
                      rotate: ctaHovered ? [0, 10, 0] : 0,
                    }}
                    transition={{
                      x: { duration: 1.5, repeat: Infinity },
                      rotate: { duration: 0.5 }
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </Link>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: ctaHovered ? 1 : 0 }}
            className="mt-4 text-sm text-slate-500"
          >
            Click to begin your journey
          </motion.p>
        </motion.div>
      </div>

      <DirectMessageForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
    </section>
  );
}
