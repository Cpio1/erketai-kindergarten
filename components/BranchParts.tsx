"use client";

import { BookOpen, Bus, Clock, Languages, MapPin, MessageCircleHeart, Mic, Music, Phone, Piano, Shield, UtensilsCrossed, Video, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ActivityId, Branch, CommonFeature, ServiceId } from "@/lib/branches";
import { commonFeatures } from "@/lib/branches";
import { useSite } from "./Providers";
import { InstagramIcon, Sparkle, WhatsAppIcon, toneClasses } from "./ui";

export const ACTIVITY_ICONS: Record<ActivityId, LucideIcon> = {
  taekwondo: Shield,
  dance: Music,
  speech: MessageCircleHeart,
  schoolPrep: BookOpen,
  vocal: Mic,
  piano: Piano,
};

export const SERVICE_ICONS: Record<ServiceId, LucideIcon> = { transport: Bus };

const FEATURE_ICONS: Record<CommonFeature, LucideIcon> = {
  langs: Languages,
  english: MessageCircleHeart,
  meals: UtensilsCrossed,
  cameras: Video,
};

export function BranchPhoto({ branch, src, className, sizes }: { branch: Branch; src: string | null; className: string; sizes: string }) {
  const { t, lang } = useSite();
  const tone = toneClasses[branch.tone];
  return (
    <div className={`relative overflow-hidden ${tone.soft} ${className}`}>
      {src ? (
        <Image src={src} alt={`${t.branches.photoAlt} — ${branch.name[lang]}`} fill sizes={sizes} className="object-cover" />
      ) : (
        <div aria-hidden className="absolute inset-0">
          <span className={`absolute top-5 right-6 h-10 w-10 rounded-full ${branch.tone === "teal" ? "bg-sun" : "bg-violet/70"}`} />
          <span className="dots absolute bottom-4 left-5 h-12 w-20 text-white/80" />
          <div className="absolute inset-0 grid place-items-center">
            <span className={`font-display text-[44px] leading-none font-bold opacity-25 sm:text-5xl ${tone.text}`}>{t.branchShort[branch.id]}</span>
          </div>
        </div>
      )}
      <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-1.5 text-xs font-extrabold ${tone.text}`}>
        <Sparkle className="h-3 w-3" />
        {branch.district[lang]}
      </span>
    </div>
  );
}

/** Мекенжай, телефон, кесте */
export function BranchFacts({ branch, withPhone = true }: { branch: Branch; withPhone?: boolean }) {
  const { t, lang } = useSite();
  const tone = toneClasses[branch.tone];
  return (
    <dl className="grid gap-3 text-[15px]">
      <div className="flex gap-3">
        <dt className="sr-only">{t.common.address}</dt>
        <MapPin className={`mt-0.5 h-5 w-5 shrink-0 ${tone.text}`} aria-hidden />
        <dd className="min-w-0 font-semibold text-ink">{branch.address[lang]}</dd>
      </div>
      <div className="flex gap-3">
        <dt className="sr-only">{t.common.schedule}</dt>
        <Clock className={`mt-0.5 h-5 w-5 shrink-0 ${tone.text}`} aria-hidden />
        <dd className="min-w-0 text-ink">
          <span className="font-semibold">{branch.schedule.days[lang]}</span>, {branch.schedule.hours}
          {branch.schedule.duty ? (
            <span className="mt-1 block w-fit rounded-xl bg-sun-soft px-2.5 py-1 text-[13.5px] font-bold text-sun-deep">{branch.schedule.duty[lang]}</span>
          ) : null}
        </dd>
      </div>
      {withPhone ? (
        <div className="flex gap-3">
          <dt className="sr-only">{t.common.phone}</dt>
          <Phone className={`mt-0.5 h-5 w-5 shrink-0 ${tone.text}`} aria-hidden />
          <dd>
            <a href={branch.phone.href} className="font-semibold text-ink underline-offset-4 hover:underline">
              {branch.phone.display}
            </a>
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

/** Топтар / жас / тілдер — қысқа көрсеткіштер */
export function BranchStats({ branch }: { branch: Branch }) {
  const { t } = useSite();
  const items = [
    { label: t.common.groups, value: String(branch.groups) },
    { label: t.common.ages, value: `${branch.ages} ${t.common.agesUnit}` },
    { label: t.common.languages, value: t.common.languagesValue },
  ];
  return (
    <dl className="grid grid-cols-3 gap-2">
      {items.map((it) => (
        <div key={it.label} className="min-w-0 rounded-2xl bg-cream px-2.5 py-2.5 text-center sm:px-3">
          <dt className="text-[11.5px] leading-tight font-bold text-ink-soft sm:text-xs">{it.label}</dt>
          <dd className="mt-1 text-[13px] leading-tight font-extrabold break-words text-ink sm:text-sm">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Ортақ артықшылықтар + қосымша сабақтар + қызметтер */
export function BranchServices({ branch, compact = false }: { branch: Branch; compact?: boolean }) {
  const { t } = useSite();
  const tone = toneClasses[branch.tone];
  return (
    <div className="grid gap-5">
      <div>
        <h4 className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">{t.branches.servicesTitle}</h4>
        <ul className={`mt-2.5 grid gap-2 ${compact ? "grid-cols-1 xs:grid-cols-2" : "grid-cols-2"}`}>
          {commonFeatures.map((f) => {
            const I = FEATURE_ICONS[f];
            return (
              <li key={f} className="flex min-w-0 items-center gap-2 rounded-xl bg-cream px-3 py-2 text-[14px] font-bold text-ink">
                <I className={`h-4 w-4 shrink-0 ${tone.text}`} aria-hidden />
                <span className="min-w-0">
                  {t.features[f].title}
                  {f === "english" ? <span className="font-semibold text-ink-soft"> · {t.features.english.text.toLowerCase()}</span> : null}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">{t.branches.activitiesTitle}</h4>
        <ul className="mt-2.5 flex flex-wrap gap-2">
          {branch.activities.map((a) => {
            const I = ACTIVITY_ICONS[a];
            return (
              <li key={a} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-extrabold ${tone.chip}`}>
                <I className="h-4 w-4" aria-hidden />
                {t.clubs.activities[a].title}
              </li>
            );
          })}
        </ul>
      </div>
      {branch.services.length ? (
        <div>
          <h4 className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">{t.branches.extraService}</h4>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {branch.services.map((s) => {
              const I = SERVICE_ICONS[s];
              return (
                <li key={s} className="inline-flex items-center gap-1.5 rounded-full bg-violet-soft px-3 py-1.5 text-[14px] font-extrabold text-violet-deep">
                  <I className="h-4 w-4" aria-hidden />
                  {t.clubs.services[s].title}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/** WhatsApp + Instagram (+ қоңырау) батырмалары */
export function BranchActions({ branch, withCall = false, stack = false }: { branch: Branch; withCall?: boolean; stack?: boolean }) {
  const { t, lang } = useSite();
  const label = branch.name[lang];
  return (
    <div className={`grid gap-2.5 ${stack ? "grid-cols-1" : "grid-cols-1 xs:grid-cols-2"} ${withCall && !stack ? "xl:grid-cols-3" : ""}`}>
      <a href={branch.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm" aria-label={`${t.common.whatsapp} — ${label}`}>
        <WhatsAppIcon className="h-[18px] w-[18px]" />
        {t.common.whatsapp}
      </a>
      <a href={branch.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ig btn-sm" aria-label={`${t.common.instagram} ${branch.instagram.handle} — ${label}`}>
        <InstagramIcon className="h-[18px] w-[18px]" />
        {t.common.instagram}
      </a>
      {withCall ? (
        <a href={branch.phone.href} className={`btn btn-ghost btn-sm ${stack ? "" : "xs:col-span-2 xl:col-span-1"}`}>
          <Phone className="h-4 w-4" aria-hidden />
          {t.common.call}
        </a>
      ) : null}
    </div>
  );
}
