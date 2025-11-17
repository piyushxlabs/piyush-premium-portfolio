"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/core";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/animations/useReducedMotion";

const projects = [
  {
    id: 1,
    title: "AI Content Generator",
    description: "Intelligent content creation tool using GPT-4 for automated blog writing and social media posts",
    category: "AI/ML",
    tags: ["Python", "OpenAI", "React", "FastAPI"],
    image: "/images/projects/ai-content.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    gradient: "from-cyan-500/10 to-purple-500/10",
  },
  {
    id: 2,
    title: "Data Visualization Dashboard",
    description: "Interactive analytics platform for real-time data insights with custom visualizations",
    category: "Data Science",
    tags: ["Python", "Plotly", "Pandas", "Next.js"],
    image: "/images/projects/data-viz.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    id: 3,
    title: "Workflow Automation Suite",
    description: "Automated task management system that streamlines repetitive processes",
    category: "Automation",
    tags: ["Python", "Selenium", "Node.js", "MongoDB"],
    image: "/images/projects/automation.jpg",
    github: "https://github.com",
    demo: "https://demo.com",
    gradient: "from-pink-500/10 to-orange-500/10",
  },
];

const categories = ["All", "AI/ML", "Data Science", "Automation"];

function StackingProjectCard({
  project,
  index,
  totalProjects,
  scrollYProgress,
}: {
  project: (typeof projects)[0];
  index: number;
  totalProjects: number;
  scrollYProgress: any;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  const segmentDuration = 1 / totalProjects;
  // कार्ड एनिमेशन कब शुरू होगा
  const cardStart = index * segmentDuration;
  // कार्ड पूरी तरह से कब "इन" हो जाएगा
  const cardPeak = cardStart + segmentDuration * 0.7;
  // अगला कार्ड कब एनिमेट होना शुरू होगा
  const cardEnd = (index + 1) * segmentDuration;
  // यह कार्ड कब पूरी तरह "स्टैक" (पीछे) हो जाएगा
  const stackEnd = Math.min(cardEnd + 0.15, 1);
  
  // *** Z-INDEX फिक्स ***
  // zIndex को 'index' पर सेट करें ताकि 0, 1, 2... हो।
  // इससे नया कार्ड (जैसे zIndex: 1) पुराने कार्ड (zIndex: 0) के ऊपर आएगा।
  const zIndex = index;

  const y = useTransform(
    scrollYProgress,
    [cardStart, cardPeak],
    [50, 0]
  );

  // *** एनिमेशन लॉजिक फिक्स ***

  // उन कार्ड्स के लिए स्केल जो आखिरी नहीं हैं
  const scale = useTransform(
    scrollYProgress,
    [cardStart, cardPeak, cardEnd, stackEnd],
    [0.98, 1, 1, 0.96 - (index * 0.02)] // 'इन' (0.98 -> 1), फिर 'आउट' (1 -> 0.96)
  );

  // उन कार्ड्स के लिए ओपैसिटी जो आखिरी नहीं हैं
  const opacity = useTransform(
    scrollYProgress,
    [cardStart, cardPeak, cardEnd, stackEnd],
    [0, 1, 1, 0.7] // 'इन' (0 -> 1), फिर 'आउट' (1 -> 0.7)
  );
  
  // आखिरी कार्ड के लिए स्केल (यह 'आउट' नहीं होता)
  const lastCardScale = useTransform(
    scrollYProgress,
    [cardStart, cardPeak],
    [0.98, 1]
  );

  // आखिरी कार्ड के लिए ओपैसिटी (यह 'आउट' नहीं होता)
  const lastCardOpacity = useTransform(
    scrollYProgress,
    [cardStart, cardPeak],
    [0, 1]
  );

  // इंडेक्स के आधार पर सही ट्रांसफॉर्म चुनें
  const finalScale = index === totalProjects - 1 ? lastCardScale : scale;
  const finalOpacity = index === totalProjects - 1 ? lastCardOpacity : opacity;

  if (prefersReducedMotion) {
    return (
      // फिक्स्ड zIndex यहाँ भी लागू करें
      <div className="sticky top-24 md:top-32 w-full mb-8" style={{ zIndex: zIndex }}>
        <GlassCard variant="large" glow className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs font-medium mb-4">
                Project {index + 1}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-slate-100">
                {project.title}
              </h3>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed max-w-[60ch]">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-sm bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-slate-600/50 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-accent-cyan/60 hover:text-accent-cyan transition-all duration-200"
                >
                  <Github size={18} />
                  View Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-lavender text-slate-900 font-semibold transition-all duration-200"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              </div>
            </div>
            <div className="aspect-video bg-gradient-to-br from-accent-cyan/20 to-accent-lavender/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
              <span className="text-6xl font-heading font-bold text-gradient-heading relative z-10">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
        </GlassCard>
      </div>
    );
  }

  return (
    <motion.div
      style={{
        y,
        scale: finalScale,      // फिक्स्ड scale
        opacity: finalOpacity,  // फिक्स्ड opacity
        zIndex: zIndex,         // फिक्स्ड zIndex
        transformOrigin: 'center top',
        willChange: 'transform, opacity',
      }}
      className="sticky top-24 md:top-32 w-full"
    >
      <GlassCard variant="large" glow className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50`} />
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan text-xs font-medium mb-4"
            >
              Project {index + 1}
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl md:text-3xl font-heading font-bold mb-4 text-slate-100"
            >
              {project.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg text-slate-300 mb-6 leading-relaxed max-w-[60ch]"
            >
              {project.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-sm bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-slate-600/50 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex gap-4"
            >
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-accent-cyan/60 hover:text-accent-cyan transition-all duration-200"
              >
                <Github size={18} />
                View Code
              </motion.a>
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent-cyan to-accent-lavender text-slate-900 font-semibold transition-all duration-200"
              >
                <ExternalLink size={18} />
                Live Demo
              </motion.a>
            </motion.div>
          </div>
          <div className="aspect-video bg-gradient-to-br from-accent-cyan/20 to-accent-lavender/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
            <span className="text-6xl font-heading font-bold text-gradient-heading relative z-10">
              {project.title.charAt(0)}
            </span>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </GlassCard>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="container mx-auto container-padding max-w-7xl">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-glass border border-overlay-medium text-sm font-medium mb-4"
            >
              Featured Work
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight tracking-tight">
              Selected <span className="text-gradient-heading">Projects</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Real-world applications of AI, data science, and automation
              that solve meaningful problems
            </p>
          </div>
        </FadeIn>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-7 py-3 rounded-xl font-heading font-semibold transition-all duration-300 overflow-hidden group ${
                activeCategory === category
                  ? "bg-gradient-to-r from-accent-cyan to-accent-lavender text-background shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                  : "bg-glass backdrop-blur-xl border border-overlay-medium hover:border-accent-cyan/60 hover:bg-glass-heavy hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              }`}
            >
              {activeCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto mb-20"
          style={{
            // यह minHeight एनिमेशन के लिए ज़रूरी है
            minHeight: `${filteredProjects.length * 30}vh`,
          }}
        >
          {filteredProjects.map((project, index) => (
            <StackingProjectCard
              key={project.id}
              project={project}
              index={index}
              totalProjects={filteredProjects.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/work">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg">
                View All Projects
                <motion.div
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}