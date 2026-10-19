"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Sparkles, Building2 } from "lucide-react";
import { useI18n } from "@/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MILESTONES = [
  { id: "agilae", stack: ["Next.js 16", "React 19", "TypeScript", "Material UI", "Node.js", "Express", "MongoDB", "Docker"] },
] as const;

export function ExperienceTimeline() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll<HTMLElement>("[data-achievement]");
      gsap.fromTo(
        items,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="w-full py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="mb-10 border-b border-black/[0.08] pb-6">
          <h2 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.035em] text-[#111111]">
            {t.experience.title}
          </h2>
          <p className="mt-2 text-neutral-600 text-[15px] sm:text-[16px] max-w-xl">
            {t.experience.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {MILESTONES.map((item, idx) => {
            const copy = t.experience.milestones[item.id];
            return (
              <motion.div
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-2xl card-elevation-high p-7 sm:p-9 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl bg-[#111111] flex items-center justify-center text-white shrink-0 shadow-xs">
                        <Building2 className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[22px] sm:text-[26px] font-semibold text-[#111111] leading-tight tracking-tight">
                          {copy.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[12px] font-semibold text-[#111111] px-2.5 py-0.5 rounded-full bg-black/[0.04]">
                            {copy.company}
                          </span>
                          <span className="text-[12px] font-medium text-neutral-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {copy.year}
                          </span>
                          <span className="text-[12px] text-neutral-400">· {copy.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-neutral-600 text-[15px] leading-relaxed mb-6 max-w-2xl">
                    {copy.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-[12px] uppercase font-semibold text-neutral-800 tracking-wider flex items-center gap-2 mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.experience.results}</span>
                    </div>
                    <ul className="space-y-2">
                      {copy.achievements.map((ach, aIdx) => (
                        <li key={aIdx} data-achievement className="flex items-start gap-2.5 text-[14px] text-neutral-700">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="border-t border-black/[0.06] pt-4 flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11.5px] font-medium bg-[#f5f4f2] text-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
