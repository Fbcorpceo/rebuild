import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.brand} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#ffffff",
          backgroundImage: "linear-gradient(135deg,#1e4dab 0%,#122d62 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <Crane />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: -2, lineHeight: 1 }}>
              FB CORP
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.85, marginTop: 6 }}>
              {site.productLine.toUpperCase()}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            Roofing, HVAC & Plumbing rebuilds across {site.primaryCity}.
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, opacity: 0.9 }}>
            Free 24-hour quote · Licensed & insured · 4.9★ on Google
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 600,
            opacity: 0.95,
            borderTop: "2px solid rgba(255,255,255,0.25)",
            paddingTop: 22,
          }}
        >
          <span>{site.domain}</span>
          <span>{site.phoneDisplay}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

function Crane() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="14" width="100" height="10" fill="#ffffff" />
      <rect x="6" y="24" width="14" height="68" fill="#ffffff" />
      <g stroke="#ffffff" strokeWidth="3">
        <line x1="20" y1="14" x2="36" y2="24" />
        <line x1="36" y1="14" x2="52" y2="24" />
        <line x1="52" y1="14" x2="68" y2="24" />
        <line x1="68" y1="14" x2="84" y2="24" />
        <line x1="84" y1="14" x2="100" y2="24" />
      </g>
      <rect x="76" y="24" width="3" height="44" fill="#ffffff" />
      <circle cx="77" cy="76" r="9" fill="none" stroke="#ffffff" strokeWidth="3" />
    </svg>
  );
}
