"use client";

import React from "react";
import Link from "next/link";

type Variant = "primary" | "accent" | "secondary";
type Size = "sm" | "md" | "lg";

export interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  style?: React.CSSProperties;
}

/** A next/link styled to match Button — for navigation (renders an anchor). */
export function LinkButton({ href, children, variant = "primary", size = "md", iconLeft, iconRight, style = {} }: LinkButtonProps) {
  const [hover, setHover] = React.useState(false);

  const sizes: Record<Size, { padding: string; height: number; fontSize: number; gap: number; radius: string }> = {
    sm: { padding: "0 14px", height: 36, fontSize: 13, gap: 7, radius: "var(--radius-md)" },
    md: { padding: "0 20px", height: 44, fontSize: 15, gap: 8, radius: "var(--radius-md)" },
    lg: { padding: "0 28px", height: 54, fontSize: 16, gap: 10, radius: "var(--radius-lg)" },
  };
  const s = sizes[size];

  const palettes: Record<Variant, { bg: string; fg: string; border: string; shadow: string }> = {
    primary: { bg: hover ? "var(--neutral-800)" : "var(--neutral-900)", fg: "var(--text-inverse)", border: "transparent", shadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)" },
    accent: { bg: hover ? "var(--accent-hover)" : "var(--accent)", fg: "var(--text-on-gold)", border: "transparent", shadow: hover ? "var(--shadow-gold)" : "var(--shadow-sm)" },
    secondary: { bg: hover ? "var(--bg-subtle)" : "var(--surface-card)", fg: "var(--text-primary)", border: hover ? "var(--border-strong)" : "var(--border-default)", shadow: "none" },
  };
  const p = palettes[variant];

  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: s.fontSize,
        letterSpacing: "-0.005em",
        lineHeight: 1,
        color: p.fg,
        background: p.bg,
        border: `1.5px solid ${p.border}`,
        borderRadius: s.radius,
        boxShadow: p.shadow,
        textDecoration: "none",
        transition: "background var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
        ...style,
      }}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Link>
  );
}
