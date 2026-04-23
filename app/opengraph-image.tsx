import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.brand} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadLogoDataUri(): Promise<string | null> {
  try {
    const buf = await readFile(path.join(process.cwd(), "public", "logo.png"));
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OG() {
  const logo = await loadLogoDataUri();

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
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {logo ? (
            <div
              style={{
                display: "flex",
                background: "#ffffff",
                padding: "22px 32px",
                borderRadius: 18,
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src={logo} width={340} height={78} style={{ display: "block" }} />
            </div>
          ) : (
            <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: -2 }}>FB CORP</div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            {`Roofing, HVAC & Plumbing rebuilds across ${site.primaryCity}.`}
          </div>
          <div style={{ fontSize: 28, fontWeight: 500, opacity: 0.92 }}>
            {"Free 24-hour quote · Licensed & insured · Rated 4.9/5 on Google"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
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
