# Quick Integration Guide - 3D Projects Carousel

## 🚀 Replace Existing Projects Section

### Option 1: Replace in Home Page

Open `src/app/page.tsx` and replace the existing `<ProjectsSection />`:

```tsx
// BEFORE
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <CinematicHero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />  {/* ← Remove this */}
      <VisionSection />
      <ContactSection />
    </main>
  );
}
```

```tsx
// AFTER
import ProjectsCarousel from "@/components/projects/ProjectsCarousel";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <CinematicHero />
      <AboutSection />
      <SkillsSection />
      <ProjectsCarousel />  {/* ← Add this */}
      <VisionSection />
      <ContactSection />
    </main>
  );
}
```

---

## 📸 Add Placeholder Images

Create 5 placeholder images or use gradient placeholders:

### Method 1: Gradient Placeholders (Quick)

Create `public/images/projects/placeholder-1.jpg` through `placeholder-5.jpg` as simple gradient images, or the carousel will show the Sparkles icon by default.

### Method 2: Use Real Images

Replace paths in `src/data/mockProjects.ts`:

```ts
preview: '/images/projects/ai-content-generator.jpg',  // Your real image
```

---

## 🎨 Customize Colors

Edit `src/data/mockProjects.ts` to match your project colors:

```ts
{
  gradient: { 
    from: '#22D3EE',  // Your project's primary color
    to: '#A78BFA'     // Your project's secondary color
  },
}
```

---

## ✅ Verify Installation

1. **Check Framer Motion**:
```bash
pnpm list framer-motion
```

If not installed:
```bash
pnpm add framer-motion
```

2. **Restart dev server**:
```bash
pnpm dev
```

3. **Visit**: `http://localhost:3000`

---

## 🎯 Expected Result

You should see:
- ✅ 3 cards visible (center focused)
- ✅ Gradient background matching center card
- ✅ Hover on center card shows preview
- ✅ Arrow buttons navigate carousel
- ✅ Keyboard arrows work
- ✅ Smooth 3D rotation animations

---

## 🐛 Quick Fixes

### "Module not found: framer-motion"
```bash
pnpm add framer-motion
```

### Cards not visible
Check `src/data/mockProjects.ts` has 5 projects.

### Images not loading
Verify paths: `public/images/projects/placeholder-X.jpg`

### Animations too fast/slow
Edit `src/utils/carouselVariants.ts`:
```ts
stiffness: 260,  // Lower = slower
damping: 30,     // Higher = less bounce
```

---

## 📱 Test Checklist

- [ ] Desktop: 3 cards visible
- [ ] Hover center card shows preview
- [ ] Click arrows to navigate
- [ ] Press keyboard arrows (←/→)
- [ ] Mobile: swipe works
- [ ] Background gradient changes
- [ ] Smooth 60fps animations

---

## 🎉 Done!

Your premium 3D carousel is now live! 

For detailed customization, see `CAROUSEL_IMPLEMENTATION.md`.
