"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Baby, Building2, Languages, MessageCircleHeart, UtensilsCrossed, Video } from "lucide-react";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { useSite } from "./Providers";
import { Reveal, Ring, Sparkle } from "./ui";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** Сурет жоқ кезде көрсетілетін иллюстрация (public/images/main-page.png қосылғанша) */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" role="presentation" aria-hidden preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="320" fill="#d9f3ef" />
      <circle cx="320" cy="70" r="34" fill="#ffc94d" />
      <path d="M40 80a18 18 0 0 1 34-6 13 13 0 1 1 6 25H42a10 10 0 0 1-2-19Z" fill="#fff" />
      <path d="M220 52a14 14 0 0 1 26-4 10 10 0 1 1 5 19h-30a8 8 0 0 1-1-15Z" fill="#fff" opacity=".85" />
      <path d="M0 250c70-30 130-30 200-6s140 20 200-6v82H0Z" fill="#bfe8c9" />
      <rect x="120" y="140" width="160" height="120" rx="14" fill="#fffdf9" />
      <path d="M108 148 200 92l92 56Z" fill="#ff9f7f" />
      <rect x="182" y="196" width="36" height="64" rx="10" fill="#8a6fe8" />
      <rect x="138" y="166" width="32" height="28" rx="8" fill="#ffc94d" />
      <rect x="230" y="166" width="32" height="28" rx="8" fill="#2fb3a8" />
      <circle cx="200" cy="128" r="10" fill="#fffdf9" />
      <circle cx="70" cy="236" r="16" fill="#2fb3a8" />
      <rect x="66" y="246" width="8" height="22" rx="4" fill="#137d75" />
      <circle cx="338" cy="232" r="13" fill="#ff9f7f" />
      <rect x="334" y="240" width="8" height="20" rx="4" fill="#c2512c" />
    </svg>
  );
}

function HeroPhoto({ src, alt, sizes, priority = true }: { src: string | null; alt: string; sizes: string; priority?: boolean }) {
  return src ? (
    <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
  ) : (
    <HeroIllustration />
  );
}

function Title({ className = "" }: { className?: string }) {
  const { t } = useSite();
  return (
    <h1 className={`font-display font-semibold tracking-[-0.025em] text-ink text-balance ${className}`}>
      <span className="text-teal-deep">{t.hero.titleLead}</span>{" "}
<span>{t.hero.titleAccent}</span>
    </h1>
  );
}

/* =============== Десктоп / планшет (≥768px) =============== */

