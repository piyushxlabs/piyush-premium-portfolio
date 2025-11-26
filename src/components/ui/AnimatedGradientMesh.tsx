'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export function AnimatedGradientMesh() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Mouse position for interactive effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement
    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            // Normalize mouse position -1 to 1
            const x = (clientX / innerWidth) * 2 - 1;
            const y = (clientY / innerHeight) * 2 - 1;

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax effects based on scroll
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
    const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

    // Mouse influence transforms
    const moveX1 = useTransform(smoothMouseX, [-1, 1], [-20, 20]);
    const moveY1 = useTransform(smoothMouseY, [-1, 1], [-20, 20]);

    const moveX2 = useTransform(smoothMouseX, [-1, 1], [30, -30]);
    const moveY2 = useTransform(smoothMouseY, [-1, 1], [30, -30]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            style={{
                background: 'linear-gradient(to bottom, #0a0e1a, #030712)',
            }}
        >
            {/* Orb 1: Primary Cyan - Elliptical Path */}
            <motion.div
                className="absolute rounded-full blur-[100px] opacity-20"
                style={{
                    width: '50vw',
                    height: '50vw',
                    background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
                    top: '10%',
                    left: '20%',
                    y: y1,
                    x: moveX1,
                }}
                animate={{
                    x: ['0%', '10%', '-5%', '0%'],
                    y: ['0%', '-10%', '5%', '0%'],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Orb 2: Secondary Lavender - Scaling */}
            <motion.div
                className="absolute rounded-full blur-[100px] opacity-15"
                style={{
                    width: '45vw',
                    height: '45vw',
                    background: 'radial-gradient(circle, #c084fc 0%, transparent 70%)',
                    bottom: '15%',
                    right: '10%',
                    y: y2,
                    x: moveX2,
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.12, 0.18, 0.12],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Orb 3: Accent Teal - Translation */}
            <motion.div
                className="absolute rounded-full blur-[100px] opacity-15"
                style={{
                    width: '40vw',
                    height: '40vw',
                    background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)',
                    top: '40%',
                    left: '40%',
                    y: y3,
                }}
                animate={{
                    x: ['-15%', '15%', '-15%'],
                    y: ['-10%', '10%', '-10%'],
                }}
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Orb 4: Rotating Center */}
            <motion.div
                className="absolute rounded-full blur-[80px] opacity-10"
                style={{
                    width: '60vw',
                    height: '60vw',
                    background: 'conic-gradient(from 0deg, transparent, #06b6d4, transparent)',
                    top: '50%',
                    left: '50%',
                    x: '-50%',
                    y: '-50%',
                }}
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Orb 5: Pulsing Opacity */}
            <motion.div
                className="absolute rounded-full blur-[120px]"
                style={{
                    width: '55vw',
                    height: '55vw',
                    background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
                    top: '20%',
                    right: '30%',
                }}
                animate={{
                    opacity: [0.1, 0.15, 0.1],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Overlay for texture/noise if needed, keeping it clean for now */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        </div>
    );
}
