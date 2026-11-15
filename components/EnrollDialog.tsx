"use client";

import { MapPin, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { branches, whatsappWithText } from "@/lib/branches";
import { useSite } from "./Providers";
import { Sparkle, WhatsAppIcon, toneClasses } from "./ui";

/** «Бізге жазылыңыз» — филиалды таңдап, WhatsApp-қа дайын хабарлама жіберу */
export function EnrollDialog() {
  const { t, lang, enrollOpen, setEnrollOpen } = useSite();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (enrollOpen && !d.open) d.showModal();
    if (!enrollOpen && d.open) d.close();
  }, [enrollOpen]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="enroll-title"
      onClose={() => setEnrollOpen(false)}
      onClick={(e) => e.target === e.currentTarget && setEnrollOpen(false)}
      className="m-auto w-[calc(100vw-32px)] max-w-lg rounded-[28px_28px_28px_10px] bg-paper p-0 text-ink shadow-lift backdrop:bg-ink/55 backdrop:backdrop-blur-sm"
    >
      <div className="relative max-h-[calc(100dvh-48px)] overflow-y-auto p-5 sm:p-7">
        <button
          type="button"
          onClick={() => setEnrollOpen(false)}
          aria-label={t.gallery.close}
          className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-cream text-ink hover:bg-cream-deep"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        <Sparkle aria-hidden className="h-6 w-6 text-sun" />
        <h2 id="enroll-title" className="mt-2 pr-12 font-display text-xl font-semibold sm:text-2xl">
          {t.enroll.title}
        </h2>
        <p className="mt-2 text-ink-soft">{t.enroll.text}</p>

        <ul className="mt-5 grid gap-3">
          {branches.map((b) => {
            const tone = toneClasses[b.tone];
            return (
              <li key={b.id} className={`rounded-[20px] p-4 ${tone.mist}`}>
                <p className={`font-display text-base font-semibold ${tone.text}`}>{b.name[lang]}</p>
                <p className="mt-1 flex gap-2 text-sm text-ink-soft">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>{b.address[lang]}</span>
                </p>
                <p className="mt-1 pl-6 text-sm text-ink-soft">
                  {b.schedule.days[lang]}, {b.schedule.hours}
                </p>
                <a
                  href={whatsappWithText(b, t.enroll.message(b.name[lang]))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa btn-sm mt-3 w-full"
                >
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                  {t.enroll.write} · {b.phone.display}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </dialog>
  );
}
