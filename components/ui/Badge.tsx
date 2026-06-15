import React from "react";

type Tone = "neutral" | "gold" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  solid?: boolean;
}

/** Small status pill. */
export function Badge({ children, tone = "neutral", solid = false, style = {}, ...rest }: BadgeProps) {
  const tones: Record<Tone, { soft: [string, string]; solid: [string, string] }> = {
    neutral: { soft: ["var(--neutral-100)", "var(--neutral-700)"], solid: ["var(--neutral-900)", "#fff"] },
    gold: { soft: ["var(--gold-50)", "var(--gold-700)"], solid: ["var(--accent)", "var(--text-on-gold)"] },
    success: { soft: ["var(--success-50)", "var(--success-500)"], solid: ["var(--success-500)", "#fff"] },
    warning: { soft: ["var(--warning-50)", "#9a6206"], solid: ["var(--warning-500)", "#fff"] },
    danger: { soft: ["var(--danger-50)", "var(--danger-500)"], solid: ["var(--danger-500)", "#fff"] },
    info: { soft: ["var(--info-50)", "var(--info-500)"], solid: ["var(--info-500)", "#fff"] },
  };
  const [bg, fg] = (tones[tone] || tones.neutral)[solid ? "solid" : "soft"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        height: 22,
        padding: "0 9px",
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: 11.5,
        letterSpacing: "0.01em",
        lineHeight: 1,
        color: fg,
        background: bg,
        borderRadius: "var(--radius-pill)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
