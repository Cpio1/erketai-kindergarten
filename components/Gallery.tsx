"use client";

import { ChevronLeft, ChevronRight, ImageIcon, Plus, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { branches } from "@/lib/branches";
import type { GalleryPhoto } from "@/lib/media";
import { useSite } from "./Providers";
import { InstagramIcon, Reveal, SectionHead } from "./ui";

/** Алдымен 6 фото (телефон 2×3, планшет/компьютер 3×2), «Тағы көрсету» тағы 6-ны ашады */
const PER_PAGE = 6;

function Lightbox({ photos, index, onClose, onIndex }: { photos: GalleryPhoto[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useSite();
  const ref = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  /** Сурет қай жақтан келеді: 1 — оңнан, -1 — солдан, 0 — ашылу (масштаб) */
  const [dir, setDir] = useState(0);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setDir(0);
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open]);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDir(delta);
      onIndex((index + delta + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      aria-label={t.gallery.title}
      className="lb m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/85"
    >
      {index !== null ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && onClose()}>
          {/* Телефонда саусақпен сырғыту арқылы ауыстыру */}
          <div
            className="relative h-[min(78dvh,900px)] w-full max-w-6xl touch-pan-y"
            onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
            onTouchEnd={(e) => {
              const s0 = touch.current;
              touch.current = null;
              if (!s0) return;
              const dx = e.changedTouches[0].clientX - s0.x;
              const dy = e.changedTouches[0].clientY - s0.y;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) step(dx < 0 ? 1 : -1);
            }}
          >
            <div key={index} className="lb-slide absolute inset-0" style={{ ["--dir" as string]: dir }}>
              <Image src={photos[index].src} alt={`${t.gallery.photo} ${index + 1}`} fill sizes="100vw" className="object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => step(-1)} aria-label={t.gallery.prev} className="press grid h-12 w-12 place-items-center rounded-full bg-paper text-ink shadow-soft">
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <span className="min-w-16 text-center text-sm font-bold text-white tabular-nums" aria-live="polite">
              {index + 1} / {photos.length}
            </span>
            <button type="button" onClick={() => step(1)} aria-label={t.gallery.next} className="press grid h-12 w-12 place-items-center rounded-full bg-paper text-ink shadow-soft">
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <button type="button" onClick={onClose} aria-label={t.gallery.close} className="press absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-paper text-ink shadow-soft">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </dialog>
  );
}

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const { t } = useSite();
  const [pages, setPages] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = photos.slice(0, pages * PER_PAGE);
  const hasMore = visible.length < photos.length;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-paper/60">
      <div className="wrap">
        <SectionHead id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead} />

        {visible.length ? (
          <>
            {/* Телефон: 2 баған, шаршы превью · Планшет: 3 баған 4:3 · Компьютер: 3 баған 3:2 (ықшам) */}
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 md:mt-6 md:grid-cols-3">
              {visible.map((p, i) => (
                <li
                  key={p.src}
                  className={`min-w-0 ${i >= PER_PAGE ? "pop-in" : ""}`}
                  style={i >= PER_PAGE ? { ["--i" as string]: i % PER_PAGE } : undefined}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    aria-label={`${t.gallery.open}: ${t.gallery.photo} ${i + 1}`}
                    className={`group relative block aspect-square w-full overflow-hidden bg-cream-deep shadow-[0_0_0_0_rgb(34_48_74/0)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.97] active:duration-75 md:aspect-[4/3] lg:aspect-[3/2] ${
                      ["rounded-[18px_18px_18px_6px]", "rounded-[6px_18px_18px_18px]", "rounded-[18px_6px_18px_18px]", "rounded-[18px_18px_6px_18px]"][i % 4]
                    }`}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="(min-width:1280px) 400px, (min-width:768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </button>
                </li>
              ))}
            </ul>
            {hasMore ? (
              <div className="mt-5 flex justify-center md:mt-6">
                <button type="button" onClick={() => setPages((n) => n + 1)} className="btn btn-sun w-full sm:w-auto">
                  <Plus className="h-4 w-4" aria-hidden />
                  {t.common.more}
                </button>
              </div>
            ) : null}
            <Lightbox photos={visible} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
          </>
        ) : (
          <Reveal className="shape-a mt-5 grid gap-4 border-2 border-dashed border-line bg-paper p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sun-soft text-sun-deep">
              <ImageIcon className="h-7 w-7" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold text-ink">{t.gallery.empty}</p>
              <p className="mt-1 text-ink-soft">{t.gallery.emptyHint}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {branches.map((b) => (
                  <a key={b.id} href={b.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                    <InstagramIcon className="h-4 w-4 text-[#d8337f]" />
                    {b.instagram.handle}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
