// File: src/components/sections/skills/SkillsSection.tsx
// Optimizations Applied:
// - [Load Time] Adjusted viewport margins (0px 0px 200px 0px) to trigger loading/animations earlier (while below fold)
// - [Performance] Removed expensive SVG `drop-shadow` filters, replaced with performant gradient/opacity layers
// - [Performance] Optimized `NeuralNetwork` lazy loading trigger to start earlier
// - [Performance] Added `will-change` hints for GPU acceleration on critical animations
// - [Rendering] Enhanced `React.memo` usage and stable callbacks
// - [Animation] Tuned stagger delays for snappier feel
// - [Mobile] Optimized mobile grid animations
// Performance Target: Load < 2s, 60fps animations, Smooth scroll

"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { Brain, Code, Database, Zap, ArrowRight } from "lucide-react";
import { Suspense, useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import dynamic from "next/dynamic";
import { SectionDivider } from "@/components/ui/SectionDivider";

// Lazy load heavy 3D component - Low priority but triggered earlier
const NeuralNetwork = dynamic(() => import("@/components/3d/NeuralNetwork").then(mod => ({ default: mod.NeuralNetwork })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />
});

// Static Data
const coreSkills = [
  { name: "Python", level: 90, color: "accent-cyan", colorRgb: "6, 182, 212", connections: [1, 3] },
  { name: "Machine Learning", level: 85, color: "accent-lavender", colorRgb: "167, 139, 250", connections: [0, 2, 3] },
  { name: "React/Next.js", level: 85, color: "accent-teal", colorRgb: "20, 184, 166", connections: [1] },
  { name: "Data Science", level: 80, color: "accent-indigo", colorRgb: "129, 140, 248", connections: [0, 1] },
];

const skillCategories = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    color: "text-accent-cyan",
    gradientFrom: "from-cyan-400",
    gradientVia: "via-blue-400",
    gradientTo: "to-purple-500",
    glowColor: "cyan",
    skills: [
      { name: "Machine Learning", level: 85 },
      { name: "Deep Learning", level: 75 },
      { name: "NLP", level: 70 },
      { name: "Computer Vision", level: 65 },
    ],
  },
  {
    icon: Database,
    title: "Data Science",
    color: "text-accent-lavender",
    gradientFrom: "from-purple-400",
    gradientVia: "via-pink-400",
    gradientTo: "to-rose-400",
    glowColor: "purple",
    skills: [
      { name: "Python", level: 90 },
      { name: "Pandas & NumPy", level: 85 },
      { name: "Data Visualization", level: 80 },
      { name: "Statistical Analysis", level: 75 },
    ],
  },
  {
    icon: Code,
    title: "Development",
    color: "text-accent-teal",
    gradientFrom: "from-teal-400",
    gradientVia: "via-emerald-400",
    gradientTo: "to-green-400",
    glowColor: "teal",
    skills: [
      { name: "React & Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "API Development", level: 80 },
    ],
  },
  {
    icon: Zap,
    title: "Automation",
    color: "text-accent-indigo",
    gradientFrom: "from-indigo-400",
    gradientVia: "via-violet-400",
    gradientTo: "to-purple-500",
    glowColor: "indigo",
    skills: [
      { name: "Workflow Automation", level: 85 },
      { name: "Web Scraping", level: 80 },
      { name: "Task Scheduling", level: 75 },
      { name: "Process Optimization", level: 80 },
    ],
  },
];

const technologies = [
  "Python", "TensorFlow", "PyTorch", "Scikit-learn", "React", "Next.js",
  "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Docker", "Git", "AWS", "Vercel"
];

