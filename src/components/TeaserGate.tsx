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
 * `teaser-blurred`, см. globals.css). Сайт при этом можно скроллить —
 * блюр только мешает читать детали. В левом верхнем углу плавает
 * компактная плашка с инструкцией отправить SMS и полем для кода;
 * её можно свернуть в маленькую кнопку, чтобы не загораживала контент.
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
  // Пока null — рендерим контент БЕЗ блюра и без плашки, чтобы не
  // мигало на тех, кто уже разблокировал.
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  // Плашка свёрнута в маленькую кнопку или развёрнута в карточку.
  const [open, setOpen] = useState(true);
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
        // pointer-events:none в .teaser-blurred блокирует клики по контенту,
        // но скролл страницы при этом работает.
        aria-hidden={locked || undefined}
      >
        {children}
      </div>

      {/* Рамка цвета фона перекрывает светлую кайму, которую blur()
          размывает по краям вьюпорта. Рендерится ВНЕ .teaser-blurred,
          поэтому сама не блюрится и не зависит от containing block. */}
      {locked && <div className="teaser-edge-mask" aria-hidden="true" />}

      {locked && (
        <div className="fixed left-3 top-3 z-[200] sm:left-5 sm:top-5">
          {open ? (
            <div className="w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-hairline-strong bg-ink-soft/95 shadow-2xl backdrop-blur-md">
              {/* акцентная полоса сверху */}
              <div className="h-1 w-full bg-ember" aria-hidden="true" />

              <div className="px-4 py-4 sm:px-5 sm:py-5">
                {/* шапка плашки: метка + кнопка свернуть */}
                <div className="flex items-start justify-between gap-3">
                  <p className="eyebrow">Закрытый показ</p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Свернуть плашку"
                    className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-muted transition-colors hover:text-paper"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                </div>

                <h2 className="font-display mt-1 text-xl font-semibold leading-tight text-paper">
                  Что-то готовится…
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Хочешь увидеть? Отправь SMS со словами{" "}
                  <span className="font-semibold text-ember">
                    «{SMS_TEXT}»
                  </span>{" "}
                  и введи код из ответа.
                </p>

                {/* кнопка отправки SMS */}
                <a
                  href={smsHref}
                  className="mt-3 inline-flex items-center gap-2 font-display text-base font-semibold text-paper transition-colors hover:text-ember"
                >
                  <svg
                    width="16"
                    height="16"
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

                {/* поле кода */}
                <form onSubmit={handleSubmit} className="mt-3">
                  <label htmlFor="teaser-code" className="sr-only">
                    Код из ответа
                  </label>
                  <div className="flex gap-2">
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
                      className="min-w-0 flex-1 rounded-lg border border-hairline-strong bg-ink px-3 py-2 text-paper outline-none transition-colors placeholder:text-muted/60 focus:border-ember"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-lg bg-ember px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ember-bright"
                    >
                      Открыть
                    </button>
                  </div>
                  {error && (
                    <p
                      id="teaser-error"
                      className="mt-2 text-sm text-ember-bright"
                    >
                      Код не подошёл. Проверь раскладку.
                    </p>
                  )}
                </form>
              </div>
            </div>
          ) : (
            // свёрнутое состояние — компактная кнопка-«ключ»
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-full border border-hairline-strong bg-ink-soft/95 px-4 py-2.5 text-sm font-semibold text-paper shadow-2xl backdrop-blur-md transition-colors hover:border-ember"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-ember"
              >
                <circle cx="7.5" cy="15.5" r="5.5" />
                <path d="m21 2-9.6 9.6" />
                <path d="m15.5 7.5 3 3L22 7l-3-3" />
              </svg>
              Снять блюр
            </button>
          )}
        </div>
      )}
    </>
  );
}
