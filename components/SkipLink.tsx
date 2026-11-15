"use client";

import { useSite } from "./Providers";

export function SkipLink() {
  const { t } = useSite();
  return (
    <a
      href="#main"
      className="sr-only z-[60] rounded-full bg-ink px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      {t.skip}
    </a>
  );
}
