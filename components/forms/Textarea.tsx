"use client";

import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  wrapperStyle?: React.CSSProperties;
}

/** Multi-line text field with optional label, hint, and error. */
export function Textarea({ label, hint, error, id, wrapperStyle = {}, ...rest }: TextareaProps) {
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();
  const taId = id || reactId;
  const borderColor = error ? "var(--danger-500)" : focus ? "var(--accent)" : "var(--border-default)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...wrapperStyle }}>
      {label && (
        <label htmlFor={taId} style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13.5, color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <textarea
        id={taId}
        aria-invalid={error ? true : undefined}
        {...rest}
        onFocus={(e) => {
          setFocus(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocus(false);
          rest.onBlur?.(e);
        }}
        style={{
          width: "100%",
          padding: "12px 14px",
          background: "var(--surface-card)",
          border: `1.5px solid ${borderColor}`,
          borderRadius: "var(--radius-md)",
          boxShadow: focus ? "var(--ring)" : "none",
          outline: 0,
          resize: "vertical",
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          lineHeight: 1.5,
          color: "var(--text-primary)",
          transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        }}
      />
      {(hint || error) && (
        <span style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: error ? "var(--danger-500)" : "var(--text-tertiary)" }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
