'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import { Sparkles, Heart, Lightbulb, Target, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

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
            <div className="relative rounded-3xl overflow-hidden bg-glass border border-overlay-medium p-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 via-transparent to-accent-lavender/20 animate-pulse-glow" />
              <Image
                src="/images/about/Piyush.png"
                alt="Piyush - AI Innovator"
                width={600}
                height={600}
                className="relative z-10 rounded-2xl w-full h-auto"
                priority
              />
            </div>
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
                className="bg-glass rounded-2xl p-8 border border-overlay-medium backdrop-blur-xl hover:border-accent-cyan/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent-cyan group-hover:scale-150 transition-transform" />
                  <h3 className="text-xl font-heading font-semibold text-gradient">{item.phase}</h3>
                </div>
                <p className="text-muted leading-relaxed">{item.story}</p>
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
                whileHover={{ y: -8 }}
                className="bg-glass rounded-2xl p-6 border border-overlay-medium backdrop-blur-xl text-center group hover:border-accent-cyan/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-accent-cyan/20 transition-all duration-300">
                  <value.icon className="w-7 h-7 text-accent-cyan" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{value.description}</p>
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
          <div className="inline-block px-8 py-6 rounded-3xl bg-glass border border-overlay-medium backdrop-blur-xl max-w-3xl">
            <p className="text-xl md:text-2xl font-heading text-muted italic leading-relaxed">
              "The future belongs to those who teach machines how to care."
            </p>
            <p className="text-sm text-muted/60 mt-4">— My philosophy on AI</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
