"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { useI18n } from "@/i18n";
import { Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Nome troppo corto"),
  email: z.string().email("Inserisci un'email valida"),
  subject: z.string().min(3, "Oggetto troppo corto"),
  message: z.string().min(10, "Messaggio di almeno 10 caratteri"),
  honeypot: z.string().max(0),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useI18n();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(t.contact.success);
        reset();
      } else {
        toast.error(t.contact.error);
      }
    } catch {
      toast.error(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-75 block mb-2">
            {t.contact.name}
          </label>
          <input
            id="contact-name"
            {...register("name")}
            className="w-full bg-[var(--background)] border-2 border-[var(--color-border)] rounded-2xl px-4 py-3.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-40 focus:border-[var(--color-pill-bg)] focus:outline-none transition-all"
            placeholder={t.contact.name}
          />
          {errors.name && <p className="font-mono text-xs text-red-500 mt-1.5">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-75 block mb-2">
            {t.contact.email}
          </label>
          <input
            id="contact-email"
            {...register("email")}
            type="email"
            className="w-full bg-[var(--background)] border-2 border-[var(--color-border)] rounded-2xl px-4 py-3.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-40 focus:border-[var(--color-pill-bg)] focus:outline-none transition-all"
            placeholder="you@example.com"
          />
          {errors.email && <p className="font-mono text-xs text-red-500 mt-1.5">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-75 block mb-2">
          {t.contact.subject}
        </label>
        <input
          id="contact-subject"
          {...register("subject")}
          className="w-full bg-[var(--background)] border-2 border-[var(--color-border)] rounded-2xl px-4 py-3.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-40 focus:border-[var(--color-pill-bg)] focus:outline-none transition-all"
          placeholder={t.contact.subjectPlaceholder}
        />
        {errors.subject && <p className="font-mono text-xs text-red-500 mt-1.5">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-75 block mb-2">
          {t.contact.message}
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={5}
          className="w-full bg-[var(--background)] border-2 border-[var(--color-border)] rounded-2xl px-4 py-3.5 text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-40 focus:border-[var(--color-pill-bg)] focus:outline-none transition-all resize-none"
          placeholder={t.contact.message}
        />
        {errors.message && <p className="font-mono text-xs text-red-500 mt-1.5">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-elastic inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            {t.contact.sending}
          </span>
        ) : (
          <>
            <span>{t.contact.send}</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
