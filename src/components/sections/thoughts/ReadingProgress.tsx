'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export const ReadingProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [windowHeight, setWindowHeight] = useState(0);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Generate DNA Helix points
    const points = 20;
    const amplitude = 10;

    const pathD1 = Array.from({ length: points + 1 }).map((_, i) => {
        const y = (i / points) * windowHeight;
        const x = Math.sin((i / points) * Math.PI * 4) * amplitude + 20;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const pathD2 = Array.from({ length: points + 1 }).map((_, i) => {
        const y = (i / points) * windowHeight;
        const x = Math.sin((i / points) * Math.PI * 4 + Math.PI) * amplitude + 20;
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
        <div className="fixed right-8 top-0 bottom-0 w-12 pointer-events-none z-50 hidden lg:block">
            <svg className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity="0" />
                        <stop offset="50%" stopColor="cyan" stopOpacity="1" />
                        <stop offset="100%" stopColor="var(--color-accent-purple)" stopOpacity="0" />
                    </linearGradient>
                    <filter id="dna-glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background Strands (Dim) */}
                <path d={pathD1} stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                <path d={pathD2} stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />

                {/* Active Strands (Glowing) */}
                <motion.path
                    d={pathD1}
                    stroke="url(#dna-gradient)"
                    strokeWidth="2"
                    fill="none"
                    style={{ pathLength: scaleY }}
                    filter="url(#dna-glow)"
                    strokeLinecap="round"
                />
                <motion.path
                    d={pathD2}
                    stroke="url(#dna-gradient)"
                    strokeWidth="2"
                    fill="none"
                    style={{ pathLength: scaleY }}
                    filter="url(#dna-glow)"
                    strokeLinecap="round"
                />

                {/* Connection Rungs */}
                {Array.from({ length: points }).map((_, i) => {
                    const y = (i / points) * windowHeight;
                    const x1 = Math.sin((i / points) * Math.PI * 4) * amplitude + 20;
                    const x2 = Math.sin((i / points) * Math.PI * 4 + Math.PI) * amplitude + 20;

                    return (
                        <motion.line
                            key={i}
                            x1={x1}
                            y1={y}
                            x2={x2}
                            y2={y}
                            stroke="cyan"
                            strokeWidth="1"
                            strokeOpacity={useTransform(scrollYProgress, [i / points - 0.1, i / points + 0.1], [0.1, 1])}
                        />
                    );
                })}
            </svg>
        </div>
    );
};
