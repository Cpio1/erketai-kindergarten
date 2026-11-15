"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode, SVGProps } from "react";

/* ---------- Reveal: жұмсақ пайда болу ---------- */

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? motion.li : as === "article" ? motion.article : motion.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/* ---------- Бөлім тақырыбы ---------- */

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="eyebrow">
        <Sparkle className="h-3.5 w-3.5 text-sun" aria-hidden />
        {eyebrow}
      </span>
      <h2 id={id} className="h2 mt-4 text-ink">
        {title}
      </h2>
      {lead ? <p className="lead mt-4">{lead}</p> : null}
    </Reveal>
  );
}

/* ---------- Брендтік иконкалар (lucide-та жоқ) ---------- */

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------- Кішкентай декоративті фигуралар ---------- */

export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 1.5c.6 4.8 2.7 7.8 7.5 9.9.6.3.6 1 0 1.2-4.8 2.1-6.9 5.1-7.5 9.9-.1.7-.9.7-1 0-.6-4.8-2.7-7.8-7.5-9.9-.6-.3-.6-1 0-1.2C8.3 9.3 10.4 6.3 11 1.5c.1-.7.9-.7 1 0Z" />
    </svg>
  );
}

export function Squiggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden {...props}>
      <path d="M3 10c6-8 12-8 18 0s12 8 18 0 12-8 18 0 12 8 18 0" />
    </svg>
  );
}

export function Blob(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden {...props}>
      <path d="M71.6 13.4c10.6 6.3 19.3 17.8 20.4 30.2 1.1 12.5-5.4 25.9-15.7 34.6C66 86.8 51.9 90.9 39.1 88c-12.8-2.9-24.3-12.7-28.6-25-4.3-12.3-1.4-27 6.6-37.4C25.1 15.2 38.2 9 50.6 8.2c7.6-.5 14.8 1.3 21 5.2Z" />
    </svg>
  );
}

export function Ring(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="5" aria-hidden {...props}>
      <circle cx="20" cy="20" r="15" />
    </svg>
  );
}

export function Cloud(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 40" fill="currentColor" aria-hidden {...props}>
      <path d="M50.5 16.2A15 15 0 0 0 22 11.5 11 11 0 0 0 7.8 22.1 9 9 0 0 0 10 39.8h40a11.8 11.8 0 0 0 .5-23.6Z" />
    </svg>
  );
}

/** Тонға сәйкес түстер */
export const toneClasses = {
  teal: {
    soft: "bg-teal-soft",
    mist: "bg-teal-mist",
    text: "text-teal-deep",
    solid: "bg-teal",
    ring: "ring-teal",
    chip: "bg-teal-soft text-teal-deep",
  },
  peach: {
    soft: "bg-peach-soft",
    mist: "bg-[#fff3ee]",
    text: "text-peach-deep",
    solid: "bg-peach",
    ring: "ring-peach",
    chip: "bg-peach-soft text-peach-deep",
  },
} as const;
