# 🚀 Piyush Premium Portfolio

> **Building intelligence with empathy — one idea at a time.**

A world-class, premium AI portfolio website showcasing Piyush's journey as an AI innovator, data scientist, and future founder. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

### 🎨 Design System
- **Neural Horizon × Cognitive Infinity Theme** — Futuristic minimalism with emotional depth
- **Glassmorphism Effects** — Premium frosted glass UI components
- **Gradient Glow System** — Animated gradient borders and hover effects
- **Smooth Animations** — 60fps Framer Motion animations throughout
- **Responsive Design** — Seamless experience across all devices

### 🧠 Core Sections
- **Hero Section** — Cinematic intro with typewriter effect and gradient background
- **About Section** — Personal story with core values display
- **Skills Section** — Interactive skill bars and tech stack showcase
- **Projects Section** — Filterable project gallery with hover effects
- **Vision Section** — Future goals and startup vision
- **Contact Section** — Multiple contact methods with ambient effects

### 🎭 Components
- **Navbar** — Glassmorphism navigation with scroll effects
- **Footer** — Multi-column layout with social links
- **Cards** — Base, Glass, and Hover variants
- **Buttons** — Primary, Secondary, Outline, Ghost, and Glow variants
- **Animations** — FadeIn, SlideUp, StaggerChildren, and more

### 🌟 Advanced Features
- **Background Effects** — Particle system with neural network connections
- **Gradient Orbs** — Floating ambient gradient spheres
- **Theme System** — Dark/Light mode support (dark by default)
- **Smooth Scrolling** — Optimized scroll experience
- **SEO Optimized** — Meta tags, Open Graph, and structured data

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Fonts:** Sora, Inter, Fira Code (Google Fonts)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/piyush-premium-portfolio.git

# Navigate to project directory
cd piyush-premium-portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🎯 Project Structure

```
piyush-premium-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/           # Additional pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── animations/        # Animation components
│   │   ├── layout/            # Layout components (Navbar, Footer)
│   │   ├── sections/          # Page sections (Hero, About, etc.)
│   │   ├── ui/                # UI primitives (Button, Card, etc.)
│   │   └── providers/         # Context providers
│   ├── data/                  # Static data (JSON)
│   ├── content/               # MDX content
│   ├── utils/                 # Helper functions
│   ├── hooks/                 # Custom React hooks
│   └── styles/                # Additional styles
├── public/                    # Static assets
└── docs/                      # Documentation
```

## 🎨 Design System

### Colors
```css
--color-bg-primary: #0f172a;      /* Deep navy background */
--color-accent-primary: #22d3ee;   /* Cyan accent */
--color-accent-secondary: #a78bfa; /* Lavender accent */
--color-accent-tertiary: #14b8a6;  /* Teal accent */
```

### Typography
- **Headings:** Sora (geometric, modern)
- **Body:** Inter (clean, readable)
- **Code:** Fira Code (monospace)

### Spacing
- Base grid: 8px
- Section padding: 80px (desktop) / 48px (mobile)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Build for Production
```bash
npm run build
npm run start
```

## 📝 Customization

### Update Personal Information
1. Edit `src/data/personal/about.json` for personal story
2. Edit `src/data/projects/index.json` for projects
3. Edit `src/data/skills/technical.json` for skills
4. Edit `src/data/social/links.json` for social media links

### Add New Projects
Create a new MDX file in `src/content/projects/`:
```mdx
---
title: "Project Name"
date: "2024-01-01"
category: "AI/ML"
---

Your project content here...
```

### Modify Colors
Update CSS variables in `src/app/globals.css`:
```css
:root {
  --color-accent-primary: #your-color;
}
```

## 🎯 Development Phases

- ✅ **Phase 1:** Foundation Setup (Design system, Tailwind config)
- ✅ **Phase 2:** Core Components (Buttons, Cards, Layout)
- ✅ **Phase 3:** Homepage Sections (Hero, About, Skills, Projects, Vision, Contact)
- ✅ **Phase 4:** Animations (FadeIn, SlideUp, Background effects)
- ✅ **Phase 5:** Content & Data (JSON data files, MDX content)
- ✅ **Phase 6:** Additional Pages (Work, About, Vision, Journey, Lab, Thoughts, Connect)
- ⏳ **Phase 7:** Advanced Features (3D elements, AI integration)
- ⏳ **Phase 8:** Testing & Optimization
- ⏳ **Phase 9:** Deployment

## 📚 Documentation

- [Design System](./docs/design/design-system.md)
- [Component Guidelines](./docs/development/component-guidelines.md)
- [Animation Principles](./docs/design/animation-principles.md)
- [Deployment Guide](./docs/deployment/vercel-setup.md)

## 🤝 Contributing

This is a personal portfolio project. However, if you find bugs or have suggestions, feel free to open an issue.

## 📄 License

© 2024 Piyush. All rights reserved.

## 🌟 Acknowledgments

- Design inspiration: Apple, OpenAI, Notion
- Theme: Neural Horizon × Cognitive Infinity
- Built with passion for AI innovation and human empathy

---

**"Designing intelligence with empathy — one idea at a time."**
