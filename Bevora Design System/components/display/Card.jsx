import React from "react";

/**
 * Surface container. interactive=true adds hover lift. accent=true adds a
 * gold top-rule for featured cards.
 */
export function Card({ children, interactive = false, accent = false, padding = "var(--space-6)", style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        position: "relative",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
        padding,
        transform: hover ? "translateY(-3px)" : "none",
        transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {accent && (
        <div style={{ position: "absolute", insetInline: 0, top: 0, height: 3, background: "var(--grad-gold-soft)" }} />
      )}
      {children}
    </div>
  );
}
