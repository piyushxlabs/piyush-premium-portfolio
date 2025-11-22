"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useVelocity, useAnimationFrame } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";

// Featured projects with enhanced visual data
const projects = [
  {
    id: 1,
    title: "AI Content Generator",
    description: "Intelligent system generating human-like content using GPT-4",
    tags: ["AI/ML", "Python", "React"],
    image: "/images/projects/ai-content.jpg",
    href: "/work#ai-content",
    gradient: { from: "#22D3EE", to: "#A78BFA" },
    accent: "#22D3EE",
  },
  {
    id: 2,
    title: "Data Visualization Platform",
    description: "Real-time analytics dashboard with predictive insights",
    tags: ["Data Science", "Next.js", "D3.js"],
    image: "/images/projects/data-viz.jpg",
    href: "/work#data-viz",
    gradient: { from: "#14B8A6", to: "#6366F1" },
    accent: "#14B8A6",
  },
  {
    id: 3,
    title: "Workflow Automation Suite",
    description: "Smart automation reducing manual work by 70%",
    tags: ["Automation", "Python", "Node.js"],
    image: "/images/projects/automation.jpg",
    href: "/work#automation",
    gradient: { from: "#22D3EE", to: "#60A5FA" },
    accent: "#60A5FA",
  },
];

// Particle system for ambient atmosphere
const PARTICLE_POSITIONS = Array.from({ length: 30 }, (_, i) => {
  const seed = i * 137.508;
  return {
    id: i,
    left: (seed % 100),
    top: ((seed * 1.618) % 100),
    xOffset: (seed % 20) - 10,
    duration: 3 + ((seed % 2)),
    delay: (seed % 2),
  };
});

