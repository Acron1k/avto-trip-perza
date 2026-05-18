"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PhotoSlot } from "./PhotoSlot";
import type { TripDay } from "@/content/trip";

/**
 * Карточка одного дня маршрута для вертикального таймлайна.
 * Опциональные точки «по желанию рядом» свёрнуты и раскрываются по клику.
 */

const KIND_LABEL: Record<TripDay["kind"], string> = {
  drive: "День дороги",
  program: "День программы",
  mixed: "Переезд + программа",
};

const KIND_COLOR: Record<TripDay["kind"], string> = {
  drive: "text-muted",
  program: "text-pine",
  mixed: "text-ember",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}

export function DayCard({ day, isLast }: { day: TripDay; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const hasSidePoints = day.sidePoints && day.sidePoints.length > 0;

  return (
    <div className="relative pl-10 sm:pl-16">
      {/* Линия таймлайна */}
      {!isLast && (
        <span
          className="absolute left-[14px] top-3 h-full w-px bg-hairline sm:left-[22px]"
          aria-hidden="true"
        />
      )}
      {/* Узел-кружок с номером дня */}
      <span
        className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-ember/50 bg-ink text-xs font-bold text-ember sm:h-11 sm:w-11 sm:text-sm"
        aria-hidden="true"
      >
        {day.n}
      </span>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 overflow-hidden rounded-2xl border border-hairline bg-ink-card"
      >
        <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
          {/* Фото */}
          <PhotoSlot
            caption={day.photo}
            photos={day.photos}
            className="h-52 w-full md:h-full md:min-h-[16rem]"
          />

          {/* Текст */}
          <div className="flex flex-col p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="font-semibold uppercase tracking-wider text-paper">
                День {day.n}
              </span>
              <span className="text-muted">
                {formatDate(day.date)}, {day.weekday}
              </span>
              <span className={`font-semibold ${KIND_COLOR[day.kind]}`}>
                · {KIND_LABEL[day.kind]}
              </span>
            </div>

            <h3 className="font-display mt-2 text-xl font-medium leading-snug text-paper sm:text-2xl">
              {day.title}
            </h3>

            {day.km && (
              <p className="mt-1 text-sm font-semibold text-ember">
                <span className="tnum">{day.km.toLocaleString("ru-RU")}</span> км
                за день
              </p>
            )}

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {day.lead}
            </p>

            {/* Активности */}
            <ul className="mt-4 space-y-1.5">
              {day.activities.map((act, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-2 text-sm text-paper/90"
                >
                  <span className="text-ember" aria-hidden="true">
                    ›
                  </span>
                  <span className="flex-1">
                    {act.label}
                    {act.price !== undefined && (
                      <span className="ml-1.5 tnum text-xs font-semibold text-pine">
                        {act.price.toLocaleString("ru-RU")} ₽
                        {act.priceNote ? ` · ${act.priceNote}` : ""}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            {/* Ночёвка */}
            <p className="mt-4 flex items-center gap-2 border-t border-hairline pt-3 text-xs text-muted">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3h18z" />
                <path d="M3 13h18" />
              </svg>
              Ночуем: <span className="text-paper/90">{day.sleep}</span>
            </p>

            {/* Сворачиваемые опциональные точки */}
            {hasSidePoints && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-2 rounded-lg border border-hairline bg-ink-soft px-3.5 py-2.5 text-left text-xs font-semibold text-paper transition-colors hover:border-ember/40"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-ember">+</span>
                    По желанию рядом · {day.sidePoints!.length}
                  </span>
                  <motion.svg
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 space-y-2">
                        {day.sidePoints!.map((sp) => (
                          <div
                            key={sp.title}
                            className="rounded-lg border-l-2 border-pine bg-ink-soft px-3.5 py-3"
                          >
                            <p className="text-sm font-semibold text-paper">
                              {sp.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted">
                              {sp.text}
                            </p>
                            {sp.detail && (
                              <p className="mt-1.5 text-xs font-semibold text-pine">
                                {sp.detail}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
