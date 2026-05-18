"use client";

import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

/**
 * Фото-слот.
 *
 * Один компонент покрывает три состояния:
 *  1. Фото нет (`photos` пуст) — рисуется плейсхолдер «нужно фото: …».
 *     Это поведение из брифа: где фото не нашлось, остаётся подсказка.
 *  2. Одно фото — изображение во весь слот, клик открывает крупно.
 *  3. Несколько фото одного объекта — слайдер со стрелками и точками,
 *     клик по кадру открывает его в полноэкранном просмотре (lightbox).
 *
 * Как добавлять фото — см. README.md, раздел «Как добавить фото».
 */

interface PhotoSlotProps {
  /** Подпись «нужно фото: что искать» — показывается в плейсхолдере, всегда alt */
  caption: string;
  /**
   * Пути к фото в `public/`, например ["/photos/elbrus-1.jpg", ...].
   * Пусто или не задано — рендерится плейсхолдер.
   */
  photos?: string[];
  /** Поисковый запрос для плейсхолдера (по желанию) */
  search?: string;
  className?: string;
  /** CSS aspect-ratio, например "16 / 9" */
  ratio?: string;
  /** Размер иконки/подписи: компактный для мелких карточек */
  compact?: boolean;
}

export function PhotoSlot({
  caption,
  photos,
  search,
  className = "",
  ratio,
  compact = false,
}: PhotoSlotProps) {
  const style: CSSProperties = ratio ? { aspectRatio: ratio } : {};
  const hasPhotos = Array.isArray(photos) && photos.length > 0;

  if (hasPhotos) {
    return (
      <PhotoCarousel
        photos={photos!}
        caption={caption}
        className={className}
        style={style}
        compact={compact}
      />
    );
  }

  return (
    <div
      className={`photo-slot ${className}`}
      style={style}
      role="img"
      aria-label={caption}
    >
      <div
        className={`relative z-10 max-w-[88%] text-center ${
          compact ? "px-3" : "px-6"
        }`}
      >
        <svg
          className={`mx-auto mb-3 text-ember/70 ${
            compact ? "h-6 w-6" : "h-9 w-9"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 17l5-7 4 5 3-4 6 6" />
          <path d="M3 21h18" />
          <circle cx="8.5" cy="7.5" r="1.6" />
        </svg>
        <p
          className={`font-sans font-semibold uppercase tracking-wider text-ember ${
            compact ? "text-[0.6rem]" : "text-[0.68rem]"
          }`}
        >
          нужно фото
        </p>
        <p
          className={`mt-1 text-muted ${
            compact ? "text-[0.72rem] leading-snug" : "text-sm leading-snug"
          }`}
        >
          {caption.replace(/^нужно фото:\s*/i, "")}
        </p>
        {search && !compact && (
          <p className="mt-2 font-mono text-[0.68rem] text-muted/70">
            поиск: {search}
          </p>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Слайдер фото одного объекта
// ──────────────────────────────────────────────────────────────────────────

function PhotoCarousel({
  photos,
  caption,
  className,
  style,
  compact,
}: {
  photos: string[];
  caption: string;
  className: string;
  style: CSSProperties;
  compact: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const multiple = photos.length > 1;

  const clamp = useCallback(
    (i: number) => (i + photos.length) % photos.length,
    [photos.length],
  );
  const go = useCallback(
    (dir: number) => setIndex((i) => clamp(i + dir)),
    [clamp],
  );

  return (
    <>
      <div
        className={`group/photo relative overflow-hidden bg-ink ${className}`}
        style={style}
      >
        {/* Кадры */}
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightbox(true)}
            aria-label={`Открыть фото крупно: ${caption}`}
            tabIndex={i === index ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === index
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={caption}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </button>
        ))}

        {/* Иконка «увеличить» */}
        <span
          className={`pointer-events-none absolute right-2.5 top-2.5 z-20 flex items-center justify-center rounded-full bg-ink/70 text-paper opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/photo:opacity-100 ${
            compact ? "h-7 w-7" : "h-8 w-8"
          }`}
          aria-hidden="true"
        >
          <svg
            width={compact ? 13 : 15}
            height={compact ? 13 : 15}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </span>

        {multiple && (
          <>
            {/* Стрелки */}
            <CarouselArrow
              dir="prev"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              compact={compact}
            />
            <CarouselArrow
              dir="next"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              compact={compact}
            />

            {/* Точки */}
            <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  aria-label={`Фото ${i + 1} из ${photos.length}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === index
                      ? "w-5 bg-ember"
                      : "w-1.5 bg-paper/50 hover:bg-paper/80"
                  }`}
                />
              ))}
            </div>

            {/* Счётчик */}
            <span className="absolute left-2.5 top-2.5 z-20 rounded-full bg-ink/70 px-2 py-0.5 text-[0.65rem] font-semibold text-paper backdrop-blur-sm">
              {index + 1}/{photos.length}
            </span>
          </>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            photos={photos}
            index={index}
            caption={caption}
            onIndexChange={setIndex}
            onClose={() => setLightbox(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function CarouselArrow({
  dir,
  onClick,
  compact,
}: {
  dir: "prev" | "next";
  onClick: (e: React.MouseEvent) => void;
  compact: boolean;
}) {
  const isPrev = dir === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? "Предыдущее фото" : "Следующее фото"}
      className={`absolute top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-paper opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-ink/90 group-hover/photo:opacity-100 focus-visible:opacity-100 ${
        isPrev ? "left-2" : "right-2"
      } ${compact ? "h-7 w-7" : "h-9 w-9"}`}
    >
      <svg
        width={compact ? 15 : 18}
        height={compact ? 15 : 18}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={isPrev ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
      </svg>
    </button>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Lightbox — полноэкранный просмотр
// ──────────────────────────────────────────────────────────────────────────

function Lightbox({
  photos,
  index,
  caption,
  onIndexChange,
  onClose,
}: {
  photos: string[];
  index: number;
  caption: string;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const multiple = photos.length > 1;

  const step = useCallback(
    (dir: number) =>
      onIndexChange((index + dir + photos.length) % photos.length),
    [index, photos.length, onIndexChange],
  );

  // Портал монтируется только на клиенте
  useEffect(() => setMounted(true), []);

  // Клавиатура: Esc закрывает, стрелки листают
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (multiple && e.key === "ArrowLeft") step(-1);
      if (multiple && e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [multiple, step, onClose]);

  // Блокируем скролл фона, пока открыт lightbox
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
    >
      {/* Закрыть */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-ink-card text-paper transition-colors hover:bg-ember hover:text-ink"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Кадр */}
      <motion.div
        key={photos[index]}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[88vh] max-w-[92vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt={caption}
          width={1600}
          height={1067}
          sizes="92vw"
          className="h-auto max-h-[88vh] w-auto rounded-lg object-contain"
        />
      </motion.div>

      {/* Стрелки */}
      {multiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Предыдущее фото"
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink-card/90 text-paper transition-colors hover:bg-ember hover:text-ink sm:left-6"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Следующее фото"
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink-card/90 text-paper transition-colors hover:bg-ember hover:text-ink sm:right-6"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Подпись и счётчик */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 px-6 text-center">
        {multiple && (
          <span className="rounded-full bg-ink-card/90 px-3 py-1 text-xs font-semibold text-ember">
            {index + 1} / {photos.length}
          </span>
        )}
        <p className="max-w-xl text-sm text-paper/80">{caption}</p>
      </div>
    </motion.div>,
    document.body,
  );
}
