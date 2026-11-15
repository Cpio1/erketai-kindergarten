"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { getBranch, whatsappWithText } from "@/lib/branches";
import { ACTIVITY_ICONS, SERVICE_ICONS } from "./BranchParts";
import { BranchTabs } from "./Branches";
import { useSite } from "./Providers";
import { Reveal, SectionHead, WhatsAppIcon } from "./ui";

const TONES = [
  "bg-teal-soft text-teal-deep",
  "bg-peach-soft text-peach-deep",
  "bg-sun-soft text-sun-deep",
  "bg-violet-soft text-violet-deep",
];
const SHAPES = ["shape-a", "shape-b", "shape-c", "shape-d"];

export function Clubs() {
  const { t, lang, branch: id } = useSite();
  const b = getBranch(id);
  const askText = `${lang === "kk" ? "Сәлеметсіз бе! Үйірмелер кестесі туралы білгім келеді." : "Здравствуйте! Хочу узнать расписание кружков."} (${b.name[lang]})`;

  return (
    <section id="clubs" aria-labelledby="clubs-title" className="section">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead id="clubs-title" eyebrow={t.clubs.eyebrow} title={t.clubs.title} lead={t.clubs.lead} />
          <Reveal className="shrink-0">
            <BranchTabs idPrefix="clubs" />
          </Reveal>
        </div>

        <div id="clubs-panel" role="tabpanel" aria-labelledby={`clubs-tab-${b.id}`} aria-live="polite" className="mt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <h3 className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">
                {t.clubs.clubsLabel} · {b.name[lang]}
              </h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {b.activities.map((a, i) => {
                  const I = ACTIVITY_ICONS[a];
                  return (
                    <li key={a} className={`card lift flex min-w-0 items-start gap-4 p-4 sm:flex-col sm:gap-0 sm:p-6 ${SHAPES[i % 4]}`}>
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl sm:h-13 sm:w-13 ${TONES[i % 4]}`}>
                        <I className="h-6 w-6" aria-hidden />
                      </span>
                      <span className="min-w-0 sm:mt-4">
                        <span className="block font-display text-base font-semibold text-ink sm:text-lg">{t.clubs.activities[a].title}</span>
                        <span className="mt-1 block text-[15px] leading-relaxed text-ink-soft">{t.clubs.activities[a].text}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>

              {b.services.length ? (
                <div className="mt-8">
                  <h3 className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">{t.clubs.serviceLabel}</h3>
                  <ul className="mt-3 grid gap-3 lg:grid-cols-2">
                    {b.services.map((s) => {
                      const I = SERVICE_ICONS[s];
                      return (
                        <li key={s} className="shape-b flex min-w-0 items-start gap-4 border-2 border-dashed border-violet/40 bg-violet-soft/60 p-4 sm:p-5">
                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet text-white">
                            <I className="h-6 w-6" aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-base font-semibold text-ink sm:text-lg">{t.clubs.services[s].title}</span>
                            <span className="mt-1 block text-[15px] leading-relaxed text-ink-soft">{t.clubs.services[s].text}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              <a href={whatsappWithText(b, askText)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8 w-full sm:w-auto">
                <WhatsAppIcon className="h-[18px] w-[18px] text-wa-deep" />
                {t.clubs.ask}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
