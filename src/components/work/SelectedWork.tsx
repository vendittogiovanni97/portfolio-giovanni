"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ProjectMetadata } from "@/lib/content";
import { useI18n } from "@/i18n";
import Link from "next/link";
import { Eye, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ProjectQuickViewModal } from "./ProjectQuickViewModal";

interface SelectedWorkProps {
  projects: ProjectMetadata[];
}

interface ShowcaseItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  image: string;
  stack: string[];
  description: string;
  isExternalOrRoute?: boolean;
  targetHref?: string;
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const { href } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<ProjectMetadata | null>(null);

  // Combine real projects with flagship items for the 4-slide curved deck
  const items: ShowcaseItem[] = [
    {
      id: "assicurativo-studio",
      slug: "assicurativo-studio",
      title: "Portale Assicurativo",
      subtitle: "ERP Finanziario & Pipeline OCR",
      category: "Enterprise System",
      badge: "Flagship ERP & AI",
      image: "/projects/assicurativo-studio/dashboard.png",
      stack: ["React 19", "Next.js 16", "AG Grid 32", "MongoDB", "Claude OCR"],
      description: "Piattaforma enterprise end-to-end per agenzie assicurative con estrazione polizze AI a latenza <180ms.",
    },
    {
      id: "demo-nagma",
      slug: "demo-nagma",
      title: "Nagma Tattoo CRM",
      subtitle: "CRM Creativo & Kanban Studio",
      category: "SaaS Platform",
      badge: "Production CRM",
      image: "/projects/nagma-tattoo-crm/dashboard.png",
      stack: ["Next.js 16", "Prisma 7", "PostgreSQL", "Tailwind 4", "Docker"],
      description: "CRM gestionale su misura per studi creativi con agenda interattiva, consensi digitali e tracking real-time.",
    },
    {
      id: "ai-ocr-engine",
      slug: "assicurativo-studio",
      title: "AI Document Intelligence",
      subtitle: "Pipeline Vision & LLM Parsing",
      category: "AI Architecture",
      badge: "Anthropic Claude",
      image: "/projects/assicurativo-studio/elaborazione-polizze.png",
      stack: ["Anthropic Claude", "Gemini 2.5", "TypeScript", "Node.js", "Zod"],
      description: "Motore di scansione e strutturazione documentale automatizzata con accuratezza 99.8% e zero data-loss.",
    },
    {
      id: "creative-lab-webgl",
      slug: "lab",
      title: "Creative WebGL Lab",
      subtitle: "Shaders & Three.js Canvas",
      category: "Creative Engineering",
      badge: "60 FPS WebGL",
      image: "/certificates/claude-cowork.png",
      stack: ["Three.js", "GLSL Shaders", "GSAP", "Lenis", "Framer Motion"],
      description: "Playground interattivo per sperimentazioni grafiche 3D, calcolo particellare e micro-interazioni fisiche.",
      isExternalOrRoute: true,
      targetHref: href("/lab"),
    },
  ];

  const activeItem = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handleSelectCard = (index: number) => {
    setActiveIndex(index);
  };

  const getActiveProjectForModal = (): ProjectMetadata => {
    const found = projects.find((p) => p.slug === activeItem.slug);
    if (found) return found;
    return {
      slug: activeItem.slug,
      title: activeItem.title,
      description: activeItem.description,
      shortDescription: activeItem.description,
      role: "Lead Fullstack & AI Engineer",
      company: "Production Project",
      startDate: "2025 - Present",
      current: true,
      stack: activeItem.stack,
      category: "product",
      featured: true,
      order: 1,
      images: {
        hero: activeItem.image,
      },
    };
  };

  return (
    <section id="work" className="w-full relative py-16 sm:py-24 overflow-hidden select-none">
      
      {/* 1. Header (Spencer Gabor Centered Headline) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-60 mb-2 block">
          Select Recent &amp; Notable Projects
        </span>
        <h2 className="[font-family:var(--font-display)] uppercase text-6xl sm:text-8xl md:text-9xl tracking-tight leading-[0.88] text-[var(--foreground)] drop-shadow-xs">
          Featured Work
        </h2>
        <p className="mt-3 text-[16px] sm:text-[18px] text-[var(--foreground)] opacity-70 font-medium max-w-xl mx-auto">
          Sistemi di produzione ad alto impatto, piattaforme enterprise e pipeline AI.
        </p>
      </div>

      {/* 2. Spencer Gabor Curved 3D Card Deck (Arched Trajectory) */}
      <div className="relative w-full max-w-6xl mx-auto px-4 h-[340px] sm:h-[440px] md:h-[500px] flex items-center justify-center">
        
        {/* Navigation Arrows (Float at sides) */}
        <button
          onClick={handlePrev}
          aria-label="Progetto precedente"
          className="btn-elastic absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--color-pill-bg)] hover:text-[var(--color-pill-text)] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Progetto successivo"
          className="btn-elastic absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--color-pill-bg)] hover:text-[var(--color-pill-text)] transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Carousel Deck Track */}
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, idx) => {
            const offset = idx - activeIndex;
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            // Arched catenary trajectory math
            let xPos = "0%";
            let yPos = 0;
            let rotateAngle = 0;
            let scaleVal = 1;
            let zIndexVal = 20;
            let opacityVal = 1;

            if (isCenter) {
              xPos = "0%";
              yPos = 0;
              rotateAngle = 0;
              scaleVal = 1;
              zIndexVal = 30;
              opacityVal = 1;
            } else if (isLeft) {
              xPos = "-58%";
              yPos = 36;
              rotateAngle = -7;
              scaleVal = 0.88;
              zIndexVal = 15;
              opacityVal = 0.65;
            } else if (isRight) {
              xPos = "58%";
              yPos = 36;
              rotateAngle = 7;
              scaleVal = 0.88;
              zIndexVal = 15;
              opacityVal = 0.65;
            } else {
              xPos = offset > 0 ? "110%" : "-110%";
              yPos = 70;
              rotateAngle = offset > 0 ? 12 : -12;
              scaleVal = 0.72;
              zIndexVal = 5;
              opacityVal = 0;
            }

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: xPos,
                  y: yPos,
                  rotate: rotateAngle,
                  scale: scaleVal,
                  opacity: opacityVal,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                  mass: 0.8,
                }}
                onClick={() => handleSelectCard(idx)}
                style={{ zIndex: zIndexVal }}
                className={`absolute w-[290px] sm:w-[380px] md:w-[460px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer ${
                  !isCenter ? "pointer-events-auto hover:opacity-90" : "pointer-events-auto"
                }`}
              >
                {/* Square Card Container with Spencer Gabor Multi-level Shadow */}
                <div
                  className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 transition-all duration-300"
                  style={{
                    boxShadow: isCenter
                      ? "0px 14px 28px rgba(0,0,0,0.08), 0px 36px 54px rgba(0,0,0,0.06), 0px 80px 80px rgba(0,0,0,0.03)"
                      : "0px 8px 18px rgba(0,0,0,0.04)",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 460px, 85vw"
                    className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                    priority={isCenter}
                  />

                  {/* Dark gradient for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-md border border-white/20">
                      <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                      {item.badge}
                    </span>
                  </div>

                  {/* Bottom title preview on card */}
                  <div className="absolute bottom-5 left-5 right-5 text-left text-white z-10 pointer-events-none">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white/70 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="[font-family:var(--font-display)] uppercase text-2xl sm:text-3xl tracking-tight leading-none text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Spencer Gabor Floating Action Pill Under Active Card */}
      <div className="max-w-2xl mx-auto px-4 mt-8 sm:mt-12 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Action Buttons: Spencer Gabor Signature Pill */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
              <Link
                href={activeItem.targetHref || href(`/work/${activeItem.slug}`)}
                className="btn-elastic inline-flex h-13 sm:h-14 items-center justify-center gap-2.5 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] px-8 text-[14px] font-bold uppercase tracking-widest shadow-xl cursor-pointer"
                style={{
                  boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.25))",
                }}
              >
                <span>{activeItem.title}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </Link>

              <button
                type="button"
                onClick={() => setActiveModalProject(getActiveProjectForModal())}
                className="btn-elastic inline-flex h-13 sm:h-14 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--foreground)] px-6 text-[13px] font-bold uppercase tracking-wider shadow-sm cursor-pointer"
              >
                <Eye className="w-4 h-4 stroke-[2.5] opacity-70" />
                <span>Anteprima</span>
              </button>
            </div>

            {/* Description */}
            <p className="text-[15px] sm:text-[16px] text-[var(--foreground)] opacity-75 font-medium max-w-lg mb-4">
              {activeItem.description}
            </p>

            {/* Stack Tags */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {activeItem.stack.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-surface-muted)] text-[var(--foreground)] opacity-85 border border-[var(--color-border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`Vai al progetto ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === dotIdx
                  ? "w-8 bg-[var(--color-pill-bg)]"
                  : "w-2 bg-[var(--foreground)] opacity-20 hover:opacity-40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <ProjectQuickViewModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
