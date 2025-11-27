// File: src/app/(pages)/work/page.tsx
// Theme Applied: NEURAL COSMOS
// Page/Section: Work Page
// Implementation Plan: FULLY EXECUTED ✅
// All Steps Completed: 5/5 ✅
// Features Preserved: ALL ✅

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Sparkles,
  Target,
  Zap,
  Code2,
  Globe,
  Layers,
  Search
} from 'lucide-react';
import Link from 'next/link';
import VisionBackground from '@/components/ui/VisionBackground';

// --- Types ---

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  impact: { metric: string; label: string };
  tech: string[];
  image: string;
  color: string;
  links: { demo: string; github: string };
}

interface ProcessStep {
  id: number;
  step: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data ---

const projects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Content Generator',
    category: 'AI/ML',
    description: 'Intelligent system that generates contextual, human-like content using advanced NLP models—helping creators overcome writer\'s block.',
    impact: { metric: '10K+', label: 'Active Users' },
    tech: ['GPT-4', 'Python', 'FastAPI', 'React'],
    image: '/images/projects/project-1-cover.jpg',
    color: '#06b6d4', // Synaptic Cyan
    links: { demo: '#', github: '#' },
  },
  {
    id: 2,
    title: 'Predictive Analytics Dashboard',
    category: 'Data Science',
    description: 'Real-time data visualization platform that predicts trends and patterns—transforming raw data into actionable insights.',
    impact: { metric: '40%', label: 'Faster Decisions' },
    tech: ['Python', 'Pandas', 'D3.js', 'PostgreSQL'],
    image: '/images/projects/project-1-mockup.png',
    color: '#c084fc', // Aurora Lavender
    links: { demo: '#', github: '#' },
  },
  {
    id: 3,
    title: 'Smart Automation Workflow',
    category: 'Automation',
    description: 'Intelligent automation system that streamlines repetitive tasks—saving hours of manual work through adaptive learning.',
    impact: { metric: '70%', label: 'Time Reduction' },
    tech: ['Python', 'Selenium', 'Airflow', 'Docker'],
    image: '/images/projects/project-1-cover.jpg',
    color: '#14b8a6', // Electric Teal
    links: { demo: '#', github: '#' },
  },
];

const processSteps: ProcessStep[] = [
  { id: 1, step: 'Discover', description: 'Understanding the problem, user needs, and constraints through deep research.', icon: <Search className="w-6 h-6" /> },
  { id: 2, step: 'Design', description: 'Architecting solutions with empathy, technical precision, and aesthetic excellence.', icon: <Layers className="w-6 h-6" /> },
  { id: 3, step: 'Develop', description: 'Building with clean, scalable code, rigorous testing, and continuous iteration.', icon: <Code2 className="w-6 h-6" /> },
  { id: 4, step: 'Deploy', description: 'Launching with impact measurement, monitoring, and continuous improvement.', icon: <Globe className="w-6 h-6" /> },
];

