import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

/**
 * Засечковый дисплейный шрифт для заголовков — характерный, «журнальный».
 * Playfair Display: transitional serif с высоким контрастом штрихов.
 * ВАЖНО: подключён с кириллицей — заголовки сайта русские. Fraunces,
 * стоявший здесь раньше, кириллицу не поддерживает и падал на Georgia.
 */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Гротеск для основного текста — чище и теплее, чем Inter */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://avto-trip-perza.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Кавказ-2026 · Едем 1–12 июля",
  description:
    "12 дней, 4900 км, Кавминводы → Эльбрус → Архыз. Едем из Екатеринбурга на трёх машинах. Присоединяйся.",
  keywords: [
    "Кавказ 2026",
    "автопутешествие",
    "Эльбрус",
    "Архыз",
    "Кавминводы",
    "роуд-трип",
  ],
  openGraph: {
    title: "Кавказ-2026 · Едем 1–12 июля",
    description:
      "12 дней, 4900 км на трёх машинах: Кавминводы, Эльбрус, Архыз. Из Екатеринбурга на Северный Кавказ.",
    url: SITE_URL,
    siteName: "Кавказ-2026",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Кавказ-2026 — автопутешествие на Северный Кавказ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Кавказ-2026 · Едем 1–12 июля",
    description:
      "12 дней, 4900 км: Кавминводы, Эльбрус, Архыз. Из Екатеринбурга на трёх машинах.",
    images: ["/og"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1a27",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
