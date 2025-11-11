// HeroSection — Main hero container with staggered content reveal
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { GlowButton } from "@/components/ui/Button";
import { TypewriterEffect } from "./TypewriterEffect";
import { ScrollIndicator } from "./ScrollIndicator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.9, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-glow opacity-60 blur-3xl" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 mx-auto px-6 py-32 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-glass border border-overlay-medium mb-8">
          <Sparkles size={16} className="text-accent-cyan" />
          <span className="text-sm font-medium">AI Innovator & Future Founder</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-tight"
        >
          Building the Future with{" "}
          <span className="text-gradient-heading">AI, Data & Purpose</span>
        </motion.h1>

        {/* Typewriter Tagline */}
        <motion.div variants={itemVariants} className="mb-12">
          <TypewriterEffect
            phrases={[
              "Designing intelligence with empathy",
              "Turning data into innovation",
              "Creating AI that empowers people",
              "Building meaningful automation",
            ]}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I'm Piyush, an 18-year-old AI & Data Science learner exploring how
          intelligence can create impact, empathy, and innovation.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/work">
            <GlowButton>
              Explore My Work
              <ArrowRight size={20} />
            </GlowButton>
          </Link>
          <Link href="/connect">
            <button className="px-8 py-4 rounded-xl border-2 border-accent-cyan/40 hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all font-medium">
              Let's Connect
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
