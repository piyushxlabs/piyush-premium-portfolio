// ProjectsSection — 60fps Mobile Optimized Version
"use client";

import { useState, useEffect, useCallback, useRef, memo, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Eye } from "lucide-react";

// Featured projects
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

// Perf: Reduced particle count for mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
const PARTICLE_COUNT = isMobile ? 8 : 15;

// Perf: Memoized particle system with reduced count
const FloatingParticles = memo(({ color, count = PARTICLE_COUNT }: { color: string; count?: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ 
            background: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)', // Perf: Reduced blur
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});
FloatingParticles.displayName = "FloatingParticles";

// Perf: Memoized carousel card with optimized animations
const CarouselCard = memo(({ 
  project, 
  position, 
  isCenter, 
  onClick 
}: { 
  project: typeof projects[0]; 
  position: 'left' | 'center' | 'right' | 'hidden';
  isCenter: boolean;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Perf: Reduced spring stiffness for smoother animation
  const springConfig = { stiffness: 100, damping: 25, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Perf: Reduced tilt intensity
  const rotateX = useTransform(smoothMouseY, [-300, 300], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-300, 300], [-4, 4]);

  // Perf: Cache rect on mount/resize only
  useEffect(() => {
    if (!cardRef.current) return;
    rectRef.current = cardRef.current.getBoundingClientRect();
    
    const handleResize = () => {
      if (cardRef.current) {
        rectRef.current = cardRef.current.getBoundingClientRect();
      }
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Perf: Optimized card depth variants - removed filter blur
  const cardDepthVariants = useMemo(() => ({
    center: {
      x: 0,
      y: 0,
      scale: 1,
      rotateY: 0,
      z: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 0.8,
      },
    },
    left: {
      x: "-110%",
      y: 20,
      scale: 0.82,
      rotateY: 20,
      z: -150,
      opacity: 0.6,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 0.8,
      },
    },
    right: {
      x: "110%",
      y: 20,
      scale: 0.82,
      rotateY: -20,
      z: -150,
      opacity: 0.6,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 0.8,
      },
    },
    hidden: {
      x: 0,
      y: 0,
      scale: 0.7,
      rotateY: 0,
      z: -300,
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
      },
    },
  }), []);

  // Perf: Throttled mouse handler using cached rect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCenter || !rectRef.current) return;
    const centerX = rectRef.current.left + rectRef.current.width / 2;
    const centerY = rectRef.current.top + rectRef.current.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [isCenter, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

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
        zIndex: position === 'center' ? 10 : position === 'left' || position === 'right' ? 5 : 1,
      }}
      className={`w-full max-w-2xl ${isCenter ? "cursor-pointer" : "pointer-events-none"}`}
    >
      <div className="relative group">
        {/* Perf: Simplified glow - no blur */}
        <motion.div
          animate={isCenter ? {
            opacity: isHovered ? 0.4 : 0.2,
            scale: isHovered ? 1.05 : 1,
          } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute -inset-6 rounded-3xl"
          style={{ 
            background: `radial-gradient(circle, ${project.gradient.from}50, ${project.gradient.to}30, transparent 70%)`,
          }}
        />

        {/* Glass card - Perf: Removed animated box-shadow */}
        <div
          className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 rounded-3xl border border-white/10 overflow-hidden"
          style={{
            boxShadow: "0 20px 50px -10px rgba(0,0,0,0.5)",
          }}
        >
          {/* Perf: Removed shimmer effect - causes repaints */}

          {/* Content */}
          <div className="relative p-8 md:p-10">
            {/* Image preview */}
            <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden">
              <motion.div
                animate={isHovered ? { scale: 1.03, opacity: 0.3 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-gradient-to-br from-slate-800/80 to-slate-900/80"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${project.gradient.from}20, ${project.gradient.to}20)`,
                }}
              />

              <motion.div
                animate={isHovered ? { 
                  scale: 0.85, 
                  opacity: 0,
                } : { 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles className="w-16 h-16 text-white/30" />
              </motion.div>

              <motion.div
                animate={isHovered ? { 
                  opacity: 1, 
                  scale: 1,
                } : { 
                  opacity: 0, 
                  scale: 0.95,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${project.gradient.from}40, ${project.gradient.to}40)`,
                }}
              >
                <Eye className="w-20 h-20 text-white/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </motion.div>
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
        </div>
      </div>
    </motion.div>
  );
});
CarouselCard.displayName = "CarouselCard";

// Perf: Memoized mobile card
const MobileProjectCard = memo(({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => setIsInView(true)}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-[85vw] snap-center"
    >
      <a href={project.href}>
        <div className="relative group h-full">
          {/* Perf: Simplified glow */}
          <motion.div
            animate={isInView ? {
              opacity: [0.15, 0.25, 0.15],
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-3 rounded-3xl"
            style={{ 
              background: `radial-gradient(circle, ${project.gradient.from}30, transparent 70%)`,
            }}
          />

          <div className="relative backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 rounded-3xl border border-white/10 overflow-hidden p-6">
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

            <h3 className="text-xl font-bold mb-2 text-white">
              {project.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="inline-flex items-center gap-2 font-semibold text-sm">
              <span style={{ color: project.accent }}>View Case Study</span>
              <ArrowRight className="w-4 h-4" style={{ color: project.accent }} />
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
});
MobileProjectCard.displayName = "MobileProjectCard";

export function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentProject = projects[currentIndex];
  const [bgGradient, setBgGradient] = useState(currentProject.gradient);

  // Perf: Reduced parallax intensity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 30 });
  const parallaxX = useTransform(smoothMouseX, [-500, 500], [-8, 8]);
  const parallaxY = useTransform(smoothMouseY, [-500, 500], [-8, 8]);

  useEffect(() => {
    setBgGradient(currentProject.gradient);
  }, [currentIndex, currentProject.gradient]);

  const updateIndex = useCallback((newIndex: number) => {
    setCurrentIndex(((newIndex % projects.length) + projects.length) % projects.length);
  }, []);

  // Perf: Passive keyboard listener
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
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, updateIndex]);

  // Perf: Throttled mouse tracking
  const lastMouseUpdate = useRef(0);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const now = performance.now();
    if (now - lastMouseUpdate.current < 16) return; // ~60fps max
    lastMouseUpdate.current = now;
    
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }, [mouseX, mouseY]);

  const getPosition = useCallback((index: number): 'left' | 'center' | 'right' | 'hidden' => {
    const diff = ((index - currentIndex + projects.length) % projects.length);
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === projects.length - 1) return 'left';
    return 'hidden';
  }, [currentIndex]);

  return (
    <section 
      className="relative py-32 overflow-hidden"
      role="region" 
      aria-label="Featured projects carousel"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent" />
      
      {/* Perf: Simplified gradient orbs */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${bgGradient.from}25, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ 
            background: `radial-gradient(circle, ${bgGradient.to}25, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles color={currentProject.accent} />

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Previous project"
            className="group relative w-16 h-16 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
          </motion.button>

          <div className="flex gap-3">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => updateIndex(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to project ${i + 1}`}
                className="relative h-2 rounded-full transition-all duration-500 overflow-hidden"
                style={{
                  width: i === currentIndex ? "2rem" : "0.5rem",
                  background: i === currentIndex 
                    ? `linear-gradient(90deg, ${projects[i].gradient.from}, ${projects[i].gradient.to})`
                    : "#475569",
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={() => updateIndex(currentIndex + 1)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Next project"
            className="group relative w-16 h-16 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
          </motion.button>
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="lg:hidden mb-20 -mx-6 px-6">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
            {projects.map((project, index) => (
              <MobileProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <a href="/work">
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl backdrop-blur-xl bg-white/5 border-2 border-white/10 hover:border-white/30 font-bold group overflow-hidden"
            >
              <span className="relative z-10">View All Projects</span>
              
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
