"use client";

import { Apple, CalendarClock, MessageCircleQuestion, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useSite } from "./Providers";
import { Reveal, SectionHead, Sparkle } from "./ui";

type Key = "regular" | "kids" | "together" | "ask";
const CARDS: { key: Key; icon: ComponentType<SVGProps<SVGSVGElement>>; tone: string; shape: string }[] = [
  { key: "regular", icon: CalendarClock, tone: "bg-teal-soft text-teal-deep", shape: "shape-a" },
  { key: "kids", icon: Apple, tone: "bg-peach-soft text-peach-deep", shape: "shape-b" },
  { key: "together", icon: Users, tone: "bg-sun-soft text-sun-deep", shape: "shape-c" },
  { key: "ask", icon: MessageCircleQuestion, tone: "bg-violet-soft text-violet-deep", shape: "shape-d" },
];

const PLATES = ["bg-sun", "bg-teal", "bg-peach", "bg-violet", "bg-sun"];

export function Food() {
  const { t } = useSite();
  return (
    <section id="food" aria-labelledby="food-title" className="section bg-paper/60">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
          <div className="min-w-0">
            <SectionHead id="food-title" eyebrow={t.food.eyebrow} title={t.food.title} lead={t.food.lead} />

            {/* Бес мезгіл — бес табақша */}
            <Reveal className="shape-c mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 bg-teal-deep px-4 py-4 text-white sm:px-5 lg:mt-6">
              <span className="font-display text-[2.25rem] leading-none font-bold sm:text-[2.5rem]">{t.food.count}</span>
              <span className="min-w-0 flex-1 basis-32 text-[14px] leading-snug font-bold text-white/90 sm:text-[15px]">{t.food.countLabel}</span>
              <span aria-hidden className="flex gap-1">
                {PLATES.map((c, i) => (
                  <span key={i} className={`grid h-5 w-5 place-items-center rounded-full ${c} ring-2 ring-white/15`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  </span>
                ))}
              </span>
            </Reveal>
          </div>

          <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
            {CARDS.map(({ key, icon: I, tone, shape }, i) => (
              <Reveal as="li" key={key} delay={i * 0.05} className={`card lift relative flex gap-3 p-3.5 sm:block sm:p-5 ${shape}`}>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 sm:rounded-2xl ${tone}`}>
                  <I className="h-[18px] w-[18px] sm:h-5 sm:w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-extrabold text-ink sm:mt-3">{t.food.cards[key].title}</h3>
                  <p className="mt-0.5 text-[14px] leading-snug text-ink-soft sm:mt-1 sm:leading-relaxed">{t.food.cards[key].text}</p>
                </div>
                {i === 1 ? <Sparkle aria-hidden className="absolute top-3 right-3 hidden h-3 w-3 text-sun sm:block" /> : null}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
