"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useI18n } from "@/i18n";
import { config } from "@/lib/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, href } = useI18n();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const [hoverRect, setHoverRect] = useState<{ left: number; width: number } | null>(null);
  const homeHref = href("/");

  const navLinks = [
    { href: `${homeHref}#work`, label: t.nav.work, targetId: "work" },
    { href: href("/lab"), label: "Lab Demo" },
    { href: href("/writing"), label: t.nav.writing },
    { href: "/documents/CV_Giovanni_Venditto.pdf", label: "Curriculum", isDownload: true },
    { href: `${homeHref}#faq`, label: "FAQ", targetId: "faq" },
  ];

  const socialLinks = [
    {
      href: `https://linkedin.com/in/${config.linkedin}`,
      label: "LinkedIn",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      href: `https://github.com/${config.github}`,
      label: "GitHub",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.579v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      href: `mailto:${config.email}`,
      label: "Email",
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? window.scrollY / docH : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkHover = (e: React.MouseEvent<HTMLElement>) => {
    if (!linksRef.current) return;
    const linkRect = e.currentTarget.getBoundingClientRect();
    const containerRect = linksRef.current.getBoundingClientRect();
    setHoverRect({ left: linkRect.left - containerRect.left, width: linkRect.width });
  };

  const scrollToTarget = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const lenis = (window as unknown as {
      __lenis?: { scrollTo: (el: HTMLElement, opts?: { offset?: number }) => void };
    }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset: -90 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scrim */}
      <div
        aria-hidden="true"
        className={`fixed top-0 left-0 w-full h-24 z-40 pointer-events-none transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 64%, color-mix(in oklab, var(--background) 80%, transparent) 86%, transparent)",
        }}
      />

      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <motion.nav
        id="main-nav"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-[padding] duration-200 px-4 sm:px-6 ${
          scrolled ? "py-3" : "py-4"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto flex justify-between items-center glass-panel rounded-full px-5 sm:px-6 py-2">

          {/* Logo */}
          <Link
            href={homeHref}
            prefetch={true}
            className="group [font-family:var(--font-display)] uppercase text-lg text-slate-100 hover:text-accent transition-colors"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">GV</span>
            <span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav Links */}
          <div
            ref={linksRef}
            onMouseLeave={() => setHoverRect(null)}
            className="hidden md:flex items-center gap-1 relative"
          >
            {/* Sliding hover indicator */}
            <AnimatePresence>
              {hoverRect && (
                <motion.div
                  layoutId="nav-hover-pill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, left: hoverRect.left, width: hoverRect.width }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute top-0 h-full rounded-md bg-accent/10 border border-accent/20 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {navLinks.map((link) =>
              link.isDownload ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="CV_Giovanni_Venditto.pdf"
                  onMouseEnter={handleLinkHover}
                  className="relative z-10 text-slate-100 font-mono text-xs hover:text-accent px-3 py-1.5 rounded-md transition-colors duration-200 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-accent" />
                  <span>{link.label}</span>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.targetId && pathname === homeHref) {
                      e.preventDefault();
                      scrollToTarget(link.targetId);
                    }
                  }}
                  onMouseEnter={handleLinkHover}
                  className="relative z-10 text-slate-100 font-mono text-xs hover:text-accent px-3 py-1.5 rounded-md transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Controls & Social Links */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social Icons Floating inside Nav Pill */}
            <div className="flex items-center gap-2.5 pr-3.5 border-r border-slate-800/80">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="p-1.5 rounded-full text-slate-100 hover:text-accent hover:bg-slate-900 transition-all hover:scale-110"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <LanguageToggle />
            <Link
              href={href("/contact")}
              className="px-4 py-1.5 rounded-full bg-accent text-slate-950 font-mono text-xs font-semibold hover:bg-accent-bright transition-all shadow-[0_0_15px_rgba(202,164,86,0.3)] hover:scale-105"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-100 p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-accent" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-3 max-w-4xl mx-auto glass-panel rounded-2xl p-5 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) =>
                  link.isDownload ? (
                    <motion.a
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="CV_Giovanni_Venditto.pdf"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-slate-100 [font-family:var(--font-display)] uppercase text-sm hover:text-accent py-2 border-b border-slate-900 flex items-center gap-2"
                    >
                      <Download className="w-4 h-4 text-accent" />
                      <span>{link.label} (PDF)</span>
                    </motion.a>
                  ) : (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          setMobileMenuOpen(false);
                          if (link.targetId && pathname === homeHref) {
                            e.preventDefault();
                            scrollToTarget(link.targetId);
                          }
                        }}
                        className="text-slate-100 [font-family:var(--font-display)] uppercase text-sm hover:text-accent py-2 border-b border-slate-900 block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      className="p-2 rounded-full border border-slate-800 text-slate-300 hover:text-accent"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
                <LanguageToggle />
              </div>

              <Link
                href={href("/contact")}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center rounded-xl bg-accent text-slate-950 [font-family:var(--font-display)] uppercase text-sm shadow-[0_0_15px_rgba(202,164,86,0.3)]"
              >
                {t.nav.contact}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
