// // File: components/sections/projects/FeaturedProjects.tsx
// "use client";

// import { motion } from "framer-motion";
// import { ExternalLink, Github, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// export function FeaturedProjects() {
//   const projects = [
//     {
//       title: "AI Automation Platform",
//       description: "Intelligent workflow automation using machine learning",
//       tags: ["AI", "Python", "Automation"],
//       image: "/images/projects/project-1-cover.jpg",
//       demo: "#",
//       github: "#",
//     },
//     {
//       title: "Data Visualization Dashboard",
//       description: "Interactive analytics platform for complex datasets",
//       tags: ["Data Science", "React", "D3.js"],
//       image: "/images/projects/project-2-cover.jpg",
//       demo: "#",
//       github: "#",
//     },
//     {
//       title: "Neural Network Model",
//       description: "Custom ML model for predictive analytics",
//       tags: ["ML", "TensorFlow", "Python"],
//       image: "/images/projects/project-3-cover.jpg",
//       demo: "#",
//       github: "#",
//     },
//   ];

//   return (
//     <section className="relative py-20 sm:py-32 overflow-hidden">
//       <div className="absolute inset-0 bg-bg-surface" />
      
//       <div className="container relative z-10 mx-auto px-4 sm:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12 sm:mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6">
//             Featured{" "}
//             <span className="bg-gradient-to-r from-accent-cyan to-accent-lavender bg-clip-text text-transparent">
//               Projects
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
//             Exploring AI, data science, and automation through hands-on projects
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: index * 0.1 }}
//               whileHover={{ y: -10 }}
//               className="bg-glass backdrop-blur-xl rounded-2xl overflow-hidden border border-overlay-medium hover:border-accent-cyan/40 transition-all group"
//             >
//               <div className="relative h-48 bg-bg-elevated">
//                 <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-lavender/20 group-hover:opacity-50 transition-opacity" />
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-accent-cyan transition-colors">
//                   {project.title}
//                 </h3>
//                 <p className="text-sm text-text-muted mb-4">{project.description}</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.tags.map((tag) => (
//                     <span
//                       key={tag}
//                       className="px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs font-medium"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex gap-3">
//                   <a
//                     href={project.demo}
//                     className="flex items-center gap-1 text-sm text-accent-cyan hover:text-accent-lavender transition-colors"
//                   >
//                     <ExternalLink size={16} />
//                     Demo
//                   </a>
//                   <a
//                     href={project.github}
//                     className="flex items-center gap-1 text-sm text-accent-cyan hover:text-accent-lavender transition-colors"
//                   >
//                     <Github size={16} />
//                     Code
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="text-center"
//         >
//           <Link href="/work">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-lavender text-white font-heading font-semibold shadow-glow"
//             >
//               <span className="flex items-center gap-2">
//                 View All Projects
//                 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//               </span>
//             </motion.button>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // File: components/sections/skills/SkillsShowcase.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Brain, Code, Database, Sparkles } from "lucide-react";

// export function SkillsShowcase() {
//   const skillCategories = [
//     {
//       icon: Brain,
//       title: "AI & Machine Learning",
//       skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Neural Networks"],
//       color: "accent-cyan",
//     },
//     {
//       icon: Database,
//       title: "Data Science",
//       skills: ["Pandas", "NumPy", "Data Visualization", "Analytics"],
//       color: "accent-lavender",
//     },
//     {
//       icon: Code,
//       title: "Development",
//       skills: ["Python", "JavaScript", "React", "Next.js"],
//       color: "accent-cyan",
//     },
//     {
//       icon: Sparkles,
//       title: "Automation",
//       skills: ["Workflow Design", "API Integration", "Process Optimization"],
//       color: "accent-lavender",
//     },
//   ];

//   return (
//     <section className="relative py-20 sm:py-32 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-b from-bg-surface via-bg-dark to-bg-surface" />
      
//       <div className="container relative z-10 mx-auto px-4 sm:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12 sm:mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 sm:mb-6">
//             Technical{" "}
//             <span className="bg-gradient-to-r from-accent-cyan to-accent-lavender bg-clip-text text-transparent">
//               Expertise
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto">
//             Building with modern technologies and frameworks
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
//           {skillCategories.map((category, index) => (
//             <motion.div
//               key={category.title}
//               initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: index * 0.1 }}
//               whileHover={{ scale: 1.02 }}
//               className="bg-glass backdrop-blur-xl rounded-2xl p-8 border border-overlay-medium hover:border-accent-cyan/40 transition-all"
//             >
//               <category.icon className="w-12 h-12 text-accent-cyan mb-4" />
//               <h3 className="text-2xl font-heading font-semibold mb-4">{category.title}</h3>
//               <div className="flex flex-wrap gap-2">
//                 {category.skills.map((skill) => (
//                   <span
//                     key={skill}
//                     className="px-4 py-2 rounded-lg bg-bg-elevated border border-accent-cyan/20 text-sm font-medium"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // File: components/sections/vision/VisionPreview.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Rocket, Target, Zap } from "lucide-react";
// import Link from "next/link";

