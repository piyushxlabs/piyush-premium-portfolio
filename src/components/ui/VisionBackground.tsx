'use client';

import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎨 UTILITY COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 🌌 Enhanced Geometric Particle Field
 * Renders mix of shapes with depth and parallax
 */
const ParticleField = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 80 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 8 + 3,
            duration: Math.random() * 30 + 20,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.4 + 0.1,
            shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
            rotation: Math.random() * 360,
            blur: Math.random() * 2,
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                        filter: `blur(${p.blur}px)`,
                    }}
                    animate={{
                        y: [0, -150, 0],
                        opacity: [p.opacity, p.opacity * 1.8, p.opacity],
                        rotate: [p.rotation, p.rotation + 360],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                >
                    {p.shape === 'circle' && (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/80 to-blue-600/80" />
                    )}
                    {p.shape === 'square' && (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400/60 to-pink-600/60" style={{ transform: `rotate(${p.rotation}deg)` }} />
                    )}
                    {p.shape === 'triangle' && (
                        <div
                            className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-cyan-500/70"
                            style={{ transform: `rotate(${p.rotation}deg)` }}
                        />
                    )}
                </motion.div>
            ))}
        </div>
    );
};

/**
 * 🌫️ Cinematic Fog Layer
 */
const FogLayer = ({
    color = "from-blue-500/20",
    delay = 0,
    duration = 25,
    direction = 'horizontal'
}: {
    color?: string;
    delay?: number;
    duration?: number;
    direction?: 'horizontal' | 'vertical' | 'diagonal';
}) => {
    const movement = direction === 'horizontal'
        ? { x: ['-30%', '30%', '-30%'], y: ['-5%', '5%', '-5%'] }
        : direction === 'vertical'
            ? { x: ['-5%', '5%', '-5%'], y: ['-30%', '30%', '-30%'] }
            : { x: ['-20%', '20%', '-20%'], y: ['-20%', '20%', '-20%'] };

    return (
        <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${color} blur-[120px] opacity-20 mix-blend-screen pointer-events-none`}
            animate={{
                ...movement,
                scale: [1, 1.3, 1],
                rotate: [0, 10, 0],
            }}
            transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            }}
        />
    );
};

/**
 * 🌌 Vision Background Component
 * Encapsulates the entire background system from the Vision Page
 */
export default function VisionBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll Progress for Parallax
    const { scrollYProgress } = useScroll({
        offset: ["start start", "end end"]
    });

    // Background Parallax
    const bgGridY = useTransform(scrollYProgress, [0, 1], [0, 800]);
    const particleY = useTransform(scrollYProgress, [0, 1], [0, -300]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none">
            {/* Base Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-[#050510] to-[#020617]" />

            {/* Infinite Receding Grid (Far Layer Z-5) */}
            <motion.div
                style={{ y: bgGridY }}
                className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(6,182,212,0.03)_1.5px,transparent_1.5px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] opacity-30"
            />

            {/* Starfield */}
            <div className="absolute inset-0">
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.7 + 0.3,
                        }}
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Cinematic Fog Layers (Z-4, Z-3) */}
            <FogLayer color="from-indigo-900/30 to-blue-900/20" delay={0} duration={35} direction="diagonal" />
            <FogLayer color="from-cyan-900/20 to-purple-900/30" delay={8} duration={40} direction="horizontal" />
            <FogLayer color="from-purple-900/25 to-pink-900/15" delay={15} duration={45} direction="vertical" />

            {/* Geometric Particle Field (Z-2) */}
            <motion.div style={{ y: particleY }} className="absolute inset-0">
                <ParticleField />
            </motion.div>

            {/* Volumetric Light Rays (Z-1) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-40 mix-blend-screen pointer-events-none" />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,2,2,0.8)_100%)]" />
        </div>
    );
}
