// AboutSection — Personal story with values display
"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Lightbulb, Target, Compass } from "lucide-react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FadeIn, SlideUp } from "@/components/animations/core";
import { GlassCard } from "@/components/ui/GlassCard";

const DataSphere = dynamic(() => import("@/components/3d/DataSphere").then(mod => ({ default: mod.DataSphere })), { ssr: false });

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
<section className="relative section-padding overflow-visible isolate">
  {/* 3D Background - DataSphere */}
  <div
    className="
      absolute 
      top-0 
      right-[-25vw]     /* ❗ Moved further right to be fully visible */
      w-[70vw]          /* ❗ Increased width for full visibility */
      h-[90vh]          /* ❗ Increased height so sphere does not cut */
      z-[-2] 
      opacity-70 
      pointer-events-none 
      select-none 
      hidden lg:block
    "
  >
    <div className="sticky top-24 w-full h-full overflow-visible">
      <Suspense fallback={null}>
        <DataSphere />
      </Suspense>
    </div>
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
              About Me
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight tracking-tight">
              The <span className="text-gradient-heading">Spark</span> Behind the Journey
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              My journey into AI began with a simple curiosity — how can machines think,
              learn, and understand like humans?
            </p>
          </div>
        </FadeIn>

        {/* Story - Enhanced with Staggered Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <GlassCard variant="large" glow>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.4
                  }
                }
              }}
              className="space-y-6 md:space-y-8"
            >
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-[60ch]"
              >
                As a teenager, I was fascinated by how data could reveal patterns that
                even humans miss. Watching how AI could write, create, and solve problems
                made me realize one thing — intelligence isn't just something we use,
                it's something we can build.
              </motion.p>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-[60ch]"
              >
                That spark turned into a deep desire to understand the science behind
                intelligence — not just to use AI tools, but to create them with purpose.
              </motion.p>
              <motion.p 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-[60ch]"
              >
                I believe AI is not just technology — it's a reflection of how humans
                think, decide, and dream. My purpose is to create ethical, human-centered
                AI systems that enhance creativity, productivity, and opportunity.
              </motion.p>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* Values - Enhanced */}
        <FadeIn delay={0.4}>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight tracking-tight">
              Core <span className="text-gradient-heading">Values</span>
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              The principles that guide how I think, create, and build
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.08, 
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                rotateX: 2,
                rotateY: -2
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group"
            >
              <GlassCard variant="premium" glow className="h-full">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 p-3 mb-4 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-full h-full text-slate-900" />
                </div>
                <h4 className="font-heading font-semibold text-lg mb-3 text-slate-100">
                  {value.title}
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {value.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Quote - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <GlassCard variant="large" glow className="inline-block max-w-4xl">
            <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <blockquote className="text-2xl md:text-3xl font-heading font-medium text-gradient-heading leading-relaxed relative z-10">
              "I design intelligence with empathy — blending data, emotion, and purpose
              into a calm futuristic experience."
            </blockquote>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
