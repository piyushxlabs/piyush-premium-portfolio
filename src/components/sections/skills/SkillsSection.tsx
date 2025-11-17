// SkillsSection — Comprehensive skills showcase
"use client";

import { motion } from "framer-motion";
import { Brain, Code, Database, Zap } from "lucide-react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/animations/core";
import { GlassCard } from "@/components/ui/Card";

const NeuralNetwork = dynamic(() => import("@/components/3d/NeuralNetwork").then(mod => ({ default: mod.NeuralNetwork })), { ssr: false });

const skillCategories = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    color: "text-accent-cyan",
    skills: [
      { name: "Machine Learning", level: 85 },
      { name: "Deep Learning", level: 75 },
      { name: "NLP", level: 70 },
      { name: "Computer Vision", level: 65 },
    ],
  },
  {
    icon: Database,
    title: "Data Science",
    color: "text-accent-lavender",
    skills: [
      { name: "Python", level: 90 },
      { name: "Pandas & NumPy", level: 85 },
      { name: "Data Visualization", level: 80 },
      { name: "Statistical Analysis", level: 75 },
    ],
  },
  {
    icon: Code,
    title: "Development",
    color: "text-accent-teal",
    skills: [
      { name: "React & Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Node.js", level: 75 },
      { name: "API Development", level: 80 },
    ],
  },
  {
    icon: Zap,
    title: "Automation",
    color: "text-accent-indigo",
    skills: [
      { name: "Workflow Automation", level: 85 },
      { name: "Web Scraping", level: 80 },
      { name: "Task Scheduling", level: 75 },
      { name: "Process Optimization", level: 80 },
    ],
  },
];

export function SkillsSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* 3D Background - NeuralNetwork */}
      <div className="absolute inset-0 w-full h-full z-[-1] opacity-60 pointer-events-none select-none hidden md:block overflow-visible">
        <Suspense fallback={null}>
          <NeuralNetwork />
        </Suspense>
      </div>
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-glass border border-overlay-medium text-sm font-medium mb-4"
            >
              Skills & Expertise
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Technical <span className="text-gradient-heading">Foundation</span>
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              A blend of AI, data science, development, and automation skills
              built through continuous learning and real-world projects
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
            >
              <GlassCard className="p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-accent-cyan/10 ${category.color}`}>
                    <category.icon size={24} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-overlay-light rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            duration: 0.8,
                            ease: [0.22, 0.9, 0.36, 1],
                          }}
                          className={`h-full bg-gradient-to-r ${
                            categoryIndex === 0
                              ? "from-accent-cyan to-accent-cyan/60"
                              : categoryIndex === 1
                              ? "from-accent-lavender to-accent-lavender/60"
                              : categoryIndex === 2
                              ? "from-accent-teal to-accent-teal/60"
                              : "from-accent-indigo to-accent-indigo/60"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-heading font-semibold mb-8">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Python",
              "TensorFlow",
              "PyTorch",
              "Scikit-learn",
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "PostgreSQL",
              "MongoDB",
              "Docker",
              "Git",
              "AWS",
              "Vercel",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="px-4 py-2 rounded-lg bg-glass border border-overlay-medium text-sm font-medium hover:border-accent-cyan hover:text-accent-cyan transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
