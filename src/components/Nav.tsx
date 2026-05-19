"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

/**
 * Навигация — тонкая плашка, появляется после прокрутки первого экрана.
 * Якорные ссылки на десктопе; на мобиле скрыты — там работает скролл.
 */

const LINKS = [
  { href: "#why", label: "Зачем" },
  { href: "#route", label: "Маршрут" },
  { href: "#days", label: "По дням" },
  { href: "#gallery", label: "Локации" },
  { href: "#budget", label: "Бюджет" },
  { href: "#crew", label: "Команда" },
  { href: "#weather", label: "Погода" },
  { href: "#faq", label: "Вопросы" },
];

export function Nav() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setVisible(y > 600);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -70, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-ink/85 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
            <a
              href="#top"
              className="font-display text-base font-semibold text-paper transition-colors hover:text-ember"
            >
              Кавказ<span className="text-ember">·</span>2026
            </a>

            {/* Ссылки — скрыты на мобиле, там работает скролл-прокрутка */}
            <div className="hidden items-center gap-1 md:flex">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-ink-card hover:text-paper"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#final"
              className="rounded-full bg-ember px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ember-bright"
            >
              Едем?
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
