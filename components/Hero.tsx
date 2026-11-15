"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Baby, Building2, Languages, MessageCircleHeart, UtensilsCrossed, Video } from "lucide-react";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { useSite } from "./Providers";
import { Cloud, Reveal, Ring, Sparkle } from "./ui";

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
      <div className="grid grid-cols-[1.05fr_0.95fr] items-center gap-10 lg:gap-14 xl:gap-20">
        <div className="relative min-w-0 py-4">
          <Reveal>
            <span className="eyebrow">
              <Sparkle className="h-3.5 w-3.5 text-sun" />
              {t.hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <Title className="mt-6 text-[clamp(2.1rem,1rem+2.6vw,3.6rem)] leading-[1.12]" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-7 max-w-[34rem] text-lg">{t.hero.text}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-3">
            <button type="button" onClick={() => setEnrollOpen(true)} className="btn btn-primary">
              {t.hero.enroll}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <a href="#branches" className="btn btn-ghost">
              {t.hero.branches}
            </a>
          </Reveal>
        </div>

        {/* Сурет + кішкентай декорлар — бәрі осы блоктың ішінде */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-w-0 p-5 lg:p-7"
        >
          <span aria-hidden className="absolute top-0 right-6 h-14 w-14 rounded-full bg-sun lg:h-16 lg:w-16" />
          <Ring aria-hidden className="absolute bottom-2 left-0 h-10 w-10 text-violet/70" />
          <span aria-hidden className="dots absolute right-0 bottom-10 h-20 w-16 text-peach/60" />
          <Sparkle aria-hidden className="absolute top-10 left-1 h-6 w-6 animate-float text-teal" />

          <div className="shape-a relative aspect-[5/4.3] max-h-[540px] w-full overflow-hidden bg-teal-soft shadow-lift">
            <HeroPhoto src={hero} alt={t.hero.photoAlt} sizes="(min-width: 1280px) 560px, 45vw" />
          </div>

          <div className="absolute bottom-0 left-8 flex items-center gap-2.5 rounded-2xl bg-paper px-4 py-3 shadow-soft lg:left-12">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-peach-soft text-peach-deep">
              <Baby className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-sm font-semibold text-ink">{t.hero.badgeAges}</span>
          </div>
          <div className="absolute top-12 right-0 rounded-2xl bg-paper px-4 py-2.5 shadow-soft">
            <span className="font-display text-xs font-semibold tracking-wide text-violet-deep">{t.hero.badgeLangs}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* =============== Мобильді (<768px) =============== */

function MobileHero({ hero }: { hero: string | null }) {
  const { t, setEnrollOpen } = useSite();
  return (
    <div className="wrap md:hidden">
      <Reveal>
        <span className="eyebrow text-[12px]">
          <Sparkle className="h-3 w-3 text-sun" />
          {t.hero.eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <Title className="mt-4 text-[clamp(1.55rem,0.7rem+4.6vw,2.2rem)] leading-[1.18]" />
      </Reveal>
      <Reveal delay={0.08}>
        <p className="lead mt-4 text-base">{t.hero.text}</p>
      </Reveal>

      <Reveal delay={0.1} className="relative mt-6">
        <span aria-hidden className="absolute -top-2 right-3 z-10 h-8 w-8 rounded-full bg-sun" />
        <div className="shape-b relative aspect-[4/3] w-full overflow-hidden bg-teal-soft shadow-soft">
          <HeroPhoto src={hero} alt={t.hero.photoAlt} sizes="100vw" />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-peach-soft px-3 py-1.5 text-sm font-extrabold text-peach-deep">{t.hero.badgeAges}</span>
          <span className="rounded-full bg-violet-soft px-3 py-1.5 text-sm font-extrabold text-violet-deep">{t.hero.badgeLangs}</span>
        </div>
      </Reveal>

      <Reveal delay={0.12} className="mt-6 grid gap-3">
        <button type="button" onClick={() => setEnrollOpen(true)} className="btn btn-primary w-full">
          {t.hero.enroll}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
        <a href="#branches" className="btn btn-ghost w-full">
          {t.hero.branches}
        </a>
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
    <div className="wrap mt-10 md:mt-14">
      <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-6">
        {FEATURES.map(({ key, icon: I, tone }, i) => (
          <Reveal as="li" key={key} delay={i * 0.04} className={`card lift flex min-w-0 flex-col gap-3 p-4 sm:p-5 ${["shape-a", "shape-b", "shape-c", "shape-d"][i % 4]}`}>
            <span className={`grid h-10 w-10 place-items-center rounded-2xl sm:h-11 sm:w-11 ${tone}`}>
              <I className="h-5 w-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-[14px] leading-snug font-semibold break-words text-ink sm:text-[15px]">
                {t.features[key].title}
              </span>
              <span className="mt-1 block text-[13.5px] leading-snug text-ink-soft sm:text-sm">{t.features[key].text}</span>
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export function Hero({ hero }: { hero: string | null }) {
  return (
    <section id="top" aria-label="Erketai" className="relative pt-[calc(var(--header-h)+20px)] pb-6 md:pt-[calc(var(--header-h)+40px)] md:pb-10">
      <Cloud aria-hidden className="pointer-events-none absolute top-[calc(var(--header-h)+8px)] left-[46%] hidden h-8 w-12 text-paper lg:block" />
      <DesktopHero hero={hero} />
      <MobileHero hero={hero} />
      <Features />
    </section>
  );
}
