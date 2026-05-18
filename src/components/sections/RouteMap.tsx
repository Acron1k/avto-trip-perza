"use client";

import { SectionHeading } from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { TRIP } from "@/content/trip";

/**
 * «Маршрут на карте» — Яндекс.Карты embed + ключевые цифры.
 *
 * Карта построена по точкам маршрута через конструктор Яндекс.Карт.
 * Как заменить карту своей — см. README.md, раздел «Карта маршрута».
 */

// Конструктор Яндекс.Карт с линией маршрута по ключевым городам.
const YANDEX_MAP_SRC =
  "https://yandex.ru/map-widget/v1/?ll=46.5%2C45.2&z=5&l=map&" +
  "rtext=56.838%2C60.605~53.195%2C50.100~46.308%2C44.270~44.041%2C43.072~" +
  "43.266%2C42.490~43.563%2C41.270&rtt=auto";

const KEY_POINTS = [
  { city: "Екатеринбург", note: "старт" },
  { city: "Самара", note: "ночёвка 1" },
  { city: "Элиста", note: "буддийская столица" },
  { city: "Пятигорск", note: "база Кавминвод" },
  { city: "Терскол", note: "Приэльбрусье" },
  { city: "Архыз", note: "финальная база" },
];

const STATS = [
  { value: TRIP.totalKm.toLocaleString("ru-RU"), label: "километров" },
  { value: String(TRIP.days), label: "дней в пути" },
  { value: String(TRIP.cars), label: "машины в колонне" },
  { value: String(TRIP.regions), label: "региона Кавказа" },
];

export function RouteMap() {
  return (
    <section id="route" className="relative bg-ink-soft px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Маршрут"
          title="Большое кольцо по Кавказу"
          intro="Туда — через Поволжье и калмыцкую степь. На месте — петля по Кавминводам, Приэльбрусью и Архызу. Обратно — прямой бросок домой."
        />

        {/* Список городов-вех */}
        <Reveal className="mt-10" delay={0.1}>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {KEY_POINTS.map((point, i) => (
              <div key={point.city} className="flex items-center gap-2">
                <div className="rounded-full border border-hairline bg-ink-card px-4 py-2">
                  <span className="text-sm font-semibold text-paper">
                    {point.city}
                  </span>
                  <span className="ml-2 text-xs text-muted">{point.note}</span>
                </div>
                {i < KEY_POINTS.length - 1 && (
                  <span className="text-ember" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* Карта */}
        <Reveal className="mt-8" delay={0.15}>
          <div className="overflow-hidden rounded-2xl border border-hairline shadow-2xl shadow-black/40">
            <iframe
              src={YANDEX_MAP_SRC}
              title="Маршрут поездки Кавказ-2026 на карте"
              loading="lazy"
              className="h-[380px] w-full sm:h-[480px]"
              style={{ border: 0 }}
            />
          </div>
        </Reveal>

        {/* Ключевые цифры */}
        <Stagger className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="flex flex-col items-center justify-center bg-ink-card px-4 py-8 text-center">
                <span className="font-display tnum text-4xl font-medium text-ember lg:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
