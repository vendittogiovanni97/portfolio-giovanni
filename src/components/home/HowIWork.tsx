"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Layout, Code2, Rocket } from "lucide-react";
import { useI18n } from "@/i18n";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Tag values are proper nouns/tech names — kept literal in every locale.
const STEP_TAGS: Record<string, string[]> = {
  analysis: ["Model Design", "API Contracts", "Type-Safety"],
  design: ["React 19", "Design System", "Responsive UX"],
  development: ["Node.js / Express", "Prisma / Mongo", "AI Automation"],
  deploy: ["Docker", "Vercel Cloud", "Performance 99+"],
};
const STEP_ICONS: Record<string, React.ReactNode> = {
  analysis: <Search className="w-5 h-5 text-accent" />,
  design: <Layout className="w-5 h-5 text-accent" />,
  development: <Code2 className="w-5 h-5 text-accent" />,
  deploy: <Rocket className="w-5 h-5 text-accent" />,
};
const STEP_ORDER = ["analysis", "design", "development", "deploy"] as const;

export function HowIWork() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const steps = STEP_ORDER.map((key, i) => ({
    key,
    step: String(i + 1).padStart(2, "0"),
    icon: STEP_ICONS[key],
    title: t.howIWork.steps[key].title,
    desc: t.howIWork.steps[key].desc,
    tags: STEP_TAGS[key],
  }));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // The spine grows as the visitor scrolls through the steps.
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          }
        );
      }

      section.querySelectorAll<HTMLElement>("[data-step]").forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(
          el,
          { opacity: 0, x: fromLeft ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          }
        );
        const dot = el.querySelector<HTMLElement>("[data-dot]");
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: { trigger: el, start: "top 82%", once: true },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-i-work" ref={sectionRef} className="w-full py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        <div className="mb-16 border-b border-slate-800 pb-6">
          <h2 className="[font-family:var(--font-display)] uppercase text-4xl sm:text-5xl text-slate-100 tracking-tight">
            {t.howIWork.title}
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl">
            {t.howIWork.subtitle}
          </p>
        </div>

        {/* Vertical process spine */}
        <div className="relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-800 hidden md:block"
            aria-hidden="true"
          >
            <div
              ref={lineRef}
              className="absolute inset-0 bg-accent origin-top"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((item, i) => {
              const fromLeft = i % 2 === 0;
              return (
                <div
                  key={item.key}
                  data-step
                  className={`relative md:flex items-center gap-10 ${fromLeft ? "" : "md:flex-row-reverse"}`}
                >
                  {/* Center dot on the spine */}
                  <span
                    data-dot
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent ring-4 ring-background z-10 items-center justify-center"
                    aria-hidden="true"
                  />

                  {/* Ghost number */}
                  <div className={`hidden md:block md:w-1/2 ${fromLeft ? "text-right pr-16" : "text-left pl-16"}`}>
                    <span className="[font-family:var(--font-display)] text-[10rem] leading-none text-slate-900 select-none">
                      {item.step}
                    </span>
                  </div>

                  {/* Content card */}
                  <div
                    className={`depth-panel depth-panel--${fromLeft ? "left" : "right"} md:w-1/2 glass-panel p-6 rounded-2xl`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center gap-3 mb-4 md:hidden">
                      <span className="font-mono text-xs text-accent/80 font-bold px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                        {item.step}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="depth-panel__icon p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                        {item.icon}
                      </div>
                      <h3 className="[font-family:var(--font-display)] uppercase text-xl text-slate-100">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-5">
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md font-mono text-3xs bg-slate-950 border border-slate-800 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
