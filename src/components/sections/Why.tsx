"use client";

import { PhotoSlot } from "../PhotoSlot";
import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import { REASONS } from "@/content/misc";

/**
 * «Зачем мы туда» — карточки-аргументы (см. REASONS в content/misc.ts).
 * Первая карточка крупная (занимает 2 колонки), остальные обычные —
 * асимметричный editorial-грид.
 */

// Числительное по количеству карточек — чтобы заголовок не расходился с данными
const COUNT_WORD: Record<number, string> = {
  4: "Четыре",
  5: "Пять",
  6: "Шесть",
  7: "Семь",
};

export function Why() {
  const [lead, ...rest] = REASONS;
  const countWord = COUNT_WORD[REASONS.length] ?? String(REASONS.length);

  return (
    <section id="why" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Зачем вообще ехать"
          title={
            <>
              {countWord} причин сказать{" "}
              <span className="italic text-ember">«да»</span>
            </>
          }
          intro="Не «уникальная возможность» и не «незабываемое путешествие». Просто конкретные вещи, ради которых стоит потратить отпуск именно так."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Крупная ведущая карточка */}
          <StaggerItem
            as="article"
            className="group sm:col-span-2 lg:row-span-2"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ink-card transition-all duration-300 hover:-translate-y-1 hover:border-ember/40 hover:shadow-2xl hover:shadow-black/40">
              <PhotoSlot
                caption={lead.photo}
                photos={lead.photos}
                className="h-64 w-full lg:h-[22rem]"
              />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl font-medium text-paper lg:text-3xl">
                  {lead.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {lead.text}
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* Остальные карточки */}
          {rest.map((reason) => (
            <StaggerItem key={reason.id} as="article" className="group">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ink-soft transition-all duration-300 hover:-translate-y-1 hover:border-ember/40 hover:shadow-xl hover:shadow-black/40">
                <PhotoSlot
                  caption={reason.photo}
                  photos={reason.photos}
                  className="h-40 w-full"
                  compact
                />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-medium leading-snug text-paper">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {reason.text}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
