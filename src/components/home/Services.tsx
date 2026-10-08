"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LayoutGrid, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { config } from "@/lib/config";

const SERVICE_ICONS = {
  platforms: LayoutGrid,
  ai: Sparkles,
  performance: ShieldCheck,
} as const;

export function Services() {
  const { t, href } = useI18n();
  const reduce = useReducedMotion();

  const services = [
    {
      key: "platforms" as const,
      data: t.services.items.platforms,
      icon: SERVICE_ICONS.platforms,
    },
    {
      key: "ai" as const,
      data: t.services.items.ai,
      icon: SERVICE_ICONS.ai,
      featured: true,
    },
    {
      key: "performance" as const,
      data: t.services.items.performance,
      icon: SERVICE_ICONS.performance,
    },
  ];

  return (
    <section id="services" className="w-full py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-16 border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent block mb-2">
              {t.services.eyebrow}
            </span>
            <h2 className="[font-family:var(--font-display)] uppercase text-4xl sm:text-5xl text-slate-100 tracking-tight">
              {t.services.title}
            </h2>
            <p className="mt-3 text-slate-400 text-base sm:text-lg">
              {t.services.subtitle}
            </p>
          </div>

          <a
            href={config.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-2.5 rounded-full bg-accent text-slate-950 hover:bg-accent-bright transition-all font-headline text-sm font-semibold shadow-[0_0_15px_rgba(202,164,86,0.25)] cursor-pointer group"
          >
            <Calendar className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="text-slate-950">{t.services.bookCall}</span>
            <ArrowRight className="w-4 h-4 text-slate-950 transition-transform group-hover:translate-x-1 shrink-0" />
          </a>
        </div>

        {/* 3 Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.key}
                initial={reduce ? false : { opacity: 0, y: 25 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduce ? undefined : { y: -5, rotateX: 1.1, rotateY: idx % 2 === 0 ? -1.2 : 1.2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                style={{ transformStyle: "preserve-3d" }}
                className={`depth-panel depth-panel--${idx % 2 === 0 ? "left" : "right"} relative rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 group glass-panel ${
                  srv.featured
                    ? "border-accent/50"
                    : "border-slate-800"
                }`}
              >
                <div className="depth-panel__face relative z-10">
                  {/* Category Pill + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`depth-panel__icon p-3 rounded-xl border ${
                        srv.featured
                          ? "bg-accent text-slate-950 border-accent"
                          : "bg-slate-950 border-slate-800 text-accent"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xs uppercase tracking-widest text-slate-400 font-semibold px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800">
                      {srv.data.tag}
                    </span>
                  </div>

                  <h3 className="[font-family:var(--font-display)] uppercase text-2xl text-slate-100 tracking-tight mb-4">
                    {srv.data.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {srv.data.desc}
                  </p>

                  {/* Deliverables Bullet List */}
                  <div className="border-t border-slate-800/80 pt-5 space-y-3">
                    {srv.data.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-300 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="depth-panel__face relative z-10 mt-8 pt-6 border-t border-slate-800/60">
                  <Link
                    href={href("/contact")}
                    className="inline-flex items-center gap-2 font-headline text-xs font-semibold text-accent hover:text-accent-bright transition-colors uppercase tracking-wider group-hover:translate-x-1 duration-200"
                  >
                    <span>{t.services.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
