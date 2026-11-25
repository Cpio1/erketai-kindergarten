import type { Metadata, Viewport } from "next";
import { Nunito, Unbounded } from "next/font/google";
import { branches } from "@/lib/branches";
import { dictionaries } from "@/lib/i18n";
import { getSiteMedia } from "@/lib/media";
import { asset, siteUrl } from "@/lib/site-url";
import "./globals.css";

/* Екі қаріп те қазақ әріптерін толық қолдайды: ә, ғ, қ, ң, ө, ұ, ү, һ, і */
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-nunito",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-unbounded",
  display: "swap",
});

const { title, description } = dictionaries.kk.meta;

export async function generateMetadata(): Promise<Metadata> {
  const { hero, logo } = getSiteMedia();
  const icon = logo ?? asset("/favicon.svg");
  return {
    metadataBase: new URL(new URL(siteUrl).origin),
    title,
    description,
    applicationName: "Erketai",
    keywords: [
      "Erketai",
      "Еркетай",
      "балабақша",
      "детский сад",
      "детский сад Алматы",
      "балабақша Алматы",
      "билингвальный детский сад",
      "Алатауский район",
      "Шапағат",
      "Ауэзовский район",
      "мкр Астана",
      "частный детский сад",
    ],
    alternates: { canonical: `${siteUrl}/` },
    icons: { icon: [{ url: icon }], apple: [{ url: icon }] },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/`,
      siteName: "Erketai",
      locale: "kk_KZ",
      alternateLocale: ["ru_RU"],
      type: "website",
      ...(hero ? { images: [{ url: hero, alt: "Erketai" }] } : {}),
    },
    twitter: { card: hero ? "summary_large_image" : "summary", title, description },
    formatDetection: { telephone: false, address: false, email: false },
    other: { "color-scheme": "light only" },
  };
}

export const viewport: Viewport = {
  themeColor: "#fff8ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Erketai",
  legalName: "ТОО «Erketai»",
  url: siteUrl,
  sameAs: branches.map((b) => b.instagram.url),
  subOrganization: branches.map((b) => ({
    "@type": "Preschool",
    name: `Erketai — ${b.name.ru}`,
    telephone: b.phone.display,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.ru.replace(/^Алматы, /, ""),
      addressLocality: "Алматы",
      addressCountry: "KZ",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: b.openingDays,
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: [b.instagram.url],
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="kk"
      className={`${nunito.variable} ${unbounded.variable}`}
      style={{ colorScheme: "light", backgroundColor: "#fff8ef" }}
      suppressHydrationWarning
    >
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
