'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Sparkles, Heart, Lightbulb, Target } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { PremiumBox } from '@/components/ui/PremiumBox';

const values = [
  { 
    icon: Sparkles, 
    title: 'Curiosity', 
    description: 'Always exploring how intelligence works in humans and machines',
    expandedText: 'Asking questions, testing assumptions, and diving deep into how intelligence emerges—from neurons to neural networks.'
  },
  { 
    icon: Heart, 
    title: 'Empathy', 
    description: 'Building technology that feels human and serves people',
    expandedText: 'Technology should enhance human connection, not replace it. Every system I build considers the human experience first.'
  },
  { 
    icon: Lightbulb, 
    title: 'Innovation', 
    description: 'Blending ideas, tools, and logic to create something new',
    expandedText: 'Innovation happens at intersections—combining unexpected disciplines to create breakthrough solutions.'
  },
  { 
    icon: Target, 
    title: 'Purpose', 
    description: 'Every project exists to make life better, not just smarter',
    expandedText: 'Intelligence without purpose is just computation. I build systems that solve real problems for real people.'
  },
];

const journey = [
  { 
    phase: 'The Spark', 
    story: 'It started with a question: How can machines think, learn, and understand like humans? That curiosity became my compass.',
    color: 'cyan'
  },
  { 
    phase: 'The Journey', 
    story: 'From Python basics to neural networks, I explored AI through experiments, failures, and breakthroughs—learning that intelligence is built, not given.',
    color: 'purple'
  },
  { 
    phase: 'The Purpose', 
    story: 'I realized AI isn\'t just technology—it\'s a reflection of how we think and dream. My mission: create systems that enhance creativity and empower people.',
    color: 'blue'
  },
  { 
    phase: 'The Vision', 
    story: 'Building AI startups that combine innovation with impact—tools that don\'t just automate work, but amplify human potential.',
    color: 'violet'
  },
];

export default function AboutPage() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const toggleCardFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const aboutInView = useInView(aboutSectionRef, { once: true, amount: 0.3 });

  return (
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* ABOUT SECTION - Two Column with Progressive Reveal */}
        <div ref={aboutSectionRef} className="grid lg:grid-cols-[45%_55%] gap-16 md:gap-20 lg:gap-24 items-start mb-32 md:mb-48 pt-12">
          {/* Photo Card with Premium Effects */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-1 max-w-md lg:max-w-lg mx-auto lg:mx-0 lg:-ml-12"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              {/* Animated gradient border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-[2px] rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, #00E5FF, #B659FF, #00E5FF)',
                  backgroundSize: '200% 200%',
                }}
              />
              
              <div className="relative bg-[#1A1F35] rounded-3xl p-2 backdrop-blur-xl">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/images/about/Piyush.png"
                    alt="Piyush - AI Innovator"
                    width={600}
                    height={600}
                    className="rounded-2xl w-full h-auto"
                    priority
                  />
                </motion.div>

                {/* Corner accent badge */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/50"
                />
              </div>

              {/* Ambient glow effects */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent-cyan/20 rounded-full blur-3xl" />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent-lavender/20 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>

          {/* Text Content with Staggered Paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={aboutInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 order-2 lg:order-2 lg:pl-8 lg:pt-13"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6"
            >
              Hi, I'm <span className="text-gradient bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.3)' }}>Piyush</span>
            </motion.h2>

            {[
              "A young AI & Data Science learner exploring how intelligence, design, and empathy can shape a better future. My journey began with curiosity about how machines think—and evolved into a mission to build meaningful, human-centered AI systems.",
              "I don't just study AI—I explore how intelligent systems can solve real-world problems and improve lives. From automation to creative intelligence, I'm fascinated by the intersection of logic and emotion.",
              "My long-term vision? To build AI-driven startups that focus on ethical automation, creative intelligence, and social impact—products that don't just work smart, but feel right."
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-base md:text-lg text-muted leading-relaxed"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* MY JOURNEY - Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-32 md:mb-48"
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
            >
              My Journey
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted max-w-2xl mx-auto text-base md:text-lg"
            >
              From curiosity to creation—the path that shaped my vision
            </motion.p>
          </div>
          
          {/* Journey cards with connecting line */}
          <div className="relative">
            {/* Connection line - desktop only */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {journey.map((item, index) => (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="glass-premium rounded-2xl p-6 md:p-8 h-full hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden">
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div 
                          className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 shadow-lg shadow-cyan-500/30"
                          whileHover={{ scale: 1.5 }}
                          transition={{ duration: 0.3 }}
                        />
                        <h3 className="text-xl md:text-2xl font-heading font-semibold text-gradient-heading">
                          {item.phase}
                        </h3>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                        {item.story}
                      </p>
                    </div>

                    {/* Animated corner accent */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `radial-gradient(circle at top right, ${item.color === 'cyan' ? 'rgba(0,229,255,0.2)' : 'rgba(182,89,255,0.2)'}, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CORE VALUES - Interactive Grid with Flip Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-32 md:mb-48"
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4"
            >
              Core Values
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted max-w-2xl mx-auto text-base md:text-lg"
            >
              The principles that guide how I think, create, and build
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ perspective: 1000 }}
                className="group h-full"
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => toggleCardFlip(index)}
                  className="cursor-pointer h-full"
                >
                  <motion.div
                    animate={{ rotateY: flippedCards.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="relative h-full"
                  >
                    {/* Front of card */}
                    <div 
                      className="glass-premium rounded-2xl p-6 md:p-8 text-center h-full hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        <motion.div
                          animate={{ 
                            rotate: [0, 5, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-4 mx-auto mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300"
                        >
                          <value.icon className="w-full h-full text-slate-900" />
                        </motion.div>
                        <h3 className="font-heading font-semibold text-xl mb-3 text-slate-100">
                          {value.title}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {value.description}
                        </p>
                        <p className="text-xs text-accent-cyan/60 mt-4">Click to learn more</p>
                      </div>
                    </div>

                    {/* Back of card */}
                    <div 
                      className="glass-premium rounded-2xl p-6 md:p-8 text-center h-full absolute inset-0 flex items-center justify-center"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div>
                        <h3 className="font-heading font-semibold text-xl mb-4 text-gradient-heading">
                          {value.title}
                        </h3>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {value.expandedText}
                        </p>
                        <p className="text-xs text-accent-cyan/60 mt-4">Click to flip back</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* QUOTE SECTION - Cinematic Philosophy Moment */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="mt-32 md:mt-48 mb-20 relative"
        >
          {/* Spotlight effect */}
          <div className="absolute inset-0 bg-gradient-radial from-accent-cyan/10 via-transparent to-transparent blur-3xl" />
          
          <PremiumBox variant="large" className="max-w-4xl mx-auto text-center relative z-10" hover={false}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Animated quotation marks */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                className="text-6xl md:text-8xl text-accent-cyan/30 font-serif leading-none"
              >
                "
              </motion.span>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl lg:text-3xl font-heading text-slate-300 italic leading-relaxed my-6"
                style={{
                  letterSpacing: '0.02em',
                }}
              >
                The future belongs to those who teach machines how to care.
              </motion.p>
              
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
                className="text-6xl md:text-8xl text-accent-cyan/30 font-serif leading-none"
              >
                "
              </motion.span>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm text-slate-400 mt-6"
              >
                — My philosophy on AI
              </motion.p>
            </motion.div>
          </PremiumBox>
        </motion.div>
      </div>
    </main>
  );
}
