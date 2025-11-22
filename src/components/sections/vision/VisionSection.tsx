// VisionSection — Ultra-Cinematic Vision Experience
"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { Rocket, Target, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

const VisionSectionMobile = dynamic(() => import("./VisionSectionMobile").then(mod => ({ default: mod.VisionSectionMobile })), { ssr: false });

const visionPoints = [
  {
    icon: Rocket,
    title: "AI Startups",
    description: "Building AI-driven products that combine technical innovation with social impact",
    color: "from-cyan-400 to-blue-500",
    particleColor: "#22d3ee",
    backContent: "Launching ventures that solve real problems with intelligent automation"
  },
  {
    icon: Target,
    title: "Ethical Innovation",
    description: "Leading teams that innovate responsibly, blending automation, data, and design",
    color: "from-purple-400 to-violet-500",
    particleColor: "#a78bfa",
    backContent: "Building technology that respects privacy, humanity, and sustainable growth"
  },
  {
    icon: Sparkles,
    title: "Human Potential",
    description: "Creating tools that don't just automate work — but amplify human creativity",
    color: "from-pink-400 to-rose-500",
    particleColor: "#ec4899",
    backContent: "Empowering people to achieve more through intelligent augmentation"
  },
];

// Enhanced Floating Particle with Cursor Repulsion
function FloatingParticle({ 
  delay = 0, 
  speed = 1, 
  color = "#22d3ee",
  cursorPos 
}: { 
  delay?: number; 
  speed?: number; 
  color?: string;
  cursorPos?: { x: number; y: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: Math.random() * 100,
      y: Math.random() * 100
    });
  }, []);

  useEffect(() => {
    if (!ref.current || !cursorPos) return;
    
    const rect = ref.current.getBoundingClientRect();
    const particleX = rect.left + rect.width / 2;
    const particleY = rect.top + rect.height / 2;
    
    const dx = particleX - cursorPos.x;
    const dy = particleY - cursorPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 150) {
      const force = (150 - distance) / 150;
      setOffset({
        x: (dx / distance) * force * 30,
        y: (dy / distance) * force * 30
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [cursorPos]);

  return (
    <motion.div
      ref={ref}
      className="absolute w-3 h-3 rounded-full"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        background: color,
        boxShadow: `0 0 30px ${color}, 0 0 50px ${color}40`,
        x: offset.x,
        y: offset.y,
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        opacity: [0.5, 0.9, 0.5],
        scale: [1, 1.6, 1],
      }}
      transition={{
        duration: 10 / speed,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Geometric Shape Particle (Cube/Triangle)
function GeometricParticle({ 
  delay = 0, 
  shape = "cube",
  color = "#22d3ee" 
}: { 
  delay?: number; 
  shape?: "cube" | "triangle";
  color?: string;
}) {
  const [position] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100
  });

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
      animate={{
        y: [0, -50, 0],
        x: [0, 25, 0],
        rotate: [0, 360],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {shape === "cube" ? (
        <div 
          className="w-4 h-4 border-2"
          style={{
            borderColor: color,
            boxShadow: `0 0 20px ${color}60`,
            transform: "rotateX(45deg) rotateZ(45deg)",
          }}
        />
      ) : (
        <div 
          className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px]"
          style={{
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: color,
            filter: `drop-shadow(0 0 15px ${color}60)`,
          }}
        />
      )}
    </motion.div>
  );
}

// Light Ray Effect
function LightRay({ delay = 0, angle = 0 }: { delay?: number; angle?: number }) {
  return (
    <motion.div
      className="absolute top-0 left-1/2 w-1 h-full origin-top"
      style={{
        background: "linear-gradient(to bottom, rgba(34, 211, 238, 0.3), transparent)",
        transform: `rotate(${angle}deg)`,
        filter: "blur(2px)",
      }}
      animate={{
        opacity: [0, 0.6, 0],
        scaleY: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Holographic Icon Component
function HolographicIcon({ 
  Icon, 
  color, 
  particleColor 
}: { 
  Icon: any; 
  color: string; 
  particleColor: string;
}) {
  return (
    <motion.div
      className={`w-24 h-24 rounded-full bg-gradient-to-br ${color} p-6 mb-6 relative`}
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 25, repeat: Infinity, ease: "linear" },
        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{
        boxShadow: `0 0 50px ${particleColor}80, 0 0 100px ${particleColor}50, 0 0 150px ${particleColor}30`,
      }}
    >
      <Icon className="w-full h-full text-slate-900" />
      
      {/* Holographic Ring 1 */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: particleColor }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      
      {/* Holographic Ring 2 */}
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: particleColor }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.4,
        }}
      />
      
      {/* Inner Glow Pulse */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            `inset 0 0 20px ${particleColor}40`,
            `inset 0 0 40px ${particleColor}80`,
            `inset 0 0 20px ${particleColor}40`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// Vision Pillar Card - Ultra-Premium 3D Card with Hexagonal Design
function VisionPillarCard({ point, index }: { point: typeof visionPoints[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const Icon = point.icon;

  // Entrance animation variants
  const entranceVariants = {
    hidden: { 
      opacity: 0, 
      y: 100, 
      rotateY: index === 0 ? -30 : index === 2 ? 30 : 0,
      scale: 0.85
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateY: 0,
      scale: 1
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={entranceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-150px" }}
      transition={{ 
        delay: 0.3 + index * 0.25, 
        duration: 1.2,
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
      onClick={() => setIsFlipped(!isFlipped)}
      className="group relative h-[480px] min-h-[480px] cursor-pointer"
      style={{
        perspective: "1800px",
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 20 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 rounded-3xl backdrop-blur-2xl border-2 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(15, 23, 42, 0.75)",
            borderColor: "rgba(255, 255, 255, 0.15)",
            clipPath: "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
          }}
          animate={{
            rotateX: (mousePosition.y - 0.5) * -10,
            rotateY: (mousePosition.x - 0.5) * 10,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        >
          {/* Gradient Overlay */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-0`}
            whileHover={{ opacity: 0.25 }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Hexagonal Glow Border Animation */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${point.particleColor}70, transparent)`,
            }}
            animate={{
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Card Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <FloatingParticle 
                key={i} 
                delay={i * 0.15} 
                speed={0.5 + Math.random() * 0.5} 
                color={point.particleColor} 
              />
            ))}
          </div>

          {/* Animated Glow Border */}
          <motion.div 
            className="absolute inset-0 rounded-3xl opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: `inset 0 0 80px ${point.particleColor}50, 0 0 60px ${point.particleColor}40`,
            }}
          />

          {/* Scan Line Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                `linear-gradient(to bottom, transparent 0%, ${point.particleColor}20 50%, transparent 100%)`,
                `linear-gradient(to bottom, transparent 0%, ${point.particleColor}20 50%, transparent 100%)`,
              ],
              y: ["-100%", "200%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: index * 2,
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-10 h-full flex flex-col items-center justify-center text-center">
            {/* Holographic Icon */}
            <HolographicIcon 
              Icon={Icon} 
              color={point.color} 
              particleColor={point.particleColor} 
            />

            <motion.h3 
              className="text-2xl md:text-3xl font-heading font-bold mb-5 text-slate-100"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {point.title}
            </motion.h3>
            
            <p className="text-slate-300 leading-relaxed text-base">
              {point.description}
            </p>

            {/* Tap Indicator */}
            <motion.div
              className="mt-8 text-xs text-slate-500 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.2 }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: point.particleColor }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              Click to reveal vision
            </motion.div>
          </div>
        </motion.div>

        {/* Back Side - FIXED TEXT REVERSAL */}
        <motion.div
          className="absolute inset-0 rounded-3xl backdrop-blur-2xl border-2 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(15, 23, 42, 0.9)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            rotateY: 180,
            clipPath: "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-30`} />
          
          {/* Back Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <FloatingParticle 
                key={i} 
                delay={i * 0.2} 
                speed={0.6} 
                color={point.particleColor} 
              />
            ))}
          </div>
          
          {/* FIX: Counter-rotate ONLY text content to prevent reversal */}
          <div className="relative z-10 p-10 h-full flex flex-col items-center justify-center text-center">
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mb-8"
              animate={{
                boxShadow: [
                  `0 0 30px ${point.particleColor}50`,
                  `0 0 60px ${point.particleColor}70`,
                  `0 0 30px ${point.particleColor}50`,
                ],
                rotate: [0, 360],
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
            >
              <Icon className="w-12 h-12 text-cyan-400" />
            </motion.div>
            
            <h4 className="text-3xl font-heading font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Vision
            </h4>
            
            <p className="text-slate-200 leading-relaxed text-lg font-medium">
              {point.backContent}
            </p>

            {/* Decorative Elements */}
            <div className="mt-8 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: point.particleColor }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Connection Line Between Cards - ENHANCED (Continuous Flow) */}
      {index < 2 && (
        <motion.div
          className="absolute top-1/2 -right-14 w-15 h-1 hidden lg:block z-30"
          // Line appears when scrolled into view (One time)
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }} 
          transition={{ 
            delay: 1.2 + index * 0.3, 
            duration: 1, 
            type: "spring",
            stiffness: 100 
          }}
          style={{ 
            transformOrigin: "left",
            background: `linear-gradient(to right, ${visionPoints[index].particleColor}80, ${visionPoints[index + 1].particleColor}80)`,
            boxShadow: `0 0 25px ${visionPoints[index].particleColor}70`,
          }}
        >
          {/* Flowing Dot 1 - Forever Loop */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400"
            animate={{
              left: ["-10%", "110%"], // थोड़ा ज्यादा रेंज दी ताकि स्मूथ दिखे
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity, // यह सुनिश्चित करता है कि यह कभी न रुके
              ease: "linear",
              delay: 0, // Delay सिर्फ रेंडर पर, लूप में नहीं
            }}
            style={{
              boxShadow: "0 0 20px #22d3ee, 0 0 40px #22d3ee",
              willChange: "left" // Performance के लिए (ताकि ब्राउज़र इसे रोके नहीं)
            }}
          />
          
          {/* Flowing Dot 2 - Forever Loop */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400"
            animate={{
              left: ["-10%", "110%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: 0.7,
            }}
            style={{
              boxShadow: "0 0 15px #a78bfa, 0 0 30px #a78bfa",
              willChange: "left"
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// Quote Card Component with Advanced 3D Tilt and Circuit Pattern
function QuoteCard() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const rotateX = (mousePos.y - 0.5) * -12;
  const rotateY = (mousePos.x - 0.5) * 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ delay: 0.5, duration: 1.2, type: "spring", stiffness: 100 }}
      className="max-w-5xl mx-auto mb-40"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 0.5, y: 0.5 })}
        className="relative rounded-[2rem] backdrop-blur-3xl border-2 overflow-hidden group"
        style={{
          background: "rgba(15, 23, 42, 0.75)",
          borderColor: "rgba(34, 211, 238, 0.3)",
          perspective: "1200px",
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Holographic Glow Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/10 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
        
        {/* Inner Glow Pulse */}
        <motion.div
          className="absolute inset-0 rounded-[2rem]"
          animate={{
            boxShadow: [
              "inset 0 0 60px rgba(34, 211, 238, 0.15)",
              "inset 0 0 100px rgba(34, 211, 238, 0.35)",
              "inset 0 0 60px rgba(34, 211, 238, 0.15)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Animated Border Gradient */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] pointer-events-none"
          animate={{
            background: [
              "linear-gradient(0deg, rgba(34, 211, 238, 0.6), rgba(167, 139, 250, 0.6))",
              "linear-gradient(180deg, rgba(34, 211, 238, 0.6), rgba(167, 139, 250, 0.6))",
              "linear-gradient(360deg, rgba(34, 211, 238, 0.6), rgba(167, 139, 250, 0.6))",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Enhanced Circuit Pattern Background */}
        <div className="absolute inset-0 opacity-25">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-enhanced" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                {/* Main nodes */}
                <circle cx="30" cy="30" r="3" fill="#22d3ee" opacity="0.9">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="30" cy="30" r="1.5" fill="#a78bfa" opacity="0.8" />
                
                {/* Connection lines */}
                <line x1="30" y1="0" x2="30" y2="60" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
                <line x1="0" y1="30" x2="60" y2="30" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
                
                {/* Diagonal connections */}
                <line x1="0" y1="0" x2="15" y2="15" stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
                <line x1="60" y1="0" x2="45" y2="15" stroke="#a78bfa" strokeWidth="1" opacity="0.5" />
                
                {/* Corner nodes */}
                <circle cx="0" cy="0" r="1.5" fill="#ec4899" opacity="0.6" />
                <circle cx="60" cy="0" r="1.5" fill="#ec4899" opacity="0.6" />
                <circle cx="0" cy="60" r="1.5" fill="#ec4899" opacity="0.6" />
                <circle cx="60" cy="60" r="1.5" fill="#ec4899" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-enhanced)" />
          </svg>
        </div>
        
        {/* Ambient Particles Around Quote */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <FloatingParticle 
              key={i} 
              delay={i * 0.25} 
              speed={0.4} 
              color={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#ec4899"}
            />
          ))}
        </div>

        {/* Glitch Effect Overlay (Subtle) */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-screen"
          animate={{
            opacity: [0, 0.05, 0],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 8,
          }}
          style={{
            background: "linear-gradient(90deg, #ff0000 0%, #00ff00 50%, #0000ff 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-12 md:p-20 lg:p-24 text-center">
          <motion.blockquote 
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              "\“𝐈 𝐖𝐀𝐍𝐓 𝐓𝐎 𝐁𝐄 𝐊𝐍𝐎𝐖𝐍 𝐀𝐒 𝐓𝐇𝐄 𝐅𝐎𝐔𝐍𝐃𝐄𝐑 𝐖𝐇𝐎 𝐌𝐀𝐊𝐄𝐒 𝐀𝐈 𝐇𝐔𝐌𝐀𝐍,",
              "— 𝐁𝐋𝐄𝐍𝐃𝐈𝐍𝐆 𝐋𝐎𝐆𝐈𝐂 𝐖𝐈𝐓𝐇 𝐄𝐌𝐏𝐀𝐓𝐇𝐘,",
              "𝐀𝐍𝐃 𝐈𝐍𝐓𝐄𝐋𝐋𝐈𝐆𝐄𝐍𝐂𝐄 𝐖𝐈𝐓𝐇 𝐏𝐔𝐑𝐏𝐎𝐒𝐄.\""
            ].map((phrase, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.7 + i * 0.3, 
                  duration: 1,
                  type: "spring",
                  stiffness: 120
                }}
                className="block mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative"
                style={{
                  backgroundSize: "200% 100%",
                }}
                whileHover={{
                  scale: 1.03,
                  backgroundPosition: "100% 0%",
                  transition: { duration: 0.3 }
                }}
              >
                {phrase}
                {/* Word glow on hover */}
                <motion.span
                  className="absolute -inset-2 blur-2xl opacity-0"
                  whileHover={{ opacity: 0.4 }}
                  style={{
                    background: "radial-gradient(circle, rgba(34, 211, 238, 0.6), transparent)",
                  }}
                />
              </motion.span>
            ))}
          </motion.blockquote>

          {/* Sound Wave Visualization (Decorative) */}
          <div className="flex justify-center gap-1 mt-10">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full"
                animate={{
                  height: [20, 40, 20],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Philosophy Section with Enhanced Portal Effect
function PhilosophySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ delay: 0.5, duration: 1 }}
      className="text-center relative py-20"
    >
      {/* Enhanced Portal Rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border-[6px] border-cyan-500/50"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0 0 80px rgba(34, 211, 238, 0.5), 0 0 150px rgba(34, 211, 238, 0.3)",
        }}
      />
      
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border-[6px] border-purple-500/50"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.9, 0.6],
          rotate: -360,
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0 0 80px rgba(167, 139, 250, 0.5), 0 0 150px rgba(167, 139, 250, 0.3)",
        }}
      />
      
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border-[5px] border-blue-500/40"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.7, 0.4],
          rotate: 360,
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0 0 60px rgba(59, 130, 246, 0.4), 0 0 120px rgba(59, 130, 246, 0.2)",
        }}
      />

      {/* Inner Energy Ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full"
        animate={{
          boxShadow: [
            "0 0 40px rgba(34, 211, 238, 0.3), inset 0 0 40px rgba(167, 139, 250, 0.3)",
            "0 0 80px rgba(34, 211, 238, 0.5), inset 0 0 80px rgba(167, 139, 250, 0.5)",
            "0 0 40px rgba(34, 211, 238, 0.3), inset 0 0 40px rgba(167, 139, 250, 0.3)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Philosophy Text with Parallax Layers */}
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div 
          className="text-xl md:text-2xl lg:text-3xl text-slate-300 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { text: "In the future, I see myself as a founder who bridges human creativity ", delay: 0 },
            { text: "with artificial intelligence, shaping tools that not only automate work — but ", delay: 0.2 },
          ].map((part, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: part.delay, 
                duration: 1, 
                type: "spring", 
                stiffness: 100 
              }}
              className="inline"
            >
              {part.text}
            </motion.span>
          ))}
          
          {/* Key Phrase with Enhanced Glow */}
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.45, 
              duration: 1.2, 
              type: "spring", 
              stiffness: 120 
            }}
            className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-bold relative px-3 py-1"
          >
            amplify human potential
            
            {/* Enhanced Glow Effect */}
            <motion.span
              className="absolute -inset-6 bg-gradient-to-r from-cyan-500/40 to-purple-500/40 rounded-2xl blur-3xl pointer-events-none"
              animate={{
                opacity: [0.5, 0.9, 0.5],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.span>
          
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="inline"
          >
            .
          </motion.span>
        </motion.div>
        
        {/* Particle Burst - Moved outside text container */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: Math.cos((i / 8) * Math.PI * 2) * 60,
                y: Math.sin((i / 8) * Math.PI * 2) * 60,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Upward Flowing Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full"
            style={{
              left: `${38 + Math.random() * 24}%`,
              bottom: -20,
              background: i % 2 === 0 ? "#22d3ee" : "#a78bfa",
              boxShadow: `0 0 25px ${i % 2 === 0 ? "#22d3ee" : "#a78bfa"}, 0 0 50px ${i % 2 === 0 ? "#22d3ee80" : "#a78bfa80"}`,
            }}
            animate={{
              y: [-40, -800],
              opacity: [0, 1, 0.9, 0],
              scale: [0, 1.8, 1.2, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Timeline Visualization (Subtle) */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-cyan-500/50 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1.5 }}
      />
    </motion.div>
  );
}

// Main VisionSection Component
export function VisionSection() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Enhanced Parallax Values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  // Smooth spring animations
  const springConfig = { stiffness: 80, damping: 30, mass: 1 };
  const y1Spring = useSpring(y1, springConfig);
  const y2Spring = useSpring(y2, springConfig);
  const y3Spring = useSpring(y3, springConfig);

  // Track cursor for particle repulsion
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (isMobile) {
    return <VisionSectionMobile />;
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.04), transparent)",
        position: "relative",
      }}
    >
      {/* Enhanced Background Grid with Perspective */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ y: y1Spring }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.18) 2px, transparent 2px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.18) 2px, transparent 2px)
            `,
            backgroundSize: "50px 50px",
            transform: "perspective(1200px) rotateX(65deg) translateZ(-250px)",
            transformOrigin: "center bottom",
            boxShadow: "0 0 150px rgba(34, 211, 238, 0.15)",
          }}
        />
      </motion.div>

      {/* Enhanced Fog Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-cyan-500/15 via-cyan-500/8 to-transparent"
          style={{ y: y2Spring }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-purple-500/12 via-purple-500/6 to-transparent"
          style={{ y: y1Spring }}
          animate={{
            scale: [1.4, 1, 1.4],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent"
          style={{ y: y3Spring }}
          animate={{
            scale: [1.2, 1.5, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Light Rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(5)].map((_, i) => (
          <LightRay key={i} delay={i * 1.5} angle={-30 + i * 15} />
        ))}
      </div>

      {/* Enhanced Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(45)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 0.12} 
            speed={0.3 + Math.random() * 0.9} 
            color={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#ec4899"}
            cursorPos={cursorPos}
          />
        ))}
      </div>

      {/* Geometric Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <GeometricParticle 
            key={i} 
            delay={i * 0.8} 
            shape={i % 2 === 0 ? "cube" : "triangle"}
            color={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#ec4899"}
          />
        ))}
      </div>

      {/* Content Container */}
      <motion.div 
        className="container relative z-10 mx-auto px-6 lg:px-8 max-w-7xl"
        style={{ scale, opacity: opacity1 }}
      >
        {/* Badge + Title */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, scale: 0.4, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut", 
              type: "spring", 
              stiffness: 180, 
              damping: 18 
            }}
            className="inline-block px-10 py-4 rounded-full backdrop-blur-2xl border-2 text-sm font-medium mb-12 relative overflow-hidden group"
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              borderColor: "rgba(34, 211, 238, 0.5)",
              boxShadow: "0 0 40px rgba(34, 211, 238, 0.25), 0 0 80px rgba(167, 139, 250, 0.15)",
            }}
          >
            {/* Animated Border Glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                background: [
                  "linear-gradient(0deg, #22d3ee, #a78bfa, #22d3ee)",
                  "linear-gradient(360deg, #22d3ee, #a78bfa, #22d3ee)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                padding: "2px",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            
            {/* Pulsing Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{
                border: "3px solid #22d3ee",
                boxShadow: "0 0 30px #22d3ee",
              }}
            />
            
            <span className="relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold tracking-wider">
              Future Vision
            </span>
          </motion.span>

          {/* Animated Title */}
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-10 leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {["Building", "the"].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.18 + 0.4, 
                  duration: 1,
                  type: "spring",
                  stiffness: 140,
                  damping: 18
                }}
                className="inline-block mr-5 text-slate-100"
                style={{ transformOrigin: "bottom" }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 100, rotateX: -90, scale: 0.75 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.76, 
                duration: 1.2,
                type: "spring",
                stiffness: 140,
                damping: 18
              }}
              className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent relative"
              style={{ 
                transformOrigin: "bottom",
              }}
            >
              Future
              <motion.span
                className="absolute -inset-4 blur-3xl opacity-50"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(34, 211, 238, 0.6), transparent)",
                    "radial-gradient(circle, rgba(167, 139, 250, 0.6), transparent)",
                    "radial-gradient(circle, rgba(34, 211, 238, 0.6), transparent)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl lg:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
          >
            My long-term vision is to build AI startups that combine technical
            innovation with social impact — creating intelligent products that
            empower learners, creators, and organizations
          </motion.p>
        </div>

        {/* Cinematic Quote Card */}
        <QuoteCard />

        {/* Vision Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 max-w-7xl mx-auto mb-40">
          {visionPoints.map((point, index) => (
            <VisionPillarCard key={point.title} point={point} index={index} />
          ))}
        </div>

        {/* Philosophy with Portal Effect */}
        <PhilosophySection />
      </motion.div>
    </section>
  );
}
