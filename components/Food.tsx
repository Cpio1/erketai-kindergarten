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
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <div className="min-w-0">
            <SectionHead id="food-title" eyebrow={t.food.eyebrow} title={t.food.title} lead={t.food.lead} />

            {/* Бес мезгіл — бес табақша */}
            <Reveal className="shape-c mt-7 flex flex-wrap items-center gap-x-5 gap-y-4 bg-teal-deep px-5 py-5 text-white sm:px-6">
              <span className="font-display text-5xl leading-none font-bold">{t.food.count}</span>
              <span className="min-w-0 flex-1 basis-36 text-[15px] leading-snug font-bold text-white/90">{t.food.countLabel}</span>
              <span aria-hidden className="flex gap-1.5">
                {PLATES.map((c, i) => (
                  <span key={i} className={`grid h-7 w-7 place-items-center rounded-full ${c} ring-4 ring-white/15`}>
                    <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                  </span>
                ))}
              </span>
            </Reveal>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {CARDS.map(({ key, icon: I, tone, shape }, i) => (
              <Reveal as="li" key={key} delay={i * 0.05} className={`card lift relative p-5 ${shape}`}>
                <span className={`grid h-11 w-11 place-items-center rounded-2xl ${tone}`}>
                  <I className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3.5 font-extrabold text-ink">{t.food.cards[key].title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{t.food.cards[key].text}</p>
                {i === 1 ? <Sparkle aria-hidden className="absolute top-4 right-4 h-4 w-4 text-sun" /> : null}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
