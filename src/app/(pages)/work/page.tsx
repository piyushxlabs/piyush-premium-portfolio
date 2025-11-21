'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, ArrowRight, ExternalLink, Github, Sparkles, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { PremiumBox } from '@/components/ui/PremiumBox';
// import { InteractiveModel } from '@/components/3d/InteractiveModel';

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

      <div className="container mx-auto px-6 max-w-6xl relative z-10 w-full">
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
          {/* <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Interactive Portfolio</h2>
              <p className="text-muted">Explore my work through interactive 3D visualization</p>
            </motion.div>
            <InteractiveModel />
          </div> */}

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
                  <PremiumBox
                    variant="large"
                    className={`aspect-video ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                  >
                    <div className="aspect-video bg-gradient-to-br from-accent-cyan/10 to-accent-lavender/10 flex items-center justify-center rounded-2xl">
                      <Sparkles className="w-16 h-16 text-accent-cyan/60" />
                    </div>
                  </PremiumBox>

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
                          className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-lavender text-background font-heading font-semibold shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition-all duration-300 overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          <span className="relative z-10">View Project</span>
                          <ExternalLink className="w-4 h-4 relative z-10" />
                        </motion.a>
                        <motion.a
                          href={project.links.github}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-glass backdrop-blur-xl border-2 border-overlay-medium text-foreground font-heading font-semibold hover:border-accent-cyan/60 hover:bg-glass-heavy hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
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
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
              >
                <div className="glass-premium rounded-2xl p-8 text-center h-full hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-slate-900 font-heading font-bold text-xl">{index + 1}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-3 text-slate-100">{item.step}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
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
          <PremiumBox variant="large" className="max-w-3xl mx-auto text-center" hover={false}>
            <p className="text-2xl md:text-3xl font-heading text-slate-100 leading-relaxed mb-6">
              Have a project in mind? Let's create something <span className="text-gradient-heading">extraordinary</span> together.
            </p>
            <Link href="/connect">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-accent-cyan via-accent-lavender to-accent-cyan bg-[length:200%_100%] text-background font-heading font-bold shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:bg-[position:100%_0] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Start a Conversation</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.button>
            </Link>
          </PremiumBox>
        </motion.section>
      </div>
    </main>
  );
}
