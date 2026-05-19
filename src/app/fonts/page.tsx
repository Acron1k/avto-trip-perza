import type { Metadata } from "next";
import { Cormorant, Spectral, Unbounded } from "next/font/google";

/**
 * Витрина шрифтов — временная страница для выбора шрифта заголовков.
 *
 * Заказчику не зашли Playfair Display (текущий) и Fraunces (был раньше).
 * Здесь три кандидата на реальном заголовке сайта, чтобы выбрать глазами.
 * После выбора эту страницу и неиспользуемые шрифты удалить.
 *
 * Открывать: /fonts
 */

const cormorant = Cormorant({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--demo-cormorant",
});

const spectral = Spectral({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--demo-spectral",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--demo-unbounded",
});

export const metadata: Metadata = {
  title: "Выбор шрифта · Кавказ-2026",
  robots: { index: false, follow: false },
};

interface FontVariant {
  id: string;
  name: string;
  kind: string;
  note: string;
  fontFamily: string;
  headingWeight: number;
  noItalic?: boolean;
}

const VARIANTS: FontVariant[] = [
  {
    id: "A",
    name: "Cormorant",
    kind: "Антиква (с засечками)",
    note: "Тёплая «книжная» антиква. Мягче и элегантнее Playfair, без его холодной строгости. Курсив особенно красивый.",
    fontFamily: "var(--demo-cormorant)",
    headingWeight: 500,
  },
  {
    id: "B",
    name: "Spectral",
    kind: "Антиква (с засечками)",
    note: "Серьёзный, но дружелюбный шрифт, спроектирован Google специально для экрана. Спокойнее и современнее, чем декоративные антиквы.",
    fontFamily: "var(--demo-spectral)",
    headingWeight: 500,
  },
  {
    id: "C",
    name: "Unbounded",
    kind: "Гротеск (без засечек)",
    note: "Если засечки в принципе не нравятся — вот характерный геометрический гротеск с отличной кириллицей. Заметный, «дизайнерский», подойдёт для крупных заголовков-афиш.",
    fontFamily: "var(--demo-unbounded)",
    headingWeight: 500,
    noItalic: true,
  },
];

export default function FontsPage() {
  return (
    <div
      className={`${cormorant.variable} ${spectral.variable} ${unbounded.variable} min-h-screen bg-ink px-6 py-16 text-paper`}
    >
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">временная страница · выбор шрифта</p>
        <h1 className="font-display mt-3 text-3xl font-medium">
          Какой шрифт заголовков ставим?
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Ниже три варианта на реальном заголовке сайта. Посмотри, какой
          приятнее — и скажи букву (A, B или C). Текущий шрифт (Playfair
          Display) и прежний (Fraunces) тебе не зашли, поэтому здесь другие
          направления.
        </p>

        <div className="mt-12 space-y-14">
          {VARIANTS.map((v) => (
            <section
              key={v.id}
              className="rounded-2xl border border-hairline-strong bg-ink-soft p-7 sm:p-9"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-ember">{v.id}</span>
                <span className="text-lg font-semibold">{v.name}</span>
                <span className="text-xs uppercase tracking-wider text-muted">
                  {v.kind}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: v.fontFamily,
                  fontWeight: v.headingWeight,
                }}
                className="mt-6 text-[2.6rem] leading-[1.0] sm:text-6xl"
              >
                Кавказ.
                <br />
                Это лето.{" "}
                <span
                  style={{ fontStyle: v.noItalic ? "normal" : "italic" }}
                  className="text-ember"
                >
                  На машинах.
                </span>
              </h2>

              <h3
                style={{
                  fontFamily: v.fontFamily,
                  fontWeight: v.headingWeight,
                }}
                className="mt-8 text-2xl sm:text-3xl"
              >
                Шесть причин сказать «да»
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-paper/85">
                Основной текст останется прежним (Manrope) — меняется только
                шрифт заголовков. Цифры: {" "}
                <span className="tnum">4900 км · 12 дней · 3 машины</span>.
              </p>

              <p className="mt-5 text-xs text-muted">{v.note}</p>
            </section>
          ))}
        </div>

        <p className="mt-14 text-xs text-muted">
          Эта страница временная и закрыта от поисковиков. После выбора я её
          удалю и оставлю только один шрифт.
        </p>
      </div>
    </div>
  );
}
