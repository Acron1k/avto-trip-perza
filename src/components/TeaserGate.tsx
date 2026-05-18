"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

/**
 * Тизер-гейт.
 *
 * Оборачивает весь сайт: до ввода кода контент заблюрен (класс
 * `teaser-blurred`, см. globals.css), поверх висит плавающая модалка
 * с инструкцией отправить SMS и полем для кода.
 *
 * Это интрига для друзей, а НЕ защита: код лежит в бандле, заблюренный
 * текст виден в исходнике страницы. Для розыгрыша на вечере этого хватает.
 *
 * Как поменять код / номер / силу блюра — см. константы ниже и README.
 */

/** Код доступа. Регистр и пробелы игнорируются при сравнении. */
const ACCESS_CODE = "лето2026";

/** Номер для SMS, в международном формате без пробелов — для ссылки sms: */
const SMS_NUMBER = "+79824359315";
/** Тот же номер в читаемом виде — для показа на экране */
const SMS_NUMBER_HUMAN = "+7 982 435-93-15";
/** Текст SMS, который подставится в приложение сообщений */
const SMS_TEXT = "хочу посмотреть";

/** Ключ в localStorage — разблокировка запоминается между визитами */
const STORAGE_KEY = "kavkaz2026-unlocked";

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

export function TeaserGate({ children }: { children: React.ReactNode }) {
  // null — ещё не прочитали localStorage (SSR / первый кадр).
  // Пока null — рендерим контент БЕЗ блюра и без модалки, чтобы не
  // мигало на тех, кто уже разблокировал.
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Читаем сохранённое состояние только на клиенте
  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // приватный режим / отключённый storage — просто показываем гейт
      setUnlocked(false);
    }
  }, []);

  // Пока модалка видна — блокируем скролл фона
  useEffect(() => {
    if (unlocked === false) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [unlocked]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (normalize(code) === normalize(ACCESS_CODE)) {
        setError(false);
        setUnlocked(true);
        try {
          localStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // не критично — просто не запомнится между визитами
        }
      } else {
        setError(true);
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    },
    [code],
  );

  const locked = unlocked === false;
  const smsHref = `sms:${SMS_NUMBER}?body=${encodeURIComponent(SMS_TEXT)}`;

  return (
    <>
      <div
        className={locked ? "teaser-blurred" : undefined}
        // когда заблюрено — прячем от скринридеров, чтобы не зачитывали кашу.
        // pointer-events:none в .teaser-blurred блокирует клики по контенту.
        aria-hidden={locked || undefined}
      >
        {children}
      </div>

      {locked && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center px-5 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="teaser-title"
        >
          {/* затемнение поверх блюра — модалка читается чётко */}
          <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />

          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-hairline-strong bg-ink-soft shadow-2xl">
            {/* акцентная полоса сверху */}
            <div className="h-1 w-full bg-ember" aria-hidden="true" />

            <div className="px-6 py-7 sm:px-8 sm:py-9">
              <p className="eyebrow">Закрытый показ</p>

              <h2
                id="teaser-title"
                className="font-display mt-2 text-2xl font-semibold leading-tight text-paper sm:text-3xl"
              >
                Что-то готовится.
                <br />
                Хочешь увидеть?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                Этим летом мы кое-куда едем. Вся идея — за этим экраном.
                Чтобы снять блюр, напиши нам — пришлём код.
              </p>

              {/* Шаг 1 — отправить SMS */}
              <div className="mt-6 rounded-xl border border-hairline bg-ink-card px-4 py-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ember">
                  Шаг 1 — напиши нам
                </p>
                <p className="mt-2 text-sm text-paper">
                  Отправь SMS со словами{" "}
                  <span className="font-semibold text-ember">
                    «{SMS_TEXT}»
                  </span>{" "}
                  на номер:
                </p>
                <a
                  href={smsHref}
                  className="mt-2 inline-flex items-center gap-2 font-display text-lg font-semibold text-paper transition-colors hover:text-ember"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {SMS_NUMBER_HUMAN}
                </a>
                <p className="mt-1 text-xs text-muted">
                  С телефона ссылка откроет сообщения с готовым текстом.
                </p>
              </div>

              {/* Шаг 2 — ввести код */}
              <form onSubmit={handleSubmit} className="mt-4">
                <label
                  htmlFor="teaser-code"
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ember"
                >
                  Шаг 2 — введи код
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="teaser-code"
                    ref={inputRef}
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="код из ответа"
                    autoComplete="off"
                    aria-invalid={error}
                    aria-describedby={error ? "teaser-error" : undefined}
                    className="min-w-0 flex-1 rounded-lg border border-hairline-strong bg-ink px-3 py-2.5 text-paper outline-none transition-colors placeholder:text-muted/60 focus:border-ember"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-ember px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ember-bright"
                  >
                    Открыть
                  </button>
                </div>
                {error && (
                  <p
                    id="teaser-error"
                    className="mt-2 text-sm text-ember-bright"
                  >
                    Код не подошёл. Проверь раскладку и попробуй ещё раз.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
