"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Lightbulb, Target, Compass } from "lucide-react";
import { FadeIn } from "@/components/animations/core";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionDivider } from "@/components/ui/SectionDivider";

const values = [
  {
    icon: Compass,
    title: "Curiosity",
    description: "Always exploring how intelligence works in humans and machines",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Building technology that's ethical, transparent, and human-centered",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Blending ideas, tools, and logic to create something new",
  },
  {
    icon: Sparkles,
    title: "Empathy",
    description: "Designing AI that feels human — connecting logic with emotion",
  },
  {
    icon: Target,
    title: "Purpose",
    description: "Every project exists to make life better, not just smarter",
  },
];

export function AboutSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
      <SectionDivider position="top" />

      {/* Static Background Theme - MVP Optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-sm font-medium mb-4 text-slate-300">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight tracking-tight text-slate-100">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Spark</span> Behind the Journey
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              My journey into AI began with a simple curiosity — how can machines think,
              learn, and understand like humans?
            </p>
          </div>
        </FadeIn>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <GlassCard variant="large" className="p-8 md:p-12 bg-slate-900/40 border-slate-800/50">
            <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-slate-300 leading-relaxed">
              <p>
                As a teenager, I was fascinated by how data could reveal patterns that
                even humans miss. Watching how AI could write, create, and solve problems
                made me realize one thing — intelligence isn't just something we use,
                it's something we can build.
              </p>
              <p>
                That spark turned into a deep desire to understand the science behind
                intelligence — not just to use AI tools, but to create them with purpose.
              </p>
              <p>
                I believe AI is not just technology — it's a reflection of how humans
                think, decide, and dream. My purpose is to create ethical, human-centered
                AI systems that enhance creativity, productivity, and opportunity.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Values */}
        <FadeIn delay={0.2}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight tracking-tight text-slate-100">
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Values</span>
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              The principles that guide how I think, create, and build
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-colors text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">
                  <value.icon size={24} />
                </div>
                <h4 className="font-heading font-semibold text-lg mb-2 text-slate-100">
                  {value.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block max-w-4xl p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-slate-800">
            <blockquote className="text-2xl md:text-3xl font-heading font-medium text-slate-200 leading-relaxed">
              "I design intelligence with empathy — blending data, emotion, and purpose
              into a calm futuristic experience."
            </blockquote>
          </div>
        </motion.div>
      </div>
      <SectionDivider position="bottom" />
    </section>
  );
}