import { ImageResponse } from "next/og";
import { getService, listServiceSlugs } from "@/lib/services";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                letterSpacing: -1,
                background: "#ffffff",
                color: "#1e4dab",
                padding: "8px 16px",
                borderRadius: 10,
              }}
            >
              FB CORP
            </div>
            <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.9 }}>
              {service.name.toUpperCase()} · {site.primaryCity.toUpperCase()}
            </div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.9 }}>{site.domain}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 56 }}>
          <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05, maxWidth: 1000 }}>
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
          <div
            style={{
              marginLeft: "auto",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            {site.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
