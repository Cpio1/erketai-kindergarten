"use client";

import { ExternalLink, FolderOpen, Hourglass, MessageCircle } from "lucide-react";
import { branches } from "@/lib/branches";
import { useSite } from "./Providers";
import { Reveal, SectionHead, toneClasses } from "./ui";

/**
 * Құжаттар: әр филиалдың Google Drive папкасы.
 * Сілтемелерді lib/branches.ts → documentsUrl өрісіне қойыңыз.
 */
export function Documents() {
  const { t, lang } = useSite();
  return (
    <section id="documents" aria-labelledby="documents-title" className="section">
      <div className="wrap">
        <SectionHead id="documents-title" eyebrow={t.documents.eyebrow} title={t.documents.title} lead={t.documents.lead} />

        <ul className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          {branches.map((b, i) => {
            const tone = toneClasses[b.tone];
            const ready = Boolean(b.documentsUrl);
            return (
              <Reveal as="li" key={b.id} delay={i * 0.06} className={`card flex min-w-0 flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6 ${i === 0 ? "shape-b" : "shape-d"}`}>
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${tone.soft} ${tone.text}`}>
                  <FolderOpen className="h-7 w-7" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-semibold text-ink">{b.name[lang]}</p>
                  <p className="mt-0.5 text-[15px] text-ink-soft">{t.documents.folder} · Google Drive</p>
                </div>
                {ready ? (
                  <a href={b.documentsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm w-full sm:w-auto">
                    {t.documents.open}
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                ) : (
                  <span className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-full bg-cream px-4 text-sm font-extrabold text-ink-soft sm:w-auto">
                    <Hourglass className="h-4 w-4" aria-hidden />
                    {t.documents.pending}
                  </span>
                )}
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-5 flex items-start gap-2.5 text-[15px] text-ink-soft">
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden />
          <p>{t.documents.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
