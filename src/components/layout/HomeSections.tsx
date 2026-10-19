"use client";

import type { ProjectMetadata } from "@/lib/content";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Credentials } from "@/components/credentials/Credentials";
import { HowIWork } from "@/components/home/HowIWork";
import { Services } from "@/components/home/Services";
import { TechRadar } from "@/components/tech-stack/TechRadar";
import { ExperienceTimeline } from "@/components/studio/ExperienceTimeline";
import { Faq } from "@/components/home/Faq";

export function HomeSections({ projects }: { projects: ProjectMetadata[] }) {
  return (
    <div className="relative flex flex-col gap-20 lg:gap-32 w-full pt-12 pb-24">
      {/* 1. Projects first: high agency demonstration */}
      <section id="work" className="w-full">
        <SelectedWork projects={projects} />
      </section>

      {/* 2. Credentials & Authority (Anthropic, certs) */}
      <section className="w-full border-t border-black/[0.07] pt-16">
        <Credentials />
      </section>

      {/* 3. Services & Engineering capabilities */}
      <section className="w-full border-t border-black/[0.07] pt-16">
        <Services />
      </section>

      {/* 4. Methodology & Workflow */}
      <section className="w-full border-t border-black/[0.07] pt-16">
        <HowIWork />
      </section>

      {/* 5. Tech Stack & Architecture Radar */}
      <section className="w-full border-t border-black/[0.07] pt-16">
        <TechRadar />
      </section>

      {/* 6. Career Timeline / Experience */}
      <section className="w-full border-t border-black/[0.07] pt-16">
        <ExperienceTimeline />
      </section>

      {/* 7. FAQ */}
      <section className="w-full border-t border-black/[0.07] pt-16">
        <Faq />
      </section>
    </div>
  );
}
