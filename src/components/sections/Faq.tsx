"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { FAQ, BUY_SPOTS } from "@/content/misc";

/**
 * «FAQ» — закрытие страхов через аккордеон.
 * Снизу — мини-блок «Где что купить» (просьба заказчика про гибкость).
 */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Честные ответы"
          title={
            <>
              Вопросы, которые ты{" "}
              <span className="italic text-ember">всё равно задашь</span>
            </>
          }
          intro="Сразу отвечаем на то, из-за чего обычно тормозят с «да». Без приукрашивания — как есть."
        />

        {/* Аккордеон */}
        <Reveal className="mt-12" delay={0.05}>
          <div className="divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-ink-card">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-soft sm:px-7 sm:py-5"
                  >
                    <span className="font-display text-lg font-medium text-paper sm:text-xl">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ember/50 text-lg text-ember"
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-7 sm:pb-6 sm:text-base">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Где что купить */}
        <Reveal className="mt-16" delay={0.05}>
          <div className="rounded-2xl border border-hairline bg-ink-soft p-6 sm:p-8">
            <p className="eyebrow">Бонус</p>
            <h3 className="font-display mt-3 text-2xl font-medium text-paper">
              Где что купить и попробовать
            </h3>
            <p className="mt-2 text-sm text-muted">
              Чтобы вернуться домой не только с фотками. По одному адресу на
              регион — без беготни по рынкам.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {BUY_SPOTS.map((spot) => (
                <div
                  key={spot.place}
                  className="rounded-xl border-l-2 border-ember bg-ink-card px-4 py-4"
                >
                  <p className="text-sm font-semibold text-paper">
                    {spot.place}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {spot.what}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
