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
    return "bg-[#111111] text-white border-transparent font-medium shadow-xs";
  }
  return "bg-neutral-100 hover:bg-neutral-200/70 text-neutral-800 border-black/[0.06] font-mono";
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

  const mouseXSpring = useSpring(x, { stiffness: 240, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 240, damping: 24 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
        }}
        className="group relative rounded-2xl overflow-hidden card-elevation-high p-6 sm:p-7 flex flex-col justify-between h-full"
      >
        <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
          {/* Browser Window Mockup Frame */}
          <Link
            href={href(`/work/${project.slug}`)}
            prefetch={true}
            style={{ transform: "translateZ(26px)" }}
            className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-black/[0.09] bg-[#0f1015] mb-6 shadow-sm group/frame transition-all duration-300"
          >
            {/* Window Bar */}
            <div className="absolute top-0 inset-x-0 h-6 bg-[#16171f] border-b border-white/[0.06] z-10 flex items-center px-3 gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
              <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
              <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
              <span className="ml-2 font-mono text-[10px] text-neutral-400">
                https://app.{project.slug}.internal
              </span>
            </div>

            {project.images?.hero ? (
              <div className="absolute inset-0 pt-6">
                <Image
                  src={project.images.hero}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 45vw, 95vw"
                  className="object-cover object-top transition-transform duration-500 group-hover/frame:scale-[1.03]"
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl text-neutral-500 pt-6">
                {project.title}
              </div>
            )}

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/frame:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-xs font-semibold text-[#111111] shadow-lg">
                <span>Vedi Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Meta Header */}
          <div
            style={{ transform: "translateZ(28px)" }}
            className="flex items-center justify-between mb-3"
          >
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-semibold bg-[#111111] text-white shadow-xs">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {index === 0 ? "Flagship ERP & AI" : "Production CRM"}
              </span>
              <span className="text-[12.5px] font-medium text-neutral-500">
                {categoryLabel}
              </span>
            </div>
          </div>

          {/* Title */}
          <Link href={href(`/work/${project.slug}`)} prefetch={true}>
            <h3
              style={{ transform: "translateZ(22px)" }}
              className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em] text-[#111111] mb-2.5 group-hover:text-neutral-700 transition-colors leading-[1.12]"
            >
              {project.title}
            </h3>
          </Link>

          {/* Description */}
          <p
            style={{ transform: "translateZ(16px)" }}
            className="text-neutral-600 text-[14.5px] sm:text-[15px] leading-relaxed mb-6"
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
                className={`px-2.5 py-1 rounded-md text-[11.5px] font-medium border transition-colors ${getTechTagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{ transform: "translateZ(24px)" }}
          className="flex items-center gap-3 pt-5 border-t border-black/[0.06]"
        >
          <Link
            href={href(`/work/${project.slug}`)}
            prefetch={true}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-[13.5px] font-medium hover:bg-neutral-800 transition-all active:scale-[0.97] shadow-xs"
          >
            <span>{viewProjectText}</span>
            <ArrowUpRight className="w-4 h-4 text-white/70" />
          </Link>

          <button
            type="button"
            onClick={onQuickView}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/10 bg-white text-[13.5px] font-medium text-neutral-700 hover:border-black/20 hover:bg-neutral-50 transition-all active:scale-[0.97] cursor-pointer shadow-xs"
          >
            <Eye className="w-4 h-4 text-neutral-500" />
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
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/[0.08] pb-6">
          <div>
            <h2 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.035em] text-[#111111]">
              {t.work.title}
            </h2>
            <p className="mt-1.5 text-neutral-600 text-[15px] sm:text-[16px] max-w-lg">
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
