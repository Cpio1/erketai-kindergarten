"use client";

import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { BranchId } from "@/lib/branches";
import { dictionaries, type Dict, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "erketai-lang";

type Ctx = {
  lang: Lang;
  t: Dict;
  setLang: (l: Lang) => void;
  /** Филиалдар және Үйірмелер бөлімдерінде ортақ таңдалған филиал */
  branch: BranchId;
  setBranch: (b: BranchId) => void;
  enrollOpen: boolean;
  setEnrollOpen: (v: boolean) => void;
};

const SiteContext = createContext<Ctx | null>(null);

/**
 * Сервер әрқашан қазақ тілінде көрсетеді (hydration қатесі болмауы үшін),
 * таңдалған тіл браузерде сақталып, жүктелгеннен кейін қолданылады.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("kk");
  const [branch, setBranch] = useState<BranchId>("alatau");
  const [enrollOpen, setEnrollOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ru" || saved === "kk") setLangState(saved);
    } catch {
      /* localStorage қолжетімсіз — әдепкі тіл қалады */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = dictionaries[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* елемейміз */
    }
  }, []);

  return (
    <SiteContext.Provider
      value={{ lang, t: dictionaries[lang], setLang, branch, setBranch, enrollOpen, setEnrollOpen }}
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside Providers");
  return ctx;
}
