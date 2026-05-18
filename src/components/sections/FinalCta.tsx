"use client";

import { motion } from "framer-motion";
import { PhotoSlot } from "../PhotoSlot";
import { Countdown } from "../Countdown";
import { Reveal } from "../Reveal";
import { TRIP } from "@/content/trip";

/**
 * Финальный экран.
 *
 * По решению заказчика — это не форма сбора заявок, а эмоциональный
 * кадр-финал презентации для вечера, где он защищает идею перед друзьями.
 * Крупный вопрос, таймер до старта, сводка цифр.
 */

// Фон финального экрана. Впиши путь к фото, например ["/photos/final.jpg"].
// Пока пусто — показывается плейсхолдер. Можно несколько — будет слайдер.
const FINAL_PHOTOS: string[] = [];

const SUMMARY = [
  { value: TRIP.totalKm.toLocaleString("ru-RU"), label: "километров" },
  { value: String(TRIP.days), label: "дней" },
  { value: String(TRIP.cars), label: "машины" },
  { value: "1 июля", label: "выезжаем" },
];

export function FinalCta() {
  return (
    <section
      id="final"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Фон */}
      <div className="absolute inset-0 -z-10">
        <PhotoSlot
          caption="Эльбрус на закате или компания друзей на смотровой — финальный кадр"
          photos={FINAL_PHOTOS}
          search="Caucasus mountains golden hour"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow">Ну что</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display mt-5 text-[4rem] font-medium leading-[0.95] text-paper sm:text-8xl lg:text-[9rem]">
            Поехали<span className="text-ember">?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
            Маршрут готов, цифры посчитаны, машины есть. Осталось одно —
            собраться этим вечером и сказать друг другу «да». Дальше уже детали.
          </p>
        </Reveal>

        {/* Таймер */}
        <Reveal delay={0.3} className="mt-10">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
            До старта осталось
          </p>
          <Countdown />
        </Reveal>

        {/* Сводка цифр */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="mx-auto mt-12 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {SUMMARY.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              className="rounded-xl border border-hairline bg-ink-card/80 px-3 py-4 backdrop-blur-sm"
            >
              <span className="font-display tnum block text-xl font-semibold text-ember sm:text-2xl">
                {s.value}
              </span>
              <span className="mt-0.5 block text-[0.65rem] uppercase tracking-wider text-muted">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.2} className="mt-12">
          <p className="font-display text-lg italic text-paper/70">
            Кавказ-2026. Три машины, восемь своих, одно лето.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
