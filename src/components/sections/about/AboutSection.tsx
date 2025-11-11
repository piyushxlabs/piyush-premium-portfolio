// AboutSection — Personal story with values display
"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Lightbulb, Target, Compass } from "lucide-react";
import { FadeIn, SlideUp } from "@/components/animations/core";
import { GlassCard } from "@/components/ui/Card";

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
    <section className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              The <span className="text-gradient-heading">Spark</span> Behind the Journey
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              My journey into AI began with a simple curiosity — how can machines think,
              learn, and understand like humans?
            </p>
          </div>
        </FadeIn>

        {/* Story */}
        <SlideUp delay={0.2}>
          <div className="max-w-4xl mx-auto mb-20">
            <GlassCard className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted leading-relaxed mb-6">
                  As a teenager, I was fascinated by how data could reveal patterns that
                  even humans miss. Watching how AI could write, create, and solve problems
                  made me realize one thing — intelligence isn't just something we use,
                  it's something we can build.
                </p>
                <p className="text-lg text-muted leading-relaxed mb-6">
                  That spark turned into a deep desire to understand the science behind
                  intelligence — not just to use AI tools, but to create them with purpose.
                </p>
                <p className="text-lg text-muted leading-relaxed">
                  I believe AI is not just technology — it's a reflection of how humans
                  think, decide, and dream. My purpose is to create ethical, human-centered
                  AI systems that enhance creativity, productivity, and opportunity.
                </p>
              </div>
            </GlassCard>
          </div>
        </SlideUp>

        {/* Values */}
        <FadeIn delay={0.4}>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Core <span className="text-gradient-heading">Values</span>
            </h3>
            <p className="text-muted max-w-2xl mx-auto">
              The principles that guide how I think, create, and build
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GlassCard className="p-6 h-full hover:scale-105 transition-transform">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan">
                    <value.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <blockquote className="text-2xl md:text-3xl font-heading font-medium text-gradient-heading max-w-4xl mx-auto">
            "I design intelligence with empathy — blending data, emotion, and purpose
            into a calm futuristic experience."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
