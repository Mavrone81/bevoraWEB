"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { navLinks as defaultNavLinks } from "@/lib/site";

export function Header({ navLinks = defaultNavLinks }: { navLinks?: { label: string; href: string }[] }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(255,255,255,.82)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--border-subtle)" : "transparent"}`,
        transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
      }}
    >
      <div className="bv-header-bar">
        <Logo />
        <nav className="bv-desktop-nav" aria-label="Primary">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14.5,
                  color: active ? "var(--text-primary)" : "var(--text-secondary)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="bv-desktop-nav">
          <Button variant="accent" size="sm" iconRight={<ArrowRight size={16} />} onClick={() => router.push("/contact")} style={{ whiteSpace: "nowrap" }}>
            Free assessment
          </Button>
        </div>
        <div className="bv-mobile-nav" style={{ marginLeft: "auto" }}>
          <IconButton variant="ghost" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </IconButton>
        </div>
      </div>

      {open && (
        <div
          className="bv-mobile-nav"
          style={{
            padding: "0 var(--gutter) 18px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            background: "rgba(255,255,255,.96)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "12px 0",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                color: "var(--text-primary)",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: 12 }}>
            <Button variant="accent" fullWidth iconRight={<ArrowRight size={18} />} onClick={() => router.push("/contact")}>
              Get a free assessment
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
