// BackgroundEffects — Premium cinematic ambient system with enhanced gradient orbs
"use client";

import { useEffect, useRef } from "react";

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Enhanced particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles with varied colors
    const colors = [
      'rgba(34, 211, 238, ',
      'rgba(167, 139, 250, ',
      'rgba(20, 184, 166, '
    ];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${particle.opacity})`;
        ctx.fill();
        
        // Add subtle glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${particle.opacity * 0.3})`;
        ctx.fill();
      });

      // Draw enhanced connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const opacity = 0.2 * (1 - distance / 180);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Enhanced Background Glow */}
      <div className="fixed inset-0 bg-glow opacity-30 pointer-events-none z-0" />
      
      {/* Premium Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.5 }}
      />
      
      {/* Enhanced Gradient Orbs - Premium Cinematic Layout */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Primary orbs */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent-lavender/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '3s' }} />
        
        {/* Secondary accent orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-teal/8 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-indigo/8 rounded-full blur-2xl animate-float-slow" style={{ animationDelay: '4.5s' }} />
        
        {/* Ambient corner orbs */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-accent-cyan/6 rounded-full blur-xl animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent-lavender/6 rounded-full blur-xl animate-float-slow" style={{ animationDelay: '5s' }} />
      </div>
    </>
  );
}
