import { ImageResponse } from "next/og";

/**
 * Динамическая OG-картинка для превью в мессенджерах.
 * Рисуется кодом — не зависит от готовых фото.
 * Доступна по /og, подключена в metadata (layout.tsx).
 */

export const runtime = "edge";

// Размер OG-картинки — локальная константа (в route handler нельзя
// экспортировать произвольные значения, кроме самих HTTP-методов).
const SIZE = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(160deg, #0c1a27 0%, #11242f 55%, #16303d 100%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Силуэт гор внизу */}
        <svg
          width="1200"
          height="320"
          viewBox="0 0 1200 320"
          style={{ position: "absolute", left: 0, bottom: 0 }}
        >
          <path
            d="M0 320 L160 130 L300 250 L460 60 L600 220 L760 110 L920 240 L1080 90 L1200 200 L1200 320 Z"
            fill="#16303d"
          />
          <path
            d="M0 320 L220 200 L420 280 L640 160 L860 270 L1080 180 L1200 260 L1200 320 Z"
            fill="#1d3a47"
          />
          <path d="M420 60 L445 105 L395 105 Z" fill="#f3eee3" />
          <path d="M1080 90 L1108 140 L1052 140 Z" fill="#f3eee3" />
        </svg>

        {/* Верхняя метка */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 6,
            color: "#e8794a",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          1—12 июля 2026 · автопутешествие
        </div>

        {/* Заголовок */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 2 }}>
          <div
            style={{
              fontSize: 130,
              fontWeight: 700,
              color: "#f3eee3",
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            Кавказ. 2026.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 38,
              color: "#8aa0ad",
              maxWidth: 900,
            }}
          >
            Екатеринбург → Эльбрус → Архыз. 4900 км, 12 дней, три машины.
          </div>
        </div>

        {/* Нижняя строка цифр */}
        <div
          style={{
            display: "flex",
            gap: 48,
            fontSize: 30,
            color: "#f3eee3",
            zIndex: 2,
            fontWeight: 600,
          }}
        >
          <span>4900 км</span>
          <span style={{ color: "#4a8a73" }}>·</span>
          <span>12 дней</span>
          <span style={{ color: "#4a8a73" }}>·</span>
          <span>3 машины</span>
          <span style={{ color: "#4a8a73" }}>·</span>
          <span>8 своих людей</span>
        </div>
      </div>
    ),
    { ...SIZE },
  );
}
