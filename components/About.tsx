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
          <Blob className={`absolute -right-4 -bottom-6 h-28 w-28 ${fallback === "a" ? "text-sun/60" : "text-violet/30"}`} />
          <Sparkle className={`relative h-12 w-12 ${fallback === "a" ? "text-sun-deep/70" : "text-violet-deep/60"}`} />
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
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-12 xl:gap-20">
          {/* Десктоп: екі суреттен коллаж */}
          <Reveal className="relative hidden md:block">
            <div className="relative grid grid-cols-[1fr_0.8fr] gap-4 p-4">
              <Ring aria-hidden className="absolute top-0 left-0 h-9 w-9 text-teal/60" />
              <span aria-hidden className="absolute right-2 bottom-0 h-12 w-12 rounded-full bg-peach/70" />
              <PhotoTile src={photos[0]} alt={t.about.photoAlt} fallback="a" sizes="(min-width:1280px) 300px, 25vw" className="shape-c row-span-2 aspect-[3/4] shadow-soft" />
              <PhotoTile src={photos[1]} alt={t.about.photoAlt} fallback="b" sizes="(min-width:1280px) 240px, 20vw" className="shape-a mt-10 aspect-square shadow-soft" />
              <div className="shape-d flex flex-col justify-center bg-teal px-5 py-4 text-white">
                <span className="font-display text-2xl font-bold">ҚАЗ · РУС</span>
                <span className="mt-1 text-sm font-bold text-white/85">+ English</span>
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            <SectionHead id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} lead={t.about.lead} />

            {/* Мобильді: бір сурет */}
            <Reveal className="mt-6 md:hidden">
              <PhotoTile src={photos[0]} alt={t.about.photoAlt} fallback="a" sizes="100vw" className="shape-b aspect-[16/10] shadow-soft" />
            </Reveal>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2 md:mt-9">
              {POINTS.map(({ key, icon: I, tone }, i) => (
                <Reveal
                  as="li"
                  key={key}
                  delay={i * 0.05}
                  className={`card flex gap-4 p-4 sm:p-5 ${i === POINTS.length - 1 ? "sm:col-span-2" : ""} ${["shape-a", "shape-b", "shape-c", "shape-d", "shape-a"][i]}`}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tone}`}>
                    <I className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-extrabold text-ink">{t.about.points[key].title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-ink-soft">{t.about.points[key].text}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
