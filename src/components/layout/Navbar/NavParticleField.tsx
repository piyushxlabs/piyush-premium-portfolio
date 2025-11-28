"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useQuantumNav } from "./QuantumNavContext";
import { useParticleField } from "./hooks/useParticleField";
import type { Particle as ParticleType } from "./hooks/useParticleField";
import { useRef } from "react";

export function NavParticleField() {
    const { scrollY, cursorX, cursorY } = useQuantumNav();
    const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
    const particleCount = isMobile ? 220 : 450;
    const particles = useParticleField(particleCount);
    const containerRef = useRef<HTMLDivElement>(null);

    // Compress particles toward center on scroll
    // We'll use a CSS transform on the container for global compression
    const containerScaleX = useTransform(scrollY, [0, 50], [1, 0.8]);
    const containerOpacity = useTransform(scrollY, [0, 50], [1, 0.5]);

    return (
        <motion.div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            style={{
                scaleX: containerScaleX,
                opacity: containerOpacity,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
            }}
        >
            {particles.map((particle) => (
                <Particle
                    key={particle.id}
                    particle={particle}
                    cursorX={cursorX}
                    cursorY={cursorY}
                />
            ))}
        </motion.div>
    );
}

function Particle({ particle, cursorX, cursorY }: { particle: ParticleType; cursorX: MotionValue<number>; cursorY: MotionValue<number> }) {
    const ref = useRef<HTMLDivElement>(null);

    // Deterministic drift values for lint-safe renders
    const seeded = (seed: number) => {
        const x = Math.sin(seed * 999) * 10000;
        return x - Math.floor(x);
    };
    const driftX = seeded(particle.id) * 20 - 10;
    const driftY = seeded(particle.id + 1000) * 20 - 10;
    const duration = 3 + seeded(particle.id + 2000) * 4;

    // Using Framer Motion for simple entrance and ambient float
    return (
        <motion.div
            ref={ref}
            className="absolute rounded-full"
            style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                opacity: 0.6,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
            }}
            animate={{
                x: [0, driftX, 0],
                y: [0, driftY, 0],
                opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        />
    );
}
