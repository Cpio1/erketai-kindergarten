"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { afterNextPaint, scrollToSection } from "@/lib/anchor-scroll";
import { branches } from "@/lib/branches";
import { SECTION_IDS, type SectionId } from "@/lib/i18n";
import { useSite } from "./Providers";
import { WhatsAppIcon } from "./ui";

export function Brand({ logo, light = false }: { logo: string | null; light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {logo ? (
        <Image src={logo} alt="" width={40} height={40} className="h-10 w-10 rounded-xl object-contain" />
      ) : (
        <span aria-hidden className="relative grid h-10 w-10 shrink-0 place-items-center rounded-[14px_14px_14px_5px] bg-teal">
          <span className="font-display text-lg font-bold text-white">E</span>
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-sun ring-2 ring-cream" />
        </span>
      )}
      <span className={`font-display text-[19px] font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Erketai
      </span>
    </span>
  );
}

function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useSite();
  return (
    <div role="group" aria-label={t.nav.langLabel} className={`flex rounded-full bg-paper p-1 shadow-[inset_0_0_0_1.5px_var(--color-line)] ${className}`}>
      {(["kk", "ru"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`min-h-11 min-w-11 rounded-full px-3 text-sm font-extrabold transition-colors ${
            lang === l ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
          }`}
        >
          {l === "kk" ? "KZ" : "RU"}
        </button>
      ))}
    </div>
  );
}

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/*
  Барлық ішкі якорь сілтемелерін (мәзір, футер, Hero батырмалары) ұстап,
  бөлімге шапка биіктігін ескеріп скроллдайды. Мобильді мәзірден басқанда
  алдымен мәзір жабылып, body скролл-құлпы алынады — содан кейін ғана скролл.
*/
function useAnchorNavigation(closeMenu: () => void) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (!el || el.tagName !== "SECTION") return; // мысалы #main (SkipLink) — әдепкі әрекет
      e.preventDefault();
      const fromHeader = !!a.closest("header");
      closeMenu();
      if (id === "top") history.pushState(null, "", location.pathname + location.search);
      else if (location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
      (fromHeader ? afterNextPaint() : Promise.resolve()).then(() => scrollToSection(id));
    };
    document.addEventListener("click", onClick);

    /* Сілтемемен ашылғанда (/#groups) — суреттер жүктелген соң позицияны нақтылау */
    const initial = decodeURIComponent(location.hash.slice(1));
    const fixInitial = () => {
      if (initial && document.getElementById(initial)?.tagName === "SECTION") scrollToSection(initial, { smooth: false });
    };
    if (document.readyState === "complete") fixInitial();
    else window.addEventListener("load", fixInitial, { once: true });

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", fixInitial);
    };
  }, [closeMenu]);
}

export function Header({ logo }: { logo: string | null }) {
  const { t, lang, setEnrollOpen } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const panelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setOpen(false), []);
  useAnchorNavigation(closeMenu);

  // Measure the bar, excluding the absolute mobile menu. Keep its CSS height independent.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => document.documentElement.style.setProperty("--header-h", `${bar.parentElement!.getBoundingClientRect().height}px`);
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    measure();
    return () => { observer.disconnect(); document.documentElement.style.removeProperty("--header-h"); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Мобильді мәзір: скроллды құлыптау, Esc, фокус */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-cream/90 shadow-[0_8px_24px_-18px_rgb(34_48_74/0.35)] backdrop-blur-md" : "bg-cream/0"
      }`}
    >
      <div ref={barRef} className="header-bar wrap flex items-center justify-between gap-4">
        <a href="#top" aria-label={`Erketai — ${t.nav.home}`} className="shrink-0 rounded-xl" onClick={() => setOpen(false)}>
          <Brand logo={logo} />
        </a>

        {/* Десктоп навигациясы (≥1280px) */}
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative block rounded-full px-3 py-2 text-[15px] font-bold transition-colors ${
                    active === id ? "text-teal-deep" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {t.nav[id]}
                  {active === id ? (
                    <motion.span layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sun" />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <button type="button" onClick={() => setEnrollOpen(true)} className="btn btn-primary btn-sm hidden min-[1400px]:inline-flex">
            {t.nav.enroll}
          </button>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Мобильді / планшет мәзірі (<1280px) */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-0 top-[var(--header-h)] h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain bg-cream xl:hidden"
          >
            <nav aria-label="Mobile" className="wrap pb-10 pt-3" lang={lang}>
              <ul className="grid gap-1.5 sm:grid-cols-2 sm:gap-2">
                {SECTION_IDS.map((id, i) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-13 items-center justify-between rounded-2xl px-4 py-3 text-[17px] font-extrabold ${
                        active === id ? "bg-teal-soft text-teal-deep" : "bg-paper text-ink"
                      }`}
                    >
                      {t.nav[id]}
                      <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${["bg-sun", "bg-teal", "bg-peach", "bg-violet"][i % 4]}`} />
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setEnrollOpen(true);
                }}
                className="btn btn-primary mt-5 w-full"
              >
                {t.hero.enroll}
              </button>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {branches.map((b) => (
                  <a
                    key={b.id}
                    href={b.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3"
                  >
                    <WhatsAppIcon className="h-5 w-5 shrink-0 text-wa-deep" />
                    <span className="min-w-0">
                      <span className="block text-sm font-extrabold text-ink">{b.name[lang]}</span>
                      <span className="block text-sm text-ink-soft">{b.phone.display}</span>
                    </span>
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
