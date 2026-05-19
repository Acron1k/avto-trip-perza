"use client";

import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import { CARS } from "@/content/trip";

/**
 * «Машины и команда» — три экипажа.
 * Роли распределены условно — заказчик правит под себя (см. README).
 */

const ROLES = [
  { role: "Штурман маршрута", who: "следит за дорогой и точками" },
  { role: "Завхоз по броням", who: "отели и заброски заранее" },
  { role: "Министр топлива", who: "заправки и общий бензобюджет" },
  { role: "Хранитель плейлиста", who: "чтобы в дороге не молчали" },
];

export function Crew() {
  return (
    <section id="crew" className="relative bg-ink-soft px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Кто едет"
          title="Три машины, восемь своих"
          intro="Два Tenet T7 и гибридный Changan. Восемь человек, всем 27–35, без детей. В Чангане есть свободное место — если читаешь это и ещё не с нами, оно может быть твоим."
        />

        {/* Карточки машин */}
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {CARS.map((car, i) => (
            <StaggerItem key={car.id} as="article">
              <div className="flex h-full flex-col rounded-2xl border border-hairline bg-ink-card p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ember">
                    Машина {i + 1}
                  </span>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted"
                    aria-hidden="true"
                  >
                    <path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0 0V9l2-4h10l2 4v8M19 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3 9h18" />
                  </svg>
                </div>

                <h3 className="font-display mt-3 text-2xl font-medium text-paper">
                  {car.model}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {car.crew.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-hairline bg-ink-soft px-3 py-1 text-sm text-paper"
                    >
                      {name}
                    </span>
                  ))}
                  {Array.from({ length: car.freeSeats }).map((_, idx) => (
                    <span
                      key={`free-${idx}`}
                      className="rounded-full border border-dashed border-ember/50 px-3 py-1 text-sm text-ember"
                    >
                      свободно
                    </span>
                  ))}
                </div>

                <p className="mt-4 border-t border-hairline pt-3 text-xs text-muted">
                  Расход в расчёте бюджета —{" "}
                  <span className="font-semibold text-paper">
                    {car.consumption} л/100 км
                  </span>
                  {car.note ? `. ${car.note}` : ""}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Роли */}
        <Stagger className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" gap={0.06}>
          {ROLES.map((r) => (
            <StaggerItem key={r.role}>
              <div className="h-full rounded-xl border border-hairline bg-ink-card px-4 py-4">
                <p className="text-sm font-semibold text-paper">{r.role}</p>
                <p className="mt-1 text-xs text-muted">{r.who}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-4 text-xs text-muted/70">
          Роли — это шутка-памятка, разберём их на месте. Главное, чтобы
          плейлист был у того, у кого с музыкой всё в порядке.
        </p>
      </div>
    </section>
  );
}
