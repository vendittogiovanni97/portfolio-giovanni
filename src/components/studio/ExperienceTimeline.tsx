"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  Sparkles,
  MapPin,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { useI18n } from "@/i18n";
import Link from "next/link";

const AGILAE_STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Material UI",
  "REST APIs",
];

const ADVISORY_STACK = [
  "Nagma CRM",
  "Portale Assicurativo OCR",
  "Anthropic Claude API",
  "System Architecture",
  "Tailwind CSS",
  "Server Components",
];

export function ExperienceTimeline() {
  const { t, href } = useI18n();
  const reduce = useReducedMotion();

  const agilaeCopy = t.experience.milestones.agilae;

  return (
    <section id="experience" className="w-full relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 border-b border-[var(--color-border)] pb-8">
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-70 mb-2 block">
            {t.experience.sectionBadge}
          </span>
          <h2 className="[font-family:var(--font-display)] uppercase text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] text-[var(--foreground)]">
            {t.experience.title}
          </h2>
          <p className="mt-4 text-[var(--foreground)] opacity-75 text-[16px] sm:text-[18px] max-w-2xl font-medium leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Spencer Gabor Asymmetrical Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. Main Stage: Official Current Role at Agilae (Span 7) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-7 sm:p-9 flex flex-col justify-between"
            style={{
              boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
            }}
          >
            <div>
              {/* Top Bar with Live Indicator & Monogram */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-2xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] flex items-center justify-center font-mono font-black text-sm shadow-sm shrink-0">
                    AG
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 block">
                      {agilaeCopy.company}
                    </span>
                    <span className="text-xs font-semibold text-[var(--foreground)] opacity-80 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 opacity-65" />
                      {agilaeCopy.location}
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[11.5px] font-bold uppercase tracking-wider text-[var(--foreground)]">
                  <Calendar className="w-3.5 h-3.5 opacity-70" />
                  <span>{agilaeCopy.year}</span>
                </div>
              </div>

              {/* Position Headline */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)] opacity-90 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 opacity-75" />
                  {t.experience.currentBadge}
                </span>
                <h3 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-5xl text-[var(--foreground)] tracking-tight leading-none">
                  {agilaeCopy.role}
                </h3>
              </div>

              {/* Role Scope Description */}
              <p className="text-[15.5px] sm:text-[16.5px] text-[var(--foreground)] opacity-85 leading-relaxed font-medium mb-8">
                {agilaeCopy.description}
              </p>

              {/* 3 Tactile Engineering Pillars */}
              <div className="mb-8">
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--foreground)] opacity-60 block mb-3.5">
                  {t.experience.results}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Pillar 1: Frontend */}
                  <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--color-border)]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Layers className="w-4 h-4 opacity-75 shrink-0" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">
                        {t.experience.pillars.frontend.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--foreground)] opacity-75 leading-relaxed font-medium">
                      {t.experience.pillars.frontend.desc}
                    </p>
                  </div>

                  {/* Pillar 2: Backend */}
                  <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--color-border)]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Cpu className="w-4 h-4 opacity-75 shrink-0" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">
                        {t.experience.pillars.backend.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--foreground)] opacity-75 leading-relaxed font-medium">
                      {t.experience.pillars.backend.desc}
                    </p>
                  </div>

                  {/* Pillar 3: Database & DevOps */}
                  <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--color-border)]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Database className="w-4 h-4 opacity-75 shrink-0" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">
                        {t.experience.pillars.database.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--foreground)] opacity-75 leading-relaxed font-medium">
                      {t.experience.pillars.database.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stack Cloud */}
            <div className="pt-6 border-t border-[var(--color-border)]">
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-55 block mb-2.5">
                {t.experience.stackTooling}
              </span>
              <div className="flex flex-wrap gap-2">
                {AGILAE_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)] shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 2. Sidekick Column: Production Standards & Advisory (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Card A: Production Standards & Architecture Metrics */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 sm:p-7"
              style={{
                boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
              }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--foreground)] opacity-80">
                  {t.experience.benchmarksTitle}
                </h4>
              </div>

              {/* 3 Metric Callout Rows */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-[var(--background)] border border-[var(--color-border)] flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-sm text-[var(--foreground)] block">
                      {t.experience.metrics.metric1Val}
                    </span>
                    <span className="text-xs text-[var(--foreground)] opacity-65 font-medium">
                      {t.experience.metrics.metric1Label}
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 opacity-50 shrink-0" />
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--background)] border border-[var(--color-border)] flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-sm text-[var(--foreground)] block">
                      {t.experience.metrics.metric2Val}
                    </span>
                    <span className="text-xs text-[var(--foreground)] opacity-65 font-medium">
                      {t.experience.metrics.metric2Label}
                    </span>
                  </div>
                  <Cpu className="w-4 h-4 opacity-50 shrink-0" />
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--background)] border border-[var(--color-border)] flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-sm text-[var(--foreground)] block">
                      {t.experience.metrics.metric3Val}
                    </span>
                    <span className="text-xs text-[var(--foreground)] opacity-65 font-medium">
                      {t.experience.metrics.metric3Label}
                    </span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 opacity-50 shrink-0" />
                </div>
              </div>
            </motion.div>

            {/* Card B: Software Systems & Advisory Card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between"
              style={{
                boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]">
                    {t.experience.proprietaryBadge}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[var(--foreground)] opacity-60">
                    {t.experience.presentPeriod}
                  </span>
                </div>

                <h4 className="[font-family:var(--font-display)] uppercase text-2xl sm:text-3xl text-[var(--foreground)] tracking-tight leading-tight mb-2">
                  {t.experience.advisoryTitle}
                </h4>

                <p className="text-sm text-[var(--foreground)] opacity-80 leading-relaxed font-medium mb-5">
                  {t.experience.advisorySubtitle}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {ADVISORY_STACK.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Link to Selected Work */}
              <Link
                href={href("/#work")}
                className="btn-elastic inline-flex items-center justify-between px-5 py-2.5 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                <span>{t.experience.exploreSystems}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
