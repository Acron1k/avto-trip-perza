import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Когда заказчик добавит фото через next/image — они автоматически
    // отдадутся в AVIF/WebP с нужными размерами под устройство.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
