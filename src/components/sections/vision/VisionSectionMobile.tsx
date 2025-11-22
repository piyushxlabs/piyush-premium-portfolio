
"use client";

import { motion } from "framer-motion";
import { Rocket, Target, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

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

// Lightweight Floating Particle for Mobile
function FloatingParticleMobile({ 
  color, 
  delay,
  initialX,
  initialY
}: { 
  color: string; 
  delay: number;
  initialX: number;
  initialY: number;
}) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        background: color,
        boxShadow: `0 0 15px ${color}`,
        willChange: "opacity",
      }}
      animate={{
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Mobile-Optimized Vision Card
function VisionPillarCardMobile({ point, index }: { point: typeof visionPoints[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number}>>([]);
  
  const Icon = point.icon;

  // Generate particle positions client-side only (SSR safe)
  useEffect(() => {
    const positions = Array.from({ length: 6 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticlePositions(positions);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // scale: 0.95 COMMENTED OUT - Causing zoom
      whileInView={{ opacity: 1, y: 0 }} // scale: 1 COMMENTED OUT - Causing zoom
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        delay: 0.15 + index * 0.12, 
        duration: 0.7, 
        type: "spring", 
        stiffness: 80,
        damping: 15
      }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative h-[420px] cursor-pointer"
      style={{ 
        perspective: "1500px",
        transformStyle: "preserve-3d"
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          duration: 0.6, 
          type: "spring", 
          stiffness: 60,
          damping: 18
        }}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 rounded-3xl backdrop-blur-xl border-2 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(15, 23, 42, 0.8)",
            borderColor: "rgba(255, 255, 255, 0.15)",
            clipPath: "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            transform: "translateZ(0)",
            willChange: "transform"
          }}
        >
          {/* Gradient Overlay */}
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${point.color}`}
            style={{ opacity: 0.15 }}
          />
          
          {/* Animated Glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${point.particleColor}30, transparent 70%)`,
            }}
            animate={{
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Optimized Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particlePositions.map((pos, i) => (
              <FloatingParticleMobile
                key={i}
                color={point.particleColor}
                delay={i * 0.4}
                initialX={pos.x}
                initialY={pos.y}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center">
            {/* Icon */}
            <motion.div
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${point.color} p-5 mb-6 relative`}
              animate={{
                rotate: [0, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                boxShadow: `0 0 30px ${point.particleColor}60, 0 0 50px ${point.particleColor}30`,
                willChange: "transform"
              }}
            >
              <Icon className="w-full h-full text-slate-900" strokeWidth={2.5} />
              
              {/* Ring 1 */}
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: point.particleColor }}
                animate={{
                  // scale: [1, 1.4, 1], // COMMENTED OUT - Causing zoom
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              
              {/* Ring 2 */}
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{ borderColor: point.particleColor }}
                animate={{
                  // scale: [1, 1.6, 1], // COMMENTED OUT - Causing zoom
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3,
                }}
              />
            </motion.div>

            <h3 className="text-2xl font-heading font-bold mb-4 text-slate-100">
              {point.title}
            </h3>
            
            <p className="text-slate-300 leading-relaxed text-sm px-2">
              {point.description}
            </p>

            {/* Tap Indicator */}
            <motion.div
              className="mt-6 text-xs text-slate-500 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.15 }}
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: point.particleColor }}
                animate={{
                  // scale: [1, 1.4, 1], // COMMENTED OUT - Causing zoom
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
              Tap to reveal vision
            </motion.div>
          </div>
        </motion.div>

        {/* Back Side - Fixed Text Orientation */}
        <motion.div
          className="absolute inset-0 rounded-3xl backdrop-blur-xl border-2 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "rgba(15, 23, 42, 0.9)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            transform: "rotateY(180deg)",
            clipPath: "polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            willChange: "transform"
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${point.color} opacity-25`} />
          
          {/* Back Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particlePositions.slice(0, 4).map((pos, i) => (
              <FloatingParticleMobile
                key={`back-${i}`}
                color={point.particleColor}
                delay={i * 0.5}
                initialX={pos.x}
                initialY={pos.y}
              />
            ))}
          </div>
          
          {/* Back Content */}
          <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center">
            <motion.div 
              className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mb-6"
              animate={{
                boxShadow: [
                  `0 0 20px ${point.particleColor}40`,
                  `0 0 40px ${point.particleColor}60`,
                  `0 0 20px ${point.particleColor}40`,
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-10 h-10 text-cyan-400" />
            </motion.div>
            
            <h4 className="text-2xl font-heading font-bold mb-5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Vision
            </h4>
            
            <p className="text-slate-200 leading-relaxed text-base font-medium px-2">
              {point.backContent}
            </p>

            {/* Decorative Dots */}
            <div className="mt-6 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: point.particleColor }}
                  animate={{
                    // scale: [1, 1.3, 1], // COMMENTED OUT - Causing zoom
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.25,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Mobile Quote Card
function QuoteCardMobile() {
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number}>>([]);

  useEffect(() => {
    const positions = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticlePositions(positions);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // scale: 0.96 COMMENTED OUT - Causing zoom
      whileInView={{ opacity: 1, y: 0 }} // scale: 1 COMMENTED OUT - Causing zoom
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 80 }}
      className="max-w-4xl mx-auto mb-24"
    >
      <div
        className="relative rounded-3xl backdrop-blur-xl border-2 overflow-hidden p-8 md:p-12"
        style={{
          background: "rgba(15, 23, 42, 0.8)",
          borderColor: "rgba(34, 211, 238, 0.3)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          transform: "translateZ(0)"
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-purple-500/15 to-pink-500/10"
          animate={{
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Simplified Circuit Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-mobile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#22d3ee" opacity="0.7" />
                <line x1="20" y1="0" x2="20" y2="40" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
                <line x1="0" y1="20" x2="40" y2="20" stroke="#22d3ee" strokeWidth="1" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-mobile)" />
          </svg>
        </div>
        
        {/* Optimized Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particlePositions.map((pos, i) => (
            <FloatingParticleMobile
              key={i}
              color={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#a78bfa" : "#ec4899"}
              delay={i * 0.3}
              initialX={pos.x}
              initialY={pos.y}
            />
          ))}
        </div>

        <blockquote className="relative z-10 text-lg md:text-xl lg:text-2xl font-heading font-medium leading-relaxed text-center">
          {[
            "\"I want to be known as the founder who makes AI human,",
            "— blending logic with empathy,",
            "and intelligence with purpose.\""
          ].map((phrase, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              className="block mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              {phrase}
            </motion.span>
          ))}
        </blockquote>

        {/* Sound Wave Bars */}
        <div className="flex justify-center gap-1 mt-6">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full"
              animate={{
                height: [12, 24, 12],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Mobile Philosophy Section
function PhilosophySectionMobile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-center relative py-16"
    >
      {/* Portal Rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border-[3px] border-cyan-500/25"
        animate={{
          // scale: [1, 1.12, 1], // COMMENTED OUT - Causing zoom
          opacity: [0.3, 0.5, 0.3],
          rotate: 360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0 0 40px rgba(34, 211, 238, 0.2)",
        }}
      />
      
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border-[3px] border-purple-500/25"
        animate={{
          // scale: [1.12, 1, 1.12], // COMMENTED OUT - Causing zoom
          opacity: [0.4, 0.6, 0.4],
          rotate: -360,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          boxShadow: "0 0 40px rgba(167, 139, 250, 0.2)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.p 
          className="text-lg md:text-xl text-slate-300 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.6 }}
            className="inline"
          >
            In the future, I see myself as a founder who bridges human creativity 
          </motion.span>
          
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="inline"
          >
            with artificial intelligence, shaping tools that not only automate work — but 
          </motion.span>
          
          <motion.span
            initial={{ opacity: 0 }} // scale: 0.92 COMMENTED OUT - Causing zoom
            whileInView={{ opacity: 1 }} // scale: 1 COMMENTED OUT - Causing zoom
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8, type: "spring" }}
            className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-bold relative px-2 mx-1"
          >
            amplify human potential
            <motion.span
              className="absolute -inset-3 bg-gradient-to-r from-cyan-500/25 to-purple-500/25 rounded-xl blur-xl pointer-events-none"
              animate={{
                opacity: [0.4, 0.65, 0.4],
                // scale: [1, 1.08, 1], // COMMENTED OUT - Causing zoom
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.span>
          <span>.</span>
        </motion.p>
      </div>
    </motion.div>
  );
}

// Main Mobile Component
export function VisionSectionMobile() {
  return (
    <section 
      className="relative min-h-screen py-20 overflow-hidden bg-slate-950"
    >
      {/* Cinematic Background Theme */}
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
          { size: "w-[300px] h-[300px]", pos: "top-10 -left-10", color: "cyan", delay: 0, blur: "blur-[80px]" },
          { size: "w-[250px] h-[250px]", pos: "bottom-20 -right-10", color: "purple", delay: 1, blur: "blur-[70px]" },
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
      </div>
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-25">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.12) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.12) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "35px 35px",
          }}
        />
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-0 w-[200px] h-[200px] bg-cyan-500/12 rounded-full blur-[70px]"
          animate={{
            // scale: [1, 1.25, 1], // COMMENTED OUT - Causing zoom
            opacity: [0.5, 0.75, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-0 w-[200px] h-[200px] bg-purple-500/12 rounded-full blur-[70px]"
          animate={{
            // scale: [1.25, 1, 1.25], // COMMENTED OUT - Causing zoom
            opacity: [0.6, 0.85, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-3xl">
        {/* Badge + Title */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-7 py-2.5 rounded-full backdrop-blur-xl border-2 text-xs font-medium mb-7 relative"
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              borderColor: "rgba(34, 211, 238, 0.5)",
              boxShadow: "0 0 25px rgba(34, 211, 238, 0.2)",
            }}
          >
            <span className="relative z-10 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold tracking-wider">
              Future Vision
            </span>
          </motion.span>

          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-5 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="text-slate-100">Building the </span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Future
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed"
          >
            My long-term vision is to build AI startups that combine technical
            innovation with social impact — creating intelligent products that
            empower learners, creators, and organizations
          </motion.p>
        </div>

        {/* Quote Card */}
        <QuoteCardMobile />

        {/* Vision Pillars */}
        <div className="grid grid-cols-1 gap-5 mb-16">
          {visionPoints.map((point, index) => (
            <VisionPillarCardMobile key={point.title} point={point} index={index} />
          ))}
        </div>

        {/* Philosophy */}
        <PhilosophySectionMobile />
      </div>
    </section>
  );
}