function FloatingParticles({ color, count = 20 }: { color: string; count?: number }) {
  const particles = PARTICLE_POSITIONS.slice(0, count);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full"
          style={{ 
            background: color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Enhanced 3D carousel card with cinematic depth
function CarouselCard({ 
  project, 
  position, 
  isCenter, 
  index, 
  total,
  onClick 
}: { 
  project: typeof projects[0]; 
  position: 'left' | 'center' | 'right' | 'hidden';
  isCenter: boolean;
  index: number;
  total: number;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Ultra-smooth spring physics
  const springConfig = { stiffness: 150, damping: 30, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // 3D tilt effect
  const rotateX = useTransform(smoothMouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-8, 8]);
  const translateZ = useTransform(smoothMouseY, [-300, 300], [10, -10]);

  // Card depth positions with enhanced 3D perspective
  const cardDepthVariants = {
    center: {
      x: 0,
      y: 0,
      scale: 1,
      rotateY: 0,
      z: 0,
      opacity: 1,
      filter: "brightness(1) blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        mass: 0.8,
      },
    },
    left: {
      x: "-110%",
      y: 20,
      scale: 0.8,
      rotateY: 25,
      z: -200,
      opacity: 0.5,
      filter: "brightness(0.7) blur(2px)",
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        mass: 0.8,
      },
    },
    right: {
      x: "110%",
      y: 20,
      scale: 0.8,
      rotateY: -25,
      z: -200,
      opacity: 0.5,
      filter: "brightness(0.7) blur(2px)",
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        mass: 0.8,
      },
    },
    hidden: {
      x: 0,
      y: 0,
      scale: 0.6,
      rotateY: 0,
      z: -400,
      opacity: 0,
      filter: "brightness(0.5) blur(4px)",
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
      },
    },
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCenter || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardDepthVariants as any}
      animate={position}
      initial="hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => isCenter && setIsHovered(true)}
      onClick={() => isCenter && onClick()}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        translateX: "-50%",
        translateY: "-50%",
        transformStyle: "preserve-3d",
        rotateX: isCenter && isHovered ? rotateX : 0,
        rotateY: isCenter && isHovered ? rotateY : 0,
        z: isCenter && isHovered ? translateZ : 0,
        zIndex: position === 'center' ? 10 : position === 'left' || position === 'right' ? 5 : 1,
      }}
      className={`w-full max-w-2xl ${isCenter ? "cursor-pointer" : "pointer-events-none"}`}
    >
      <div className="relative group">
        {/* Ambient glow effect */}
        <motion.div
          animate={isCenter ? {
            opacity: isHovered ? 0.6 : 0.3,
            scale: isHovered ? 1.1 : 1,
          } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute -inset-8 rounded-3xl blur-3xl"
          style={{ 
            background: `radial-gradient(circle, ${project.gradient.from}60, ${project.gradient.to}40, transparent 70%)`,
          }}
        />

        {/* Glass card */}
        <motion.div
          animate={isCenter && isHovered ? {
            boxShadow: `0 25px 60px -15px ${project.accent}40, 0 0 0 1px ${project.accent}30`,
          } : {}}
          transition={{ duration: 0.3 }}
          className="relative backdrop-blur-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 rounded-3xl border border-white/10 overflow-hidden"
          style={{
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.5)",
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            animate={isCenter && isHovered ? {
              x: ["-100%", "200%"],
            } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.accent}30, transparent)`,
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div className="relative p-8 md:p-10">
            {/* Image preview area */}
            <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden">
              {/* Background gradient */}
              <motion.div
                animate={isHovered ? { scale: 1.05, opacity: 0.3 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${project.gradient.from}20, ${project.gradient.to}20)`,
                }}
              />

              {/* Placeholder icon */}
              <motion.div
                animate={isHovered ? { 
                  scale: 0.8, 
                  opacity: 0,
                  rotateY: 180,
                } : { 
                  scale: 1, 
                  opacity: 1,
                  rotateY: 0,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Sparkles className="w-16 h-16 text-white/30" />
              </motion.div>

              {/* Hover preview */}
              <motion.div
                animate={isHovered ? { 
                  opacity: 1, 
                  scale: 1,
                  rotateY: 0,
                } : { 
                  opacity: 0, 
                  scale: 0.9,
                  rotateY: -180,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  transformStyle: "preserve-3d",
                  background: `linear-gradient(135deg, ${project.gradient.from}40, ${project.gradient.to}40)`,
                }}
              >
                <Eye className="w-20 h-20 text-white/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </motion.div>

              {/* Scan line effect */}
              {isHovered && (
                <motion.div
                  animate={{ y: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isCenter ? { opacity: 1, x: 0 } : { opacity: 0.5 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-xl border"
                  style={{
                    background: `${project.accent}15`,
                    color: project.accent,
                    borderColor: `${project.accent}30`,
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Title */}
            <motion.h3
              animate={isCenter ? { 
                opacity: 1,
                y: 0,
              } : {
                opacity: 0.6,
                y: 10,
              }}
              className="text-2xl md:text-3xl font-bold mb-3 text-white"
            >
              {project.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              animate={isCenter ? { opacity: 1 } : { opacity: 0.5 }}
              className="text-slate-300 leading-relaxed mb-6"
            >
              {project.description}
            </motion.p>

            {/* CTA */}
            {isCenter && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 text-white font-semibold group/cta"
              >
                <motion.span
                  animate={isHovered ? { x: 4 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: project.accent }}
                >
                  View Case Study
                </motion.span>
                <motion.div
                  animate={isHovered ? { x: 8 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" style={{ color: project.accent }} />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Border glow on hover */}
          <motion.div
            animate={isCenter && isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              boxShadow: `inset 0 0 20px ${project.accent}40`,
            }}
          />
        </motion.div>

        {/* Depth indicator lines */}
        {isCenter && (
          <motion.div
            animate={{ opacity: isHovered ? 0.15 : 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-3xl border"
                style={{
                  borderColor: project.accent,
                  transform: `translateZ(${-20 * (i + 1)}px) scale(${1 + 0.02 * (i + 1)})`,
                }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Mobile project card
function MobileProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setIsInView(true)}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="flex-shrink-0 w-[85vw] snap-center"
    >
      <a href={project.href}>
        <div className="relative group h-full">
          {/* Glow effect */}
          <motion.div
            animate={isInView ? { opacity: 0.3 } : {}}
            transition={{ duration: 0.3 }}
            className="absolute -inset-4 rounded-3xl blur-xl lg:blur-2xl"
            style={{ 
              background: `radial-gradient(circle, ${project.gradient.from}40, transparent 70%)`,
            }}
          />

          <div className="relative backdrop-blur-md lg:backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 rounded-3xl border border-white/10 overflow-hidden p-6">
            {/* Image */}
            <div className="aspect-video mb-4 rounded-2xl overflow-hidden relative">
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient.from}30, ${project.gradient.to}30)`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white/30" />
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: `${project.accent}15`,
                    color: project.accent,
                    border: `1px solid ${project.accent}30`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-2 text-white">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {project.description}
            </p>

            {/* CTA */}
            <div className="inline-flex items-center gap-2 font-semibold text-sm">
              <span style={{ color: project.accent }}>View Case Study</span>
              <ArrowRight className="w-4 h-4" style={{ color: project.accent }} />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentProject = projects[currentIndex];
  const [bgGradient, setBgGradient] = useState(currentProject.gradient);

  // Smooth mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  const parallaxX = useTransform(smoothMouseX, [-500, 500], [-15, 15]);
  const parallaxY = useTransform(smoothMouseY, [-500, 500], [-15, 15]);

  useEffect(() => {
    setBgGradient(currentProject.gradient);
  }, [currentIndex, currentProject.gradient]);

  const updateIndex = useCallback((newIndex: number) => {
    setCurrentIndex(((newIndex % projects.length) + projects.length) % projects.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        updateIndex(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        updateIndex(currentIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, updateIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const getPosition = (index: number): 'left' | 'center' | 'right' | 'hidden' => {
    const diff = ((index - currentIndex + projects.length) % projects.length);
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === projects.length - 1) return 'left';
    return 'hidden';
  };

  return (
    <section 
      className="relative py-32 overflow-hidden bg-slate-950"
      role="region" 
      aria-label="Featured projects carousel"
    >
      <SectionDivider position="top" />
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
          { size: "w-[500px] h-[500px]", pos: "top-10 -left-20", color: "cyan", delay: 0, blur: "blur-[100px]" },
          { size: "w-[400px] h-[400px]", pos: "bottom-20 -right-20", color: "purple", delay: 1, blur: "blur-[90px]" },
          { size: "w-[350px] h-[350px]", pos: "top-1/3 right-10", color: "pink", delay: 2, blur: "blur-[80px]" },
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
      
      {/* Dynamic gradient orbs */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[40px] lg:blur-[100px]"
          style={{ 
            background: `radial-gradient(circle, ${bgGradient.from}30, transparent 70%)`,
          }}
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[40px] lg:blur-[100px]"
          style={{ 
            background: `radial-gradient(circle, ${bgGradient.to}30, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="hidden lg:block"><FloatingParticles color={currentProject.accent} count={30} /></div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-5 py-2.5 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 text-sm font-medium mb-6"
          >
            Featured Projects
          </motion.span>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Selected{" "}
            <span 
  className="relative inline-block"
  style={{
    background: `linear-gradient(135deg, #22D3EE, #A78BFA)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }}
>
  Creations
</span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Interactive showcase of AI-powered projects combining design and engineering excellence
          </p>
        </motion.div>

        {/* Desktop: 3D Carousel */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="hidden lg:block relative h-[700px] mb-16"
          style={{ 
            perspective: "2000px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <AnimatePresence mode="sync">
            {projects.map((project, index) => {
              const position = getPosition(index);
              return (
                <CarouselCard
                  key={project.id}
                  project={project}
                  position={position}
                  isCenter={position === 'center'}
                  index={index}
                  total={projects.length}
                  onClick={() => window.location.href = project.href}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Desktop: Controls */}
        <div className="hidden lg:flex items-center justify-center gap-10 mb-24">
          <motion.button
            onClick={() => updateIndex(currentIndex - 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous project"
            className="group relative w-16 h-16 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ 
                boxShadow: `0 0 20px ${currentProject.accent}40`,
              }}
            />
            <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
          </motion.button>

          <div className="flex gap-3">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => updateIndex(i)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to project ${i + 1}`}
                className="relative h-2 rounded-full transition-all duration-500 overflow-hidden"
                style={{
                  width: i === currentIndex ? "2rem" : "0.5rem",
                  background: i === currentIndex 
                    ? `linear-gradient(90deg, ${projects[i].gradient.from}, ${projects[i].gradient.to})`
                    : "#475569",
                }}
              >
                {i === currentIndex && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => updateIndex(currentIndex + 1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next project"
            className="group relative w-16 h-16 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ 
                boxShadow: `0 0 20px ${currentProject.accent}40`,
              }}
            />
            <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
          </motion.button>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="lg:hidden mb-20 -mx-6 px-6">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4" style={{ willChange: 'scroll-position' }}>
            {projects.map((project, index) => (
              <MobileProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <a href="/work">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl backdrop-blur-xl bg-white/5 border-2 border-white/10 hover:border-white/30 font-bold group overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${currentProject.accent}20, transparent)`,
                }}
              />
              
              <span className="relative z-10">View All Projects</span>
              
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>

              {/* Glow effect on hover */}
              <motion.div
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 40px ${currentProject.accent}60`,
                }}
              />
            </motion.div>
          </a>
        </motion.div>
      </div>

      <SectionDivider position="bottom" />
    </section>
  );
}
