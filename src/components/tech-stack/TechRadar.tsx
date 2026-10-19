"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/i18n";
import {
  Layout,
  Server,
  Database,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
} from "lucide-react";

function TechBrandIcon({ id, className = "w-4 h-4" }: { id: string; className?: string }) {
  switch (id) {
    case "nextjs":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="64" fill="#000000" />
          <path d="M106.333 111.966L49.167 38H38v52h9.167V50.366l51.616 66.6z" fill="#FFFFFF" />
          <path d="M89.833 38H80.667v52h9.166V38z" fill="#FFFFFF" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="24" fill="#3178C6" />
          <path d="M76.8 86.4c2.3 1.8 5.5 3.2 9.4 3.2 4.2 0 6.6-2 6.6-4.8 0-3-2-4.5-7.1-6.5l-3.1-1.2c-7.4-2.9-11.2-7.2-11.2-13.7 0-8.6 6.9-14.6 17.9-14.6 5.4 0 10 1.5 12.7 3.3l-3.4 7.5c-2.3-1.4-5.4-2.7-9.2-2.7-4.6 0-6.3 2.2-6.3 4.5 0 2.7 1.8 4 6.9 5.9l3.1 1.2c8.2 3.2 11.6 7.5 11.6 14.2 0 9.2-6.9 15.1-18.9 15.1-6.3 0-11.8-1.8-15-4l3.6-7.3zM39.3 57H25.5v-7.5H63.6V57H49.8v40.2H39.3V57z" fill="#FFFFFF" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="10" fill="#00D8FF" />
          <ellipse cx="64" cy="64" rx="42" ry="16" stroke="#00D8FF" strokeWidth="6" fill="none" />
          <ellipse cx="64" cy="64" rx="42" ry="16" stroke="#00D8FF" strokeWidth="6" fill="none" transform="rotate(60 64 64)" />
          <ellipse cx="64" cy="64" rx="42" ry="16" stroke="#00D8FF" strokeWidth="6" fill="none" transform="rotate(120 64 64)" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 67.2C35.2 57.6 43.2 52.8 56 52.8C72 52.8 76.8 64 86.4 64C92.8 64 97.6 59.2 100.8 49.6C97.6 59.2 89.6 64 76.8 64C60.8 64 56 52.8 46.4 52.8C40 52.8 35.2 57.6 32 67.2ZM32 89.6C35.2 80 43.2 75.2 56 75.2C72 75.2 76.8 86.4 86.4 86.4C92.8 86.4 97.6 81.6 100.8 72C97.6 81.6 89.6 86.4 76.8 86.4C60.8 86.4 56 75.2 46.4 75.2C40 75.2 35.2 80 32 89.6Z" fill="#38BDF8" />
        </svg>
      );
    case "mui":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M26 38.5L51.5 25.5L77 38.5V64.5L51.5 77.5L26 64.5V38.5Z" fill="#00B0FF" />
          <path d="M51.5 25.5L77 38.5L102.5 25.5V51.5L77 64.5L51.5 51.5V25.5Z" fill="#0081CB" />
          <path d="M51.5 77.5L77 64.5L102.5 77.5V103.5L77 90.5L51.5 103.5V77.5Z" fill="#00B0FF" />
          <path d="M26 64.5L51.5 77.5L77 64.5V90.5L51.5 103.5L26 90.5V64.5Z" fill="#0081CB" />
        </svg>
      );
    case "vite":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M99.8 25.6L64 105L28.2 25.6h71.6z" fill="#BD34FE" />
          <path d="M87 25.6L64 76.8L41 25.6h46z" fill="#FFD02F" />
          <path d="M66.6 35.84L53.8 64h10.2l-7.7 23 20.5-33.3H66.6l7.7-17.9h-7.7z" fill="#FFFFFF" />
        </svg>
      );
    case "threejs":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 19.2L108.8 99.8H19.2L64 19.2Z" stroke="#111111" strokeWidth="8" strokeLinejoin="round" fill="none" />
          <path d="M64 44.8L89.6 89.6H38.4L64 44.8Z" fill="#111111" />
        </svg>
      );
    case "framer":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 25.6h64v32H64L32 25.6z" fill="#0055FF" />
          <path d="M32 57.6h32h32v32H64L32 57.6z" fill="#0055FF" opacity="0.9" />
          <path d="M32 89.6h32v32L32 89.6z" fill="#0055FF" opacity="0.75" />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 25.6L102.4 47.36v45.76L64 115.2L25.6 93.12V47.36L64 25.6Z" fill="#5FA04E" />
          <path d="M64 44.8L89.6 58.88V87.04L64 99.84L38.4 87.04V58.88L64 44.8Z" fill="#FFFFFF" />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="56" fill="#111111" />
          <text x="64" y="74" fill="#FFFFFF" fontSize="32" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ex</text>
        </svg>
      );
    case "nestjs":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 20C45 32 25 25 25 50C25 82 64 108 64 108C64 108 103 82 103 50C103 25 83 32 64 20Z" fill="#E0234E" />
          <path d="M64 32C51 42 38 36 38 58C38 77 64 96 64 96C64 96 90 77 90 58C90 36 77 42 64 32Z" fill="#FFFFFF" opacity="0.95" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44 90c0 0 20 6 40 0s-7-13-7-13H51s-7 13-7 13z" fill="#ED8B00" />
          <path d="M38 70c0 0 26 5 52 0 0 0-13-10-26-10s-26 10-26 10z" fill="#5382A1" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="54" fill="#336791" />
          <circle cx="64" cy="64" r="34" stroke="#FFFFFF" strokeWidth="6" fill="none" />
          <path d="M48 54c0-10 32-10 32 0 0 10-32 10-32 20 0 10 32 10 32 0" stroke="#FFFFFF" strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "prisma":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M53.2 108.8L25.6 81.2L87.5 19.2L102.4 34.1L53.2 108.8Z" fill="#16A394" />
          <path d="M25.6 81.2L53.2 108.8L68 94L40.4 66.4L25.6 81.2Z" fill="#0D9488" />
          <path d="M87.5 19.2L40.4 66.4L68 94L102.4 34.1L87.5 19.2Z" fill="#2DD4BF" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.6 70.4h15.36v15.36H25.6zM44.8 70.4h15.36v15.36H44.8zM64 70.4h15.36v15.36H64zM44.8 51.2h15.36v15.36H44.8zM64 51.2h15.36v15.36H64zM83.2 51.2h15.36v15.36H83.2zM64 32h15.36v15.36H64zM83.2 32h15.36v15.36H83.2z" fill="#2496ED" />
          <path d="M19.2 92.16c6.4 12.8 32 12.8 44.8 12.8s44.8 0 51.2-19.2c-6.4 0-12.8 2.56-19.2 2.56s-19.2-6.4-32-6.4-25.6 10.24-44.8 10.24z" fill="#2496ED" opacity="0.9" />
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M70.4 19.2L25.6 70.4h32L57.6 108.8L102.4 57.6h-32l6-38.4z" fill="#3ECF8E" />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Black triangle visible on white cards */}
          <path d="M64 28L105 99H23L64 28Z" fill="#000000" />
        </svg>
      );
    case "claude":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="128" height="128" rx="28" fill="#D97757" />
          <path d="M64 36v56M36 64h56M44 44l40 40M44 84l40-40" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M61.44 25.6c-19.2 0-17.92 7.68-17.92 7.68v7.68h19.2v2.56H34.56s-8.96 0-8.96 17.92 7.68 17.92 7.68 17.92h5.12V74.24c0-7.68 6.4-7.68 6.4-7.68h19.2s7.68 0 7.68-7.68V33.28s1.28-7.68-10.24-7.68h-3.84zm-6.4 6.4a2.56 2.56 0 1 1 0 5.12 2.56 2.56 0 0 1 0-5.12z" fill="#3776AB" />
          <path d="M66.56 102.4c19.2 0 17.92-7.68 17.92-7.68v-7.68h-19.2v-2.56h28.16s8.96 0 8.96-17.92-7.68-17.92-7.68-17.92h-5.12v6.4c0 7.68-6.4 7.68-6.4 7.68h-19.2s-7.68 0-7.68 7.68v25.6s-1.28 7.68 10.24 7.68h3.84zm6.4-6.4a2.56 2.56 0 1 1 0-5.12 2.56 2.56 0 0 1 0 5.12z" fill="#FFD43B" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M104.96 57.6L70.4 23.04a6.4 6.4 0 0 0-8.96 0L44.8 39.68l15.36 15.36a7.68 7.68 0 0 1 8.96 8.96l15.36 15.36a7.68 7.68 0 1 1-5.12 5.12L64 69.12v23.04a7.68 7.68 0 1 1-7.68-7.68V55.04a7.68 7.68 0 0 1-3.84-3.84L35.84 34.56 23.04 47.36a6.4 6.4 0 0 0 0 8.96l34.56 34.56a6.4 6.4 0 0 0 8.96 0l38.4-38.4a6.4 6.4 0 0 0 0-8.96z" fill="#F05032" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="64" cy="64" r="28" fill="#111111" />
        </svg>
      );
  }
}

