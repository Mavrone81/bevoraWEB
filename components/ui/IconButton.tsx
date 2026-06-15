"use client";

import React from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  "aria-label": string;
}

/** Square icon-only button. Pass a Lucide icon (or any node) as the child. */
export function IconButton({
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  style = {},
  ...rest
}: IconButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const dim = { sm: 36, md: 44, lg: 54 }[size] || 44;

  const palettes: Record<Variant, { bg: string; fg: string; border: string }> = {
    primary: { bg: hover ? "var(--neutral-800)" : "var(--neutral-900)", fg: "#fff", border: "transparent" },
    accent: { bg: hover ? "var(--accent-hover)" : "var(--accent)", fg: "var(--text-on-gold)", border: "transparent" },
    secondary: { bg: hover ? "var(--bg-subtle)" : "var(--surface-card)", fg: "var(--text-primary)", border: hover ? "var(--border-strong)" : "var(--border-default)" },
    ghost: { bg: hover ? "var(--bg-subtle)" : "transparent", fg: "var(--text-secondary)", border: "transparent" },
  };
  const p = palettes[variant] || palettes.secondary;

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dim,
        height: dim,
        color: p.fg,
        background: p.bg,
        border: `1.5px solid ${p.border}`,
        borderRadius: "var(--radius-md)",
        boxShadow: focus ? "var(--ring)" : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        outline: "none",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
