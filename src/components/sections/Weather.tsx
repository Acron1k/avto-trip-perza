"use client";

import { useEffect, useState } from "react";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

/**
 * Виджет погоды в трёх ключевых точках маршрута.
 * Данные — Open-Meteo (бесплатный API, без ключа).
 * Грузится на клиенте; при недоступности API блок аккуратно скрывается.
 */

interface Spot {
  city: string;
  region: string;
  lat: number;
  lon: number;
  /** Климатическая норма начала июля: типичные дневная и ночная температуры */
  julyDay: number;
  julyNight: number;
  /** Короткая характеристика погоды начала июля в этой точке */
  julyNote: string;
}

const SPOTS: Spot[] = [
  {
    city: "Пятигорск",
    region: "база Кавминвод",
    lat: 44.04,
    lon: 43.06,
    julyDay: 29,
    julyNight: 17,
    julyNote: "Тепло и солнечно, к полудню жарко",
  },
  {
    city: "Терскол",
    region: "Приэльбрусье",
    lat: 43.26,
    lon: 42.51,
    julyDay: 20,
    julyNight: 9,
    julyNote: "Горная прохлада, на канатке около нуля",
  },
  {
    city: "Архыз",
    region: "финальная база",
    lat: 43.56,
    lon: 41.27,
    julyDay: 23,
    julyNight: 11,
    julyNote: "Днём комфортно, вечером свежо",
  },
];

interface WeatherData {
  temp: number;
  code: number;
}

// Сжатая трактовка WMO weather code
function describe(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Ясно", icon: "sun" };
  if (code <= 3) return { label: "Облачно", icon: "cloud" };
  if (code <= 48) return { label: "Туман", icon: "cloud" };
  if (code <= 67) return { label: "Дождь", icon: "rain" };
  if (code <= 77) return { label: "Снег", icon: "rain" };
  if (code <= 82) return { label: "Ливень", icon: "rain" };
  if (code <= 99) return { label: "Гроза", icon: "rain" };
  return { label: "—", icon: "cloud" };
}

function WeatherIcon({ icon }: { icon: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (icon === "sun")
    return (
      <svg {...common} className="text-ember" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  if (icon === "rain")
    return (
      <svg {...common} className="text-muted" aria-hidden="true">
        <path d="M16 13a4 4 0 0 0 0-8 5 5 0 0 0-9.6 1.5A3.5 3.5 0 0 0 7 13" />
        <path d="M8 17v2M12 18v2M16 17v2" />
      </svg>
    );
  return (
    <svg {...common} className="text-muted" aria-hidden="true">
      <path d="M17 18a4 4 0 0 0 0-8 5 5 0 0 0-9.6 1.5A3.5 3.5 0 0 0 8 18Z" />
    </svg>
  );
}

export function Weather() {
  const [data, setData] = useState<Record<string, WeatherData>>({});
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const results = await Promise.all(
          SPOTS.map(async (s) => {
            const url =
              `https://api.open-meteo.com/v1/forecast?latitude=${s.lat}` +
              `&longitude=${s.lon}&current=temperature_2m,weather_code`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("weather api");
            const json = await res.json();
            return [
              s.city,
              {
                temp: Math.round(json.current.temperature_2m),
                code: json.current.weather_code,
              },
            ] as const;
          }),
        );
        if (!cancelled) setData(Object.fromEntries(results));
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="weather" className="relative px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Погода"
          title="Какая там погода"
          intro="Сверху — что в этих местах прямо сейчас, пока ты читаешь это в Екатеринбурге. Снизу — чего ждать на старте поездки, в первых числах июля."
        />

        {/* Текущая погода — прячется, только если API не ответил */}
        {!failed && (
          <Reveal className="mt-10" delay={0.05}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
              Прямо сейчас
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {SPOTS.map((spot) => {
                const w = data[spot.city];
                const d = w ? describe(w.code) : null;
                return (
                  <div
                    key={spot.city}
                    className="flex items-center justify-between rounded-2xl border border-hairline bg-ink-card px-5 py-5"
                  >
                    <div>
                      <p className="font-display text-lg font-medium text-paper">
                        {spot.city}
                      </p>
                      <p className="text-xs text-muted">{spot.region}</p>
                      <p className="mt-1 text-xs text-muted">
                        {d ? d.label : "загрузка…"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {d && <WeatherIcon icon={d.icon} />}
                      <span className="font-display tnum text-3xl font-semibold text-paper">
                        {w ? `${w.temp > 0 ? "+" : ""}${w.temp}°` : "··"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* Прогноз на начало июля — климатическая норма, всегда виден */}
        <Reveal className="mt-10" delay={0.1}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ember">
            На старте поездки · начало июля
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {SPOTS.map((spot) => (
              <div
                key={spot.city}
                className="rounded-2xl border border-hairline bg-ink-card px-5 py-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-lg font-medium text-paper">
                      {spot.city}
                    </p>
                    <p className="text-xs text-muted">{spot.region}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display tnum text-3xl font-semibold text-ember">
                      +{spot.julyDay}°
                    </span>
                    <p className="text-xs text-muted">днём</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3">
                  <p className="text-xs text-muted">{spot.julyNote}</p>
                  <span className="tnum whitespace-nowrap text-xs font-semibold text-paper">
                    ночью +{spot.julyNight}°
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted/70">
            Это средние температуры начала июля по многолетним наблюдениям —
            точный прогноз появится ближе к выезду.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
