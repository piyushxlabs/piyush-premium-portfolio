// VisionSection — Long-term vision statement
"use client";

import { motion } from "framer-motion";
import { Rocket, Target, Sparkles } from "lucide-react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/animations/core";
import { GlassCard } from "@/components/ui/Card";

// const InfinityLoop = dynamic(() => import("@/components/3d/InfinityLoop").then(mod => ({ default: mod.InfinityLoop })), { ssr: false });

const visionPoints = [
  {
    icon: Rocket,
    title: "AI Startups",
    description: "Building AI-driven products that combine technical innovation with social impact",
  },
  {
    icon: Target,
    title: "Ethical Innovation",
    description: "Leading teams that innovate responsibly, blending automation, data, and design",
  },
  {
    icon: Sparkles,
    title: "Human Potential",
    description: "Creating tools that don't just automate work — but amplify human creativity",
  },
];

export function VisionSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent" />
      
      {/* 3D Background - InfinityLoop */}
      <div className="absolute inset-0 w-full h-full z-[-1] opacity-75 pointer-events-none select-none hidden md:block overflow-visible">
        {/* <Suspense fallback={null}>
          <InfinityLoop />
        </Suspense> */}
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-glass border border-overlay-medium text-sm font-medium mb-4"
            >
              Future Vision
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Building the <span className="text-gradient-heading">Future</span>
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              My long-term vision is to build AI startups that combine technical
              innovation with social impact — creating intelligent products that
              empower learners, creators, and organizations
            </p>
          </div>
        </FadeIn>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <GlassCard className="p-8 md:p-12 text-center">
            <blockquote className="text-2xl md:text-3xl font-heading font-medium text-gradient-heading leading-relaxed">
              "I want to be known as the founder who makes AI human — blending logic
              with empathy, and intelligence with purpose."
            </blockquote>
          </GlassCard>
        </motion.div>

        {/* Vision Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {visionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <GlassCard className="p-8 text-center h-full hover:scale-105 transition-transform">
                <div className="inline-flex p-4 rounded-2xl bg-accent-cyan/10 text-accent-cyan mb-6">
                  <point.icon size={32} />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  {point.title}
                </h3>
                <p className="text-muted leading-relaxed">{point.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-xl md:text-2xl text-muted max-w-4xl mx-auto leading-relaxed">
            In the future, I see myself as a founder who bridges human creativity
            with artificial intelligence, shaping tools that not only automate work —
            but <span className="text-accent-cyan font-semibold">amplify human potential</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
