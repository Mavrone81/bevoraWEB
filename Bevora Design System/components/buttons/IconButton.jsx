import React from "react";

/**
 * Square icon-only button. Pair with a Lucide <i data-lucide> glyph or
 * any SVG child. Variants mirror Button; sizes sm | md | lg.
 */
export function IconButton({
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const dim = { sm: 36, md: 44, lg: 54 }[size] || 44;

  const palettes = {
    primary: { bg: hover ? "var(--neutral-800)" : "var(--neutral-900)", fg: "#fff", border: "transparent" },
    accent: { bg: hover ? "var(--accent-hover)" : "var(--accent)", fg: "var(--text-on-gold)", border: "transparent" },
    secondary: { bg: hover ? "var(--bg-subtle)" : "var(--surface-card)", fg: "var(--text-primary)", border: hover ? "var(--border-strong)" : "var(--border-default)" },
    ghost: { bg: hover ? "var(--bg-subtle)" : "transparent", fg: "var(--text-secondary)", border: "transparent" },
  };
  const p = palettes[variant] || palettes.secondary;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
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
