'use client';

import { motion } from 'framer-motion';
import { Beaker, Code, Cpu, Sparkles, ArrowRight, Zap, GitBranch, Play } from 'lucide-react';
import Link from 'next/link';
import { ParticleField } from '@/components/3d/ParticleField';
// import { DataSphere } from '@/components/3d/DataSphere';

const experiments = [
  {
    title: 'Neural Style Transfer',
    description: 'Exploring artistic AI by blending content and style using deep learning—transforming images into unique visual expressions.',
    status: 'Active',
    tech: ['Python', 'TensorFlow', 'CNN'],
    icon: Cpu,
    color: 'cyan',
  },
  {
    title: 'Sentiment Analysis Engine',
    description: 'Building NLP models to understand human emotion in text—analyzing sentiment patterns across social media and reviews.',
    status: 'Research',
    tech: ['NLP', 'BERT', 'PyTorch'],
    icon: Sparkles,
    color: 'lavender',
  },
  {
    title: 'Automated Data Pipeline',
    description: 'Creating intelligent workflows that clean, transform, and visualize data automatically—making insights accessible.',
    status: 'Testing',
    tech: ['Python', 'Pandas', 'Airflow'],
    icon: GitBranch,
    color: 'teal',
  },
];

const principles = [
  'Experiment fearlessly, fail forward',
  'Build to learn, not just to finish',
  'Share knowledge openly',
  'Question assumptions constantly',
];

export default function LabPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent-lavender/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-accent-cyan/20 mb-6">
            <Beaker className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-muted">Experimental Playground</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            AI Lab
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            Where curiosity meets code—exploring AI through hands-on experiments, creative failures, and breakthrough discoveries
          </p>
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
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Particle Experiments</h2>
              <p className="text-muted">Thousands of data points in motion</p>
            </motion.div>
            <ParticleField />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Code className="w-12 h-12 text-accent-cyan mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Current Experiments</h2>
            <p className="text-muted max-w-2xl mx-auto">Active projects pushing the boundaries of what's possible with AI</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((experiment, index) => (
              <motion.div
                key={experiment.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-glass rounded-3xl p-8 border border-overlay-medium backdrop-blur-xl hover:border-accent-cyan/40 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-accent-${experiment.color}/10 border border-accent-${experiment.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <experiment.icon className={`w-7 h-7 text-accent-${experiment.color}`} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-accent-${experiment.color}/10 text-accent-${experiment.color} border border-accent-${experiment.color}/20`}>
                      {experiment.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold mb-3">{experiment.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mb-6">{experiment.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {experiment.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-overlay-light text-xs text-muted border border-overlay-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 text-accent-cyan text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <Play className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
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
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Data Visualization</h2>
              <p className="text-muted">Exploring data through interactive 3D spheres</p>
            </motion.div>
            {/* <DataSphere /> */}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Zap className="w-12 h-12 text-accent-lavender mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Lab Principles</h2>
            <p className="text-muted max-w-2xl mx-auto">The mindset that drives every experiment</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {principles.map((principle, index) => (
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
              <Sparkles className="w-10 h-10 text-accent-cyan mx-auto mb-4" />
              <p className="text-2xl md:text-3xl font-heading text-foreground leading-relaxed mb-6">
                "Every experiment is a step toward understanding—even the ones that fail teach us something profound."
              </p>
              <Link href="/connect">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neural text-white font-heading font-semibold shadow-glow hover:shadow-glow-soft transition-all duration-300"
                >
                  Collaborate on Experiments
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
