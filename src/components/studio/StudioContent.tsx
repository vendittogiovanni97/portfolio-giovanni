"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import { GraduationCap, Award, BookOpen, Terminal } from "lucide-react";

const valueIcons = [
  <svg key="eng" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  <svg key="perf" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  <svg key="ds" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  <svg key="a11y" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" /></svg>,
  <svg key="ship" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
];

const valueKeys = ["engineering", "performance", "designSystems", "accessibility", "ship"] as const;

export function StudioContent() {
  const { t } = useI18n();

  const education = [
    {
      id: "link-campus",
      year: "2025",
      title: "Full Stack Developer",
      institution: "Università degli Studi Link Campus",
      icon: <GraduationCap className="w-5 h-5" />,
      desc: t.studio.educationDesc.linkCampus,
      tag: "Percorso Universitario",
    },
    {
      id: "nexus-pozzuoli",
      year: "2025",
      title: "Frontend Developer",
      institution: "Corso Professionalizzante Nexus Pozzuoli",
      icon: <BookOpen className="w-5 h-5" />,
      desc: t.studio.educationDesc.nexusPozzuoli,
      tag: "Specializzazione",
    },
    {
      id: "claude-101",
      year: "2026",
      title: "Claude 101 – 4 Certificazioni",
      institution: "Anthropic Official Training",
      icon: <Award className="w-5 h-5" />,
      desc: t.studio.educationDesc.claude101,
      tag: "Certificazioni AI",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="mb-14 border-b border-[var(--color-border)] pb-8">
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-70 mb-2 block">
            ABOUT & ENGINEERING PHILOSOPHY
          </span>
          <h1 className="[font-family:var(--font-display)] uppercase text-5xl sm:text-7xl lg:text-8xl text-[var(--foreground)] tracking-tight leading-[0.88]">
            {t.studio.title}
          </h1>
          <p className="mt-4 text-[var(--foreground)] opacity-75 text-[16px] sm:text-[18px] max-w-2xl font-medium leading-relaxed">
            {t.studio.subtitle}
          </p>
        </div>

        {/* Bio & Quick Facts Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-7 sm:p-9"
              style={{
                boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
              }}
            >
              <h2 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl text-[var(--foreground)] mb-6">
                {t.studio.bioTitle}
              </h2>
              <div className="space-y-4 text-base text-[var(--foreground)] opacity-85 leading-relaxed font-medium">
                <p dangerouslySetInnerHTML={{ __html: t.studio.bioP1 }} />
                <p dangerouslySetInnerHTML={{ __html: t.studio.bioP2 }} />
                <p dangerouslySetInnerHTML={{ __html: t.studio.bioP3 }} />
              </div>
            </motion.div>

            {/* Quick Facts Dossier Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-7"
              style={{
                boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
              }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="p-2 rounded-xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)]">
                  <Terminal className="w-4 h-4" />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                  {t.studio.quickFacts}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center py-2.5 border-b border-[var(--color-border)]">
                  <span className="text-[var(--foreground)] opacity-60 uppercase">{t.studio.location}</span>
                  <span className="text-[var(--foreground)] font-bold">{t.studio.locationValue}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-[var(--color-border)]">
                  <span className="text-[var(--foreground)] opacity-60 uppercase">{t.studio.experience}</span>
                  <span className="text-[var(--foreground)] font-bold">{t.studio.experienceYears}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-[var(--color-border)]">
                  <span className="text-[var(--foreground)] opacity-60 uppercase">{t.studio.focus}</span>
                  <span className="text-[var(--foreground)] font-bold">Fullstack Engineer</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-[var(--foreground)] opacity-60 uppercase">{t.studio.languages}</span>
                  <span className="text-[var(--foreground)] font-bold">{t.studio.languagesValue}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education & Studies Section */}
        <section className="mb-20">
          <div className="flex items-center gap-2.5 mb-8 border-b border-[var(--color-border)] pb-4">
            <h2 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl text-[var(--foreground)]">
              {t.studio.educationTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 flex flex-col justify-between"
                style={{
                  boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.2))",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-2xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)]">
                      {edu.icon}
                    </div>
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]">
                      {edu.year}
                    </span>
                  </div>

                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-65 block mb-1">
                    {edu.tag}
                  </span>
                  <h3 className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-tight leading-snug mb-1">
                    {edu.title}
                  </h3>
                  <div className="text-xs font-bold text-[var(--foreground)] opacity-75 mb-3">
                    {edu.institution}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
                    {edu.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="mb-8 border-b border-[var(--color-border)] pb-4">
            <h2 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl text-[var(--foreground)]">
              {t.studio.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between"
                style={{
                  boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.2))",
                }}
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] flex items-center justify-center mb-4 shadow-sm">
                    {valueIcons[i]}
                  </div>
                  <h3 className="[font-family:var(--font-display)] uppercase text-2xl text-[var(--foreground)] tracking-tight mb-2">
                    {t.studio.values[key].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--foreground)] opacity-80 leading-relaxed font-medium">
                    {t.studio.values[key].description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-20">
          <div className="mb-8 border-b border-[var(--color-border)] pb-4">
            <h2 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl text-[var(--foreground)]">
              {t.studio.timelineTitle}
            </h2>
          </div>

          <div className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-7 sm:p-8"
            style={{
              boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
            }}
          >
            {[
              { period: t.studio.timeline.current, role: t.studio.timeline.currentRole, company: t.studio.timeline.currentCompany, description: t.studio.timeline.currentDesc },
            ].map((item) => (
              <div key={item.period} className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]">
                    {item.period}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-75">
                    {item.company}
                  </span>
                </div>
                <h3 className="[font-family:var(--font-display)] uppercase text-3xl text-[var(--foreground)] tracking-tight mt-1">
                  {item.role}
                </h3>
                <p className="text-sm sm:text-base text-[var(--foreground)] opacity-85 leading-relaxed font-medium mt-1 max-w-2xl">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Complete Tech Stack Categories */}
        <section>
          <div className="mb-8 border-b border-[var(--color-border)] pb-4">
            <h2 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl text-[var(--foreground)]">
              {t.studio.techStackTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: "Frontend & UI", items: ["React 19", "Next.js 16 (App Router)", "TypeScript", "Tailwind CSS", "Material UI (MUI)", "Vite", "Framer Motion"] },
              { category: "Backend & Data", items: ["Node.js 22+", "Express 5", "Prisma ORM", "MongoDB", "PostgreSQL", "NestJS", "Java", "REST APIs"] },
              { category: "Tools & Infra", items: ["Docker / Compose", "Git & GitHub", "Vercel Cloud", "AG Grid 32", "PDFKit", "ExcelJS", "Jest", "Playwright"] },
              { category: "Automations & AI", items: ["OCR (Tesseract)", "LLM Gemini Integration", "Anthropic Claude AI", "System Architecture", "Design Systems"] },
            ].map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 flex flex-col justify-between"
                style={{
                  boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.2))",
                }}
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-70 block mb-4">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
