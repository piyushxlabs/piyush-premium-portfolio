// ContactSection — Contact CTA with ambient background
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { Mail, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import { FadeIn } from "@/components/animations/core";
import { GlassCard } from "@/components/ui/Card";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Me",
    description: "hello@piyush.dev",
    href: "mailto:hello@piyush.dev",
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

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-accent-cyan rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
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
    <section className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent-lavender/10 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-glow opacity-40 blur-3xl" />
      <FloatingParticles />

      <div className="container relative z-10 mx-auto px-6">
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
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6"
            >
              Let's Build Something <span className="text-gradient-heading">Extraordinary</span> Together
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-4"
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

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
              }}
              style={{ perspective: 1000 }}
            >
              <Link href={method.href} className="block group">
                <motion.div
                  whileHover={{ boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)" }}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 text-center h-full transition-all relative overflow-hidden"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/0 via-accent-cyan/5 to-accent-lavender/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan mb-4 group-hover:bg-accent-cyan group-hover:text-background transition-all">
                      <method.icon size={24} />
                    </div>
                    <h3 className="font-heading font-semibold mb-2">{method.title}</h3>
                    <p className="text-sm text-muted">{method.description}</p>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/90 backdrop-blur-sm border border-accent-cyan/30 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Piyush — AI Innovator & Creative Technologist
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Interactive CTA Orb */}
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold shadow-lg relative overflow-hidden group cursor-pointer"
              aria-label="Start the conversation"
            >
              {/* Pulsing glow */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 blur-xl -z-10"
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
