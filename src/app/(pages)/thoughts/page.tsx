'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { SynapticFilterBar } from '@/components/sections/thoughts/SynapticFilterBar';
import { QuantumCard } from '@/components/sections/thoughts/QuantumCard';
import { CortexHero } from '@/components/sections/thoughts/CortexHero';
import { NeuralConnections } from '@/components/sections/thoughts/NeuralConnections';
import { ReadingProgress } from '@/components/sections/thoughts/ReadingProgress';
import { SoundProvider } from '@/components/sections/thoughts/AmbientSound';

// --- DATA ---
const thoughts = [
  {
    id: '1',
    title: 'The Ethics of AI: Building Intelligence with Responsibility',
    excerpt: 'Exploring how we can create AI systems that not only solve problems but do so with empathy, transparency, and ethical consideration.',
    date: 'Dec 2024',
    readTime: '5 min read',
    category: 'AI Ethics',
    slug: 'ethics-of-ai',
    featured: true,
  },
  {
    id: '2',
    title: 'From Data to Insight: My Journey in Machine Learning',
    excerpt: 'Lessons learned from building ML models, understanding patterns, and discovering how data tells stories we never expected.',
    date: 'Nov 2024',
    readTime: '7 min read',
    category: 'Learning',
    slug: 'data-to-insight',
    featured: false,
  },
  {
    id: '3',
    title: 'Automation with Purpose: Beyond Efficiency',
    excerpt: 'Why automation should amplify human creativity rather than replace it—and how we can design systems that empower people.',
    date: 'Oct 2024',
    readTime: '6 min read',
    category: 'Automation',
    slug: 'automation-purpose',
    featured: false,
  },
  {
    id: '4',
    title: 'The Future of Interface Design',
    excerpt: 'Moving beyond screens: How spatial computing and neural interfaces will redefine how we interact with digital information.',
    date: 'Sep 2024',
    readTime: '8 min read',
    category: 'Design',
    slug: 'future-interface',
    featured: true,
  },
  {
    id: '5',
    title: 'Quantum Computing & AI',
    excerpt: 'A look at the intersection of quantum mechanics and artificial intelligence, and what it means for the next decade of computing.',
    date: 'Aug 2024',
    readTime: '10 min read',
    category: 'Technology',
    slug: 'quantum-ai',
    featured: false,
  },
];

// --- COMPONENTS ---

const NeuralBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    {/* Noise Grain */}
    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />

    {/* Radial Vignettes */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.15),transparent_70%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

    {/* Grid Lines */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
  </div>
);

export default function ThoughtsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const categories = ['All', 'AI Ethics', 'Learning', 'Automation', 'Design', 'Technology'];

  const filteredThoughts = activeCategory === 'All'
    ? thoughts
    : thoughts.filter(t => t.category === activeCategory);

  return (
    <SoundProvider>
      <main className="relative min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-cyan-500/30">
        <NeuralBackground />
        <ReadingProgress />

        <div className="container mx-auto px-4 pb-32">
          <CortexHero />

          <SynapticFilterBar
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          {/* Quantum Grid Layout */}
          <motion.div
            layout
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
          >
            <NeuralConnections
              thoughts={filteredThoughts}
              hoveredSlug={hoveredSlug}
              cardRefs={cardRefs}
            />

            <AnimatePresence mode='popLayout'>
              {filteredThoughts.map((thought) => (
                <QuantumCard
                  key={thought.id}
                  ref={(el) => { cardRefs.current[thought.slug] = el; }}
                  thought={thought}
                  className={thought.featured ? 'md:col-span-2 lg:col-span-2' : ''}
                  onHover={setHoveredSlug}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </SoundProvider>
  );
}
