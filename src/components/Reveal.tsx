"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Обёртка для появления секций при скролле: fade-in + лёгкий slide-up.
 * Уважает prefers-reduced-motion автоматически (Framer Motion).
 */

interface RevealProps {
  children: ReactNode;
  /** Задержка в секундах — для стаггера соседних элементов */
  delay?: number;
  /** Насколько сдвигать снизу, px */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}

const buildVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
});

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={buildVariants(y)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Контейнер для стаггер-анимации списка дочерних Reveal-элементов.
 * Дочерние элементы должны использовать <StaggerItem>.
 */
export function Stagger({
  children,
  className,
  gap = 0.09,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        visible: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={buildVariants(y)}>
      {children}
    </MotionTag>
  );
}
