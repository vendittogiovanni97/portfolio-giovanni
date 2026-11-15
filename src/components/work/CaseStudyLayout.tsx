"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ProjectMetadata } from "@/lib/content";
import { useI18n } from "@/i18n";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface CaseStudyLayoutProps {
  project: ProjectMetadata;
  prevProject: ProjectMetadata | null;
  nextProject: ProjectMetadata | null;
  children: React.ReactNode;
}

export function CaseStudyLayout({ project, prevProject, nextProject, children }: CaseStudyLayoutProps) {
  const { t, href } = useI18n();

  return (
    <article className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="relative w-full pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button Pill */}
          <Link
            href={`${href("/")}#work`}
            scroll={false}
            prefetch={true}
            className="btn-elastic inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] mb-8 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{t.work.caseStudy.backToWork}</span>
          </Link>

          {/* Category & Status Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--foreground)]">
              {t.work.category[project.category]}
            </span>
            {project.current && (
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-xs">
                {t.work.caseStudy.current}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="[font-family:var(--font-display)] uppercase text-5xl sm:text-7xl lg:text-8xl text-[var(--foreground)] tracking-tight leading-[0.88] mb-6">
            {project.title}
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[var(--foreground)] opacity-80 max-w-3xl mb-8 font-medium leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Metadata Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <div
              className="rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] px-5 py-3.5"
              style={{ boxShadow: "var(--shadow-sticker, 0 4px 0 rgba(0,0,0,0.15))" }}
            >
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mb-0.5">
                {t.work.caseStudy.role}
              </div>
              <div className="font-bold text-sm text-[var(--foreground)]">{project.role}</div>
            </div>

            <div
              className="rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] px-5 py-3.5"
              style={{ boxShadow: "var(--shadow-sticker, 0 4px 0 rgba(0,0,0,0.15))" }}
            >
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mb-0.5">
                {t.work.caseStudy.company}
              </div>
              <div className="font-bold text-sm text-[var(--foreground)]">{project.company}</div>
            </div>

            <div
              className="rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] px-5 py-3.5"
              style={{ boxShadow: "var(--shadow-sticker, 0 4px 0 rgba(0,0,0,0.15))" }}
            >
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mb-0.5">
                {t.work.caseStudy.period}
              </div>
              <div className="font-bold text-sm text-[var(--foreground)]">
                {project.startDate}{project.endDate ? ` – ${project.endDate}` : ` – ${t.work.caseStudy.present}`}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Metrics Section */}
      {project.metrics && Object.keys(project.metrics).length > 0 && (
        <section className="w-full py-14 border-y border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mb-6">
              {t.work.caseStudy.keyMetrics}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(project.metrics).map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="[font-family:var(--font-display)] uppercase text-4xl sm:text-5xl text-[var(--foreground)] tracking-tight leading-none mb-1">
                    {value}
                  </div>
                  <div className="font-mono text-xs text-[var(--foreground)] opacity-70 uppercase tracking-wider">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {project.images?.gallery && project.images.gallery.length > 0 && (
        <section className="w-full py-16 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mb-6">
              {t.work.caseStudy.screenshot}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.gallery.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative rounded-3xl overflow-hidden border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-2 ${
                    i === 0 ? "md:col-span-2" : ""
                  }`}
                  style={{
                    boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
                  }}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-neutral-950">
                    <Image
                      src={src}
                      alt={`${project.title} — ${t.work.caseStudy.screenshot} ${i + 1}`}
                      width={1600}
                      height={900}
                      className="w-full h-auto object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Markdown Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none text-[var(--foreground)] [&_h2]:[font-family:var(--font-display)] [&_h2]:uppercase [&_h2]:text-[var(--foreground)] [&_h2]:text-3xl sm:[&_h2]:text-4xl [&_h2]:mb-6 [&_h2]:mt-16 [&_h2]:tracking-tight [&_h3]:[font-family:var(--font-display)] [&_h3]:uppercase [&_h3]:text-[var(--foreground)] [&_h3]:text-2xl [&_h3]:mb-4 [&_h3]:mt-10 [&_p]:text-[var(--foreground)] [&_p]:opacity-85 [&_p]:text-base sm:[&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-6 [&_li]:text-[var(--foreground)] [&_li]:opacity-85 [&_strong]:text-[var(--foreground)] [&_strong]:font-bold [&_code]:px-2 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:bg-[var(--color-surface)] [&_code]:border [&_code]:border-[var(--color-border)] [&_code]:text-[var(--foreground)] [&_code]:font-mono [&_code]:text-xs">
          {children}
        </div>
      </div>

      {/* Stack Section */}
      {project.stack && project.stack.length > 0 && (
        <section className="w-full py-12 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mb-4">
              {t.work.caseStudy.techStack}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live Demo CTA */}
      {project.links?.live && (
        <section className="w-full py-12 border-t border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4">
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-elastic inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <span>{t.work.caseStudy.liveDemo}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </section>
      )}

      {/* Next / Prev Navigation */}
      <nav className="w-full border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          {prevProject ? (
            <Link
              href={href(`/work/${prevProject.slug}`)}
              prefetch={true}
              className="flex-1 py-8 pr-6 group hover:bg-[var(--color-surface)] transition-colors"
            >
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mb-2 flex items-center gap-1.5">
                <ChevronLeft className="w-4 h-4" />
                <span>{t.work.caseStudy.previous}</span>
              </div>
              <div className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-tight">
                {prevProject.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextProject ? (
            <Link
              href={href(`/work/${nextProject.slug}`)}
              prefetch={true}
              className="flex-1 py-8 pl-6 text-right group hover:bg-[var(--color-surface)] transition-colors"
            >
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-60 mb-2 flex items-center justify-end gap-1.5">
                <span>{t.work.caseStudy.next}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
              <div className="[font-family:var(--font-display)] uppercase text-xl sm:text-2xl text-[var(--foreground)] tracking-tight">
                {nextProject.title}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </nav>
    </article>
  );
}
