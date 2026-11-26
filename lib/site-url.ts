/**
 * Сайт өз доменінде орналасқан: https://erketai-sad.edu.kz/ (GitHub Pages + custom domain).
 * basePath бос — барлық ресурстар түбірден (/) жүктеледі.
 * Қажет болса NEXT_PUBLIC_BASE_PATH және NEXT_PUBLIC_SITE_URL арқылы өзгертуге болады.
 */
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const origin = (process.env.NEXT_PUBLIC_SITE_URL || "https://erketai-sad.edu.kz").replace(/\/$/, "");

/** Сайттың толық адресі (SEO, Open Graph, sitemap үшін), basePath-пен бірге. */
export const siteUrl = !basePath || origin.endsWith(basePath) ? origin : origin + basePath;

/**
 * public/ ішіндегі файлға жол: next/image және metadata basePath-ты
 * автоматты түрде қоспайды, сондықтан қолмен қосамыз.
 */
export const asset = (p: string) => basePath + (p.startsWith("/") ? p : "/" + p);