// export function VisionPreview() {
//   return (
//     <section className="relative py-20 sm:py-32 overflow-hidden">
//       <div className="absolute inset-0 bg-bg-elevated" />
//       <motion.div
//         animate={{
//           scale: [1, 1.1, 1],
//           opacity: [0.2, 0.3, 0.2],
//         }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl"
//       />
      
//       <div className="container relative z-10 mx-auto px-4 sm:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
//             Building the{" "}
//             <span className="bg-gradient-to-r from-accent-cyan to-accent-lavender bg-clip-text text-transparent">
//               Future
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
//             My vision is to build AI-driven startups that transform how people learn, create, 
//             and connect. Technology that doesn't just work smart, but feels human.
//           </p>
//         </motion.div>

//         <div className="grid md:grid-cols-3 gap-6 mb-12">
//           {[
//             {
//               icon: Rocket,
//               title: "AI Startups",
//               description: "Building intelligent products that solve real problems",
//             },
//             {
//               icon: Target,
//               title: "Social Impact",
//               description: "Creating technology that empowers communities",
//             },
//             {
//               icon: Zap,
//               title: "Innovation",
//               description: "Pushing boundaries with ethical AI solutions",
//             },
//           ].map((item, index) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: index * 0.1 }}
//               whileHover={{ y: -10 }}
//               className="bg-glass backdrop-blur-xl rounded-2xl p-8 border border-overlay-medium hover:border-accent-lavender/40 transition-all text-center"
//             >
//               <item.icon className="w-12 h-12 text-accent-lavender mx-auto mb-4" />
//               <h3 className="text-xl font-heading font-semibold mb-3">{item.title}</h3>
//               <p className="text-sm text-text-muted">{item.description}</p>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="text-center"
//         >
//           <Link href="/vision">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-accent-lavender/40 bg-glass backdrop-blur-xl hover:bg-accent-lavender/10 transition-all font-heading font-semibold"
//             >
//               Explore My Vision
//             </motion.button>
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // File: components/sections/contact/ContactCTA.tsx
// "use client";

// import { motion } from "framer-motion";
// import { Mail, Linkedin, Github, Twitter } from "lucide-react";
// import Link from "next/link";

// export function ContactCTA() {
//   const socialLinks = [
//     { icon: Linkedin, href: "#", label: "LinkedIn" },
//     { icon: Github, href: "#", label: "GitHub" },
//     { icon: Twitter, href: "#", label: "Twitter" },
//     { icon: Mail, href: "#", label: "Email" },
//   ];

//   return (
//     <section className="relative py-20 sm:py-32 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-surface to-bg-dark" />
//       <motion.div
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.2, 0.4, 0.2],
//         }}
//         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-lavender/20 rounded-full blur-3xl"
//       />
      
//       <div className="container relative z-10 mx-auto px-4 sm:px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center max-w-3xl mx-auto"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6">
//             Let's Build{" "}
//             <span className="bg-gradient-to-r from-accent-cyan to-accent-lavender bg-clip-text text-transparent">
//               Together
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg text-text-muted mb-8 leading-relaxed">
//             Whether you're looking for collaboration, mentorship, or just want to chat 
//             about AI and innovation, I'd love to hear from you.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
//             <Link href="/connect">
//               <motion.button
//                 whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34, 211, 238, 0.5)" }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-lavender text-white font-heading font-semibold shadow-glow"
//               >
//                 Get in Touch
//               </motion.button>
//             </Link>
//           </div>

//           <div className="flex items-center justify-center gap-4">
//             {socialLinks.map((social, index) => (
//               <motion.a
//                 key={social.label}
//                 href={social.href}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.8, delay: index * 0.1 }}
//                 whileHover={{ scale: 1.1, y: -5 }}
//                 className="w-12 h-12 flex items-center justify-center rounded-full bg-glass border border-overlay-medium hover:border-accent-cyan/40 transition-all"
//                 aria-label={social.label}
//               >
//                 <social.icon size={20} className="text-accent-cyan" />
//               </motion.a>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }