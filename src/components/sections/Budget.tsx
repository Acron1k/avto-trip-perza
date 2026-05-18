"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { CARS } from "@/content/trip";
import {
  TIERS,
  type Tier,
  budgetPerPerson,
  fuelForCar,
  clampSeats,
  COMPARISON,
  FUEL_PRICE,
  SEATS_MIN,
  SEATS_MAX,
} from "@/content/budget";

/**
 * «Бюджет» — интерактивный калькулятор.
 * Две оси выбора: уровень поездки (эконом/комфорт/бизнес) и машина.
 * Бензин считается отдельно для каждой машины — у Чангана-гибрида
 * расход вчетверо ниже, и калькулятор это честно показывает.
 */

const ruble = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

export function Budget() {
  const [tier, setTier] = useState<Tier>("comfort");
  const [carId, setCarId] = useState<string>(CARS[2].id); // по умолчанию Чанган
  const [seats, setSeats] = useState<number>(CARS[2].crew.length);

  // Смена машины сбрасывает число пассажиров к её штатному экипажу
  const selectCar = (id: string) => {
    setCarId(id);
    setSeats(CARS.find((c) => c.id === id)!.crew.length);
  };
  const changeSeats = (delta: number) =>
    setSeats((s) => clampSeats(s + delta));

  const result = useMemo(
    () => budgetPerPerson(carId, tier, seats),
    [carId, tier, seats],
  );
  const fuel = useMemo(() => fuelForCar(carId, seats), [carId, seats]);
  const activeCar = CARS.find((c) => c.id === carId)!;
  const peopleWord =
    seats === 1 ? "человек" : seats >= 2 && seats <= 4 ? "человека" : "человек";

  const rows = [
    { label: "Бензин", value: result.fuel, note: `${activeCar.model}, на одного` },
    { label: "Жильё", value: result.lodging, note: "11 ночей" },
    { label: "Еда", value: result.food, note: "12 дней" },
    { label: "Активности", value: result.activities, note: "канатки, заброски, входы" },
    { label: "Резерв", value: result.reserve, note: "на всякий случай" },
  ];

  return (
    <section id="budget" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Деньги"
          title="Сколько это стоит — честно"
          intro="Никаких «от». Двигай переключатели — калькулятор пересчитает бюджет под уровень комфорта и конкретную машину. Бензин считается отдельно: у гибрида он заметно дешевле."
        />

        {/* Выбор уровня */}
        <Reveal className="mt-12" delay={0.05}>
          <div className="flex flex-wrap gap-2">
            {TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                aria-pressed={tier === t.id}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  tier === t.id
                    ? "bg-ember text-ink"
                    : "border border-hairline-strong text-muted hover:border-ember hover:text-paper"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            {TIERS.find((t) => t.id === tier)!.tagline}
          </p>
        </Reveal>

        {/* Выбор машины */}
        <Reveal className="mt-6" delay={0.1}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
            На какой машине ты едешь
          </p>
          <div className="flex flex-wrap gap-2">
            {CARS.map((car) => (
              <button
                key={car.id}
                type="button"
                onClick={() => selectCar(car.id)}
                aria-pressed={carId === car.id}
                className={`rounded-xl border px-4 py-2.5 text-left transition-all ${
                  carId === car.id
                    ? "border-ember bg-ember/10"
                    : "border-hairline hover:border-ember/40"
                }`}
              >
                <span className="block text-sm font-semibold text-paper">
                  {car.model}
                </span>
                <span className="block text-xs text-muted">
                  {car.crew.join(", ")}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Сколько человек делят машину */}
        <Reveal className="mt-6" delay={0.12}>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-hairline bg-ink-soft px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-paper">
                Сколько человек в машине
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Бензин делится на всех — чем больше народу, тем дешевле каждому.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changeSeats(-1)}
                disabled={seats <= SEATS_MIN}
                aria-label="Убрать одного человека"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong text-xl font-semibold text-paper transition-all hover:border-ember hover:text-ember disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-hairline-strong disabled:hover:text-paper"
              >
                −
              </button>
              <motion.span
                key={seats}
                initial={{ opacity: 0.4, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="tnum w-16 text-center font-display text-2xl font-semibold text-paper"
              >
                {seats}
              </motion.span>
              <button
                type="button"
                onClick={() => changeSeats(1)}
                disabled={seats >= SEATS_MAX}
                aria-label="Добавить одного человека"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong text-xl font-semibold text-paper transition-all hover:border-ember hover:text-ember disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-hairline-strong disabled:hover:text-paper"
              >
                +
              </button>
            </div>
          </div>
        </Reveal>

        {/* Расклад */}
        <Reveal className="mt-8" delay={0.15}>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            {/* Таблица расходов */}
            <div className="rounded-2xl border border-hairline bg-ink-card p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Расклад на одного человека
              </p>
              <div className="mt-4 divide-y divide-hairline">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <span className="text-sm font-semibold text-paper">
                        {row.label}
                      </span>
                      <span className="ml-2 text-xs text-muted">
                        {row.note}
                      </span>
                    </div>
                    <span className="tnum text-sm font-semibold text-paper">
                      {ruble(row.value)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-ember/30 pt-4">
                <span className="font-display text-lg font-medium text-paper">
                  Итого
                </span>
                <motion.span
                  key={result.total}
                  initial={{ opacity: 0.4, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display tnum text-3xl font-semibold text-ember"
                >
                  {ruble(result.total)}
                </motion.span>
              </div>
            </div>

            {/* Боковая колонка: про бензин + сравнение */}
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-hairline bg-ink-soft p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Почему бензин разный
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {activeCar.model} — расход{" "}
                  <span className="font-semibold text-paper">
                    {activeCar.consumption} л/100&nbsp;км
                  </span>
                  . За поездку это{" "}
                  <span className="tnum font-semibold text-paper">
                    {fuel.liters} л
                  </span>{" "}
                  ({ruble(fuel.rublesPerCar)} на машину). Делим на{" "}
                  <span className="tnum font-semibold text-paper">
                    {seats}
                  </span>{" "}
                  {peopleWord} —{" "}
                  <span className="tnum font-semibold text-ember">
                    {ruble(fuel.rublesPerPerson)}
                  </span>{" "}
                  с каждого.
                </p>
                {activeCar.note && (
                  <p className="mt-2 text-xs leading-relaxed text-muted/80">
                    {activeCar.note}
                  </p>
                )}
                <p className="mt-3 text-xs text-muted/70">
                  Расчёт по {FUEL_PRICE} ₽ за литр АИ-95.
                </p>
              </div>

              <div className="rounded-2xl border border-pine/40 bg-pine/[0.07] p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-pine">
                  Для сравнения
                </p>
                <p className="mt-2 text-sm text-muted">{COMPARISON.label}</p>
                <p className="font-display mt-1 text-2xl font-semibold text-paper">
                  {COMPARISON.range}
                </p>
                <p className="mt-2 text-sm font-semibold text-ember">
                  {COMPARISON.punchline}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
