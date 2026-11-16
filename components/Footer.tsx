"use client";

import { ArrowUp } from "lucide-react";
import { branches } from "@/lib/branches";
import { SECTION_IDS } from "@/lib/i18n";
import { Brand } from "./Header";
import { useSite } from "./Providers";
import { InstagramIcon, Squiggle, WhatsAppIcon } from "./ui";

export function Footer({ logo }: { logo: string | null }) {
  const { t, lang } = useSite();
  return (
    <footer className="bg-ink text-white/80">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1fr_1.6fr] md:py-14">
        <div className="min-w-0">
          <Brand logo={logo} light />
          <p className="mt-3 font-display text-sm text-white/70">{t.footer.tagline}</p>
          <Squiggle aria-hidden className="mt-4 h-3 w-16 text-sun" />
          <nav aria-label="Footer" className="mt-6">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[15px] font-bold">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="hover:text-white">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {branches.map((b) => (
            <div key={b.id} className="min-w-0">
              <p className="font-display text-sm font-semibold text-white">{b.name[lang]}</p>
              <p className="mt-2 text-[15px]">{b.address[lang]}</p>
              <p className="mt-1 text-[15px]">
                {b.schedule.days[lang]}, {b.schedule.hours}
              </p>
              {b.schedule.duty ? <p className="mt-1 text-[14px] text-sun">{b.schedule.duty[lang]}</p> : null}
              <a href={b.phone.href} className="mt-2 block font-extrabold text-white hover:underline">
                {b.phone.display}
              </a>
              <div className="mt-3 flex gap-2">
                <a href={b.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp — ${b.name[lang]}`} className="press grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
                <a href={b.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${b.instagram.handle}`} className="press grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ТОО «Erketai». {t.footer.rights}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 font-bold hover:text-white">
            <ArrowUp className="h-4 w-4" aria-hidden />
            {t.footer.up}
          </a>
        </div>
      </div>
    </footer>
  );
}