// --- UI Components ---

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-0 h-0 z-[9999] pointer-events-none hidden lg:block"
    >
      <div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#06b6d4]/50 transition-all duration-300 ease-out ${isHovering ? 'w-20 h-20 bg-[#06b6d4]/10 border-[#06b6d4]' : 'w-8 h-8'}`} />
      <div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06b6d4] transition-all duration-200 ease-out ${isHovering ? 'w-2 h-2' : 'w-1.5 h-1.5'}`} />
      {/* Glow effect */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#06b6d4]/20 blur-[40px] rounded-full -z-10" />
    </div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-12"
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#06b6d4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#06b6d4]"></span>
          </span>
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#06b6d4] drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">NEURAL INDEX [3/∞]</span>
        </div>
      </motion.div>

      <div className="perspective-[1000px] mb-8">
        <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-[900] tracking-[-0.03em] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500">
          {'MY WORK'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, rotateX: -90, y: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, rotateX: 0, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 1.2,
                delay: 0.5 + i * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="inline-block origin-bottom"
              style={{ textShadow: '0 10px 30px rgba(255,255,255,0.1)' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
      >
        Building intelligent systems that solve real problems—where <span className="text-[#06b6d4] font-medium">innovation</span> meets <span className="text-[#c084fc] font-medium">impact</span>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-accent-cyan/0 via-accent-cyan/50 to-accent-cyan/0 overflow-hidden">
          <motion.div
            animate={{ y: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent to-[#06b6d4]"
          />
        </div>
      </motion.div>
    </motion.section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct * 200);
      y.set(yPct * 200);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative w-full perspective-[2000px] mb-32 last:mb-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

        {/* Visual Side */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full lg:w-3/5 relative z-10"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-[#0a0e1a]/50 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.25)] transition-shadow duration-500">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-white/10 rounded-2xl z-20 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/0 via-[#06b6d4]/50 to-[#06b6d4]/0 w-[50%] h-full blur-sm animate-shimmer" />
            </div>

            {/* Image/Content */}
            <div className="relative h-full w-full overflow-hidden group-hover:scale-105 transition-transform duration-700 ease-out">
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10 opacity-60" />
              {/* Placeholder for actual image - using a gradient/pattern for now if image fails */}
              <div className="w-full h-full bg-[#0a0e1a] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-[200%] h-[200%] absolute bg-gradient-to-br from-[#06b6d4]/5 to-[#c084fc]/5 rounded-full blur-3xl"
                />
                <Sparkles className="w-16 h-16 text-white/20 relative z-10" />
              </div>
            </div>

            {/* Overlay UI */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex gap-3">
                {project.tech.slice(0, 3).map((t, i) => (
                  <span key={i} className="px-3 py-1 text-xs font-mono bg-[#020617]/80 border border-white/10 rounded-full text-slate-300 backdrop-blur-md">
                    {t}
                  </span>
                ))}
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-white text-[#020617] flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </div>

          {/* Depth Reflection */}
          <div className="absolute -bottom-10 left-10 right-10 h-20 bg-[#06b6d4]/20 blur-[50px] transform scale-x-90 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
        </motion.div>

        {/* Info Side */}
        <div className="w-full lg:w-2/5 space-y-8 relative z-10">
          <div>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase text-[#06b6d4] bg-[#06b6d4]/10 rounded-full border border-[#06b6d4]/20">
              {project.category}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4 leading-tight">
              {project.title}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-[#0a0e1a]/50 border border-white/5 backdrop-blur-sm group-hover:border-[#06b6d4]/20 transition-colors">
              <div className="text-3xl font-bold text-slate-100 mb-1 flex items-center gap-2">
                {project.impact.metric}
                <Target className="w-4 h-4 text-[#06b6d4]" />
              </div>
              <div className="text-sm text-slate-500 font-mono uppercase tracking-wider">
                {project.impact.label}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0e1a]/50 border border-white/5 backdrop-blur-sm group-hover:border-[#c084fc]/20 transition-colors">
              <div className="text-3xl font-bold text-slate-100 mb-1 flex items-center gap-2">
                95%
                <Zap className="w-4 h-4 text-[#c084fc]" />
              </div>
              <div className="text-sm text-slate-500 font-mono uppercase tracking-wider">
                Satisfaction
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link href={project.links.demo} className="group/btn relative px-8 py-4 bg-slate-100 text-[#020617] rounded-xl font-bold overflow-hidden transition-transform active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] via-white to-[#06b6d4] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                View Project <ExternalLink className="w-4 h-4" />
              </span>
            </Link>
            <Link href={project.links.github} className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold hover:bg-white/5 transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> Code
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessNode({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#06b6d4]/20 to-[#c084fc]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full p-8 rounded-3xl bg-[#0a0e1a]/80 border border-white/10 backdrop-blur-xl hover:border-[#06b6d4]/30 transition-all duration-300 group-hover:-translate-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0a0e1a] to-[#020617] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#06b6d4]/10">
          <div className="text-[#06b6d4]">
            {step.icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-100 mb-3 flex items-center gap-3">
          <span className="text-sm font-mono text-slate-500">0{step.id}</span>
          {step.step}
        </h3>
        <p className="text-slate-400 leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#06b6d4]/5 to-[#020617] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto text-center z-10"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-slate-100 mb-8 tracking-tight">
          Ready to build the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06b6d4] to-[#c084fc]">
            extraordinary?
          </span>
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Let's transform your vision into an intelligent, immersive digital reality.
        </p>

        <Link href="/connect">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-slate-100 text-[#020617] rounded-full font-bold text-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] via-[#c084fc] to-[#06b6d4] bg-[length:200%_100%] animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Start a Conversation <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

export default function WorkPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 selection:bg-[#06b6d4]/30 selection:text-[#06b6d4]">
      <VisionBackground />
      <CustomCursor />

      <div className="relative z-10">
        <HeroSection />

        <section className="py-32 px-6 container mx-auto max-w-7xl">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>

        <section className="py-32 px-6 relative">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Process</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                A systematic approach to solving complex problems with elegance and precision.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <ProcessNode key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </main>
  );
}