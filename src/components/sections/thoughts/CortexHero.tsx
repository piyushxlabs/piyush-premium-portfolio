'use client';

import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// --- GRAVITATIONAL TEXT ---

const GravitationalText = ({ text, className }: { text: string; className?: string }) => {
    const letters = Array.from(text);
    const mouse = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouse.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className={`flex ${className}`}>
            {letters.map((letter, i) => (
                <PhysicsLetter key={i} letter={letter} mouse={mouse} />
            ))}
        </div>
    );
};

const PhysicsLetter = ({ letter, mouse }: { letter: string; mouse: React.MutableRefObject<{ x: number; y: number }> }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth return
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    useAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from mouse to letter center (relative to viewport for simplicity in this context, 
        // but better to map mouse to local coords if parent is relative. 
        // Here we use the mouse ref which is local to container)

        // Actually, let's use the local mouse coordinates passed from parent
        // The letter's position is relative to the container
        const letterCenterX = ref.current.offsetLeft + ref.current.offsetWidth / 2;
        const letterCenterY = ref.current.offsetTop + ref.current.offsetHeight / 2;

        const dx = mouse.current.x - letterCenterX;
        const dy = mouse.current.y - letterCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interaction Radius
        if (dist < 200) {
            const force = (200 - dist) / 200;
            // Repel
            x.set(-dx * force * 0.5);
            y.set(-dy * force * 0.5);
        } else {
            x.set(0);
            y.set(0);
        }
    });

    return (
        <motion.span
            ref={ref}
            style={{ x: springX, y: springY, display: 'inline-block' }}
            className="relative"
        >
            {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
    );
};

// --- NEURAL CLOUD (CANVAS) ---

const NeuralCloud = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight * 0.8;

        const particles: Particle[] = [];
        const particleCount = 60;
        const connectionDistance = 150;

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Draw connections
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(6, 182, 212, ${1 - dist / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight * 0.8;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30 pointer-events-none" />;
};

// --- MAIN COMPONENT ---

export const CortexHero = () => {
    return (
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            <NeuralCloud />

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-6"
                >
                    <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-sm font-mono tracking-widest uppercase backdrop-blur-md">
                        Neural Archive v2.0
                    </span>
                </motion.div>

                <GravitationalText
                    text="THOUGHTS"
                    className="text-6xl md:text-9xl font-heading font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-8 cursor-default select-none justify-center"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Interfacing with the digital consciousness. <br />
                    <span className="text-cyan-400/80">Explorations in AI, Design, and Future Systems.</span>
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Initialize</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/50 to-transparent" />
            </motion.div>
        </section>
    );
};
