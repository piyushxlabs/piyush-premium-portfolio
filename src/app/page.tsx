import { CinematicHero } from "@/components/sections/hero/CinematicHero";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { SkillsSection } from "@/components/sections/skills/SkillsSection";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { VisionSection } from "@/components/sections/vision/VisionSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col">
      <div className="absolute inset-0 bg-glow opacity-30 pointer-events-none" />
      <div className="relative z-10">
        <CinematicHero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <VisionSection />
        <ContactSection />
      </div>
    </main>
  );
}
