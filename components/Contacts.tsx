"use client";

import { MapPin, Navigation } from "lucide-react";
import { branches, mapLinks, type Branch } from "@/lib/branches";
import { BranchActions, BranchFacts } from "./BranchParts";
import { useSite } from "./Providers";
import { Reveal, SectionHead, toneClasses } from "./ui";

/** 2GIS картасы: виджет сілтемесі берілсе — iframe, әйтпесе мекенжайы бар карта-карточка */
function MapBox({ branch }: { branch: Branch }) {
  const { t, lang } = useSite();
  const links = mapLinks(branch);
  const tone = toneClasses[branch.tone];

  if (branch.twoGisEmbed) {
    return (
      <iframe
        src={branch.twoGisEmbed}
        title={t.contacts.mapTitle(branch.name[lang])}
        loading="lazy"
        className="h-44 w-full rounded-[18px] border-0 md:h-56"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <a
      href={links.twoGis}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.contacts.mapPending}: ${branch.address[lang]}`}
      className={`group relative block h-36 overflow-hidden rounded-[18px] md:h-44 ${tone.soft}`}
    >
      {/* Декоративті карта фоны — нақты координаттарсыз */}
      <svg aria-hidden className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 260">
        <path d="M-10 180 C 90 140, 160 220, 260 170 S 380 120, 420 140" stroke="#fff" strokeWidth="16" fill="none" />
        <path d="M110 -10 C 130 70, 90 150, 140 270" stroke="#fff" strokeWidth="11" fill="none" />
        <path d="M290 -10 C 310 80, 330 150, 300 270" stroke="#fff" strokeWidth="9" fill="none" opacity=".8" />
        <rect x="24" y="30" width="58" height="42" rx="12" fill="#fff" opacity=".55" />
        <rect x="190" y="200" width="66" height="38" rx="12" fill="#fff" opacity=".5" />
        <circle cx="340" cy="58" r="26" fill="#fff" opacity=".45" />
      </svg>
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <span className={`grid h-10 w-10 animate-float place-items-center rounded-full text-white shadow-soft ${branch.tone === "teal" ? "bg-teal-deep" : "bg-peach-deep"}`}>
          <MapPin className="h-5 w-5" aria-hidden />
        </span>
        <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 text-[13px] font-extrabold text-ink shadow-soft transition-transform group-hover:-translate-y-0.5">
          {t.contacts.mapPending}
        </span>
      </div>
    </a>
  );
}

function ContactCard({ branch, i }: { branch: Branch; i: number }) {
  const { t, lang } = useSite();
  const links = mapLinks(branch);
  const tone = toneClasses[branch.tone];
  return (
    <Reveal as="article" delay={i * 0.08} className={`card flex min-w-0 flex-col p-2 sm:p-2.5 ${i === 0 ? "shape-a" : "shape-c"}`}>
      <MapBox branch={branch} />
      <div className="flex flex-1 flex-col p-2.5 pt-3.5 sm:p-4">
        <h3 className={`font-display text-base font-semibold sm:text-[17px] ${tone.text}`}>{branch.name[lang]}</h3>
        <div className="mt-3">
          <BranchFacts branch={branch} />
        </div>
        <p className="mt-2.5 flex flex-wrap items-center gap-x-2 text-[14.5px] text-ink-soft">
          <span className="font-bold">{t.common.instagram}:</span>
          <a href={branch.instagram.url} target="_blank" rel="noopener noreferrer" className="font-bold break-all text-ink underline-offset-4 hover:underline">
            {branch.instagram.handle}
          </a>
        </p>

        <div className="mt-4">
          <BranchActions branch={branch} withCall compact />
        </div>

        <div className="mt-auto pt-4">
          <p className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">{t.contacts.route}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[
              { label: "2GIS", href: links.twoGis },
              { label: lang === "kk" ? "Яндекс Карталар" : "Яндекс Карты", href: links.yandex },
              { label: "Google Maps", href: links.google },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-cream px-3 text-[13px] font-extrabold text-ink transition-colors hover:bg-cream-deep">
                <Navigation className={`h-3.5 w-3.5 ${tone.text}`} aria-hidden />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Contacts() {
  const { t } = useSite();
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section bg-paper/60">
      <div className="wrap">
        <SectionHead id="contacts-title" eyebrow={t.contacts.eyebrow} title={t.contacts.title} lead={t.contacts.lead} />
        <div className="mt-6 grid gap-4 md:mt-7 md:grid-cols-2 xl:gap-6">
          {branches.map((b, i) => (
            <ContactCard key={b.id} branch={b} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
