"use client";

import React from "react";

/**
 * Fades + lifts children into view on scroll. Respects prefers-reduced-motion
 * (the CSS short-circuits the animation). Renders a div wrapper.
 */
export function Reveal({
  children,
  delay = 0,
  style = {},
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bv-reveal${visible ? " is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
