"use client";

import { useEffect, useState } from "react";
import { TRIP } from "@/content/trip";

/**
 * Таймер обратного отсчёта до старта поездки.
 * Считает на клиенте — до монтирования показывает прочерки, чтобы
 * не было рассинхрона SSR / клиента.
 */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "дней" },
  { key: "hours", label: "часов" },
  { key: "minutes", label: "минут" },
  { key: "seconds", label: "секунд" },
];

export function Countdown() {
  const target = new Date(`${TRIP.startDate}T06:00:00+05:00`).getTime();
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-3">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex min-w-[68px] flex-col items-center rounded-xl border border-hairline bg-ink-card px-3 py-3 sm:min-w-[92px] sm:px-5 sm:py-4"
        >
          <span className="font-display tnum text-3xl font-semibold text-ember sm:text-5xl">
            {time ? String(time[unit.key]).padStart(2, "0") : "--"}
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-muted sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
