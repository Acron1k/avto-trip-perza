/**
 * Футер — короткий, без лишнего.
 */

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
        <p className="font-display text-lg text-paper">
          Кавказ<span className="text-ember">·</span>2026
        </p>
        <p className="text-xs text-muted">
          1—12 июля 2026 · Екатеринбург → Кавминводы → Эльбрус → Архыз
        </p>
        <p className="mt-2 text-[0.7rem] text-muted/60">
          Презентация поездки для своих. Цифры выверены в мае 2026 —
          перед выездом сверяемся ещё раз.
        </p>
      </div>
    </footer>
  );
}
