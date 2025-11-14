'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Zap, Globe, Users, Brain, Sparkles, ArrowRight, Target } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { FloatingGeometry } from '@/components/3d/FloatingGeometry';
import { NeuralNetwork } from '@/components/3d/NeuralNetwork';

const manifesto = [
  'AI should amplify human creativity, not replace it',
  'Technology must serve people with empathy and purpose',
  'Innovation without ethics is just clever engineering',
  'The future belongs to those who build with intention',
];

const beliefs = [
  {
    icon: Brain,
    title: 'Human-Centered AI',
    description: 'Building intelligent systems that understand context, emotion, and human needs—not just data patterns.',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Creating solutions that scale across borders, cultures, and communities to solve real-world problems.',
  },
  {
    icon: Zap,
    title: 'Ethical Innovation',
    description: 'Pioneering technology that respects privacy, promotes transparency, and operates with integrity.',
  },
  {
    icon: Users,
    title: 'Collaborative Future',
    description: 'Building ecosystems where humans and AI work together, each amplifying the other\'s strengths.',
  },
];

const futureProjects = [
  {
    title: 'AI for Education',
    description: 'Personalized learning systems that adapt to individual needs, making quality education accessible to everyone.',
    status: 'Concept',
    color: 'cyan',
  },
  {
    title: 'Creative Intelligence Tools',
    description: 'Platforms that enhance human creativity through AI—helping artists, writers, and makers push boundaries.',
    status: 'Research',
    color: 'lavender',
  },
  {
    title: 'Ethical Automation',
    description: 'Automation frameworks that prioritize human wellbeing, job transformation, and sustainable growth.',
    status: 'Exploration',
    color: 'teal',
  },
];

export default function VisionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main ref={containerRef} className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-lavender/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 w-full">
        <motion.div
          style={{ opacity, scale }}
          className="text-center mb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-accent-cyan/20 mb-6"
          >
            <Rocket className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-muted">The Future I'm Building</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 text-gradient-heading leading-tight"
          >
            Vision
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-muted max-w-4xl mx-auto leading-relaxed font-light"
          >
            Building AI startups that combine innovation with impact—creating intelligent systems that don't just work smart, but feel right
          </motion.p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Neural Vision</h2>
              <p className="text-muted">The interconnected network of ideas shaping the future</p>
            </motion.div>
            <NeuralNetwork />
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Target className="w-12 h-12 text-accent-cyan mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">My Manifesto</h2>
              <p className="text-muted">Core principles that guide every decision I make</p>
            </motion.div>

            <div className="space-y-6">
              {manifesto.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group"
                >
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-glass border border-overlay-medium backdrop-blur-xl hover:border-accent-cyan/40 transition-all duration-300">
                    <div className="w-2 h-2 rounded-full bg-accent-cyan mt-2 group-hover:scale-150 transition-transform" />
                    <p className="text-lg md:text-xl text-foreground leading-relaxed flex-1">{principle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Core Beliefs</h2>
            <p className="text-muted max-w-2xl mx-auto">The foundation of how I approach AI, innovation, and building for the future</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {beliefs.map((belief, index) => (
              <motion.div
                key={belief.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-glass rounded-3xl p-8 border border-overlay-medium backdrop-blur-xl hover:border-accent-cyan/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-cyan/20 transition-all duration-300">
                    <belief.icon className="w-8 h-8 text-accent-cyan" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-3">{belief.title}</h3>
                  <p className="text-muted leading-relaxed">{belief.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Floating Ideas</h2>
              <p className="text-muted">Concepts in motion, constantly evolving</p>
            </motion.div>
            <FloatingGeometry />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Sparkles className="w-12 h-12 text-accent-lavender mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Future Ventures</h2>
            <p className="text-muted max-w-2xl mx-auto">AI startup concepts I'm exploring—ideas that could shape tomorrow</p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {futureProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-glass rounded-3xl p-8 md:p-10 border border-overlay-medium backdrop-blur-xl hover:border-accent-cyan/40 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-heading font-bold">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-accent-${project.color}/10 text-accent-${project.color} border border-accent-${project.color}/20`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-muted leading-relaxed">{project.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-6 h-6 text-accent-cyan" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-block px-10 py-8 rounded-3xl bg-glass border border-overlay-medium backdrop-blur-xl max-w-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-lavender/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-heading text-foreground leading-relaxed mb-6">
                "The best way to predict the future is to <span className="text-gradient">build it</span>—with intelligence, empathy, and purpose."
              </p>
              <Link href="/connect">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neural text-white font-heading font-semibold shadow-glow hover:shadow-glow-soft transition-all duration-300"
                >
                  Let's Build Together
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
