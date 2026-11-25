import fs from "node:fs";
import path from "node:path";
import type { BranchId } from "./branches";
import { asset } from "./site-url";

/**
 * Суреттер build кезінде public/images ішінен автоматты түрде табылады.
 * Файл жоқ болса — сайт бәрібір жиналады, тиісті жерде әдемі «бос» күй көрсетіледі.
 *
 *   main-page.(png|jpg|webp)        — басты экран суреті (+ Open Graph)
 *   main-page2.*, about-1.*, about-2.* — «Біз туралы» бөлімі
 *                                     (жоқ болса — ABOUT_FALLBACK ішіндегі нақты фотолар)
 *   alatau.*, auezov.*              — филиал карточкаларының суреттері
 *   logo.(svg|png|webp)             — логотип
 *   Галерея — қалған барлық суреттер (images/ және images/alatau/, images/auezov/ ішкі папкалары),
 *   GALLERY_SKIP тізіміндегілерден басқа.
 */

/** main-page2 / about-* жоқ кезде «Біз туралы» үшін: [тік коллаж суреті, кең сурет (мобильді)] */
const ABOUT_FALLBACK = ["image8", "image4"];
/** Галереяға қосылмайтын суреттер: image — басты суреттің (main-page) іс жүзіндегі қайталамасы */
const GALLERY_SKIP = ["image"];

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const LOGO_EXT = /\.(svg|png|webp|jpe?g)$/i;

export type GalleryPhoto = { src: string };

export type SiteMedia = {
  hero: string | null;
  /** [0] — тік коллаж суреті, [1] — екінші сурет; мобильді нұсқа aboutWide қолданады */
  about: string[];
  aboutWide: string | null;
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

const url = (...parts: string[]) => asset("/" + parts.map(encodeURIComponent).join("/"));

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
  const custom = ["main-page2", "about-1", "about-2"].filter((n) => pick([n]));
  const aboutNames = (custom.length ? custom : ABOUT_FALLBACK.filter((n) => pick([n]))).slice(0, 2);
  const about = aboutNames.map((n) => take(pick([n]))).filter((x): x is string => Boolean(x));
  // Мобильдегі кең сурет: main-page2 болса — сол, әйтпесе көлденең (екінші) фото
  const aboutWide = custom.length ? (about[0] ?? null) : (about[1] ?? about[0] ?? null);
  const branchPhotos = {
    alatau: take(pick(BRANCH_COVER.alatau)),
    auezov: take(pick(BRANCH_COVER.auezov)),
  };

  const gallery: GalleryPhoto[] = [];
  for (const f of files) {
    if (used.has(f) || !IMAGE_EXT.test(f) || GALLERY_SKIP.includes(base(f))) continue;
    gallery.push({ src: url("images", f) });
  }
  for (const id of ["alatau", "auezov"] as BranchId[]) {
    for (const f of list(path.join(IMAGES_DIR, id))) {
      if (IMAGE_EXT.test(f)) gallery.push({ src: url("images", id, f) });
    }
  }

  cache = { hero, about, aboutWide, logo, branchPhotos, gallery };
  return cache;
}
