import { Header } from "@/components/layout/Header";
import { SideIndex } from "@/components/layout/SideIndex";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { ScrollDepthCanvas } from "@/components/layout/ScrollDepthCanvas";
import { Footer } from "@/components/layout/Footer";
import { HeroArtwork } from "@/components/hero/HeroArtwork";
import { HeroProfile } from "@/components/hero/HeroProfile";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { BeyondSection } from "@/components/sections/BeyondSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CommandPalette } from "@/components/command-palette/CommandPalette";

export default function Home() {
  return (
    <>
      <GridOverlay />
      <ScrollDepthCanvas />
      <Header />
      <SideIndex />
      <CommandPalette />

      <main className="relative z-10">
        {/* Clean Atmospheric Hero (Abstract Telemetry & Profile) */}
        <section id="hero" className="border-b border-[var(--border)]">
          <HeroArtwork />
          <HeroProfile />
        </section>

        {/* Continuous Flow Content Sections */}
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 divide-y divide-[var(--border)]">
          {/* 01: About */}
          <section id="about" className="py-10 md:py-14">
            <AboutSection />
          </section>

          {/* 02: Experience */}
          <section id="experience" className="py-10 md:py-14">
            <ExperienceSection />
          </section>

          {/* 03: Selected Work (Hardware First + 3D Robot Case Study Trigger) */}
          <section id="projects" className="py-10 md:py-14">
            <ProjectsSection />
          </section>

          {/* 04: Track Record & Competitions */}
          <section id="achievements" className="py-10 md:py-14">
            <AchievementsSection />
          </section>

          {/* 05: Hardware, AI & Software Skills */}
          <section id="skills" className="py-10 md:py-14">
            <SkillsSection />
          </section>

          {/* 06: Beyond Code */}
          <section id="beyond" className="py-8 md:py-12">
            <BeyondSection />
          </section>

          {/* 07: Contact */}
          <section id="contact" className="py-10 md:py-16">
            <ContactSection />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
