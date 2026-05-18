"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { PhotoSlot } from "../PhotoSlot";
import { TRIP } from "@/content/trip";

/**
 * Hero — первый экран.
 * Полноэкранный фон-плейсхолдер Эльбруса с лёгким параллаксом (≤20% сдвига),
 * крупный засечковый заголовок, сводка маршрута, индикатор скролла.
 */

// Фон героя. Впиши сюда путь к фото, например ["/photos/hero-elbrus.jpg"].
// Пока пусто — показывается плейсхолдер. Можно несколько — будет слайдер.
const HERO_PHOTOS: string[] = [
  "/photos/hero-1.jpg",
  "/photos/hero-4.jpg",
  "/photos/hero-2.jpg",
  "/photos/hero-3.jpg",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Параллакс: фон уезжает медленнее текста, сдвиг небольшой
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden"
    >
      {/* Фоновое фото */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <PhotoSlot
          caption="Эльбрус с двуглавой вершиной на рассвете"
          photos={HERO_PHOTOS}
          search="Mount Elbrus Bermamyt sunrise"
          className="h-full w-full"
        />
      </motion.div>

      {/* Затемнение для читаемости текста */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-ink/60 to-transparent" />

      {/* Контент */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="eyebrow"
        >
          1—12 июля 2026 · из Екатеринбурга
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-5 text-[3.4rem] font-medium leading-[0.98] text-paper sm:text-7xl lg:text-[6.2rem]"
        >
          Кавказ.
          <br />
          Это лето.{" "}
          <span className="italic text-ember">На машинах.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-7 max-w-2xl text-base text-paper/85 sm:text-lg"
        >
          Екатеринбург → Кавминводы → Эльбрус → Архыз.
          <br className="hidden sm:block" />{" "}
          <span className="tnum">
            {TRIP.totalKm.toLocaleString("ru-RU")} км · {TRIP.days} дней ·{" "}
            {TRIP.cars} машины
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#route"
            className="group rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-ember-bright hover:shadow-[0_8px_30px_-8px] hover:shadow-ember/60"
          >
            Смотреть маршрут
          </a>
          <a
            href="#budget"
            className="rounded-full border border-hairline-strong px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-ember hover:text-ember"
          >
            Сколько стоит
          </a>
        </motion.div>
      </motion.div>

      {/* Индикатор скролла */}
      <motion.a
        href="#why"
        aria-label="Листать вниз"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.2em]">
            листай
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
}
