"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { SkillsSection } from "@/components/sections/skills/SkillsSection";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { VisionSection } from "@/components/sections/vision/VisionSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";

const CinematicHero = dynamic(() => import("@/components/sections/hero/CinematicHero").then(mod => ({ default: mod.CinematicHero })), { ssr: false });
const CinematicHeroMobile = dynamic(() => import("@/components/sections/hero/CinematicHeroMobile").then(mod => ({ default: mod.CinematicHeroMobile })), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="flex flex-1 flex-col">
      {isMobile ? <CinematicHeroMobile /> : <CinematicHero />}
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <VisionSection />
      <ContactSection />
    </main>
  );
}
