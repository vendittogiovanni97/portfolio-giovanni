"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LayoutGrid, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { config } from "@/lib/config";

const SERVICE_ICONS = {
  platforms: LayoutGrid,
  ai: Sparkles,
  performance: ShieldCheck,
} as const;

export function Services() {
  const { t, href } = useI18n();
  const reduce = useReducedMotion();

  const services = [
    {
      key: "platforms" as const,
      data: t.services.items.platforms,
      icon: SERVICE_ICONS.platforms,
    },
    {
      key: "ai" as const,
      data: t.services.items.ai,
      icon: SERVICE_ICONS.ai,
      featured: true,
    },
    {
      key: "performance" as const,
      data: t.services.items.performance,
      icon: SERVICE_ICONS.performance,
    },
  ];

  return (
    <section id="services" className="w-full py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-12 border-b border-black/[0.08] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.035em] text-[#111111]">
              {t.services.title}
            </h2>
            <p className="mt-2 text-neutral-600 text-[15px] sm:text-[16px]">
              {t.services.subtitle}
            </p>
          </div>

          <a
            href={config.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start md:self-auto px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-neutral-800 transition-all text-sm font-medium shadow-xs cursor-pointer group active:scale-[0.97]"
          >
            <Calendar className="w-4 h-4 text-white/80 shrink-0" />
            <span>{t.services.bookCall}</span>
            <ArrowRight className="w-4 h-4 text-white/80 transition-transform group-hover:translate-x-1 shrink-0" />
          </a>
        </div>

        {/* 3 Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.key}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative rounded-2xl card-elevation-high p-7 sm:p-8 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group"
              >
                {srv.featured && (
                  <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
                )}
                <div>
                  {/* Category Pill + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-[#111111] text-white shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-amber-200" />
                    </div>
                    <span className="text-[11.5px] font-medium text-neutral-700 px-2.5 py-0.5 rounded-full bg-[#f5f4f2] border border-black/[0.06]">
                      {srv.data.tag}
                    </span>
                  </div>

                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111111] mb-3">
                    {srv.data.title}
                  </h3>

                  <p className="text-neutral-600 text-[14px] leading-relaxed mb-6">
                    {srv.data.desc}
                  </p>

                  {/* Deliverables Bullet List */}
                  <div className="border-t border-black/[0.06] pt-5 space-y-2.5">
                    {srv.data.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                        <span className="text-[13.5px] text-neutral-700 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-8 pt-5 border-t border-black/[0.06]">
                  <Link
                    href={href("/contact")}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#111111] hover:text-neutral-600 transition-colors"
                  >
                    <span>{t.services.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
