"use client";

import { PlayArt } from "./PlayArt";
import { Info } from "lucide-react";
import { branches } from "@/lib/branches";
import { useSite } from "./Providers";
import { Cloud, Reveal, SectionHead, Sparkle, toneClasses } from "./ui";

const CARD_BG = ["bg-sun-soft", "bg-violet-soft", "bg-peach-soft"];
const SHAPES = ["shape-a", "shape-b", "shape-d"];

export function Groups() {
  const { t, lang } = useSite();
  return (
    <section id="groups" aria-labelledby="groups-title" className="section">
      <div className="wrap">
        <SectionHead id="groups-title" eyebrow={t.groups.eyebrow} title={t.groups.title} lead={t.groups.lead} />

        <div className="mt-6 grid gap-4 md:mt-7 lg:grid-cols-2 xl:gap-6">
          {branches.map((b, bi) => {
            const tone = toneClasses[b.tone];
            return (
              <Reveal key={b.id} delay={bi * 0.08} className={`relative min-w-0 p-3.5 sm:p-5 ${bi === 0 ? "shape-a" : "shape-c"} ${tone.mist}`}>
                <Cloud aria-hidden className="absolute top-4 right-4 hidden h-4 w-7 text-paper lg:block" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className={`font-display text-base font-semibold sm:text-[17px] ${tone.text}`}>{b.name[lang]}</h3>
                </div>
                <ul className="mt-2.5 flex flex-wrap gap-1.5 text-[12.5px] font-extrabold sm:text-[13px]">
                  <li className="rounded-full bg-paper px-3 py-1 text-ink">
                    {t.common.groups}: {b.groups}
                  </li>
                  <li className="rounded-full bg-paper px-3 py-1 text-ink">
                    {b.ages} {t.common.agesUnit}
                  </li>
                  <li className="rounded-full bg-paper px-3 py-1 text-ink">{t.common.languagesValue}</li>
                </ul>

                <ul className="mt-3.5 grid grid-cols-3 gap-2 sm:gap-3">
                  {Array.from({ length: b.groups }).map((_, i) => (
                    <li
                      key={i}
                      className={`lift relative flex min-w-0 flex-col items-center gap-1.5 px-2 py-3 text-center sm:items-start sm:p-4 sm:text-left ${SHAPES[i % 3]} ${CARD_BG[i % 3]}`}
                    >
                      <PlayArt kind={(["sun", "cloud", "star"] as const)[i % 3]} />
                      <span className="min-w-0">
                        <span className="block font-display text-[13.5px] font-semibold text-ink sm:text-[15px]">{t.groups.group(i + 1)}</span>
                        <span className="mt-0.5 hidden text-[12.5px] leading-snug font-bold text-ink-soft sm:block">{t.groups.groupNote}</span>
                      </span>
                      <Sparkle aria-hidden className="absolute top-2 right-2 hidden h-3 w-3 text-paper sm:block" />
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-4 flex items-start gap-2 text-[14px] text-ink-soft sm:text-[15px]">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet" aria-hidden />
          <p>{t.groups.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
