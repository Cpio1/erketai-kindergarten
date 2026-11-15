"use client";

import { ChevronLeft, ChevronRight, ImageIcon, Plus, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { branches, type BranchId } from "@/lib/branches";
import type { GalleryPhoto } from "@/lib/media";
import { useSite } from "./Providers";
import { InstagramIcon, Reveal, SectionHead } from "./ui";

type Filter = "all" | BranchId;

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

function Lightbox({ photos, index, onClose, onIndex }: { photos: GalleryPhoto[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const { t } = useSite();
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const step = useCallback(
    (dir: number) => index !== null && onIndex((index + dir + photos.length) % photos.length),
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
      className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-ink/85"
    >
      {index !== null ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 sm:p-8" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <div className="relative h-[min(78dvh,900px)] w-full max-w-6xl">
            <Image src={photos[index].src} alt={`${t.gallery.photo} ${index + 1}`} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => step(-1)} aria-label={t.gallery.prev} className="grid h-12 w-12 place-items-center rounded-full bg-paper text-ink">
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <span className="min-w-16 text-center text-sm font-bold text-white">
              {index + 1} / {photos.length}
            </span>
            <button type="button" onClick={() => step(1)} aria-label={t.gallery.next} className="grid h-12 w-12 place-items-center rounded-full bg-paper text-ink">
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <button type="button" onClick={onClose} aria-label={t.gallery.close} className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-paper text-ink">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </dialog>
  );
}

export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const { t, lang } = useSite();
  const [filter, setFilter] = useState<Filter>("all");
  const [pages, setPages] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const perPage = isMobile ? 6 : 8;

  const list = useMemo(() => (filter === "all" ? photos : photos.filter((p) => p.branch === filter)), [photos, filter]);
  const visible = list.slice(0, pages * perPage);
  const hasMore = visible.length < list.length;

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: t.common.all, count: photos.length },
    ...branches.map((b) => ({ id: b.id as Filter, label: b.name[lang], count: photos.filter((p) => p.branch === b.id).length })),
  ];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-paper/60">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} lead={t.gallery.lead} />
          <Reveal className="-mx-1 flex flex-wrap gap-2 px-1" >
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => {
                  setFilter(f.id);
                  setPages(1);
                }}
                className={`min-h-11 rounded-full px-4 text-[14.5px] font-extrabold transition-colors ${
                  filter === f.id ? "bg-ink text-white" : "bg-paper text-ink-soft shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:text-ink"
                }`}
              >
                {f.label}
                <span className={`ml-1.5 text-xs ${filter === f.id ? "text-white/70" : "text-ink-soft/70"}`}>{f.count}</span>
              </button>
            ))}
          </Reveal>
        </div>

        {visible.length ? (
          <>
            <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {visible.map((p, i) => (
                <li key={p.src} className={`${!isMobile && i % 8 === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                  <button
                    type="button"
                    onClick={() => setLightbox(i)}
                    aria-label={`${t.gallery.open}: ${t.gallery.photo} ${i + 1}`}
                    className={`group relative block h-full w-full overflow-hidden bg-cream-deep ${
                      ["rounded-[22px_22px_22px_8px]", "rounded-[8px_22px_22px_22px]", "rounded-[22px_8px_22px_22px]", "rounded-[22px_22px_8px_22px]"][i % 4]
                    } aspect-square md:aspect-[4/3] ${!isMobile && i % 8 === 0 ? "md:aspect-auto md:min-h-full" : ""}`}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </button>
                </li>
              ))}
            </ul>
            {hasMore ? (
              <div className="mt-8 flex justify-center">
                <button type="button" onClick={() => setPages((n) => n + 1)} className="btn btn-sun w-full sm:w-auto">
                  <Plus className="h-4 w-4" aria-hidden />
                  {t.common.more}
                </button>
              </div>
            ) : null}
            <Lightbox photos={visible} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
          </>
        ) : (
          <Reveal className="shape-a mt-8 grid gap-5 border-2 border-dashed border-line bg-paper p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sun-soft text-sun-deep">
              <ImageIcon className="h-7 w-7" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold text-ink">{t.gallery.empty}</p>
              <p className="mt-1 text-ink-soft">{t.gallery.emptyHint}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {branches
                  .filter((b) => filter === "all" || b.id === filter)
                  .map((b) => (
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
