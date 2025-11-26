'use client';

import { useEffect, useRef } from 'react';

// Vector utility class
class Vector2 {
    constructor(public x: number = 0, public y: number = 0) { }

    add(v: Vector2) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v: Vector2) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mult(n: number) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    div(n: number) {
        if (n !== 0) {
            this.x /= n;
            this.y /= n;
        }
        return this;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const m = this.mag();
        if (m !== 0) this.div(m);
        return this;
    }

    limit(max: number) {
        if (this.mag() > max) {
            this.normalize().mult(max);
        }
        return this;
    }

    dist(v: Vector2) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    copy() {
        return new Vector2(this.x, this.y);
    }

    static sub(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    static random2D() {
        const angle = Math.random() * Math.PI * 2;
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
}

// Particle class
class Particle {
    position: Vector2;
    velocity: Vector2;
    acceleration: Vector2;
    pulsePhase: number;
    pulseSpeed: number;
    baseSize: number;

    constructor(x: number, y: number) {
        this.position = new Vector2(x, y);
        this.velocity = Vector2.random2D().mult(Math.random() * 0.5);
        this.acceleration = new Vector2();
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.5 + Math.random() * 1.5;
        this.baseSize = 2 + Math.random() * 2;
    }

    // Apply force to particle
    applyForce(force: Vector2) {
        this.acceleration.add(force);
    }

    // Boids flocking behavior
    flock(particles: Particle[]) {
        const perception = 50;
        const alignment = this.align(particles, perception);
        const cohesion = this.cohesion(particles, perception);
        const separation = this.separation(particles, perception);

        alignment.mult(0.5);
        cohesion.mult(0.5);
        separation.mult(1.2);

        this.applyForce(alignment);
        this.applyForce(cohesion);
        this.applyForce(separation);
    }

    // Alignment: steer towards average heading of neighbors
    align(particles: Particle[], perception: number) {
        const steering = new Vector2();
        let total = 0;

        for (const other of particles) {
            const d = this.position.dist(other.position);
            if (other !== this && d < perception) {
                steering.add(other.velocity);
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.normalize().mult(0.5);
            steering.sub(this.velocity);
            steering.limit(0.1);
        }

        return steering;
    }

    // Cohesion: steer towards average position of neighbors
    cohesion(particles: Particle[], perception: number) {
        const steering = new Vector2();
        let total = 0;

        for (const other of particles) {
            const d = this.position.dist(other.position);
            if (other !== this && d < perception) {
                steering.add(other.position);
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.normalize().mult(0.5);
            steering.sub(this.velocity);
            steering.limit(0.1);
        }

        return steering;
    }

    // Separation: steer away from neighbors
    separation(particles: Particle[], perception: number) {
        const steering = new Vector2();
        let total = 0;

        for (const other of particles) {
            const d = this.position.dist(other.position);
            if (other !== this && d < perception && d > 0) {
                const diff = Vector2.sub(this.position, other.position);
                diff.div(d * d); // Weight by distance
                steering.add(diff);
                total++;
            }
        }

        if (total > 0) {
            steering.div(total);
            steering.normalize().mult(0.5);
            steering.sub(this.velocity);
            steering.limit(0.2);
        }

        return steering;
    }

    // Update particle physics
    update(width: number, height: number) {
        this.velocity.add(this.acceleration);
        this.velocity.limit(2);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        // Wrap edges
        if (this.position.x < 0) this.position.x = width;
        if (this.position.x > width) this.position.x = 0;
        if (this.position.y < 0) this.position.y = height;
        if (this.position.y > height) this.position.y = 0;

        // Update pulse
        this.pulsePhase += this.pulseSpeed * 0.02;
    }

    // Get current size with pulse
    getSize() {
        const pulse = 1 + Math.sin(this.pulsePhase) * 0.3;
        return this.baseSize * pulse;
    }

    // Get current opacity with pulse
    getOpacity() {
        return 0.6 + Math.sin(this.pulsePhase) * 0.4;
    }
}

// Connection class for traveling lights
class Connection {
    p1: Particle;
    p2: Particle;
    lightPosition: number;
    opacity: number;

    constructor(p1: Particle, p2: Particle) {
        this.p1 = p1;
        this.p2 = p2;
        this.lightPosition = Math.random();
        this.opacity = 0;
    }

    update() {
        this.lightPosition += 0.02;
        if (this.lightPosition > 1) {
            this.lightPosition = 0;
        }

        // Fade in/out based on distance
        const dist = this.p1.position.dist(this.p2.position);
        const targetOpacity = Math.max(0, 1 - dist / 80);
        this.opacity += (targetOpacity - this.opacity) * 0.1;
    }
}

export function SynapticNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const connectionsRef = useRef<Map<string, Connection>>(new Map());
    const mouseRef = useRef<Vector2>(new Vector2(-1000, -1000));
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles (3000 for performance)
        const particleCount = 3000;
        particlesRef.current = Array.from({ length: particleCount }, () =>
            new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            )
        );

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const connections = connectionsRef.current;
            const mouse = mouseRef.current;

            // Update connections map
            connections.clear();

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                // Apply boids flocking (sample for performance)
                if (i % 3 === 0) {
                    const nearby = particles.filter(p =>
                        p !== particle && particle.position.dist(p.position) < 100
                    );
                    particle.flock(nearby);
                }

                // Apply cursor magnetic attraction
                const distToMouse = particle.position.dist(mouse);
                if (distToMouse < 300) {
                    const force = Vector2.sub(mouse, particle.position);
                    const strength = (300 - distToMouse) / 300;
                    force.normalize().mult(strength * 0.15);
                    particle.applyForce(force);
                }

                // Brownian motion
                const brownian = Vector2.random2D().mult(0.05);
                particle.applyForce(brownian);

                // Update particle
                particle.update(canvas.width, canvas.height);

                // Find connections
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const dist = particle.position.dist(other.position);

                    if (dist < 80) {
                        const key = `${i}-${j}`;
                        if (!connections.has(key)) {
                            connections.set(key, new Connection(particle, other));
                        }
                    }
                }
            }

            // Draw connections
            connections.forEach((connection) => {
                connection.update();

                if (connection.opacity > 0.05) {
                    const p1 = connection.p1.position;
                    const p2 = connection.p2.position;

                    // Gradient line
                    const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    const speed = connection.p1.velocity.mag() + connection.p2.velocity.mag();
                    const colorShift = Math.min(255, speed * 50);

                    gradient.addColorStop(0, `rgba(6, 182, 212, ${connection.opacity * 0.3})`);
                    gradient.addColorStop(0.5, `rgba(${100 + colorShift}, 130, 246, ${connection.opacity * 0.5})`);
                    gradient.addColorStop(1, `rgba(192, 132, 252, ${connection.opacity * 0.3})`);

                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();

                    // Traveling light
                    const lightX = p1.x + (p2.x - p1.x) * connection.lightPosition;
                    const lightY = p1.y + (p2.y - p1.y) * connection.lightPosition;

                    const lightGradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, 4);
                    lightGradient.addColorStop(0, `rgba(255, 255, 255, ${connection.opacity})`);
                    lightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                    ctx.fillStyle = lightGradient;
                    ctx.beginPath();
                    ctx.arc(lightX, lightY, 4, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Draw particles
            for (const particle of particles) {
                const size = particle.getSize();
                const opacity = particle.getOpacity();
                const speed = particle.velocity.mag();

                // Color based on velocity
                const hue = 180 + speed * 30; // Cyan to purple gradient

                // Outer glow
                const glowGradient = ctx.createRadialGradient(
                    particle.position.x, particle.position.y, 0,
                    particle.position.x, particle.position.y, size * 3
                );
                glowGradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${opacity * 0.8})`);
                glowGradient.addColorStop(0.5, `hsla(${hue}, 70%, 60%, ${opacity * 0.3})`);
                glowGradient.addColorStop(1, `hsla(${hue}, 70%, 60%, 0)`);

                ctx.fillStyle = glowGradient;
                ctx.beginPath();
                ctx.arc(particle.position.x, particle.position.y, size * 3, 0, Math.PI * 2);
                ctx.fill();

                // Core particle
                ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${opacity})`;
                ctx.beginPath();
                ctx.arc(particle.position.x, particle.position.y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{
                zIndex: 1,
                mixBlendMode: 'lighten',
                opacity: 0.6
            }}
        />
    );
}
