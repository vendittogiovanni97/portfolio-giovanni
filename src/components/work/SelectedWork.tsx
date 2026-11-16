"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { ProjectMetadata } from "@/lib/content";
import { useI18n } from "@/i18n";
import Link from "next/link";
import { ArrowUpRight, Eye } from "lucide-react";
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
      image: "/projects/assicurativo-studio/showcase-poster.png",
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
      image: "/projects/nagma-tattoo-crm/showcase-poster.png",
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
      image: "/projects/n2g-inkflow/showcase-poster.png",
      stack: ["React 19", "FullCalendar", "AG Grid", "Node.js", "Express", "MongoDB"],
      description:
        t.work.showcase.inkflow?.description ||
        "Gestionale per studi creativi con pianificazione appuntamenti real-time, rubrica paginata, media vault e RBAC granulare.",
    },
  ];

  const activeItem = items[activeIndex];

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

      {/* 2. Spencer Gabor Curved 3D Card Track (Aspect 3:4 Uncropped Poster Trio) */}
      <div className="relative w-full max-w-6xl mx-auto px-4 h-[400px] sm:h-[480px] md:h-[530px] flex items-center justify-center">
        {/* Carousel Deck Track */}
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, idx) => {
            const count = items.length;
            let offset = idx - activeIndex;
            if (offset > 1) offset -= count;
            if (offset < -1) offset += count;
            const isCenter = offset === 0;

            // Spencer Gabor Signature Fan Arc:
            // Center card: flat, elevated, full focus
            // Side cards: tilted ~8deg, gently lowered, visible side-by-side
            const xPercent = offset === 0 ? 0 : offset * 80;
            const yOffset = Math.abs(offset) * 20;
            const rotateAngle = offset * 8;
            const scale = isCenter ? 1 : 0.92;
            const opacity = isCenter ? 1 : 0.78;
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
                className={`absolute w-[260px] sm:w-[320px] md:w-[370px] aspect-[3/4] rounded-[24px] sm:rounded-[32px] overflow-hidden cursor-pointer border-2 border-[var(--color-border)] bg-[var(--color-surface)] transition-shadow duration-300 ${
                  isCenter ? "shadow-2xl" : "shadow-md hover:opacity-95"
                }`}
                style={{
                  transformOrigin: "center 85%",
                  boxShadow: isCenter
                    ? "var(--shadow-sticker, 0 16px 36px rgba(0,0,0,0.22))"
                    : "0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                {/* Full 3:4 Magazine Poster Artwork (100% Uncropped 1:1 Mapping) */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 420px, 85vw"
                  priority={isCenter}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Floating Action Pill Directly Below Active Card (Spencer Gabor Signature) */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <Link
              href={href(`/work/${activeItem.slug}`)}
              className="btn-elastic inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] px-8 text-xs sm:text-[13px] font-bold uppercase tracking-widest shadow-xl cursor-pointer hover:scale-105 transition-transform"
              style={{
                boxShadow: "var(--shadow-sticker, 0 5px 0 rgba(0,0,0,0.25))",
              }}
            >
              <span>{activeItem.title}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>

            <button
              type="button"
              onClick={() => setActiveModalProject(getActiveProjectForModal())}
              className="btn-elastic inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--foreground)] px-4 sm:px-5 text-xs sm:text-[12px] font-bold uppercase tracking-wider shadow-sm cursor-pointer hover:bg-[var(--color-surface-muted)] transition-colors"
              title={t.work.previewAria}
              aria-label={`${t.work.preview} ${activeItem.title}`}
            >
              <Eye className="w-3.5 h-3.5 stroke-[2.5] opacity-70" />
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
