"use client";

import { motion } from "framer-motion";
import { Brain, Code, Database, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";
import { SectionDivider } from "@/components/ui/SectionDivider";

const skillCategories = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    gradient: "from-cyan-400 to-blue-500",
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
    gradient: "from-purple-400 to-pink-500",
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
    gradient: "from-teal-400 to-emerald-500",
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
    gradient: "from-indigo-400 to-violet-500",
    skills: [
      { name: "Workflow Automation", level: 85 },
      { name: "Web Scraping", level: 80 },
      { name: "Task Scheduling", level: 75 },
      { name: "Process Optimization", level: 80 },
    ],
  },
];

const technologies = [
  "Python", "TensorFlow", "PyTorch", "Scikit-learn", "React", "Next.js",
  "TypeScript", "Node.js", "PostgreSQL", "MongoDB", "Docker", "Git", "AWS", "Vercel"
];

export function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
      <SectionDivider position="top" />

      {/* Static Background Theme */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-sm font-medium mb-4 text-slate-300">
            Skills & Expertise
          </span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-slate-100">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Foundation</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A blend of AI, data science, development, and automation skills
            built through continuous learning and real-world projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-24">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} p-0.5`}>
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-slate-200" />
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-100">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-slate-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${category.gradient}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-slate-100">
            Technologies I Work With
          </h3>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-20">
            {technologies.map((tech, index) => (
              <motion.button
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                onClick={() => setActiveFilter(activeFilter === tech ? null : tech)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${activeFilter === tech
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                    : "bg-slate-900/50 border border-slate-800 text-slate-300 hover:border-cyan-500/30 hover:text-cyan-400"
                  }`}
              >
                {tech}
              </motion.button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-slate-400 mb-8">
              Want to see these skills in action?
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-colors">
              View Projects
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <SectionDivider position="bottom" />
    </section>
  );
}