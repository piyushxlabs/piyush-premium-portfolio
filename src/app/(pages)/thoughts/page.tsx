'use client';

import { motion, useScroll, useTransform, useInView, useMotionValue, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { PremiumBox } from '@/components/ui/PremiumBox';
import { useState, useEffect, useRef } from 'react';

import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { AnimatedGradientMesh } from '@/components/ui/AnimatedGradientMesh';
import { SynapticNetwork } from '@/components/ui/SynapticNetwork';
import { LiquidGlassTitle } from '@/components/ui/LiquidGlassTitle';

// Physics-enabled word component
function PhysicsWord({
  idea,
  mouseX,
  mouseY,
  index
}: {
  idea: { text: string; x: string; y: string; delay: number; duration: number };
  mouseX: any;
  mouseY: any;
  index: number;
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
          duration: idea.duration,
          delay: idea.delay,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: idea.duration,
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
          duration: 25 + index * 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotateZ: {
          duration: 20 + index * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        scale: {
          duration: 15 + index,
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
function FloatingIdeas() {
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
        <PhysicsWord
          key={i}
          idea={idea}
          mouseX={mouseX}
          mouseY={mouseY}
          index={i}
        />
      ))}
    </div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateY(((x - centerX) / centerX) * 8);
    setRotateX(((centerY - y) / centerY) * 8);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setRotateX(0);
        setRotateY(0);
      }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovering ? 1.02 : 1,
      }}
      transition={isHovering ? { duration: 0.1, ease: "easeOut" } : { duration: 0.6, type: "spring" }}
      className={className}
    >
      {children}
    </motion.div>
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
      className="flex items-center gap-2 text-accent-cyan font-medium group-hover:gap-4 transition-all duration-300"
      style={{ filter: isHovered ? 'brightness(1.1)' : 'brightness(1)' }}
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
    slug: 'ethics-of-ai'
  },
  {
    title: 'From Data to Insight: My Journey in Machine Learning',
    excerpt: 'Lessons learned from building ML models, understanding patterns, and discovering how data tells stories we never expected.',
    date: 'Nov 2024',
    readTime: '7 min read',
    category: 'Learning',
    slug: 'data-to-insight'
  },
  {
    title: 'Automation with Purpose: Beyond Efficiency',
    excerpt: 'Why automation should amplify human creativity rather than replace it—and how we can design systems that empower people.',
    date: 'Oct 2024',
    readTime: '6 min read',
    category: 'Automation',
    slug: 'automation-purpose'
  },
];

const categories = ['All', 'AI Ethics', 'Learning', 'Automation', 'Innovation'];

export default function ThoughtsPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Parallax Transforms (disabled if reduced motion)
  const floatingIdeasY = useTransform(scrollY, [0, 1000], shouldReduceMotion ? [0, 0] : [0, -300]);
  const backgroundY = useTransform(scrollY, [0, 1000], shouldReduceMotion ? [0, 0] : [0, -500]);
  const titleY = useTransform(scrollY, [0, 500], shouldReduceMotion ? [0, 0] : [0, -100]);
  const titleScale = useTransform(scrollY, [0, 300], [1, shouldReduceMotion ? 1 : 0.95]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const letters = ["T", "h", "o", "u", "g", "h", "t", "s"];

  return (
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none z-0 will-change-transform">
        <AnimatedGradientMesh />
      </motion.div>
      {!shouldReduceMotion && <SynapticNetwork />}
      {!shouldReduceMotion && <MagneticCursor />}
      <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />

      {/* Floating Ideas Background */}
      <motion.div style={{ y: floatingIdeasY }} className="absolute inset-0 pointer-events-none z-0 will-change-transform">
        <FloatingIdeas />
      </motion.div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ y: titleY }}
          className="text-center mb-20 will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-accent-cyan/20 mb-6">
            <BookOpen className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-muted">Reflections & Insights</span>
          </div>

          <LiquidGlassTitle />

          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            Exploring AI, innovation, and the intersection of technology with humanity
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
          role="navigation"
          aria-label="Article categories"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-label={`Filter by ${category}`}
              aria-pressed={activeCategory === category}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${activeCategory === category
                ? 'text-cyan-300'
                : 'bg-glass border border-overlay-medium text-muted hover:border-accent-cyan/40 hover:text-accent-cyan'
                }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="categoryBlob"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          ref={containerRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.12 } }
          }}
          className="space-y-8 max-w-4xl mx-auto"
        >
          {thoughts.map((thought, index) => (
            <motion.article
              key={thought.slug}
              variants={{
                hidden: { opacity: 0, ...(shouldReduceMotion ? {} : { y: 60, scale: 0.95 }) },
                visible: { opacity: 1, ...(shouldReduceMotion ? {} : { y: 0, scale: 1 }) }
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className="group"
              aria-labelledby={`article-title-${thought.slug}`}
            >
              <Link
                href={`/thoughts/${thought.slug}`}
                className="focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-4 rounded-3xl block"
              >
                <TiltCard>
                  <PremiumBox variant="glass-enhanced" hover={false}>
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-slate-300">
                      <motion.span
                        whileHover={{
                          scale: 1.08,
                          rotate: 2,
                          borderColor: 'rgba(6,182,212,0.4)',
                          backgroundColor: 'rgba(6,182,212,0.18)',
                          boxShadow: '0 0 12px rgba(6,182,212,0.3)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                      >
                        {thought.category}
                      </motion.span>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{thought.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{thought.readTime}</span>
                      </div>
                    </div>

                    <h2
                      id={`article-title-${thought.slug}`}
                      className="text-2xl md:text-3xl font-heading font-bold mb-4 text-slate-100 group-hover:text-gradient-heading transition-all duration-300"
                    >
                      {thought.title}
                    </h2>

                    <p className="text-slate-300 leading-relaxed mb-6">
                      {thought.excerpt}
                    </p>

                    <MagneticButton />
                  </PremiumBox>
                </TiltCard>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <PremiumBox variant="large" className="max-w-2xl mx-auto text-center" hover={false}>
            <Sparkles className="w-8 h-8 text-accent-cyan mx-auto mb-4" />
            <p className="text-lg text-slate-300 leading-relaxed">
              More thoughts coming soon. Subscribe to stay updated on my journey exploring AI, innovation, and the future of intelligent systems.
            </p>
          </PremiumBox>
        </motion.div>
      </div>
    </main >
  );
}
