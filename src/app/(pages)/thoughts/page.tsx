'use client';

import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Floating Ideas Component
function FloatingIdeas() {
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
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.12, 0.12, 0],
            y: [20, -20, -20, -60],
          }}
          transition={{
            duration: idea.duration,
            delay: idea.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: idea.x,
            top: idea.y,
          }}
          className="text-xl md:text-3xl font-heading font-bold text-accent-lavender/25 blur-[0.5px]"
        >
          {idea.text}
        </motion.div>
      ))}
    </div>
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
  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />
      
      {/* Floating Ideas Background */}
      <FloatingIdeas />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-accent-cyan/20 mb-6">
            <BookOpen className="w-4 h-4 text-accent-cyan" />
            <span className="text-sm text-muted">Reflections & Insights</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-gradient-heading">
            Thoughts
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl mx-auto leading-relaxed">
            Exploring AI, innovation, and the intersection of technology with humanity
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                index === 0
                  ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/40'
                  : 'bg-glass border border-overlay-medium text-muted hover:border-accent-cyan/40 hover:text-accent-cyan'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {thoughts.map((thought, index) => (
            <motion.article
              key={thought.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Link href={`/thoughts/${thought.slug}`}>
                <div className="bg-glass rounded-3xl p-8 md:p-10 border border-overlay-medium backdrop-blur-xl hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted">
                      <span className="px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                        {thought.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{thought.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{thought.readTime}</span>
                      </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 group-hover:text-gradient transition-all duration-300">
                      {thought.title}
                    </h2>

                    <p className="text-muted leading-relaxed mb-6">
                      {thought.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-accent-cyan font-medium group-hover:gap-4 transition-all duration-300">
                      <span>Read more</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block px-8 py-6 rounded-3xl bg-glass border border-overlay-medium backdrop-blur-xl max-w-2xl">
            <Sparkles className="w-8 h-8 text-accent-cyan mx-auto mb-4" />
            <p className="text-lg text-muted leading-relaxed">
              More thoughts coming soon. Subscribe to stay updated on my journey exploring AI, innovation, and the future of intelligent systems.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
