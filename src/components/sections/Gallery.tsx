"use client";

import { PhotoSlot } from "../PhotoSlot";
import { SectionHeading } from "../SectionHeading";
import { Stagger, StaggerItem } from "../Reveal";
import { GALLERY } from "@/content/gallery";

/**
 * «Что увидим» — галерея топ-локаций.
 * Грид 2 колонки на планшете, 3 на десктопе, 1 на мобиле.
 */

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-ink-soft px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Что увидим"
          title="Места, ради которых всё это"
          intro="Десять точек, которые останутся в голове и в телефоне. Половину из них друзья потом будут переспрашивать «это правда не фотошоп?»."
        />

        <Stagger
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.07}
        >
          {GALLERY.map((item) => (
            <StaggerItem key={item.id} as="article" className="group">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ink-card transition-all duration-300 hover:-translate-y-1.5 hover:border-ember/40 hover:shadow-2xl hover:shadow-black/50">
                <div className="relative">
                  <PhotoSlot
                    caption={item.photo}
                    photos={item.photos}
                    search={item.search}
                    className="h-52 w-full"
                    compact
                  />
                  {item.fact && (
                    <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-bold text-ember backdrop-blur-sm">
                      {item.fact}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted">
                    {item.region}
                  </p>
                  <h3 className="font-display mt-1 text-xl font-medium text-paper">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.text}
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
