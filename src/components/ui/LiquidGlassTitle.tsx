'use client';

import { motion, useAnimationFrame } from 'framer-motion';
import { useRef, useState } from 'react';

interface LetterProps {
    char: string;
    index: number;
    mouseX: number;
    mouseY: number;
}

function LiquidLetter({ char, index, mouseX, mouseY }: LetterProps) {
    const letterRef = useRef<HTMLSpanElement>(null);
    const [distortion, setDistortion] = useState({ x: 0, y: 0, scale: 1 });
    const timeRef = useRef(0);

    useAnimationFrame((time) => {
        if (!letterRef.current) return;

        timeRef.current = time * 0.001; // Convert to seconds

        const rect = letterRef.current.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        // Calculate distance to cursor
        const dx = mouseX - letterCenterX;
        const dy = mouseY - letterCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Gravitational lensing effect
        if (distance < 200 && distance > 0) {
            const force = (200 - distance) / 200;
            const distortX = (dx / distance) * force * 40;
            const distortY = (dy / distance) * force * 40;
            const scaleEffect = 1 + force * 0.2;

            setDistortion({ x: distortX, y: distortY, scale: scaleEffect });
        } else {
            setDistortion({ x: 0, y: 0, scale: 1 });
        }
    });

    // Organic breathing animation using pseudo-noise
    const breathingY = [0, -8, 0, 8, 0];
    const breathingRotation = [0, 2, 0, -2, 0];

    return (
        <motion.span
            ref={letterRef}
            initial={{ opacity: 0, scale: 0, filter: 'blur(20px)' }}
            animate={{
                opacity: 1,
                scale: distortion.scale,
                filter: 'blur(0px)',
                y: breathingY,
                rotateZ: breathingRotation,
                x: distortion.x,
            }}
            transition={{
                opacity: { duration: 1.2, delay: index * 0.08, ease: [0.34, 1.56, 0.64, 1] },
                scale: { type: 'spring', stiffness: 100, damping: 25 },
                filter: { duration: 1.2, delay: index * 0.08 },
                y: {
                    duration: 3 + index * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
                rotateZ: {
                    duration: 4 + index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
                x: { type: 'spring', stiffness: 100, damping: 25 },
            }}
            whileHover={{
                scale: 1.2,
                filter: 'brightness(1.4) drop-shadow(0 0 20px rgba(6, 182, 212, 0.8))',
                transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
            }}
            className="inline-block"
            style={{
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 45%, #c084fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.4)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.3))',
                textShadow: `
          2px 0 0 rgba(255, 0, 100, 0.3),
          -2px 0 0 rgba(0, 255, 255, 0.3),
          0 2px 0 rgba(100, 0, 255, 0.2)
        `,
            }}
        >
            {char}
        </motion.span>
    );
}

export function LiquidGlassTitle() {
    const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMouse({ x: e.clientX, y: e.clientY });
    };

    const letters = ['T', 'h', 'o', 'u', 'g', 'h', 't', 's'];

    return (
        <div
            className="relative mb-6"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMouse({ x: -1000, y: -1000 })}
        >
            {/* SVG Filters */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="liquidGlass">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur1" />
                        <feColorMatrix in="blur1" type="saturate" values="1.8" result="saturate" />
                        <feGaussianBlur in="saturate" stdDeviation="8" result="blur2" />
                        <feBlend in="SourceGraphic" in2="blur2" mode="normal" />
                    </filter>

                    <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                        <stop offset="45%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="1" />
                    </linearGradient>
                </defs>
            </svg>

            <motion.h1
                className="text-5xl md:text-7xl font-heading font-bold flex flex-wrap justify-center gap-x-1"
                style={{
                    perspective: '1000px',
                    backdropFilter: 'blur(8px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(8px) saturate(180%)',
                    filter: 'url(#liquidGlass)',
                }}
            >
                {letters.map((letter, i) => (
                    <LiquidLetter
                        key={i}
                        char={letter}
                        index={i}
                        mouseX={mouse.x}
                        mouseY={mouse.y}
                    />
                ))}
            </motion.h1>

            {/* Glass overlay effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    mixBlendMode: 'overlay',
                }}
            />
        </div>
    );
}
