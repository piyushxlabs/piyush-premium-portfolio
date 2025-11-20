'use client';

import { motion } from 'framer-motion';
import { Beaker, Code, Cpu, Sparkles, ArrowRight, Zap, GitBranch, Play } from 'lucide-react';
import Link from 'next/link';
// import { ParticleField } from '@/components/3d/ParticleField';
import { PremiumBox } from '@/components/ui/PremiumBox';
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
          {/* <div className="mb-20">
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
          </div> */}

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
              >
                <PremiumBox variant="large">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-4 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                      <experiment.icon className="w-full h-full text-slate-900" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-accent-${experiment.color}/10 text-accent-${experiment.color} border border-accent-${experiment.color}/20`}>
                      {experiment.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold mb-3 text-slate-100">{experiment.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{experiment.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {experiment.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 text-accent-cyan text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <Play className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </PremiumBox>
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
                <PremiumBox className="flex items-start gap-4" hover={false}>
                  <div className="w-2 h-2 rounded-full bg-accent-cyan mt-2 group-hover:scale-150 transition-transform" />
                  <p className="text-lg md:text-xl text-slate-100 leading-relaxed flex-1">{principle}</p>
                </PremiumBox>
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
            <Sparkles className="w-10 h-10 text-accent-cyan mx-auto mb-4" />
            <p className="text-2xl md:text-3xl font-heading text-slate-100 leading-relaxed mb-6">
              "Every experiment is a step toward understanding—even the ones that fail teach us something profound."
            </p>
            <Link href="/connect">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-accent-cyan via-accent-lavender to-accent-cyan bg-[length:200%_100%] text-background font-heading font-bold shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:bg-[position:100%_0] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">Collaborate on Experiments</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.button>
            </Link>
          </PremiumBox>
        </motion.section>
      </div>
    </main>
  );
}
