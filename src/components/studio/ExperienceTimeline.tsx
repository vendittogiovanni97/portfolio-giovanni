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
    <section id="experience" ref={sectionRef} className="w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-[var(--color-border)] pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-2 block">
            Career Journey
          </span>
          <h2 className="[font-family:var(--font-display)] uppercase text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] text-[var(--foreground)]">
            {t.experience.title}
          </h2>
          <p className="mt-3 text-[var(--foreground)] opacity-75 text-[16px] sm:text-[18px] max-w-xl font-medium">
            {t.experience.subtitle}
          </p>
        </div>

        <div className="max-w-4xl space-y-6">
          {MILESTONES.map((item, idx) => {
            const copy = t.experience.milestones[item.id];
            return (
              <motion.div
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-7 sm:p-9 transition-transform hover:scale-[1.01]"
                style={{
                  boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.25))",
                }}
              >
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-2xl bg-[var(--color-pill-bg)] flex items-center justify-center text-[var(--color-pill-text)] shrink-0 shadow-md">
                        <Building2 className="w-6 h-6 text-[var(--color-accent)]" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                        </span>
                      </div>
                      <div>
                        <h3 className="[font-family:var(--font-display)] uppercase text-2xl sm:text-3xl text-[var(--foreground)] leading-tight tracking-tight">
                          {copy.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-[12px] font-bold text-[var(--foreground)] px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)]">
                            {copy.company}
                          </span>
                          <span className="text-[12px] font-semibold text-[var(--foreground)] opacity-70 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {copy.year}
                          </span>
                          <span className="text-[12px] font-medium text-[var(--foreground)] opacity-50">· {copy.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[var(--foreground)] opacity-80 text-[15px] sm:text-[16px] leading-relaxed mb-6 font-medium max-w-2xl">
                    {copy.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-[12px] uppercase font-bold text-[var(--foreground)] tracking-wider flex items-center gap-2 mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                      <span>{t.experience.results}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {copy.achievements.map((ach, aIdx) => (
                        <li key={aIdx} data-achievement className="flex items-start gap-2.5 text-[14.5px] text-[var(--foreground)] opacity-85 font-medium">
                          <span className="mt-2 w-2 h-2 rounded-full bg-[var(--color-accent)] shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="border-t border-[var(--color-border)] pt-5 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-[12px] font-semibold bg-[var(--background)] text-[var(--foreground)] opacity-85 border border-[var(--color-border)]"
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
