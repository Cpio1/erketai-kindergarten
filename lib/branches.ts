/**
 * Erketai филиалдарының деректері — бірыңғай ақпарат көзі.
 * Барлық бөлімдер (Филиалдар, Топтар, Үйірмелер, Байланыс, футер) осы файлды пайдаланады.
 * Екі филиалдың деректерін араластырмаңыз.
 */

export type Lang = "kk" | "ru";
export type L10n = Record<Lang, string>;

export type BranchId = "alatau" | "auezov";

export type ActivityId = "taekwondo" | "dance" | "speech" | "schoolPrep" | "vocal" | "piano";
export type ServiceId = "transport";

export type Branch = {
  id: BranchId;
  /** Карточкадағы түс тақырыбы */
  tone: "teal" | "peach";
  name: L10n;
  district: L10n;
  address: L10n;
  /** Карталарда іздеу үшін (орысша, нақты мекенжай) */
  mapQuery: string;
  phone: { display: string; href: string };
  whatsapp: string;
  instagram: { handle: string; url: string };
  schedule: { days: L10n; hours: string; duty?: L10n };
  /** schema.org үшін */
  openingDays: string[];
  groups: number;
  ages: string;
  activities: ActivityId[];
  services: ServiceId[];
  /**
   * 2GIS. Нақты сілтемелерді 2GIS-тен көшіріп қойыңыз (ойдан шығарылған ID қоймаңыз).
   * - twoGisUrl: 2GIS-тегі ұйым карточкасы. Бос болса — мекенжай бойынша іздеу ашылады.
   * - twoGisEmbed: 2GIS виджет конструкторынан алынған iframe src. Бос болса — карта орнына мекенжай карточкасы көрсетіледі.
   */
  twoGisUrl: string;
  twoGisEmbed: string;
  /** Google Drive-тағы құжаттар папкасы (жария сілтеме). Бос болса — «жақында» күйі. */
  documentsUrl: string;
};

export const branches: Branch[] = [
  {
    id: "alatau",
    tone: "teal",
    name: { kk: "Алатау филиалы", ru: "Алатауский филиал" },
    district: { kk: "Алатау ауданы", ru: "Алатауский район" },
    address: {
      kk: "Алматы, Алатау ауданы, Шапағат ш/а, Талбесік к-сі, 65",
      ru: "Алматы, Алатауский район, мкр. Шапағат, ул. Талбесік, 65",
    },
    mapQuery: "Алматы, микрорайон Шапағат, улица Талбесік, 65",
    phone: { display: "+7 707 720 75 55", href: "tel:+77077207555" },
    whatsapp: "https://wa.me/77077207555",
    instagram: { handle: "@erketai_land", url: "https://www.instagram.com/erketai_land/" },
    schedule: {
      days: { kk: "Сейсенбі – сенбі", ru: "Вторник – суббота" },
      hours: "08:00–18:00",
      duty: { kk: "Кезекші топтар: жексенбі және дүйсенбі", ru: "Дежурные группы: воскресенье и понедельник" },
    },
    openingDays: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    groups: 3,
    ages: "2–6",
    activities: ["taekwondo", "dance", "speech"],
    services: ["transport"],
    twoGisUrl: "",
    twoGisEmbed: "",
    documentsUrl: "",
  },
  {
    id: "auezov",
    tone: "peach",
    name: { kk: "Әуезов филиалы", ru: "Ауэзовский филиал" },
    district: { kk: "Әуезов ауданы", ru: "Ауэзовский район" },
    address: {
      kk: "Алматы, Әуезов ауданы, Астана ш/а, 38",
      ru: "Алматы, Ауэзовский район, мкр. Астана, 38",
    },
    mapQuery: "Алматы, микрорайон Астана, 38",
    phone: { display: "+7 701 446 67 77", href: "tel:+77014466777" },
    whatsapp: "https://wa.me/77014466777",
    instagram: { handle: "@erketai_balabaqsha", url: "https://www.instagram.com/erketai_balabaqsha/" },
    schedule: {
      days: { kk: "Дүйсенбі – жұма", ru: "Понедельник – пятница" },
      hours: "08:00–18:00",
    },
    openingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    groups: 3,
    ages: "2–6",
    activities: ["taekwondo", "dance", "speech", "schoolPrep", "vocal", "piano"],
    services: [],
    twoGisUrl: "",
    twoGisEmbed: "",
    documentsUrl: "",
  },
];

export const getBranch = (id: BranchId) => branches.find((b) => b.id === id)!;

/** Барлық филиалдарға ортақ артықшылықтар */
export const commonFeatures = ["langs", "english", "meals", "cameras"] as const;
export type CommonFeature = (typeof commonFeatures)[number];

export const mapLinks = (b: Branch) => {
  const q = encodeURIComponent(b.mapQuery);
  return {
    twoGis: b.twoGisUrl || `https://2gis.kz/almaty/search/${q}`,
    yandex: `https://yandex.kz/maps/162/almaty/?text=${q}`,
    google: `https://www.google.com/maps/search/?api=1&query=${q}`,
  };
};

export const whatsappWithText = (b: Branch, text: string) => `${b.whatsapp}?text=${encodeURIComponent(text)}`;
