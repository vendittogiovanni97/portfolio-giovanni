"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ProjectMetadata } from "@/lib/content";
import { useI18n } from "@/i18n";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Eye } from "lucide-react";
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
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const { href, t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState<ProjectMetadata | null>(null);

  // 3 Flagship Production Projects (Portale Assicurativo, Nagma CRM, N2G Inkflow)
  const items: ShowcaseItem[] = [
    {
      id: "assicurativo-studio",
      slug: "assicurativo-studio",
      title: t.work.showcase.assicurativo.title,
      subtitle: t.work.showcase.assicurativo.subtitle,
      category: t.work.showcase.assicurativo.category,
      badge: t.work.showcase.assicurativo.badge,
      image: "/projects/assicurativo-studio/showcase.png",
      stack: ["React 19", "Next.js 16", "AG Grid 32", "MongoDB", "Claude OCR"],
      description: t.work.showcase.assicurativo.description,
    },
    {
      id: "demo-nagma",
      slug: "demo-nagma",
      title: t.work.showcase.nagma.title,
      subtitle: t.work.showcase.nagma.subtitle,
      category: t.work.showcase.nagma.category,
      badge: t.work.showcase.nagma.badge,
      image: "/projects/nagma-tattoo-crm/showcase.png",
      stack: ["Next.js 16", "Prisma 7", "PostgreSQL", "Tailwind 4", "Docker"],
      description: t.work.showcase.nagma.description,
    },
    {
      id: "n2g-inkflow",
      slug: "n2g-inkflow",
      title: t.work.showcase.inkflow?.title || "N2G Inkflow",
      subtitle: t.work.showcase.inkflow?.subtitle || "Platform Studio & FullCalendar Engine",
      category: t.work.showcase.inkflow?.category || "Piattaforma Gestionale",
      badge: t.work.showcase.inkflow?.badge || "FullCalendar & AG Grid",
      image: "/projects/n2g-inkflow/showcase.png",
      stack: ["React 19", "FullCalendar", "AG Grid", "Node.js", "Express", "MongoDB"],
      description:
        t.work.showcase.inkflow?.description ||
        "Gestionale per studi creativi con pianificazione appuntamenti real-time, rubrica paginata, media vault e RBAC granulare.",
    },
  ];

  const activeItem = items[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
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
      company: "Production System",
      startDate: "2024 - Present",
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
    <section id="work" className="w-full relative py-14 sm:py-20 overflow-hidden select-none">
      {/* 1. Header (Spencer Gabor Refined Scale) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--foreground)] opacity-60 mb-2 block">
          {t.work.curvedBadge}
        </span>
        <h2 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.92] text-[var(--foreground)] drop-shadow-xs">
          {t.work.featuredWork}
        </h2>
        <p className="mt-2.5 text-[15px] sm:text-[17px] text-[var(--foreground)] opacity-70 font-medium max-w-md mx-auto leading-relaxed">
          {t.work.subtitle}
        </p>
      </div>

      {/* 2. Spencer Gabor Curved 3D Card Track */}
      <div className="relative w-full max-w-5xl mx-auto px-4 h-[300px] sm:h-[400px] md:h-[460px] flex items-center justify-center">
        {/* Navigation Arrows (Float at sides) */}
        <button
          onClick={handlePrev}
          aria-label={t.work.caseStudy.previous}
          className="btn-elastic absolute left-2 sm:left-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--color-pill-bg)] hover:text-[var(--color-pill-text)] transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <button
          onClick={handleNext}
          aria-label={t.work.caseStudy.next}
          className="btn-elastic absolute right-2 sm:right-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--color-pill-bg)] hover:text-[var(--color-pill-text)] transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Carousel Deck Track */}
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, idx) => {
            const offset = idx - activeIndex;
            const isCenter = offset === 0;

            // Catena arc math: active card is lifted & flat; side cards are angled & lowered
            const xPercent = offset * 86;
            const yOffset = Math.abs(offset) * 20;
            const rotateAngle = offset * 6;
            const scale = isCenter ? 1 : 0.88;
            const opacity = isCenter ? 1 : 0.65;
            const zIndex = isCenter ? 30 : 10;

            return (
              <motion.div
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                initial={false}
                animate={{
                  x: `${xPercent}%`,
                  y: yOffset,
                  rotate: rotateAngle,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                  mass: 0.8,
                }}
                className={`absolute w-[290px] sm:w-[400px] md:w-[460px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer ${
                  isCenter ? "shadow-2xl" : "shadow-md hover:opacity-90"
                }`}
                style={{
                  transformOrigin: "center 80%",
                }}
              >
                {/* Edge-to-edge Project Screenshot Artwork */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 768px) 460px, 85vw"
                  priority={isCenter}
                />

                {/* Subtle Overlaid Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/75 text-white backdrop-blur-md shadow-sm">
                    {item.badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Floating Action Pill Directly Below Active Card (Spencer Gabor Signature) */}
      <div className="mt-7 sm:mt-9 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <Link
              href={href(`/work/${activeItem.slug}`)}
              className="btn-elastic inline-flex h-12 sm:h-13 items-center justify-center gap-2.5 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] px-8 text-[13.5px] font-bold uppercase tracking-widest shadow-xl cursor-pointer hover:scale-105 transition-transform"
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
              className="btn-elastic inline-flex h-12 sm:h-13 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--foreground)] px-5 text-[12.5px] font-bold uppercase tracking-wider shadow-sm cursor-pointer hover:bg-[var(--color-surface-muted)] transition-colors"
              title={t.work.previewAria}
              aria-label={`${t.work.preview} ${activeItem.title}`}
            >
              <Eye className="w-4 h-4 stroke-[2.5] opacity-70" />
              <span>{t.work.preview}</span>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-5">
          {items.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`Vai al progetto ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === dotIdx
                  ? "w-7 bg-[var(--color-pill-bg)]"
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
