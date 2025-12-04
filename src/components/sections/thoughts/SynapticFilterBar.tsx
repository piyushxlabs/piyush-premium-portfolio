'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

interface SynapticFilterBarProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

const MagneticPill = ({
    children,
    isActive,
    onClick
}: {
    children: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.2, y: y * 0.2 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            className={`
        relative px-6 py-2 rounded-full text-sm font-medium tracking-wide
        transition-colors duration-300
        ${isActive ? 'text-cyan-950' : 'text-slate-400 hover:text-cyan-300'}
      `}
        >
            {/* Background Layer */}
            {isActive && (
                <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-cyan-400 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}

            {/* Glow Effect for Active */}
            {isActive && (
                <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-cyan-400/50 blur-md rounded-full z-[-1]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
            )}

            {/* Border for Inactive */}
            {!isActive && (
                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-cyan-500/30 transition-colors" />
            )}

            {/* Text Content */}
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export const SynapticFilterBar = ({ categories, activeCategory, onSelect }: SynapticFilterBarProps) => {
    return (
        <div className="relative z-20 flex flex-wrap justify-center gap-4 py-12">
            <AnimatePresence>
                {categories.map((category) => (
                    <MagneticPill
                        key={category}
                        isActive={activeCategory === category}
                        onClick={() => onSelect(category)}
                    >
                        {category}
                    </MagneticPill>
                ))}
            </AnimatePresence>
        </div>
    );
};
