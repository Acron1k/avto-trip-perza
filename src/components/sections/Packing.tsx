"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { CHECKLIST } from "@/content/misc";

/**
 * «Что брать» — интерактивный чек-лист.
 * Отмеченные пункты сохраняются в localStorage — переживают перезагрузку.
 */

const STORAGE_KEY = "kavkaz2026-packing";

const ALL_IDS = CHECKLIST.flatMap((g) => g.items.map((i) => i.id));

export function Packing() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Восстановление из localStorage после монтирования (избегаем SSR-рассинхрона)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* localStorage недоступен — работаем без сохранения */
    }
    setHydrated(true);
  }, []);

  // Сохранение при каждом изменении
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
    } catch {
      /* игнорируем */
    }
  }, [checked, hydrated]);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => setChecked(new Set());
  const doneCount = checked.size;
  const progress = Math.round((doneCount / ALL_IDS.length) * 100);

  return (
    <section id="packing" className="relative bg-ink-soft px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Сборы"
          title="Что закинуть в багажник"
          intro="Отмечай галочками — список запомнится в браузере и будет ждать тебя перед выездом. Можно собираться постепенно."
        />

        {/* Прогресс */}
        <Reveal className="mt-10" delay={0.05}>
          <div className="rounded-2xl border border-hairline bg-ink-card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-paper">
                Собрано:{" "}
                <span className="tnum text-ember">
                  {doneCount} из {ALL_IDS.length}
                </span>
              </span>
              {doneCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs text-muted underline-offset-2 transition-colors hover:text-ember hover:underline"
                >
                  сбросить
                </button>
              )}
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-soft">
              <motion.div
                className="h-full rounded-full bg-ember"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            {progress === 100 && (
              <p className="mt-3 text-sm font-semibold text-pine">
                Всё собрано. Можно ехать.
              </p>
            )}
          </div>
        </Reveal>

        {/* Группы */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {CHECKLIST.map((group, gi) => (
            <Reveal key={group.group} delay={0.05 + gi * 0.05}>
              <div className="h-full rounded-2xl border border-hairline bg-ink-card p-5 sm:p-6">
                <h3 className="font-display text-lg font-medium text-paper">
                  {group.group}
                </h3>
                <ul className="mt-3 space-y-1">
                  {group.items.map((item) => {
                    const isChecked = checked.has(item.id);
                    return (
                      <li key={item.id}>
                        <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-ink-soft">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggle(item.id)}
                            className="sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                              isChecked
                                ? "border-ember bg-ember text-ink"
                                : "border-hairline-strong"
                            }`}
                          >
                            {isChecked && (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M20 6 9 17l-5-5" />
                              </svg>
                            )}
                          </span>
                          <span className="flex-1">
                            <span
                              className={`text-sm transition-colors ${
                                isChecked
                                  ? "text-muted line-through"
                                  : "text-paper"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.hint && (
                              <span className="block text-xs text-muted/70">
                                {item.hint}
                              </span>
                            )}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
