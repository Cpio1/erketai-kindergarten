/**
 * GitHub Pages: сайт https://cpio1.github.io/erketai-kindergarten/ адресінде.
 * basePath — репозиторий атымен сәйкес келетін ішкі жол.
 * Өз доменіңіз болса, NEXT_PUBLIC_BASE_PATH="" және NEXT_PUBLIC_SITE_URL орнатыңыз.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/erketai-kindergarten").replace(/\/$/, "");

const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://cpio1.github.io").replace(/\/$/, "");

/** Сайттың толық адресі (SEO, Open Graph, sitemap үшін), basePath-пен бірге. */
export const siteUrl = origin.endsWith(basePath) ? origin : origin + basePath;

/**
 * public/ ішіндегі файлға жол: next/image және metadata basePath-ты
 * автоматты түрде қоспайды, сондықтан қолмен қосамыз.
 */
export const asset = (p: string) => basePath + (p.startsWith("/") ? p : "/" + p);
