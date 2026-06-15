import React from "react";

/**
 * Bevora primary button. Variants: primary (ink), accent (gold),
 * secondary (outline), ghost, danger. Sizes: sm | md | lg.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focus, setFocus] = React.useState(false);

  const sizes = {
    sm: { padding: "0 14px", height: 36, fontSize: 13, gap: 7, radius: "var(--radius-md)" },
    md: { padding: "0 20px", height: 44, fontSize: 15, gap: 8, radius: "var(--radius-md)" },
    lg: { padding: "0 28px", height: 54, fontSize: 16, gap: 10, radius: "var(--radius-lg)" },
  };
  const s = sizes[size] || sizes.md;

  const palettes = {
    primary: {
      bg: hover ? "var(--neutral-800)" : "var(--neutral-900)",
      fg: "var(--text-inverse)",
      border: "transparent",
      shadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
    },
    accent: {
      bg: active ? "var(--accent-active)" : hover ? "var(--accent-hover)" : "var(--accent)",
      fg: "var(--text-on-gold)",
      border: "transparent",
      shadow: hover ? "var(--shadow-gold)" : "var(--shadow-sm)",
    },
    secondary: {
      bg: hover ? "var(--bg-subtle)" : "var(--surface-card)",
      fg: "var(--text-primary)",
      border: hover ? "var(--border-strong)" : "var(--border-default)",
      shadow: "none",
    },
    ghost: {
      bg: hover ? "var(--bg-subtle)" : "transparent",
      fg: "var(--text-primary)",
      border: "transparent",
      shadow: "none",
    },
    danger: {
      bg: hover ? "#9c3727" : "var(--danger-500)",
      fg: "#fff",
      border: "transparent",
      shadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
    },
  };
  const p = palettes[variant] || palettes.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : "auto",
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
        boxShadow: focus ? "var(--ring)" : p.shadow,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transform: active && !disabled ? "scale(0.98)" : "scale(1)",
        transition: "background var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
        outline: "none",
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
