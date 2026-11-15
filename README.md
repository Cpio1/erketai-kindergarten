# Erketai — балабақша лендингі (2 филиал)

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lucide · ҚАЗ / РУС (әдепкі — қазақша) · әрқашан ашық тема.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production сборка
```

## Деректер

- `lib/branches.ts` — екі филиалдың барлық деректері (мекенжай, телефон, WhatsApp, Instagram, кесте, үйірмелер, 2GIS, құжаттар). Барлық бөлімдер осы файлдан алады.
- `lib/i18n.ts` — қазақша және орысша мәтіндер.

### Кейін толтыратын өрістер (`lib/branches.ts`)

| Өріс | Не қою керек | Бос болса |
|---|---|---|
| `twoGisUrl` | 2GIS-тегі ұйым карточкасының сілтемесі | Мекенжай бойынша 2GIS іздеуі ашылады |
| `twoGisEmbed` | 2GIS виджет конструкторынан iframe `src` | Карта орнына «2GIS-те ашу» карточкасы |
| `documentsUrl` | Google Drive папкасының жария сілтемесі | «Сілтеме жақында қосылады» |

## Суреттер (`public/images`)

Файлдар build кезінде автоматты табылады; жоқ файл сайтты бұзбайды.

| Файл | Қайда шығады |
|---|---|
| `main-page.png` (.jpg/.webp) | Басты экран + Open Graph |
| `about-1.jpg`, `about-2.jpg` | «Біз туралы» |
| `alatau.jpg`, `auezov.jpg` | Филиал карточкалары |
| `logo.png` (.svg/.webp) | Шапка, футер, favicon |
| `alatau-*.jpg` немесе `images/alatau/*` | Галерея → Алатау филиалы |
| `auezov-*.jpg` немесе `images/auezov/*` | Галерея → Әуезов филиалы |
| кез келген басқа сурет | Галерея (тек «Барлығы» сүзгісінде) |

## Vercel

Жобаны Vercel-ге импорттаңыз (Framework: Next.js). Өз доменіңіз болса, `NEXT_PUBLIC_SITE_URL=https://domain.kz` қосыңыз.
