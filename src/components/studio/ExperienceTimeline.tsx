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
        <div className="mb-10 border-b border-slate-800 pb-6">
          <h2 className="[font-family:var(--font-display)] uppercase text-4xl sm:text-5xl text-slate-100 tracking-tight">
            {t.experience.title}
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            {t.experience.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {MILESTONES.map((item, idx) => {
            const copy = t.experience.milestones[item.id];
            return (
              <motion.div
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                whileHover={reduce ? undefined : { y: -5, rotateX: 1.1, rotateY: -0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="depth-panel depth-panel--center glass-panel rounded-3xl overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="depth-panel__face relative z-10 p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-accent shrink-0">
                        <Building2 className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                        </span>
                      </div>
                      <div>
                        <h3 className="[font-family:var(--font-display)] uppercase text-2xl sm:text-3xl text-slate-100 leading-tight">
                          {copy.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="font-mono text-xs text-accent px-2.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                            {copy.company}
                          </span>
                          <span className="font-mono text-2xs text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {copy.year}
                          </span>
                          <span className="font-mono text-2xs text-slate-500">· {copy.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                    {copy.description}
                  </p>

                  <div className="mb-6">
                    <div className="font-mono text-2xs text-accent uppercase tracking-widest flex items-center gap-2 mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.experience.results}</span>
                    </div>
                    <ul className="space-y-2.5">
                      {copy.achievements.map((ach, aIdx) => (
                        <li key={aIdx} data-achievement className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech stack: an infinite marquee, the stack always in motion */}
                <div className="border-t border-slate-800/80 py-4 overflow-hidden">
                  <div className="flex w-max animate-infinite-scroll-right">
                    {[...item.stack, ...item.stack].map((tech, i) => (
                      <span
                        key={`${tech}-${i}`}
                        className="mx-2 px-3 py-1.5 rounded-lg font-mono text-xs bg-slate-950 border border-slate-800 text-slate-300 whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
