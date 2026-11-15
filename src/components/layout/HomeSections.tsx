"use client";

import type { ProjectMetadata } from "@/lib/content";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Credentials } from "@/components/credentials/Credentials";
import { CreativeLabStrip } from "@/components/home/CreativeLabStrip";
import { ExperienceTimeline } from "@/components/studio/ExperienceTimeline";

export function HomeSections({ projects }: { projects: ProjectMetadata[] }) {
  return (
    <div className="relative flex flex-col gap-24 lg:gap-36 w-full pt-10 pb-20">
      {/* 1. Projects first: high impact showcase */}
      <section id="work" className="w-full">
        <SelectedWork projects={projects} />
      </section>

      {/* 2. Credentials & Authority (Anthropic Badges, Certs) */}
      <section className="w-full border-t border-[var(--color-border)] pt-16 sm:pt-20">
        <Credentials />
      </section>

      {/* 3. Creative Lab & Interactive Experiments */}
      <section className="w-full border-t border-[var(--color-border)] pt-16 sm:pt-20">
        <CreativeLabStrip />
      </section>

      {/* 4. Career Timeline & Engineering Milestones */}
      <section className="w-full border-t border-[var(--color-border)] pt-16 sm:pt-20">
        <ExperienceTimeline />
      </section>
    </div>
  );
}
