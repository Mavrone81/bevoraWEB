import React from "react";

type Tone = "success" | "warning" | "danger" | "info";

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: Tone;
  title?: React.ReactNode;
}

/** Inline notification banner. */
export function Alert({ children, tone = "info", title, style = {}, ...rest }: AlertProps) {
  const tones: Record<Tone, [string, string]> = {
    success: ["var(--success-50)", "var(--success-500)"],
    warning: ["var(--warning-50)", "var(--warning-500)"],
    danger: ["var(--danger-50)", "var(--danger-500)"],
    info: ["var(--info-50)", "var(--info-500)"],
  };
  const [bg, accent] = tones[tone] || tones.info;
  return (
    <div
      role="status"
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 16px",
        background: bg,
        borderRadius: "var(--radius-md)",
        borderLeft: `3px solid ${accent}`,
        fontFamily: "var(--font-sans)",
        color: "var(--text-primary)",
        ...style,
      }}
      {...rest}
    >
      <span aria-hidden="true" style={{ width: 8, height: 8, marginTop: 7, borderRadius: "50%", background: accent, flex: "0 0 8px" }} />
      <div>
        {title && <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{title}</div>}
        <div style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>{children}</div>
      </div>
    </div>
  );
}