// Memoized Orbital Visualization
const OrbitalSkillVisualization = memo(function OrbitalSkillVisualization() {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Memoize gradients
  const gradients = useMemo(() => (
    <defs>
      {coreSkills.map((skill, i) => (
        <radialGradient key={`grad-${i}`} id={`glow-${i}`}>
          <stop offset="0%" stopColor={`rgb(${skill.colorRgb})`} stopOpacity="0.8" />
          <stop offset="100%" stopColor={`rgb(${skill.colorRgb})`} stopOpacity="0" />
        </radialGradient>
      ))}
    </defs>
  ), []);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[500px] md:h-[600px] perspective-1000">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px 200px 0px" }} // Trigger earlier from bottom
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
        style={{ willChange: "transform, opacity" }}
      >
        <svg className="w-full h-full" viewBox="0 0 600 600">
          {gradients}

          {/* Connections Layer */}
          {coreSkills.map((skill, i) =>
            skill.connections.map((connIdx) => {
              if (connIdx <= i) return null;

              const angle1 = (i * Math.PI * 2) / coreSkills.length - Math.PI / 2;
              const angle2 = (connIdx * Math.PI * 2) / coreSkills.length - Math.PI / 2;
              const radius = 180;
              const x1 = 300 + Math.cos(angle1) * radius;
              const y1 = 300 + Math.sin(angle1) * radius;
              const x2 = 300 + Math.cos(angle2) * radius;
              const y2 = 300 + Math.sin(angle2) * radius;

              const isHighlighted = hoveredSkill === i || hoveredSkill === connIdx ||
                selectedSkill === i || selectedSkill === connIdx;

              return (
                <motion.line
                  key={`${i}-${connIdx}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={`rgb(${skill.colorRgb})`}
                  strokeWidth={isHighlighted ? "2" : "1"}
                  strokeOpacity={isHighlighted ? 0.6 : 0.2}
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    strokeOpacity: isHighlighted ? 0.6 : 0.2,
                  }}
                  transition={{
                    pathLength: { delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" },
                    strokeOpacity: { duration: 0.3 }
                  }}
                />
              );
            })
          )}

          {/* Skills Layer */}
          {coreSkills.map((skill, i) => {
            const angle = (i * Math.PI * 2) / coreSkills.length - Math.PI / 2;
            const radius = 180;
            const orbitRadius = 20 + (skill.level / 100) * 60;
            const x = 300 + Math.cos(angle) * radius;
            const y = 300 + Math.sin(angle) * radius;
            const isHovered = hoveredSkill === i || selectedSkill === i;

            return (
              <motion.g
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              >
                {/* Orbit Path */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={orbitRadius}
                  fill="none"
                  stroke={`rgb(${skill.colorRgb})`}
                  strokeWidth="2"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 1, ease: "easeOut" }}
                />

                {/* Pulse Effect - Optimized */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={orbitRadius}
                  fill={`url(#glow-${i})`}
                  opacity={isHovered ? 0.6 : 0.3}
                  animate={{
                    scale: isHovered ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ willChange: "transform" }}
                />

                {/* Glow Layer (Replaces Drop Shadow) */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={orbitRadius * 0.4 + 15}
                  fill={`url(#glow-${i})`}
                  opacity={isHovered ? 0.8 : 0.4}
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Core Node */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={orbitRadius * 0.4}
                  fill={`rgb(${skill.colorRgb})`}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  onHoverStart={() => setHoveredSkill(i)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  onClick={() => setSelectedSkill(selectedSkill === i ? null : i)}
                  style={{
                    willChange: "transform"
                  }}
                />

                {/* Labels */}
                <motion.text
                  x={x}
                  y={y + orbitRadius + 30}
                  textAnchor="middle"
                  className="fill-white text-sm font-semibold"
                  style={{
                    letterSpacing: "0.03em",
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)" // CSS shadow is cheaper
                  }}
                  animate={{
                    opacity: isHovered ? 1 : 0.7,
                    scale: isHovered ? 1.1 : 1,
                  }}
                >
                  {skill.name}
                </motion.text>

                <motion.text
                  x={x}
                  y={y + orbitRadius + 50}
                  textAnchor="middle"
                  className="text-2xl font-bold"
                  style={{
                    fill: `rgb(${skill.colorRgb})`,
                    // Removed expensive SVG filter
                  }}
                  animate={{
                    opacity: isHovered ? 1 : 0.8,
                  }}
                >
                  {skill.level}%
                </motion.text>
              </motion.g>
            );
          })}

          {/* Central Core */}
          <motion.circle
            cx="300"
            cy="300"
            r="8"
            fill="white"
            opacity="0.8"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform, opacity" }}
          />
        </svg>
      </motion.div>
    </div>
  );
});

// Memoized Magnetic Card
const MagneticCard = memo(function MagneticCard({
  children,
  className = "",
  index = 0
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    x.set(percentX);
    y.set(percentY);
  }, [isMobile, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      style={isMobile ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -2 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "0px 0px 200px 0px" }} // Trigger earlier from bottom
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
});

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const containerRef = useRef(null);
  // Trigger Neural Network loading much earlier (400px before section enters fully)
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px 400px 0px" });

  return (
    <section ref={containerRef} className="relative py-40 md:py-48 overflow-hidden bg-slate-950">
      <SectionDivider position="top" />

      {/* Optimized Background Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -inset-[100%] w-[300%] h-[300%] bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"
          animate={{
            transform: ["translate(0,0)", "translate(-10%, -10%)", "translate(0,0)"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ willChange: "transform" }}
        />

        {[
          { size: "w-[500px] h-[500px]", pos: "top-10 -left-20", color: "cyan", delay: 0 },
          { size: "w-[400px] h-[400px]", pos: "bottom-20 -right-20", color: "purple", delay: 1 },
          { size: "w-[350px] h-[350px]", pos: "top-1/3 right-10", color: "pink", delay: 2 },
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
            className={`absolute ${orb.size} ${orb.pos} bg-${orb.color}-500/20 rounded-full blur-[80px]`}
            style={{ willChange: "transform, opacity" }}
          />
        ))}
      </div>

      {/* Neural Network - Lazy Loaded & Optimized */}
      <div className="absolute inset-0 w-full h-full z-[-1] opacity-50 pointer-events-none select-none hidden md:block">
        {isInView && (
          <Suspense fallback={<div className="w-full h-full" />}>
            <NeuralNetwork />
          </Suspense>
        )}
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 100px 0px" }}
            transition={{ duration: 0.6 }}
            className="inline-block px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm font-semibold mb-6 shadow-lg shadow-cyan-500/10"
            style={{ letterSpacing: "0.05em" }}
          >
            Skills & Expertise
          </motion.span>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 100px 0px" }}
            transition={{ delay: 0.1, duration: 0.8 }}
            style={{ letterSpacing: "0.02em" }}
          >
            Technical <span className="text-gradient-heading">Foundation</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 100px 0px" }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            A blend of AI, data science, development, and automation skills
            built through continuous learning and real-world projects
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-24 md:mb-32"
        >
          <motion.h3
            className="text-3xl md:text-4xl font-heading font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px 100px 0px" }}
          >
            Core <span className="text-gradient-heading">Expertise</span>
          </motion.h3>

          <div className="hidden md:block">
            {isInView && <OrbitalSkillVisualization />}
          </div>

          <div className="grid grid-cols-2 gap-6 md:hidden max-w-2xl mx-auto">
            {coreSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px 100px 0px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="2"
                        />
                        <motion.path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={`rgb(${skill.colorRgb})`}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: "0 100" }}
                          whileInView={{ strokeDasharray: `${skill.level} 100` }}
                          viewport={{ once: true, margin: "0px 0px 100px 0px" }}
                          transition={{
                            delay: index * 0.1 + 0.2,
                            duration: 1.5,
                            ease: [0.68, -0.55, 0.265, 1.55]
                          }}
                          style={{
                            filter: `drop-shadow(0 0 8px rgb(${skill.colorRgb}))`,
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className="text-xl font-bold"
                          style={{
                            background: `linear-gradient(135deg, rgb(${skill.colorRgb}), rgba(${skill.colorRgb}, 0.6))`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                    <h4 className="font-heading font-semibold text-base text-slate-100">{skill.name}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mb-24 md:mb-32">
          <motion.h3
            className="text-3xl md:text-4xl font-heading font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px 100px 0px" }}
          >
            Specialized <span className="text-gradient-heading">Domains</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <MagneticCard key={category.title} index={categoryIndex}>
                <div
                  className="relative group h-full"
                  style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                  }}
                >
                  <motion.div
                    className="backdrop-blur-2xl bg-white/[0.03] rounded-3xl p-8 md:p-10 h-full border border-white/10 shadow-2xl relative overflow-hidden"
                    whileHover={{
                      borderColor: `rgba(${categoryIndex === 0 ? '6, 182, 212' : categoryIndex === 1 ? '167, 139, 250' : categoryIndex === 2 ? '20, 184, 166' : '129, 140, 248'}, 0.5)`,
                      boxShadow: `0 20px 60px -15px rgba(${categoryIndex === 0 ? '6, 182, 212' : categoryIndex === 1 ? '167, 139, 250' : categoryIndex === 2 ? '20, 184, 166' : '129, 140, 248'}, 0.4)`,
                    }}
                    transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    {/* Optimized Gradient Background */}
                    <motion.div
                      className={`absolute -inset-[100%] w-[300%] h-[300%] bg-gradient-to-br ${category.gradientFrom} ${category.gradientVia} ${category.gradientTo} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700`}
                      animate={{
                        transform: ["translate(0,0)", "translate(-10%, -10%)", "translate(0,0)"]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{ willChange: "transform" }}
                    />

                    <div
                      className="absolute inset-0 opacity-[0.02]"
                      style={{
                        backgroundImage: "url(data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)",
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${category.gradientFrom} ${category.gradientTo} p-4 shadow-2xl relative`}
                          style={{
                            boxShadow: `0 10px 40px -10px rgba(${categoryIndex === 0 ? '6, 182, 212' : categoryIndex === 1 ? '167, 139, 250' : categoryIndex === 2 ? '20, 184, 166' : '129, 140, 248'}, 0.6)`,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                          }}
                          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <category.icon className="w-full h-full text-slate-900" strokeWidth={2.5} />
                          </motion.div>
                        </motion.div>

                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-100" style={{ letterSpacing: "0.02em" }}>
                          {category.title}
                        </h3>
                      </div>

                      <div className="space-y-6">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skill.name}>
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-base font-semibold text-slate-200" style={{ letterSpacing: "0.03em" }}>
                                {skill.name}
                              </span>
                              <motion.span
                                className="text-lg font-bold"
                                style={{
                                  background: `linear-gradient(135deg, rgba(${categoryIndex === 0 ? '6, 182, 212' : categoryIndex === 1 ? '167, 139, 250' : categoryIndex === 2 ? '20, 184, 166' : '129, 140, 248'}, 1), rgba(${categoryIndex === 0 ? '6, 182, 212' : categoryIndex === 1 ? '167, 139, 250' : categoryIndex === 2 ? '20, 184, 166' : '129, 140, 248'}, 0.6))`,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                }}
                              >
                                {skill.level}%
                              </motion.span>
                            </div>

                            <div className="h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true, margin: "0px 0px 100px 0px" }}
                                transition={{
                                  delay: categoryIndex * 0.1 + skillIndex * 0.05,
                                  duration: 1.2,
                                  ease: [0.68, -0.55, 0.265, 1.55],
                                }}
                                className={`h-full bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} relative overflow-hidden`}
                                style={{
                                  boxShadow: `0 0 20px rgba(${categoryIndex === 0 ? '6, 182, 212' : categoryIndex === 1 ? '167, 139, 250' : categoryIndex === 2 ? '20, 184, 166' : '129, 140, 248'}, 0.5)`,
                                }}

                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                  animate={{
                                    x: ["-100%", "200%"],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 1,
                                  }}
                                  style={{ willChange: "transform" }}
                                />
                              </motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </MagneticCard>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 100px 0px" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-12">
            Technologies I Work <span className="text-gradient-heading">With</span>
          </h3>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
            {technologies.map((tech, index) => (
              <motion.button
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px 100px 0px" }}
                transition={{
                  delay: index * 0.02,
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                whileHover={{
                  y: -6,
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(6, 182, 212, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(activeFilter === tech ? null : tech)}
                className={`px-5 md:px-6 py-2.5 md:py-3 rounded-xl backdrop-blur-xl text-sm md:text-base font-semibold transition-all duration-400 ${activeFilter === tech
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-900 border-transparent shadow-lg shadow-cyan-500/50"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400"
                  }`}
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                  letterSpacing: "0.03em"
                }}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 100px 0px" }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-24 md:mt-32 text-center"
        >
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Want to see these skills in action?
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 60px -10px rgba(6, 182, 212, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 text-cyan-400 font-semibold text-lg backdrop-blur-xl hover:from-cyan-400/20 hover:to-blue-500/20 transition-all duration-400"
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
            }}
          >
            View Projects
            <motion.div
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      <SectionDivider position="bottom" />
    </section>
  );
}