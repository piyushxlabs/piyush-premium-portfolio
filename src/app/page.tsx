import { HeroSection } from "@/components/sections/hero/HeroSection";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { SkillsSection } from "@/components/sections/skills/SkillsSection";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { VisionSection } from "@/components/sections/vision/VisionSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <VisionSection />
      <ContactSection />
    </main>
  );
}
