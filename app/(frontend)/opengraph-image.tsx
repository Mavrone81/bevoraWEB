import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Default social-share card (1200×630) used for every frontend route unless a
// page sets its own openGraph.images. Rendered with system fonts only so the
// build never needs to fetch a webfont.
export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #11151c 0%, #1b2230 60%, #2a2310 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #e8b14b, #b6822a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#11151c",
            }}
          >
            B
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#e8b14b",
            }}
          >
            Managed IT · Cloud · Cybersecurity
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", maxWidth: 900 }}>
            IT services that just work.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "rgba(255,255,255,0.72)", maxWidth: 880 }}>
            {site.description}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
          <span>{site.domain}</span>
          <span>·</span>
          <span>Singapore</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
