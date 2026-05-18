import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Единый заголовок секции: надстрочная метка-капс + крупный засечковый H2.
 * Держит ритм всех секций одинаковым.
 */

interface SectionHeadingProps {
  /** Маленькая метка над заголовком (eyebrow) */
  eyebrow: string;
  /** Заголовок секции */
  title: ReactNode;
  /** Подзаголовок-описание */
  intro?: ReactNode;
  /** Выравнивание */
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`${isCenter ? "mx-auto text-center" : ""} ${
        isCenter ? "max-w-2xl" : "max-w-3xl"
      } ${className}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-4 text-[2.4rem] font-medium leading-[1.08] text-paper sm:text-5xl lg:text-[3.4rem]">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
