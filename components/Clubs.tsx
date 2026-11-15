"use client";

import { PlayArt } from "./PlayArt";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { getBranch, whatsappWithText } from "@/lib/branches";
import { SERVICE_ICONS } from "./BranchParts";
import { BranchTabs } from "./Branches";
import { useSite } from "./Providers";
import { Reveal, SectionHead, WhatsAppIcon } from "./ui";

export function Clubs() {
  const { t, lang, branch: id } = useSite();
  const b = getBranch(id);
  const askText = `${lang === "kk" ? "Сәлеметсіз бе! Үйірмелер кестесі туралы білгім келеді." : "Здравствуйте! Хочу узнать расписание кружков."} (${b.name[lang]})`;

  return (
    <section id="clubs" aria-labelledby="clubs-title" className="section">
      <div className="wrap">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead id="clubs-title" eyebrow={t.clubs.eyebrow} title={t.clubs.title} lead={t.clubs.lead} />
          <Reveal className="shrink-0">
            <BranchTabs idPrefix="clubs" />
          </Reveal>
        </div>

        <div id="clubs-panel" role="tabpanel" aria-labelledby={`clubs-tab-${b.id}`} aria-live="polite" className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.1 }}>
              <h3 className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">
                {t.clubs.clubsLabel} · {b.name[lang]}
              </h3>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                {b.activities.map((a) => {
                  return (
                    <li key={a} className="club-card lift min-w-0">
                      <PlayArt kind={a}/>
                      <span className="min-w-0">
                        <span className="block font-display text-[15px] font-semibold text-ink sm:text-base">{t.clubs.activities[a].title}</span>
                        <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">{t.clubs.activities[a].text}</span>
                      </span>
                    </li>
                  );
                })}
                <li className="club-card lift min-w-0">
                  <PlayArt kind="english"/>
                  <span className="min-w-0"><span className="block font-display text-[15px] font-semibold text-ink sm:text-base">{t.features.english.title}</span><span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">{t.features.english.text}</span></span>
                </li>
              </ul>

              {b.services.length ? (
                <div className="mt-5">
                  <h3 className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">{t.clubs.serviceLabel}</h3>
                  <ul className="mt-3 grid gap-3 lg:grid-cols-2">
                    {b.services.map((s) => {
                      const I = SERVICE_ICONS[s];
                      return (
                        <li key={s} className="shape-b flex min-w-0 items-start gap-3 border-2 border-dashed border-violet/40 bg-violet-soft/60 p-3.5 sm:gap-4 sm:p-4">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet text-white sm:h-11 sm:w-11 sm:rounded-2xl">
                            <I className="h-5 w-5" aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-[15px] font-semibold text-ink sm:text-base">{t.clubs.services[s].title}</span>
                            <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">{t.clubs.services[s].text}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              <a href={whatsappWithText(b, askText)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-5 w-full sm:w-auto">
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
