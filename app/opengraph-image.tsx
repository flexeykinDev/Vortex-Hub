import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          background: "#0b0c0f",
          color: "#edeef0",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 64 64">
          <rect width="64" height="64" rx="14" fill="#14161b" />
          <g fill="none" stroke="#34d399" strokeLinecap="round">
            <path
              d="M32 8 A24 24 0 1 1 8.6 24"
              strokeWidth="5"
              opacity="0.35"
            />
            <path
              d="M32 16 A16 16 0 1 1 16.6 27"
              strokeWidth="5"
              opacity="0.65"
            />
            <path d="M32 24 A8 8 0 1 1 24.7 29.5" strokeWidth="5" />
          </g>
          <circle cx="32" cy="32" r="3.2" fill="#34d399" />
        </svg>
        <div style={{ fontSize: 76, fontWeight: 700 }}>Vortex Info</div>
        <div style={{ fontSize: 32, color: "#9096a3" }}>
          Полезные инструменты и рандомайзер перков Dead by Daylight
        </div>
      </div>
    ),
    { ...size },
  );
}
