'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Brain, Cpu, Database, Layers, Sparkles } from 'lucide-react';
import React, { useRef } from 'react';
import { useSound } from '@/components/sections/thoughts/AmbientSound';

interface QuantumCardProps {
    thought: {
        id: string;
        title: string;
        excerpt: string;
        date: string;
        readTime: string;
        category: string;
        slug: string;
        featured?: boolean;
    };
    className?: string;
    onHover?: (slug: string | null) => void;
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'AI Ethics': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
        case 'Learning': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
        case 'Automation': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
        case 'Design': return 'text-pink-400 border-pink-500/30 bg-pink-500/10';
        case 'Technology': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
        default: return 'text-slate-400 border-slate-500/30 bg-slate-500/10';
    }
};

const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'AI Ethics': return <Brain className="w-6 h-6" />;
        case 'Learning': return <Database className="w-6 h-6" />;
        case 'Automation': return <Cpu className="w-6 h-6" />;
        case 'Design': return <Layers className="w-6 h-6" />;
        default: return <Sparkles className="w-6 h-6" />;
    }
};

export const QuantumCard = React.forwardRef<HTMLDivElement, QuantumCardProps>(
    ({ thought, className, onHover }, ref) => {
        const { playHover } = useSound();
        const localRef = useRef<HTMLDivElement>(null);

        React.useImperativeHandle(ref, () => localRef.current!);

        // Motion Values for Tilt
        const x = useMotionValue(0);
        const y = useMotionValue(0);

        const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
        const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

        const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
        const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            if (!localRef.current) return;
            const rect = localRef.current.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseXPos = e.clientX - rect.left;
            const mouseYPos = e.clientY - rect.top;
            const xPct = mouseXPos / width - 0.5;
            const yPct = mouseYPos / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
            if (onHover) onHover(null);
        };

        const handleMouseEnter = () => {
            playHover();
            if (onHover) onHover(thought.slug);
        };

        const categoryStyle = getCategoryColor(thought.category);

        return (
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                className={`relative group perspective-1000 ${className}`}
                style={{ perspective: 1000 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <motion.div
                    ref={localRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: 'preserve-3d',
                    }}
                    className="relative h-full rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                >
                    {/* Holographic Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Inner Content */}
                    <div className="relative z-10 p-8 h-full flex flex-col" style={{ transform: 'translateZ(20px)' }}>

                        {/* Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-2 rounded-xl border backdrop-blur-md ${categoryStyle}`}>
                                {getCategoryIcon(thought.category)}
                            </div>
                            <span className="text-xs font-mono text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-white/5">
                                {thought.date}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-200 transition-colors" style={{ transform: 'translateZ(10px)' }}>
                            {thought.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-slate-400 leading-relaxed mb-8 flex-grow line-clamp-3">
                            {thought.excerpt}
                        </p>

                        {/* Footer / Metadata Reveal */}
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                                <span>{thought.readTime}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-700" />
                                <span>{thought.category}</span>
                            </div>

                            <motion.button
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-2 text-sm font-medium text-cyan-400"
                            >
                                Read <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Decorative Grid Overlay (Subtle) */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
                </motion.div>
            </motion.div>
        );
    }
);

QuantumCard.displayName = 'QuantumCard';
