// ContactSection — Contact CTA with ambient background
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { Mail, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { useState, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/animations/core";
import { GlassCard } from "@/components/ui/GlassCard";

// const InteractiveModel = dynamic(() => import("@/components/3d/InteractiveModel").then(mod => ({ default: mod.InteractiveModel })), { ssr: false });

const contactMethods = [
  {
    icon: Mail,
    title: "Email Me",
    description: "piyushjaguri13@gmail.com",
    href: "mailto:piyushjaguri13@gmail.com",
  },
  {
    icon: MessageSquare,
    title: "Let's Chat",
    description: "Quick questions or collaboration ideas",
    href: "/connect",
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a time that works for you",
    href: "/connect",
  },
];

// Floating particles component with stable positions
const particlePositions = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 37 + 23) % 100,
  top: (i * 53 + 17) % 100,
  duration: 3 + (i % 3),
  delay: (i % 5) * 0.4,
}));

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particlePositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent-cyan rounded-full"
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: pos.duration,
            repeat: Infinity,
            delay: pos.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const orbRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.1);
    mouseY.set((e.clientY - centerY) * 0.1);
  };

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Spotlight Background Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-accent-cyan/8 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-accent-lavender/5 to-transparent blur-3xl opacity-40 pointer-events-none" />
      
      {/* 3D Background - InteractiveModel */}
      <div className="absolute inset-0 w-full h-full z-[-1] opacity-65 pointer-events-none select-none hidden md:block overflow-visible">
        {/* <Suspense fallback={null}>
          <InteractiveModel />
        </Suspense> */}
      </div>

      <div className="container relative z-10 mx-auto container-padding max-w-7xl">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-glass border border-overlay-medium text-sm font-medium mb-4"
            >
              Let's Connect
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight tracking-tight"
            >
              Let's Build Something <span className="text-gradient-heading">Extraordinary</span> Together
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-4"
            >
              Open to meaningful collaborations, AI innovation, and visionary projects shaping the future.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="italic text-sm text-muted/80 mt-4 mb-12"
            >
              "Every great collaboration begins with a single message."
            </motion.p>
          </div>
        </FadeIn>

        {/* Narrative Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mb-16 max-w-4xl mx-auto"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 md:px-6 bg-background text-xs uppercase tracking-wider text-muted/60 text-center max-w-xs md:max-w-none">
            <span className="hidden md:inline">Collaboration isn't just about work — it's about building something meaningful together</span>
            <span className="md:hidden">Building meaningful connections</span>
          </p>
        </motion.div>

        {/* Contact Methods - Unified Premium Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.5 + index * 0.08, 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -6, 
                scale: 1.02
              }}
              className="group"
            >
              <Link href={method.href} className="block focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-2xl">
                <div className="glass-premium rounded-2xl p-8 text-center h-full hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-4 mx-auto mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                      <method.icon className="w-full h-full text-slate-900" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3 text-slate-100">{method.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{method.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA Orb - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
          className="text-center relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
            setIsHovered(false);
          }}
        >
          <Link href="/connect">
            <motion.div
              ref={orbRef}
              style={{ x: orbX, y: orbY }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.14 }}
              className="inline-flex items-center gap-3 px-10 py-5 text-xl font-semibold rounded-full bg-gradient-to-r from-accent-cyan via-accent-lavender to-accent-cyan bg-[length:200%_100%] text-background shadow-[0_0_60px_rgba(34,211,238,0.6)] hover:bg-[position:100%_0] hover:shadow-[0_0_80px_rgba(34,211,238,0.8)] transition-all duration-300 relative overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Start the conversation"
            >
              {/* Animated shimmer effect */}
              <motion.div
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
              
              {/* Pulsing glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-lavender blur-xl -z-10"
              />
              
              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 bg-white/30 rounded-full"
                initial={{ scale: 0, opacity: 1 }}
                whileTap={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative z-10">
                {isHovered ? "Let's Collaborate 🚀" : "Start the Conversation"}
              </span>
              <ArrowRight className="relative z-10" size={20} />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
