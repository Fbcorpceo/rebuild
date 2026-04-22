import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getService, listServiceSlugs } from "@/lib/services";
import { site } from "@/lib/site";

export const runtime = "nodejs";
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

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  return [{ id: params.slug, alt: `${site.brand} ${s?.name ?? ""} in ${site.primaryCity}`, size, contentType }];
}

export function generateStaticParams() {
  return listServiceSlugs().map((slug) => ({ slug }));
}

export default async function ServiceOG({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) return new ImageResponse(<div />, size);
  const logo = await loadLogoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          color: "#ffffff",
          backgroundImage: "linear-gradient(135deg,#1e4dab 0%,#122d62 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {logo ? (
            <div
              style={{
                display: "flex",
                background: "#ffffff",
                padding: "14px 22px",
                borderRadius: 14,
                boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src={logo} width={240} height={55} style={{ display: "block" }} />
            </div>
          ) : (
            <div style={{ fontSize: 40, fontWeight: 900 }}>FB CORP</div>
          )}
          <div style={{ fontSize: 24, fontWeight: 600, opacity: 0.9 }}>
            {`${service.name.toUpperCase()} · ${site.primaryCity.toUpperCase()}`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 56 }}>
          <div style={{ fontSize: 70, fontWeight: 900, lineHeight: 1.05, maxWidth: 1000 }}>
            {service.h1.replaceAll("{{city}}", site.primaryCity)}
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, opacity: 0.95 }}>{service.offer}</div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {service.trustBadges.slice(0, 3).map((b) => (
            <div
              key={b}
              style={{
                fontSize: 22,
                fontWeight: 700,
                background: "rgba(255,255,255,0.15)",
                padding: "10px 18px",
                borderRadius: 999,
              }}
            >
              {b}
            </div>
          ))}
          <div style={{ marginLeft: "auto", fontSize: 28, fontWeight: 800 }}>{site.phoneDisplay}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
