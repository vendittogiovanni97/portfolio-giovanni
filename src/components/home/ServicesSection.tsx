"use client";

import { useI18n } from "@/i18n";
import { AppleAccordion, type AccordionItemData } from "@/components/ui/AppleAccordion";
import { motion } from "framer-motion";

export function ServicesSection() {
  const { t } = useI18n();

  // Normalize items to ensure full typing match
  const items: AccordionItemData[] = (t.engineeringServices?.items || []).map((item) => ({
    id: item.id,
    badge: item.badge,
    title: item.title,
    shortDesc: item.shortDesc,
    fullDesc: item.fullDesc,
    deliverables: [...item.deliverables],
    techStack: [...item.techStack],
  }));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14 gap-3"
      >
        <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)] px-3 py-1 rounded-full bg-[var(--color-badge-bg)] border border-[var(--color-border)]">
          {t.engineeringServices?.badge}
        </span>

        <h2 className="[font-family:var(--font-display)] uppercase text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] text-[var(--foreground)]">
          {t.engineeringServices?.title}
        </h2>

        <p className="text-sm sm:text-base text-[var(--foreground)] opacity-70 leading-relaxed max-w-2xl">
          {t.engineeringServices?.subtitle}
        </p>
      </motion.div>

      {/* Interactive Apple Accordion Component */}
      <AppleAccordion items={items} defaultOpenId="fullstack" />
    </div>
  );
}
