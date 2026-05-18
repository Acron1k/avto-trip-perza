"use client";

import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { DayCard } from "../DayCard";
import { DAYS } from "@/content/trip";

/**
 * «По дням» — главная секция: вертикальный таймлайн из 12 карточек.
 * В конце — блок Plan B (щадящий вариант маршрута).
 */

export function Itinerary() {
  return (
    <section id="days" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="День за днём"
          title={
            <>
              12 дней, расписанных{" "}
              <span className="italic text-ember">по-человечески</span>
            </>
          }
          intro="Без таблиц и расписаний по минутам. У каждого дня — что происходит, сколько ехать и где спим. Хочешь больше — раскрывай «по желанию рядом»."
        />

        <div className="mt-14">
          {DAYS.map((day, i) => (
            <DayCard key={day.n} day={day} isLast={i === DAYS.length - 1} />
          ))}
        </div>

        {/* Plan B */}
        <Reveal className="mt-6" delay={0.1}>
          <div className="rounded-2xl border border-pine/40 bg-pine/[0.07] p-6 sm:p-8">
            <p className="eyebrow text-pine">Запасной вариант</p>
            <h3 className="font-display mt-3 text-xl font-medium text-paper sm:text-2xl">
              Plan B — если хочется помягче
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Если 12-й день кажется слишком жёстким, маршрут легко смягчить.
              Убираем Джилы-Су на 9-й день и в этот же день переезжаем в Архыз.
              Тогда Софийские озёра остаются на 10-е, а 11–12 числа — это два
              спокойных дня дороги домой с ночёвкой, без марш-броска. Решаем
              группой по ходу — программа гибкая.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
