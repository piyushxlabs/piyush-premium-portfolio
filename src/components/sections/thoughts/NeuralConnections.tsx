'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NeuralConnectionsProps {
    thoughts: any[];
    hoveredSlug: string | null;
    cardRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

export const NeuralConnections = ({ thoughts, hoveredSlug, cardRefs }: NeuralConnectionsProps) => {
    const [lines, setLines] = useState<{ id: string; x1: number; y1: number; x2: number; y2: number }[]>([]);

    useEffect(() => {
        if (!hoveredSlug) {
            setLines([]);
            return;
        }

        const hoveredCard = cardRefs.current[hoveredSlug];
        if (!hoveredCard) return;

        const hoveredThought = thoughts.find(t => t.slug === hoveredSlug);
        if (!hoveredThought) return;

        const relatedThoughts = thoughts.filter(t => t.category === hoveredThought.category && t.slug !== hoveredSlug);

        // Get container offset (assuming this component is absolute inset-0 in the relative grid container)
        // Actually, we need to be careful about offsets. 
        // Best to use offsetLeft/Top if in same container.

        const newLines: any[] = [];
        const startRect = hoveredCard.getBoundingClientRect();

        // We need the parent container to calculate relative positions if we use getBoundingClientRect
        // But since we are inside the grid container (relative), we can use offsetLeft/Top if the cards are direct children.
        // But cards are wrapped in motion.div.

        // Let's use getBoundingClientRect and subtract the container's rect.
        const container = hoveredCard.offsetParent as HTMLElement;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();

        const startX = startRect.left - containerRect.left + startRect.width / 2;
        const startY = startRect.top - containerRect.top + startRect.height / 2;

        relatedThoughts.forEach(t => {
            const targetCard = cardRefs.current[t.slug];
            if (targetCard) {
                const targetRect = targetCard.getBoundingClientRect();
                const endX = targetRect.left - containerRect.left + targetRect.width / 2;
                const endY = targetRect.top - containerRect.top + targetRect.height / 2;

                newLines.push({
                    id: `${hoveredSlug}-${t.slug}`,
                    x1: startX,
                    y1: startY,
                    x2: endX,
                    y2: endY
                });
            }
        });

        setLines(newLines);

    }, [hoveredSlug, thoughts, cardRefs]);

    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            <AnimatePresence>
                {lines.map(line => (
                    <motion.line
                        key={line.id}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="url(#neural-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        transition={{ duration: 0.4, ease: "circOut" }}
                    />
                ))}
            </AnimatePresence>
            <defs>
                <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity="0" />
                    <stop offset="50%" stopColor="cyan" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--color-accent-cyan)" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
};
