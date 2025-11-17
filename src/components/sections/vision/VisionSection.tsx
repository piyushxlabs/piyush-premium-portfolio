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
    <section className="relative section-padding overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent" />
      
      {/* 3D Background - InfinityLoop */}
      <div className="absolute inset-0 w-full h-full z-[-1] opacity-75 pointer-events-none select-none hidden md:block overflow-visible">
        {/* <Suspense fallback={null}>
          <InfinityLoop />
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
              Future Vision
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight tracking-tight">
              Building the <span className="text-gradient-heading">Future</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              My long-term vision is to build AI startups that combine technical
              innovation with social impact — creating intelligent products that
              empower learners, creators, and organizations
            </p>
          </div>
        </FadeIn>

        {/* Vision Statement - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass-heavy rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <motion.div
                className="text-2xl md:text-3xl font-heading font-medium leading-relaxed mb-6"
                style={{
                  background: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #22d3ee 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                "I want to be known as the founder who makes AI human — blending logic
                with empathy, and intelligence with purpose."
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Vision Points - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {visionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group"
            >
              <div className="glass-premium rounded-2xl p-8 text-center h-full hover:border-accent-cyan/40 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-4 mx-auto mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                    <point.icon className="w-full h-full text-slate-900" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-3 text-slate-100">
                    {point.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">{point.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            In the future, I see myself as a founder who bridges human creativity
            with artificial intelligence, shaping tools that not only automate work —
            but <span className="text-gradient-heading font-semibold">amplify human potential</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
