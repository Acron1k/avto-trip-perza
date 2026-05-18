import type { CSSProperties } from "react";

/**
 * Плейсхолдер для фотографии.
 *
 * Заказчик заменяет это на <Image> из next/image, когда появятся фото.
 * Подпись `caption` («нужно фото: …») остаётся как alt-текст.
 * Инструкция по замене — в README.md.
 */

interface PhotoSlotProps {
  /** Подпись «нужно фото: что искать» */
  caption: string;
  /** Поисковый запрос для Unsplash/Pexels (по желанию) */
  search?: string;
  className?: string;
  /** CSS aspect-ratio, например "16 / 9" */
  ratio?: string;
  /** Размер иконки/подписи: компактный для мелких карточек */
  compact?: boolean;
}

export function PhotoSlot({
  caption,
  search,
  className = "",
  ratio,
  compact = false,
}: PhotoSlotProps) {
  const style: CSSProperties = ratio ? { aspectRatio: ratio } : {};
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
