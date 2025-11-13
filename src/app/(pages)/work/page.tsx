'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, ArrowRight, ExternalLink, Github, Sparkles, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

const projects = [
  {
    title: 'AI-Powered Content Generator',
    category: 'AI/ML',
    description: 'Intelligent system that generates contextual, human-like content using advanced NLP models—helping creators overcome writer\'s block.',
    impact: '10K+ users, 95% satisfaction',
    tech: ['GPT-4', 'Python', 'FastAPI', 'React'],
    image: '/images/projects/project-1-cover.jpg',
    color: 'cyan',
    links: { demo: '#', github: '#' },
  },
  {
    title: 'Predictive Analytics Dashboard',
    category: 'Data Science',
    description: 'Real-time data visualization platform that predicts trends and patterns—transforming raw data into actionable insights.',
    impact: '40% faster decision-making',
    tech: ['Python', 'Pandas', 'D3.js', 'PostgreSQL'],
    image: '/images/projects/project-1-mockup.png',
    color: 'lavender',
    links: { demo: '#', github: '#' },
  },
  {
    title: 'Smart Automation Workflow',
    category: 'Automation',
    description: 'Intelligent automation system that streamlines repetitive tasks—saving hours of manual work through adaptive learning.',
    impact: '70% time reduction',
    tech: ['Python', 'Selenium', 'Airflow', 'Docker'],
    image: '/images/projects/project-1-cover.jpg',
    color: 'teal',
    links: { demo: '#', github: '#' },
  },
];

const process = [
  { step: 'Discover', description: 'Understanding the problem, user needs, and constraints' },
  { step: 'Design', description: 'Architecting solutions with empathy and technical precision' },
  { step: 'Develop', description: 'Building with clean code, testing, and iteration' },
  { step: 'Deploy', description: 'Launching with impact measurement and continuous improvement' },
];

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);

  return (
    <main ref={containerRef} className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-lavender/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          style={{ opacity }}
          className="text-center mb-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-accent-cyan/20 mb-6"
          >
            <Briefcase className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-muted">Selected Projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 text-gradient-heading leading-tight"
          >
            My Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed"
          >
            Building intelligent systems that solve real problems—where innovation meets impact
          </motion.p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className={`relative rounded-3xl overflow-hidden bg-glass border border-overlay-medium ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-lavender/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="aspect-video bg-overlay-light flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-accent-cyan/40" />
                    </div>
                  </motion.div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium bg-accent-${project.color}/10 text-accent-${project.color} border border-accent-${project.color}/20 mb-4`}>
                        {project.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 group-hover:text-gradient transition-all duration-300">
                        {project.title}
                      </h2>
                      <p className="text-lg text-muted leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 text-accent-cyan font-medium mb-6">
                        <Target className="w-5 h-5" />
                        <span>{project.impact}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-full bg-overlay-light text-sm text-muted border border-overlay-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <motion.a
                          href={project.links.demo}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neural text-white font-medium shadow-glow hover:shadow-glow-soft transition-all duration-300"
                        >
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                          href={project.links.github}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-glass border border-overlay-medium text-foreground font-medium hover:border-accent-cyan/40 transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Zap className="w-12 h-12 text-accent-lavender mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">My Process</h2>
            <p className="text-muted max-w-2xl mx-auto">How I transform ideas into impactful solutions</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-glass rounded-2xl p-6 border border-overlay-medium backdrop-blur-xl hover:border-accent-cyan/40 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mx-auto mb-4 text-accent-cyan font-heading font-bold group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.step}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
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
                Have a project in mind? Let's create something <span className="text-gradient">extraordinary</span> together.
              </p>
              <Link href="/connect">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neural text-white font-heading font-semibold shadow-glow hover:shadow-glow-soft transition-all duration-300"
                >
                  Start a Conversation
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
