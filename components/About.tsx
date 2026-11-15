"use client";

import { Camera, HeartHandshake, Languages, Palette, Sprout } from "lucide-react";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { useSite } from "./Providers";
import { Blob, Reveal, Ring, SectionHead, Sparkle } from "./ui";

type Key = "bilingual" | "atmosphere" | "development" | "activities" | "cameras";
const POINTS: { key: Key; icon: ComponentType<SVGProps<SVGSVGElement>>; tone: string }[] = [
  { key: "bilingual", icon: Languages, tone: "bg-teal-soft text-teal-deep" },
  { key: "atmosphere", icon: HeartHandshake, tone: "bg-peach-soft text-peach-deep" },
  { key: "development", icon: Sprout, tone: "bg-sun-soft text-sun-deep" },
  { key: "activities", icon: Palette, tone: "bg-violet-soft text-violet-deep" },
  { key: "cameras", icon: Camera, tone: "bg-teal-soft text-teal-deep" },
];

function PhotoTile({ src, alt, className, sizes, fallback }: { src?: string; alt: string; className: string; sizes: string; fallback: "a" | "b" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <div aria-hidden className={`absolute inset-0 grid place-items-center ${fallback === "a" ? "bg-sun-soft" : "bg-violet-soft"}`}>
          <Blob className={`absolute right-2 bottom-2 h-14 w-14 ${fallback === "a" ? "text-sun/60" : "text-violet/30"}`} />
          <Sparkle className={`relative h-8 w-8 ${fallback === "a" ? "text-sun-deep/70" : "text-violet-deep/60"}`} />
        </div>
      )}
    </div>
  );
}

export function About({ photos }: { photos: string[] }) {
  const { t } = useSite();
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-[0.82fr_1.18fr] md:items-center md:gap-10 xl:gap-16">
          {/* Десктоп: ықшам коллаж. Декорлар тек бос жиекте (p-4), суреттерге түспейді */}
          <Reveal className="relative hidden md:block">
            <div className="relative mx-auto grid max-w-[420px] grid-cols-[1fr_0.8fr] gap-3 p-4">
              <Ring aria-hidden className="absolute top-0 left-0 h-3.5 w-3.5 text-teal/70" />
              <span aria-hidden className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full bg-peach" />
              <PhotoTile src={photos[0]} alt={t.about.photoAlt} fallback="a" sizes="(min-width:1280px) 220px, 22vw" className="shape-c row-span-2 aspect-[3/4] shadow-soft" />
              <PhotoTile src={photos[1]} alt={t.about.photoAlt} fallback="b" sizes="(min-width:1280px) 180px, 18vw" className="shape-a mt-6 aspect-square shadow-soft" />
              <div className="shape-d flex flex-col justify-center bg-teal px-4 py-3 text-white">
                <span className="font-display text-base font-bold lg:text-lg">ҚАЗ · РУС</span>
                <span className="text-[13px] font-bold text-white/85">+ English</span>
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            <SectionHead id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} lead={t.about.lead} />

            {/* Мобильді: бір сурет */}
            <Reveal className="mt-5 md:hidden">
              <PhotoTile src={photos[0]} alt={t.about.photoAlt} fallback="a" sizes="100vw" className="shape-b aspect-[16/9] shadow-soft" />
            </Reveal>

            {/* Десктоп: 2 бағанды карточкалар */}
            <ul className="mt-7 hidden gap-3 md:grid lg:grid-cols-2">
              {POINTS.map(({ key, icon: I, tone }, i) => (
                <Reveal
                  as="li"
                  key={key}
                  delay={i * 0.04}
                  className={`card flex gap-3 p-4 ${i === POINTS.length - 1 ? "lg:col-span-2" : ""} ${["shape-a", "shape-b", "shape-c", "shape-d", "shape-a"][i]}`}
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${tone}`}>
                    <I className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-extrabold text-ink">{t.about.points[key].title}</span>
                    <span className="mt-0.5 block text-[14px] leading-relaxed text-ink-soft">{t.about.points[key].text}</span>
                  </span>
                </Reveal>
              ))}
            </ul>

            {/* Мобильді: бір карточкадағы ықшам тізім */}
            <Reveal className="card shape-c mt-5 md:hidden">
              <ul className="divide-y divide-line/70">
                {POINTS.map(({ key, icon: I, tone }) => (
                  <li key={key} className="flex gap-3 px-4 py-3.5">
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tone}`}>
                      <I className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-extrabold text-ink">{t.about.points[key].title}</span>
                      <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">{t.about.points[key].text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
