"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import type { ProjectMetadata } from "@/lib/content";
import { useI18n } from "@/i18n";
import Link from "next/link";
import { Eye, ArrowUpRight, Sparkles } from "lucide-react";
import { ProjectQuickViewModal } from "./ProjectQuickViewModal";

interface SelectedWorkProps {
  projects: ProjectMetadata[];
}

function getTechTagStyle(tag: string): string {
  const lower = tag.toLowerCase();
  if (
    lower.includes("ocr") ||
    lower.includes("llm") ||
    lower.includes("gemini") ||
    lower.includes("claude") ||
    lower.includes("ai")
  ) {
    return "bg-[var(--color-accent)] text-[var(--color-accent-contrast)] border-transparent font-bold shadow-xs";
  }
  return "bg-[var(--background)] text-[var(--foreground)] opacity-85 border-[var(--color-border)] font-mono";
}

function ProjectTiltCard({
  project,
  index,
  categoryLabel,
  viewProjectText,
  quickViewText,
  href,
  onQuickView,
}: {
  project: ProjectMetadata;
  index: number;
  categoryLabel: string;
  viewProjectText: string;
  quickViewText: string;
  href: (path: string) => string;
  onQuickView: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    y.set(mouseY / rect.height - 0.5);
    x.set(xPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
      className="w-full h-full"
    >
      <motion.article
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.3))",
        }}
        className="group relative rounded-3xl overflow-hidden bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 sm:p-8 flex flex-col justify-between h-full transition-all duration-300"
      >
        <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
          {/* Mockup Frame with Elastic Hover */}
          <Link
            href={href(`/work/${project.slug}`)}
            prefetch={true}
            style={{ transform: "translateZ(26px)" }}
            className="relative block aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-neutral-950 mb-7 shadow-sm group/frame transition-all duration-300"
          >
            {/* Window Bar */}
            <div className="absolute top-0 inset-x-0 h-7 bg-neutral-900 border-b border-white/10 z-10 flex items-center px-3.5 gap-1.5 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 font-mono text-[10px] text-neutral-400">
                https://app.{project.slug}.internal
              </span>
            </div>

            {project.images?.hero ? (
              <div className="absolute inset-0 pt-7">
                <Image
                  src={project.images.hero}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 95vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/frame:scale-105"
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl text-neutral-500 pt-7">
                {project.title}
              </div>
            )}

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <span className="btn-elastic inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-xs font-bold uppercase tracking-wider text-[var(--color-accent-contrast)] shadow-lg">
                <span>Vedi Case Study</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </div>
          </Link>

          {/* Meta Header */}
          <div
            style={{ transform: "translateZ(28px)" }}
            className="flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-xs">
                <Sparkles className="w-3 h-3 text-[var(--color-accent)]" />
                {index === 0 ? "Production ERP & AI" : "Production CRM"}
              </span>
              <span className="text-[12px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60">
                {categoryLabel}
              </span>
            </div>
          </div>

          {/* Title */}
          <Link href={href(`/work/${project.slug}`)} prefetch={true}>
            <h3
              style={{ transform: "translateZ(22px)" }}
              className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl tracking-tight text-[var(--foreground)] mb-3 group-hover:text-[var(--color-accent)] transition-colors leading-[0.95]"
            >
              {project.title}
            </h3>
          </Link>

          {/* Description */}
          <p
            style={{ transform: "translateZ(16px)" }}
            className="text-[var(--foreground)] opacity-75 text-[15px] sm:text-[16px] leading-relaxed mb-6 font-medium"
          >
            {project.shortDescription}
          </p>

          {/* Colored Stack Badges */}
          <div
            style={{ transform: "translateZ(18px)" }}
            className="flex flex-wrap gap-1.5 mb-8"
          >
            {project.stack.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-[11.5px] border transition-transform hover:scale-105 ${getTechTagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{ transform: "translateZ(24px)" }}
          className="flex items-center gap-3 pt-5 border-t border-[var(--color-border)]"
        >
          <Link
            href={href(`/work/${project.slug}`)}
            prefetch={true}
            className="btn-elastic inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-contrast)] text-[13px] font-bold uppercase tracking-wider shadow-sm"
          >
            <span>{viewProjectText}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          <button
            type="button"
            onClick={onQuickView}
            className="btn-elastic inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--background)] text-[13px] font-bold uppercase tracking-wider text-[var(--foreground)] cursor-pointer shadow-xs"
          >
            <Eye className="w-4 h-4 stroke-[2.5] opacity-70" />
            <span>{quickViewText}</span>
          </button>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const { t, href } = useI18n();
  const [activeModalProject, setActiveModalProject] = useState<ProjectMetadata | null>(null);

  const categoryLabels = {
    product: t.work.category.product,
    client: t.work.category.client,
    experimental: t.work.category.experimental,
  };

  return (
    <section id="work" className="w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--color-border)] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)] mb-2 block">
              Production Systems
            </span>
            <h2 className="[font-family:var(--font-display)] uppercase text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.88] text-[var(--foreground)]">
              {t.work.title}
            </h2>
            <p className="mt-3 text-[var(--foreground)] opacity-75 text-[16px] sm:text-[18px] max-w-xl font-medium">
              {t.work.subtitle}
            </p>
          </div>
        </div>

        {/* 2-Column Balanced Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, index) => (
            <ProjectTiltCard
              key={project.slug}
              project={project}
              index={index}
              categoryLabel={categoryLabels[project.category]}
              viewProjectText={t.work.viewProject}
              quickViewText={t.work.quickView}
              href={href}
              onQuickView={() => setActiveModalProject(project)}
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
