import fs from "node:fs";
import path from "node:path";
import type { BranchId } from "./branches";

/**
 * Суреттер build кезінде public/images ішінен автоматты түрде табылады.
 * Файл жоқ болса — сайт бәрібір жиналады, тиісті жерде әдемі «бос» күй көрсетіледі.
 *
 *   main-page.(png|jpg|webp)        — басты экран суреті (+ Open Graph)
 *   about-1.*, about-2.*            — «Біз туралы» бөлімі
 *   alatau.*, auezov.*              — филиал карточкаларының суреттері
 *   logo.(svg|png|webp)             — логотип
 *   Галерея (қалған суреттер):
 *     alatau-*.jpg  немесе  images/alatau/*.jpg   — Алатау филиалы
 *     auezov-*.jpg  немесе  images/auezov/*.jpg   — Әуезов филиалы
 *     басқа кез келген сурет                     — ортақ (тек «Барлығы» сүзгісінде)
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const LOGO_EXT = /\.(svg|png|webp|jpe?g)$/i;

export type GalleryPhoto = { src: string; branch: BranchId | null };

export type SiteMedia = {
  hero: string | null;
  about: string[];
  logo: string | null;
  branchPhotos: Record<BranchId, string | null>;
  gallery: GalleryPhoto[];
};

const base = (file: string) => file.replace(/\.[^.]+$/, "").toLowerCase();

function list(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => !f.startsWith("."))
      .filter((f) => {
        try {
          return fs.statSync(path.join(dir, f)).isFile();
        } catch {
          return false;
        }
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  } catch {
    return [];
  }
}

const url = (...parts: string[]) => "/" + parts.map(encodeURIComponent).join("/");

const BRANCH_PREFIX: Record<BranchId, RegExp> = {
  alatau: /^(alatau|shapagat|filial-?1|branch-?1)[-_ ]/i,
  auezov: /^(auezov|astana|filial-?2|branch-?2)[-_ ]/i,
};

const BRANCH_COVER: Record<BranchId, string[]> = {
  alatau: ["alatau", "branch-1", "filial-1"],
  auezov: ["auezov", "branch-2", "filial-2"],
};

let cache: SiteMedia | null = null;

export function getSiteMedia(): SiteMedia {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const files = list(IMAGES_DIR).filter((f) => IMAGE_EXT.test(f) || LOGO_EXT.test(f));
  const pick = (names: string[], ext = IMAGE_EXT) => {
    for (const n of names) {
      const f = files.find((x) => base(x) === n && ext.test(x));
      if (f) return f;
    }
    return null;
  };

  const used = new Set<string>();
  const take = (f: string | null) => {
    if (!f) return null;
    used.add(f);
    return url("images", f);
  };

  const hero = take(pick(["main-page", "hero"]));
  const logo = take(pick(["logo"], LOGO_EXT));
  const about = ["about-1", "about-2", "main-page2"]
    .map((n) => take(pick([n])))
    .filter((x): x is string => Boolean(x))
    .slice(0, 2);
  const branchPhotos = {
    alatau: take(pick(BRANCH_COVER.alatau)),
    auezov: take(pick(BRANCH_COVER.auezov)),
  };

  const gallery: GalleryPhoto[] = [];
  for (const f of files) {
    if (used.has(f) || !IMAGE_EXT.test(f)) continue;
    const branch = (Object.keys(BRANCH_PREFIX) as BranchId[]).find((id) => BRANCH_PREFIX[id].test(f)) ?? null;
    gallery.push({ src: url("images", f), branch });
  }
  for (const id of ["alatau", "auezov"] as BranchId[]) {
    for (const f of list(path.join(IMAGES_DIR, id))) {
      if (IMAGE_EXT.test(f)) gallery.push({ src: url("images", id, f), branch: id });
    }
  }

  cache = { hero, about, logo, branchPhotos, gallery };
  return cache;
}