function DesktopHero({ hero }: { hero: string | null }) {
  const { t, setEnrollOpen } = useSite();
  const reduce = useReducedMotion();
  return (
    <div className="wrap hidden md:block">
      <div className="grid grid-cols-[1.08fr_0.92fr] items-center gap-8 lg:gap-12 xl:gap-16">
        <div className="min-w-0">
          <Reveal>
            <span className="eyebrow">
              <Sparkle className="h-3 w-3 text-sun" />
              {t.hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            {/* 768px → 30px · 1280px → 40px · 1920px → 44px */}
            <Title className="mt-4 text-[clamp(1.875rem,0.95rem+1.95vw,2.75rem)] leading-[1.14] lg:mt-5" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-4 max-w-[32rem] lg:mt-5">{t.hero.text}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-3 lg:mt-8">
            <button type="button" onClick={() => setEnrollOpen(true)} className="btn btn-primary">
              {t.hero.enroll}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <a href="#branches" className="btn btn-ghost">
              {t.hero.branches}
            </a>
          </Reveal>
        </div>

        {/*
          Сурет + кішкентай декорлар. Декорлар тек p-5 бос жиегінде орналасады,
          суретке де, мәтінге де түспейді.
        */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 p-5"
        >
          <span aria-hidden className="absolute top-0 right-8 h-4 w-4 rounded-full bg-sun" />
          <Sparkle aria-hidden className="absolute top-8 left-0 h-3.5 w-3.5 text-teal" />
          <Ring aria-hidden className="absolute right-0 bottom-16 h-3.5 w-3.5 text-violet/70" />

          {/* Биіктігі экран биіктігіне байланысты: 1280×720-да да толық көрінеді */}
          <div className="shape-a relative aspect-[5/4] max-h-[clamp(280px,calc(100svh-var(--header-h)-230px),440px)] w-full overflow-hidden bg-teal-soft shadow-soft">
            <HeroPhoto src={hero} alt={t.hero.photoAlt} sizes="(min-width: 1280px) 540px, 45vw" />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-[13px] font-extrabold text-peach-deep shadow-soft">
              <Baby className="h-4 w-4" aria-hidden />
              {t.hero.badgeAges}
            </span>
            <span className="inline-flex items-center rounded-full bg-paper px-3 py-1.5 text-[13px] font-extrabold tracking-wide text-violet-deep shadow-soft">
              {t.hero.badgeLangs}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* =============== Мобильді (<768px) — жеке композиция =============== */

function MobileHero({ hero }: { hero: string | null }) {
  const { t, setEnrollOpen } = useSite();
  return (
    <div className="wrap md:hidden">
      <Reveal>
        <span className="eyebrow text-[11px] tracking-[0.03em]">
          <Sparkle className="h-3 w-3 text-sun" />
          {t.hero.eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        {/* 320px → 23px · 430px → 27px */}
        <Title className="mt-3 text-[clamp(1.4375rem,0.75rem+3.4vw,1.75rem)] leading-[1.2]" />
      </Reveal>
      <Reveal delay={0.08}>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t.hero.text}</p>
      </Reveal>

      {/* Батырмалар суреттен жоғары — 320×568 экранда да бірден көрінеді */}
      <Reveal delay={0.1} className="mt-5 grid gap-2.5">
        <button type="button" onClick={() => setEnrollOpen(true)} className="btn btn-primary w-full px-4">
          {t.hero.enroll}
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
        </button>
        <a href="#branches" className="btn btn-ghost w-full px-4">
          {t.hero.branches}
        </a>
      </Reveal>

      <Reveal delay={0.12} className="mt-5">
        <div className="shape-b relative aspect-[16/10] w-full overflow-hidden bg-teal-soft shadow-soft">
          <HeroPhoto src={hero} alt={t.hero.photoAlt} sizes="100vw" />
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          <span className="rounded-full bg-peach-soft px-3 py-1 text-[13px] font-extrabold text-peach-deep">{t.hero.badgeAges}</span>
          <span className="rounded-full bg-violet-soft px-3 py-1 text-[13px] font-extrabold text-violet-deep">{t.hero.badgeLangs}</span>
        </div>
      </Reveal>
    </div>
  );
}

/* =============== Артықшылықтар =============== */

const FEATURES: { key: "branches" | "ages" | "langs" | "english" | "meals" | "cameras"; icon: Icon; tone: string }[] = [
  { key: "branches", icon: Building2, tone: "bg-teal-soft text-teal-deep" },
  { key: "ages", icon: Baby, tone: "bg-peach-soft text-peach-deep" },
  { key: "langs", icon: Languages, tone: "bg-sun-soft text-sun-deep" },
  { key: "english", icon: MessageCircleHeart, tone: "bg-violet-soft text-violet-deep" },
  { key: "meals", icon: UtensilsCrossed, tone: "bg-teal-soft text-teal-deep" },
  { key: "cameras", icon: Video, tone: "bg-peach-soft text-peach-deep" },
];

function Features() {
  const { t } = useSite();
  return (
    <div className="wrap mt-7 md:mt-10">
      <ul className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 xl:grid-cols-6">
        {FEATURES.map(({ key, icon: I, tone }, i) => (
          <Reveal as="li" key={key} delay={i * 0.04} className={`card lift flex min-w-0 flex-col gap-2 p-3 sm:gap-2.5 sm:p-4 ${["shape-a", "shape-b", "shape-c", "shape-d"][i % 4]}`}>
            <span className={`grid h-8 w-8 place-items-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl ${tone}`}>
              <I className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[13px] leading-snug font-semibold break-words text-ink sm:text-[14px]">
                {t.features[key].title}
              </span>
              <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-soft sm:text-[13.5px]">{t.features[key].text}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export function Hero({ hero }: { hero: string | null }) {
  return (
    <section id="top" aria-label="Erketai" className="relative pt-[calc(var(--header-h)+16px)] pb-2 md:pt-[calc(var(--header-h)+24px)] md:pb-4">
      <DesktopHero hero={hero} />
      <MobileHero hero={hero} />
      <Features />
    </section>
  );
}
