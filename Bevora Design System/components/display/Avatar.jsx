import React from "react";

/** Avatar with image or initials fallback. sizes sm 32 | md 40 | lg 56. */
export function Avatar({ src, name = "", size = "md", style = {}, ...rest }) {
  const dim = { sm: 32, md: 40, lg: 56 }[size] || 40;
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div
      style={{
        width: dim, height: dim, flex: `0 0 ${dim}px`,
        borderRadius: "var(--radius-circle)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: dim * 0.38, color: "var(--text-on-gold)",
        background: src ? "var(--neutral-100)" : "var(--grad-gold-soft)",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
        overflow: "hidden", ...style,
      }}
      {...rest}
    >
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </div>
  );
}
