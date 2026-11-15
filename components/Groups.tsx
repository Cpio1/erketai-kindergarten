"use client";

import { Info } from "lucide-react";
import { branches } from "@/lib/branches";
import { useSite } from "./Providers";
import { Cloud, Reveal, SectionHead, Sparkle, toneClasses } from "./ui";

/** Топ карточкаларына арналған кішкентай балалар иллюстрациялары */
function GroupArt({ index }: { index: number }) {
  if (index === 0)
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
        <circle cx="32" cy="32" r="14" fill="#ffc94d" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x="30" y="4" width="4" height="9" rx="2" fill="#ffc94d" transform={`rotate(${i * 45} 32 32)`} />
        ))}
        <circle cx="27" cy="30" r="1.8" fill="#22304a" />
        <circle cx="37" cy="30" r="1.8" fill="#22304a" />
        <path d="M27 36c3 3 7 3 10 0" stroke="#22304a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    );
  if (index === 1)
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
        <path d="M50 30a12 12 0 0 0-23-4 9 9 0 0 0-12 9 7.5 7.5 0 0 0 2 14.8h32A10 10 0 0 0 50 30Z" fill="#8a6fe8" opacity=".85" />
        <circle cx="28" cy="38" r="1.8" fill="#fff" />
        <circle cx="38" cy="38" r="1.8" fill="#fff" />
        <path d="M30 43c2 1.6 4.5 1.6 6.5 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    );
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden>
      <path d="M32 8l6.6 14.2 15.4 1.8-11.4 10.6 3.1 15.3L32 42.4 18.3 49.9l3.1-15.3L10 24l15.4-1.8Z" fill="#ff9f7f" strokeLinejoin="round" />
      <circle cx="27.5" cy="30" r="1.8" fill="#22304a" />
      <circle cx="36.5" cy="30" r="1.8" fill="#22304a" />
      <path d="M28 35.5c2.4 2 5.6 2 8 0" stroke="#22304a" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const CARD_BG = ["bg-sun-soft", "bg-violet-soft", "bg-peach-soft"];
const SHAPES = ["shape-a", "shape-b", "shape-d"];

export function Groups() {
  const { t, lang } = useSite();
  return (
    <section id="groups" aria-labelledby="groups-title" className="section">
      <div className="wrap">
        <SectionHead id="groups-title" eyebrow={t.groups.eyebrow} title={t.groups.title} lead={t.groups.lead} />

        <div className="mt-9 grid gap-6 lg:grid-cols-2 xl:gap-8">
          {branches.map((b, bi) => {
            const tone = toneClasses[b.tone];
            return (
              <Reveal key={b.id} delay={bi * 0.08} className={`relative min-w-0 p-4 xs:p-5 lg:p-7 ${bi === 0 ? "shape-a" : "shape-c"} ${tone.mist}`}>
                <Cloud aria-hidden className="absolute top-4 right-5 hidden h-6 w-10 text-paper sm:block" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className={`font-display text-lg font-semibold lg:text-xl ${tone.text}`}>{b.name[lang]}</h3>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2 text-[13.5px] font-extrabold">
                  <li className="rounded-full bg-paper px-3 py-1 text-ink">
                    {t.common.groups}: {b.groups}
                  </li>
                  <li className="rounded-full bg-paper px-3 py-1 text-ink">
                    {b.ages} {t.common.agesUnit}
                  </li>
                  <li className="rounded-full bg-paper px-3 py-1 text-ink">{t.common.languagesValue}</li>
                </ul>

                <ul className="mt-5 grid grid-cols-1 gap-3 xs:grid-cols-3">
                  {Array.from({ length: b.groups }).map((_, i) => (
                    <li
                      key={i}
                      className={`lift relative flex min-w-0 items-center gap-3 p-3.5 xs:flex-col xs:items-start xs:gap-2 xs:p-4 ${SHAPES[i % 3]} ${CARD_BG[i % 3]}`}
                    >
                      <GroupArt index={i % 3} />
                      <span className="min-w-0">
                        <span className="block font-display text-base font-semibold text-ink">{t.groups.group(i + 1)}</span>
                        <span className="mt-0.5 block text-[12.5px] leading-snug font-bold text-ink-soft">{t.groups.groupNote}</span>
                      </span>
                      <Sparkle aria-hidden className="absolute top-3 right-3 h-3.5 w-3.5 text-paper" />
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6 flex items-start gap-2.5 text-[15px] text-ink-soft">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet" aria-hidden />
          <p>{t.groups.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
