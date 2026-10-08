"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import type { ProjectMetadata } from "@/lib/content";
import { useI18n } from "@/i18n";
import Link from "next/link";
import { Eye, ArrowUpRight } from "lucide-react";
import { ProjectQuickViewModal } from "./ProjectQuickViewModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCardProps {
  project: ProjectMetadata;
  delay?: number;
  className?: string;
  onQuickView: (project: ProjectMetadata) => void;
}

function ProjectCard({ project, delay = 0, className, onQuickView }: ProjectCardProps) {
  const { t, href } = useI18n();
  const articleRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const canTiltRef = useRef(false);
  const categoryLabels = {
    product: t.work.category.product,
    client: t.work.category.client,
    experimental: t.work.category.experimental,
  };

  // Cinematic reveal: the screenshot wipes into view instead of just fading.
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateTilt = () => { canTiltRef.current = finePointer.matches && !reducedMotion.matches; };
    updateTilt();
    finePointer.addEventListener("change", updateTilt);
    reducedMotion.addEventListener("change", updateTilt);
    return () => {
      finePointer.removeEventListener("change", updateTilt);
      reducedMotion.removeEventListener("change", updateTilt);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame = frameRef.current;
    if (!frame) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power4.inOut",
          scrollTrigger: { trigger: frame, start: "top 85%", once: true },
        }
      );
    }, frame);
    return () => ctx.revert();
  }, []);

  // Mouse-follow tilt on the screenshot only (content below stays flat/legible).
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canTiltRef.current) return;
    const el = imageWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateX: py * -4,
      rotateY: px * 5,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };
  const handleLeave = () => {
    const el = imageWrapRef.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <motion.article
      ref={articleRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -6, rotate: -0.6 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative rounded-2xl overflow-hidden glass-panel flex flex-col ${className ?? ""}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Real hero screenshot — the proof, not a decoration */}
      <div ref={frameRef} className="relative">
        <Link
          href={href(`/work/${project.slug}`)}
          prefetch={true}
          className="project-card__image relative block aspect-[16/9] overflow-hidden border-b border-slate-800 bg-slate-950"
          style={{ perspective: 1000 }}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <div ref={imageWrapRef} className="absolute inset-0 [transform-style:preserve-3d]">
            {project.images?.hero ? (
              <Image
                src={project.images.hero}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain scale-[1.02]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center [font-family:var(--font-display)] uppercase text-6xl text-slate-800">
                {project.title.slice(0, 2)}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Card Content */}
      <div className="relative z-20 p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-3 mb-4">
          <span className="font-mono text-2xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
            {categoryLabels[project.category]}
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                onQuickView(project);
              }}
              title={t.work.quickView}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-700 text-accent hover:bg-accent hover:text-slate-950 hover:border-accent transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </button>

            <Link
              href={href(`/work/${project.slug}`)}
              prefetch={true}
              title={t.work.openDetail}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-700 text-slate-200 hover:bg-accent hover:text-slate-950 hover:border-accent transition-all cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <Link href={href(`/work/${project.slug}`)} prefetch={true}>
          <h3 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-4xl leading-[0.95] text-slate-100 mb-3 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="[font-family:var(--font-body)] text-slate-400 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg font-mono text-2xs bg-slate-950/80 border border-slate-800 text-slate-300">
              {tag}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2.5 py-1 rounded-lg font-mono text-2xs bg-slate-950/40 text-slate-500 border border-slate-800/50">
              +{project.stack.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

interface SelectedWorkProps {
  projects: ProjectMetadata[];
}

export function SelectedWork({ projects }: SelectedWorkProps) {
  const { t } = useI18n();
  const [activeModalProject, setActiveModalProject] = useState<ProjectMetadata | null>(null);

  return (
    <section id="work" className="w-full py-20 relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">

        {/* Section Header */}
        <div className="mb-10 border-b border-slate-800 pb-6">
          <h2 className="[font-family:var(--font-display)] uppercase text-4xl sm:text-5xl text-slate-100 tracking-tight">
            {t.work.title}
          </h2>
          <p className="mt-2 text-slate-400 text-base max-w-xl [font-family:var(--font-body)]">
            {t.work.subtitle}
          </p>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                delay={0.05 + index * 0.05}
                onQuickView={(proj) => setActiveModalProject(proj)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <ProjectQuickViewModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