const ARCHITECTURE_PILLARS = [
  {
    id: "frontend",
    title: "Frontend Engineering & UI",
    role: "User Experience & 3D WebGL",
    icon: Layout,
    metric: "<180ms LCP · 100/100 Core Web Vitals",
    desc: "Architetture web reattive, Server-Side Rendering (RSC), design systems modulari e grafica 3D fluida a 60fps.",
    technologies: [
      { id: "nextjs", name: "Next.js 16 (App Router)", highlight: true },
      { id: "react", name: "React 19" },
      { id: "typescript", name: "TypeScript 5.x", highlight: true },
      { id: "tailwind", name: "Tailwind CSS v4" },
      { id: "threejs", name: "Three.js / WebGL", highlight: true },
      { id: "framer", name: "Framer Motion" },
      { id: "vite", name: "Vite" },
      { id: "mui", name: "Material UI (MUI)" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Server Architecture",
    role: "APIs, Auth & Microservices",
    icon: Server,
    metric: "Strict Type-Safety · RBAC Hardened",
    desc: "Microservizi e API REST modulari, middleware di autenticazione robusti, gestione flussi asincroni e job workers.",
    technologies: [
      { id: "nodejs", name: "Node.js 22+ (LTS)", highlight: true },
      { id: "express", name: "Express 5" },
      { id: "nestjs", name: "NestJS Architecture" },
      { id: "java", name: "Java Enterprise" },
      { id: "git", name: "Git & CI/CD Workflows" },
    ],
  },
  {
    id: "database",
    title: "Data Layer & Infrastructure",
    role: "Storage, ACID & Cloud Edge",
    icon: Database,
    metric: "ACID Guaranteed · 99.98% SLA",
    desc: "Database relazionali e documentali ad alta disponibilità, ORM type-safe, container Docker e cloud deployment globale.",
    technologies: [
      { id: "postgres", name: "PostgreSQL 17", highlight: true },
      { id: "prisma", name: "Prisma 7.8 ORM", highlight: true },
      { id: "docker", name: "Docker & Compose" },
      { id: "supabase", name: "Supabase" },
      { id: "vercel", name: "Vercel Edge Cloud" },
    ],
  },
  {
    id: "ai",
    title: "AI Automation & Intelligence",
    role: "LLM, OCR & Tool Calling",
    icon: Sparkles,
    metric: "Certificato Anthropic 2026 · 4x ROI",
    desc: "Pipeline di estrazione documentale OCR strutturata, agenti autonomi, Tool Calling API e integrazione modelli Claude di produzione.",
    technologies: [
      { id: "claude", name: "Anthropic Claude 3.7", highlight: true },
      { id: "python", name: "Python / AI Scripts" },
      { id: "gemini", name: "OCR & Document Analysis", highlight: true },
    ],
  },
];

export function TechRadar() {
  const { t } = useI18n();

  return (
    <section id="tech-stack" className="w-full py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 border-b border-black/[0.08] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.035em] text-[#111111]">
              {t.techRadar.title}
            </h2>
            <p className="mt-2 text-neutral-600 text-[15px] sm:text-[16px] max-w-xl">
              {t.techRadar.subtitle}
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-neutral-500 bg-[#f5f4f2] px-3 py-1 rounded-full border border-black/[0.06] self-start sm:self-auto">
            4 Pilastri Architetturali
          </span>
        </div>

        {/* 4 Bento Architecture Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {ARCHITECTURE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl card-elevation-high p-6 sm:p-8 bg-white flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-[#111111] text-white shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11.5px] font-mono font-medium text-neutral-700 px-2.5 py-0.5 rounded-full bg-[#f5f4f2] border border-black/[0.06]">
                      {pillar.role}
                    </span>
                  </div>

                  <h3 className="text-[22px] sm:text-[24px] font-semibold text-[#111111] tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="mt-2 text-[14px] text-neutral-600 leading-relaxed">
                    {pillar.desc}
                  </p>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-2 my-6 pt-5 border-t border-black/[0.06]">
                    {pillar.technologies.map((tech) => (
                      <span
                        key={tech.id}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[12px] font-medium transition-all ${
                          tech.highlight
                            ? "bg-[#111111] text-white border-transparent shadow-xs"
                            : "bg-[#f5f4f2] hover:bg-neutral-200/60 text-neutral-800 border-black/[0.06]"
                        }`}
                      >
                        <TechBrandIcon id={tech.id} className="w-3.5 h-3.5 shrink-0" />
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Metric */}
                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-[12px] text-neutral-500 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{pillar.metric}</span>
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400">PROD READY</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
