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
            className={`relative min-h-11 rounded-full px-3 text-[14.5px] font-extrabold transition-[color,transform] duration-200 active:scale-[0.97] sm:px-6 ${selected ? "text-white" : "text-ink-soft hover:text-ink"}`}
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
      className={`card lift flex w-full min-w-0 flex-col p-2.5 transition-shadow lg:flex-row ${branch.tone === "teal" ? "shape-a" : "shape-c"} ${isSel ? `ring-[3px] ${tone.ring}` : ""}`}
    >
      {/* md: сурет үстінде (2:1) · lg+: сурет сол жақта — карточка екі есе аласа */}
      <BranchPhoto
        branch={branch}
        src={photo}
        sizes="(min-width:1024px) 230px, 48vw"
        className={`aspect-[2/1] shrink-0 lg:aspect-auto lg:min-h-[230px] lg:w-[40%] ${branch.tone === "teal" ? "rounded-[20px_20px_20px_8px]" : "rounded-[8px_20px_20px_20px]"}`}
      />
      <div className="flex min-w-0 flex-1 flex-col p-3.5 lg:p-4 lg:pl-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="min-w-0 font-display text-[17px] font-semibold text-ink xl:text-lg">{branch.name[lang]}</h3>
          <button
            type="button"
            onClick={() => setBranch(branch.id)}
            aria-pressed={isSel}
            aria-controls="branches-panel"
            className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[13px] font-extrabold transition-[color,background-color,transform] duration-200 active:scale-95 ${
              isSel ? `${tone.solid} text-white` : `${tone.chip} hover:brightness-95`
            }`}
          >
            {isSel ? <Check className="h-4 w-4" aria-hidden /> : null}
            {isSel ? t.common.selected : t.branches.detailsFor}
          </button>
        </div>
        <div className="mt-3">
          <BranchFacts branch={branch} />
        </div>
        <div className="mt-auto pt-4">
          <BranchActions branch={branch} />
        </div>
      </div>
    </article>
  );
}

function DesktopBranches({ photos }: { photos: Photos }) {
  const { lang, branch: selId } = useSite();
  const sel = branches.find((b) => b.id === selId)!;
  const tone = toneClasses[sel.tone];
  return (
    <div className="hidden md:block">
      <div className="mt-7 grid grid-cols-2 gap-4 xl:gap-6">
        {branches.map((b, i) => (
          <Reveal key={b.id} delay={i * 0.08} className="flex">
            <DesktopCard branch={b} photo={photos[b.id]} />
          </Reveal>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <BranchTabs idPrefix="branches" />
        <Squiggle aria-hidden className="h-3 w-12 shrink-0 text-sun" />
      </div>

      <div id="branches-panel" role="tabpanel" aria-labelledby={`branches-tab-${sel.id}`} className="mt-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={sel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.12, ease: "easeIn" } }}
            className={`shape-d grid gap-5 p-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-8 lg:p-6 ${tone.mist}`}
          >
            {/* Мекенжай мен кесте жоғарыдағы карточкада бар — мұнда қайталанбайды */}
            <div className="min-w-0">
              <h3 className={`font-display text-base font-semibold lg:text-[17px] ${tone.text}`}>{sel.name[lang]}</h3>
              <p className="mt-0.5 text-sm text-ink-soft">{sel.district[lang]}</p>
              <div className="mt-3">
                <BranchStats branch={sel} />
              </div>
              <div className="mt-3">
                <BranchActions branch={sel} withCall stack />
              </div>
            </div>
            <div className="min-w-0">
              <BranchServices branch={sel} />
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
    <article className={`card p-2 ${branch.tone === "teal" ? "shape-a" : "shape-c"}`}>
      <BranchPhoto branch={branch} src={photo} sizes="100vw" className="aspect-[2/1] rounded-[16px_16px_16px_6px]" />
      <div className="p-2.5 pt-3.5">
        <h3 className="font-display text-base font-semibold text-ink">{branch.name[lang]}</h3>
        <div className="mt-2.5">
          <BranchFacts branch={branch} />
        </div>
        <div className="mt-3">
          <BranchStats branch={branch} />
        </div>
        <div className="mt-3">
          <BranchActions branch={branch} compact />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={`mt-2.5 flex min-h-11 w-full items-center justify-between rounded-2xl px-4 text-[14.5px] font-extrabold transition-transform duration-150 active:scale-[0.98] ${tone.chip}`}
        >
          {open ? t.branches.hideDetails : t.branches.showDetails}
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              key="p"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.2 } }}
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
    <div className="mt-6 grid gap-4 md:hidden">
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
