// ProjectsSection — Projects showcase with filtering
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/core";
import { GlassCard } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
  },
];

const categories = ["All", "AI/ML", "Data Science", "Automation"];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
              Featured Work
            </motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Selected <span className="text-gradient-heading">Projects</span>
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              Real-world applications of AI, data science, and automation
              that solve meaningful problems
            </p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category
                  ? "bg-accent-cyan text-background"
                  : "bg-glass hover:bg-glass-heavy"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <GlassCard className="p-0 overflow-hidden h-full flex flex-col group hover:scale-105 transition-transform">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-accent-cyan/20 to-accent-lavender/20 flex items-center justify-center">
                  <span className="text-4xl font-heading font-bold text-gradient-heading">
                    {project.title.charAt(0)}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs bg-overlay-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-accent-cyan transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-accent-cyan transition-colors"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/work">
            <Button variant="outline" size="lg">
              View All Projects
              <ArrowRight size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
