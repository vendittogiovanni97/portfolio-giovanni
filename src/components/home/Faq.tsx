"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, Mail, HelpCircle } from "lucide-react";
import { useI18n } from "@/i18n";
import { config } from "@/lib/config";

export function Faq() {
  const { t } = useI18n();
  // Default first item open to invite reading
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="w-full py-24 relative overflow-hidden scroll-mt-24">

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/[0.08] bg-white mb-4 shadow-xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-neutral-800" />
            <span className="text-[12px] font-medium text-neutral-700">
              {t.faq.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.035em] text-[#111111]"
          >
            {t.faq.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-neutral-600 text-[15px] sm:text-[16px] leading-relaxed"
          >
            {t.faq.subtitle}
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const itemNumber = String(idx + 1).padStart(2, "0");

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "card-elevation-high border-black/20"
                    : "card-elevation-subtle hover:border-black/20 hover:-translate-y-0.5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                    <span className="font-mono text-xs sm:text-sm font-medium text-neutral-400 shrink-0">
                      {itemNumber}
                    </span>
                    <span className="text-[16px] sm:text-[17.5px] font-semibold text-[#111111] tracking-tight">
                      {item.q}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "border-black/20 bg-[#111111] text-white rotate-180"
                        : "border-black/[0.08] bg-[#f5f4f2] text-neutral-600 group-hover:border-black/15"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-7 pt-2 border-t border-black/[0.06] pl-14 sm:pl-20">
                        <p className="text-neutral-600 text-[14.5px] sm:text-[15.5px] leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance & Direct Action Bottom Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mt-14 rounded-2xl border border-black/[0.08] bg-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_1px_2px_rgba(10,10,10,0.03),0_18px_36px_-18px_rgba(10,10,10,0.08)]"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-[22px] font-semibold text-[#111111] tracking-tight">
              {t.faq.stillQuestions}
            </h3>
            <p className="text-neutral-600 text-[14.5px] max-w-lg">
              {t.faq.askDirectly}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={config.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#111111] text-white hover:bg-neutral-800 text-[14px] font-medium transition-all shadow-xs active:scale-[0.97]"
            >
              <Calendar className="w-4 h-4 text-white/80 shrink-0" />
              <span>{t.faq.bookCall}</span>
            </a>

            <a
              href={`mailto:${config.email}?subject=Richiesta%20Informazioni%20Progetto`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-black/10 bg-white hover:border-black/20 hover:bg-neutral-50 text-neutral-800 text-[14px] font-medium transition-all active:scale-[0.97]"
            >
              <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>{t.faq.emailMe}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
