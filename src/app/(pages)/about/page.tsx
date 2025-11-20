'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import { Sparkles, Heart, Lightbulb, Target, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { PremiumBox } from '@/components/ui/PremiumBox';

const values = [
  { icon: Sparkles, title: 'Curiosity', description: 'Always exploring how intelligence works in humans and machines' },
  { icon: Heart, title: 'Empathy', description: 'Building technology that feels human and serves people' },
  { icon: Lightbulb, title: 'Innovation', description: 'Blending ideas, tools, and logic to create something new' },
  { icon: Target, title: 'Purpose', description: 'Every project exists to make life better, not just smarter' },
];

const journey = [
  { phase: 'The Spark', story: 'It started with a question: How can machines think, learn, and understand like humans? That curiosity became my compass.' },
  { phase: 'The Journey', story: 'From Python basics to neural networks, I explored AI through experiments, failures, and breakthroughs—learning that intelligence is built, not given.' },
  { phase: 'The Purpose', story: 'I realized AI isn\'t just technology—it\'s a reflection of how we think and dream. My mission: create systems that enhance creativity and empower people.' },
  { phase: 'The Vision', story: 'Building AI startups that combine innovation with impact—tools that don\'t just automate work, but amplify human potential.' },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-accent-cyan/20 mb-6">
            <Rocket className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-muted">My Story</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            Building Intelligence with Empathy
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            An 18-year-old AI innovator exploring how data, design, and empathy can shape a better future
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <PremiumBox variant="large" className="p-2" hover={false}>
              <Image
                src="/images/about/Piyush.png"
                alt="Piyush - AI Innovator"
                width={600}
                height={600}
                className="rounded-2xl w-full h-auto"
                priority
              />
            </PremiumBox>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-cyan/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent-lavender/20 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Hi, I'm <span className="text-gradient">Piyush</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              A young AI & Data Science learner exploring how intelligence, design, and empathy can shape a better future. My journey began with curiosity about how machines think—and evolved into a mission to build meaningful, human-centered AI systems.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              I don't just study AI—I explore how intelligent systems can solve real-world problems and improve lives. From automation to creative intelligence, I'm fascinated by the intersection of logic and emotion.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              My long-term vision? To build AI-driven startups that focus on ethical automation, creative intelligence, and social impact—products that don't just work smart, but feel right.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">My Journey</h2>
          <p className="text-center text-muted mb-16 max-w-2xl mx-auto">
            From curiosity to creation—the path that shaped my vision
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {journey.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
              >
                <div className="glass-premium rounded-2xl p-8 h-full hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/30 group-hover:scale-150 transition-transform" />
                      <h3 className="text-xl font-heading font-semibold text-gradient-heading">{item.phase}</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item.story}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">Core Values</h2>
          <p className="text-center text-muted mb-16 max-w-2xl mx-auto">
            The principles that guide how I think, create, and build
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group"
              >
                <div className="glass-premium rounded-2xl p-8 text-center h-full hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-4 mx-auto mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-full h-full text-slate-900" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3 text-slate-100">{value.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <PremiumBox variant="large" className="max-w-3xl mx-auto text-center" hover={false}>
            <p className="text-xl md:text-2xl font-heading text-slate-300 italic leading-relaxed">
              "The future belongs to those who teach machines how to care."
            </p>
            <p className="text-sm text-slate-400 mt-4">— My philosophy on AI</p>
          </PremiumBox>
        </motion.div>
      </div>
    </main>
  );
}
