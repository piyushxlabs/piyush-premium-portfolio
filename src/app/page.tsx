import { CinematicHero } from "@/components/sections/hero/CinematicHero";
import { AboutSection } from "@/components/sections/about/AboutSection";
import { SkillsSection } from "@/components/sections/skills/SkillsSection";
import { ProjectsSection } from "@/components/sections/projects/ProjectsSection";
import { VisionSection } from "@/components/sections/vision/VisionSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { DataSphere } from "@/components/3d/DataSphere";
// import { InfinityLoop } from "@/components/3d/InfinityLoop";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <CinematicHero />
      <AboutSection />
      
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Data Intelligence</h2>
            <p className="text-muted max-w-2xl mx-auto">Visualizing the infinite possibilities of AI and data science</p>
          </div>
          <DataSphere />
        </div>
      </section>

      <SkillsSection />
      <ProjectsSection />
      
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Continuous Learning</h2>
            <p className="text-muted max-w-2xl mx-auto">The infinity symbol represents endless growth and exploration</p>
          </div>
          {/* <InfinityLoop /> */}
        </div>
      </section>

      <VisionSection />
      <ContactSection />
    </main>
  );
}
