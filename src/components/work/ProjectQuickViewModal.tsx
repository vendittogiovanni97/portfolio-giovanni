"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectMetadata } from "@/lib/content";
import { useI18n } from "@/i18n";
import Link from "next/link";
import { X, ArrowRight, Code2, Layers } from "lucide-react";

interface ProjectQuickViewModalProps {
  project: ProjectMetadata | null;
  onClose: () => void;
}

export function ProjectQuickViewModal({
  project,
  onClose,
}: ProjectQuickViewModalProps) {
  const { t, href } = useI18n();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-2xl text-[var(--foreground)] z-10"
          style={{
            boxShadow: "var(--shadow-sticker, 0 8px 0 rgba(0,0,0,0.3))",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label={t.work.modal.closePreviewAria}
            className="btn-elastic absolute top-5 right-5 z-30 p-2.5 rounded-full bg-[var(--background)] text-[var(--foreground)] border border-[var(--color-border)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Header Visual */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-950 border-b border-[var(--color-border)]">
            {project.images?.hero ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${project.images.hero}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center">
                <Code2 className="w-20 h-20 text-neutral-700" />
              </div>
            )}

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--color-accent)] text-[var(--color-accent-contrast)] shadow-xs">
                    {project.category.toUpperCase()}
                  </span>
                  <span className="font-mono text-xs font-semibold text-white/80">{project.startDate}</span>
                </div>
                <h2 id="quickview-title" className="[font-family:var(--font-display)] uppercase text-3xl sm:text-5xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                  {project.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Description */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--color-accent)] mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>{t.work.modal.overview}</span>
              </h3>
              <p className="text-lg text-[var(--foreground)] opacity-85 leading-relaxed font-medium">
                {project.shortDescription}
              </p>
            </div>

            {/* Metrics Grid */}
            {project.metrics && Object.keys(project.metrics).length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(project.metrics).map(([label, value], idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--background)]"
                  >
                    <div className="[font-family:var(--font-display)] text-3xl uppercase tracking-tight text-[var(--color-accent)]">{value}</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Stack Badges */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--color-accent)] mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>{t.work.modal.techStackUsed}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)] opacity-85"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Role & Company info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--color-border)]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 block">{t.work.modal.role}</span>
                <span className="text-base font-bold text-[var(--foreground)]">{project.role}</span>
              </div>
              {project.company && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 block">{t.work.modal.company}</span>
                  <span className="text-base font-bold text-[var(--foreground)]">{project.company}</span>
                </div>
              )}
            </div>

            {/* Footer Action Bar */}
            <div className="flex flex-wrap items-center justify-end gap-4 pt-6 border-t border-[var(--color-border)]">
              <button
                onClick={onClose}
                className="btn-elastic px-6 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--background)] text-xs font-bold uppercase tracking-wider text-[var(--foreground)] cursor-pointer"
              >
                {t.work.modal.close}
              </button>
              <Link
                href={href(`/work/${project.slug}`)}
                onClick={onClose}
                className="btn-elastic px-7 py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-contrast)] font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>{t.work.modal.readFullCaseStudy}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
