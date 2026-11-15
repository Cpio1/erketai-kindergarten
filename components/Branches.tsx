"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { branches, type Branch, type BranchId } from "@/lib/branches";
import { BranchActions, BranchFacts, BranchPhoto, BranchServices, BranchStats } from "./BranchParts";
import { useSite } from "./Providers";
import { Reveal, SectionHead, Squiggle, toneClasses } from "./ui";

type Photos = Record<BranchId, string | null>;

/** Филиал таңдағыш (Филиалдар және Үйірмелер бөлімдерінде қолданылады) */
export function BranchTabs({ idPrefix, className = "" }: { idPrefix: string; className?: string }) {
  const { t, lang, branch, setBranch } = useSite();
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = branch === "alatau" ? "auezov" : "alatau";
      setBranch(next);
      document.getElementById(`${idPrefix}-tab-${next}`)?.focus();
    }
  };
  return (
    <div role="tablist" aria-label={t.common.choose} onKeyDown={onKey} className={`inline-grid w-full grid-cols-2 gap-1 rounded-full bg-paper p-1.5 shadow-soft sm:w-auto ${className}`}>
      {branches.map((b) => {
        const selected = branch === b.id;
        return (
          <button
            key={b.id}
            id={`${idPrefix}-tab-${b.id}`}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => setBranch(b.id)}
            className={`relative min-h-11 rounded-full px-3 text-[14.5px] font-extrabold transition-colors sm:px-6 ${selected ? "text-white" : "text-ink-soft hover:text-ink"}`}
          >
            {selected ? (
              <motion.span layoutId={`${idPrefix}-pill`} className={`absolute inset-0 rounded-full ${b.tone === "teal" ? "bg-teal-deep" : "bg-peach-deep"}`} transition={{ type: "spring", stiffness: 420, damping: 34 }} />
            ) : null}
            <span className="relative sm:hidden">{t.branchShort[b.id]}</span>
            <span className="relative hidden sm:inline">{b.name[lang]}</span>
          </button>
        );
      })}
    </div>
  );
}

/* =============== Десктоп / планшет =============== */

function DesktopCard({ branch, photo }: { branch: Branch; photo: string | null }) {
  const { t, lang, branch: selected, setBranch } = useSite();
  const isSel = selected === branch.id;
  const tone = toneClasses[branch.tone];
  return (
    <article
      className={`card lift flex w-full min-w-0 flex-col p-3 transition-shadow ${branch.tone === "teal" ? "shape-a" : "shape-c"} ${isSel ? `ring-[3px] ${tone.ring}` : ""}`}
    >
      <BranchPhoto branch={branch} src={photo} sizes="(min-width:1280px) 580px, 48vw" className={`aspect-[16/8] ${branch.tone === "teal" ? "rounded-[24px_24px_24px_8px]" : "rounded-[8px_24px_24px_24px]"}`} />
      <div className="flex flex-1 flex-col p-4 lg:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="min-w-0 font-display text-xl font-semibold text-ink lg:text-2xl">{branch.name[lang]}</h3>
          <button
            type="button"
            onClick={() => setBranch(branch.id)}
            aria-pressed={isSel}
            aria-controls="branches-panel"
            className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-extrabold transition-colors ${
              isSel ? `${tone.solid} text-white` : `${tone.chip} hover:brightness-95`
            }`}
          >
            {isSel ? <Check className="h-4 w-4" aria-hidden /> : null}
            {isSel ? t.common.selected : t.branches.detailsFor}
          </button>
        </div>
        <div className="mt-4">
          <BranchFacts branch={branch} />
        </div>
        <div className="mt-auto pt-6">
          <BranchActions branch={branch} />
        </div>
      </div>
    </article>
  );
}

function DesktopBranches({ photos }: { photos: Photos }) {
  const { t, lang, branch: selId } = useSite();
  const sel = branches.find((b) => b.id === selId)!;
  const tone = toneClasses[sel.tone];
  return (
    <div className="hidden md:block">
      <div className="mt-10 grid grid-cols-2 gap-6 xl:gap-8">
        {branches.map((b, i) => (
          <Reveal key={b.id} delay={i * 0.08} className="flex">
            <DesktopCard branch={b} photo={photos[b.id]} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <BranchTabs idPrefix="branches" />
        <Squiggle aria-hidden className="h-4 w-20 shrink-0 text-sun" />
      </div>

      <div id="branches-panel" role="tabpanel" aria-labelledby={`branches-tab-${sel.id}`} className="mt-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={sel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28 }}
            className={`shape-d grid gap-8 p-6 lg:grid-cols-[0.9fr_1.4fr_0.9fr] lg:p-8 ${tone.mist}`}
          >
            <div className="min-w-0">
              <h3 className={`font-display text-lg font-semibold ${tone.text}`}>{sel.name[lang]}</h3>
              <p className="mt-1 text-sm text-ink-soft">{sel.district[lang]}</p>
              <div className="mt-4">
                <BranchStats branch={sel} />
              </div>
            </div>
            <div className="min-w-0">
              <BranchServices branch={sel} />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-extrabold tracking-wider text-ink-soft uppercase">{t.branches.contactsTitle}</h4>
              <div className="mt-3 rounded-2xl bg-paper p-4">
                <BranchFacts branch={sel} />
              </div>
              <div className="mt-3">
                <BranchActions branch={sel} withCall stack />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =============== Мобильді =============== */

function MobileCard({ branch, photo }: { branch: Branch; photo: string | null }) {
  const { t, lang } = useSite();
  const [open, setOpen] = useState(false);
  const tone = toneClasses[branch.tone];
  const panelId = `branch-m-${branch.id}`;
  return (
    <article className={`card overflow-hidden ${branch.tone === "teal" ? "shape-a" : "shape-c"}`}>
      <BranchPhoto branch={branch} src={photo} sizes="100vw" className="aspect-[16/10]" />
      <div className="p-4 xs:p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{branch.name[lang]}</h3>
        <div className="mt-3">
          <BranchFacts branch={branch} />
        </div>
        <div className="mt-4">
          <BranchStats branch={branch} />
        </div>
        <div className="mt-4">
          <BranchActions branch={branch} />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={`mt-3 flex min-h-12 w-full items-center justify-between rounded-2xl px-4 text-[15px] font-extrabold ${tone.chip}`}
        >
          {open ? t.branches.hideDetails : t.branches.showDetails}
          <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              key="p"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <BranchServices branch={branch} compact />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </article>
  );
}

function MobileBranches({ photos }: { photos: Photos }) {
  return (
    <div className="mt-8 grid gap-5 md:hidden">
      {branches.map((b) => (
        <Reveal key={b.id}>
          <MobileCard branch={b} photo={photos[b.id]} />
        </Reveal>
      ))}
    </div>
  );
}

export function Branches({ photos }: { photos: Photos }) {
  const { t } = useSite();
  return (
    <section id="branches" aria-labelledby="branches-title" className="section bg-paper/60">
      <div className="wrap">
        <SectionHead id="branches-title" eyebrow={t.branches.eyebrow} title={t.branches.title} lead={t.branches.lead} />
        <DesktopBranches photos={photos} />
        <MobileBranches photos={photos} />
      </div>
    </section>
  );
}
