# Bevora Design System

A brand & UI design system for **Bevora** (BevoraSG.com) — a Singapore-based
**IT services** company (managed IT, cloud, cybersecurity, and software
consulting). This system gives design agents everything needed to produce
on-brand interfaces, marketing pages, decks, and assets.

> **About the source material.** The attached repository
> [`github.com/Mavrone81/bevoraWEB`](https://github.com/Mavrone81/bevoraWEB)
> was **empty at build time** (no commits on `main`/`master`), so this system
> was derived from the **brand logo** the user supplied plus the stated
> direction: *"professional web for IT services… theme is greyish so it can be
> professional."* When real product code lands in `bevoraWEB`, re-run the
> system against it to lock components to the production source. Explore that
> repo further to refine fidelity.

---

## 1. What's in here (index / manifest)

| Path | What it is |
|---|---|
| `styles.css` | **Global entry point** — consumers link this one file. `@import`s only. |
| `tokens/colors.css` | Brand gold scale, warm-neutral greys, semantic status, gradients, aliases. |
| `tokens/typography.css` | Font stacks, type scale, weights, line-heights, tracking. |
| `tokens/spacing.css` | 4px spacing grid + layout containers. |
| `tokens/elevation.css` | Radii, borders, shadows, motion tokens. |
| `tokens/fonts.css` | Web-font `@import` (Sora · Manrope · JetBrains Mono — see §6). |
| `tokens/base.css` | Lightweight reset + element defaults + `.bv-kicker`. |
| `assets/` | Logo lockups, the gold "B" mark, and the beaver mascot. |
| `guidelines/` | Foundation specimen cards (Design System tab). |
| `components/` | Reusable React UI primitives (Button, Card, Input, Badge, …). |
| `ui_kits/website/` | High-fidelity recreation of the Bevora marketing site. |
| `templates/landing/` | Fill-in IT-services landing page (hero + services + CTA). |
| `SKILL.md` | Agent-Skill manifest for use in Claude Code. |

**Components:** Button, IconButton, Badge, Tag, Card, Input, Textarea, Select,
Checkbox, Switch, Avatar, Stat, Alert, ServiceCard, SectionHeading.
**UI kits:** Bevora marketing website (hero, services, stats, contact).

---

## 2. Brand at a glance

- **Name:** Bevora · **Web:** BevoraSG.com · **Sector:** IT services (SG).
- **Mark:** a bold **"B"** carved as negative space from a **gold-gradient
  circle** (espresso → goldenrod → bright gold). The negative-space
  construction is a core brand device.
- **Mascot:** a friendly, geometric **beaver** (newly designed here — see
  CAVEATS). The beaver nods to "industrious, builds things that last" — apt for
  an IT partner. Rendered in the same gold badge + cream negative-space style as
  the logo.
- **Personality:** dependable, precise, quietly premium. Gold says *quality*;
  warm greys say *serious infrastructure*.

---

## 3. Content fundamentals (voice & copy)

**Voice:** confident, plain-spoken, and reassuring — a senior engineer who
explains things without jargon. Bevora is the steady partner, not the loud
disruptor.

- **Person:** address the customer as **"you"**; refer to the company as
  **"we" / "Bevora."** ("We keep your systems running so you don't have to
  think about them.")
- **Casing:** **Sentence case** for headings and buttons ("Get a free
  assessment", not "Get A Free Assessment"). Reserve ALL-CAPS for short
  **eyebrow/kicker** labels above headings (e.g. `MANAGED IT`), tracked wide.
- **Sentence length:** short. Lead with the outcome, then the mechanism.
  *"Downtime costs money. We monitor your stack around the clock so issues are
  fixed before you notice them."*
- **Numbers & proof:** concrete and modest — uptime %, response time, years in
  service, devices managed. Avoid hype adjectives ("revolutionary",
  "cutting-edge"). Let the metric carry the weight.
- **CTAs:** action + value. "Book a consultation", "See our services", "Talk to
  an engineer". Never "Click here".
- **Emoji:** **none.** This is a B2B IT brand — emoji undercut the
  trust signal. Use the Lucide icon set instead (see §7).
- **Jargon:** name technologies when they build credibility (Microsoft 365,
  endpoint security, backup & DR), but always pair with the plain benefit.

**Example block**
> **Kicker:** CYBERSECURITY
> **H2:** Security that works while you sleep
> **Body:** We harden every endpoint, watch your network in real time, and
> respond the moment something looks wrong — so a threat never becomes an
> incident.
> **CTA:** Get a security review

---

## 4. Visual foundations

**Colour.** Two families. **Brand gold** — sampled directly from the mark —
runs from espresso `#2a2008` through goldenrod `#b8860b` (the core) to bright
gold `#cda42f`; used sparingly as the *signal* colour (accents, key CTAs,
highlights, the logo). **Warm-neutral greys** (`#faf9f7` → ink `#1a1917`) carry
~90% of every layout: backgrounds, text, borders, surfaces. The faint warmth in
the greys keeps them in the gold's family rather than clashing cool-blue.
Semantic status colours are **muted**, not neon (forest `#2e7d57`, amber
`#d98a0b`, brick `#b3402f`, slate-blue `#2f6f8f`).

**Type.** **Sora** for display/headings (geometric, techy, confident), **Manrope**
for UI and body (clean, friendly, highly legible), **JetBrains Mono** for
technical/metric text. Headings are tightly tracked (`--ls-tight`) and bold;
body is regular weight at 1.45 line-height. Eyebrows are uppercase, wide-tracked,
gold.

**Backgrounds.** Predominantly **flat warm-neutral surfaces** — white cards on a
`#faf9f7` page. The brand gradient (`--grad-gold`) and an ink gradient
(`--grad-ink`) appear only as **deliberate feature moments**: a hero panel, a
CTA band, the logo. No busy patterns, no full-bleed stock-photo gradients, no
purple/blue tech clichés. Optional very-subtle grid or dot texture at low
opacity over dark sections only.

**Corner radii.** Moderate and consistent — `10px` (md) for buttons/inputs,
`14–20px` for cards, pill (`999px`) for tags/badges. Nothing fully sharp,
nothing bubbly.

**Cards.** White surface, hairline `--border-subtle` border, `--shadow-sm` at
rest lifting to `--shadow-md` on hover, `14–20px` radius. Generous internal
padding (`--space-6`/`8`). Featured cards may carry a thin gold top-rule or
gold icon chip — never a coloured left-border-only accent.

**Borders.** 1px hairlines in warm grey do most structural work. On dark/ink
surfaces, borders are `rgba(255,255,255,.12)`.

**Shadows.** Soft, warm-tinted (`rgba(26,25,23,…)`), low-spread, layered (two
stacked shadows). Restraint is the rule — elevation steps are subtle. A single
**gold glow** (`--shadow-gold`) is reserved for the primary/accent CTA.

**Motion.** Quick and purposeful. `--dur-base` 200ms on `--ease-out` for hovers
and reveals; `--ease-spring` only for small playful affordances (e.g. the
mascot). Fades and short translate-ups (8–12px) for section reveals. No
bounces on UI chrome, no infinite loops. Respect `prefers-reduced-motion`.

**States.**
- *Hover:* darken gold one step (`--accent-hover`), lift shadow, or tint neutral
  surface to `--bg-subtle`.
- *Press/active:* darken another step (`--accent-active`) + subtle
  `scale(.98)`.
- *Focus:* 3px gold focus ring (`--ring` / `--focus-ring`) — always visible,
  never removed.
- *Disabled:* 45% opacity, no shadow, `not-allowed` cursor.

**Transparency & blur.** Used sparingly — a translucent sticky header
(`backdrop-filter: blur`) over content, and faint white sheen
(`--grad-sheen`) on dark panels. Never frosted-glass everything.

**Imagery vibe.** Warm, clean, real — server rooms, teams at work, devices —
with a faint warm grade so photos sit beside the gold. Avoid cold blue
"hacker" stock and literal lock/shield clip-art.

---

## 5. Spacing & layout

4px base grid (`--space-1` … `--space-32`). Section rhythm via `--section-y`
(`clamp(4rem, 9vw, 8rem)`). Content max-width `--container-lg` (1120px) with
`--gutter` side padding. Prefer flex/grid with `gap` over margins.

---

## 6. Type & font files

⚠ **Substitution flag.** No official Bevora typefaces were provided. The system
ships **Google Fonts** chosen to fit the brand: **Sora**, **Manrope**,
**JetBrains Mono**, loaded via `@import` in `tokens/fonts.css`. If Bevora has
licensed brand fonts, replace that `@import` with self-hosted `@font-face`
rules and update `--font-display` / `--font-sans` / `--font-mono`.

---

## 7. Iconography

⚠ **Substitution flag.** No icon set was found in the (empty) repo. The system
standardises on **[Lucide](https://lucide.dev)** — an open, professional,
consistent **stroke** icon family (1.75–2px stroke, rounded joints) that suits
a B2B IT brand. Load from CDN: `https://unpkg.com/lucide@latest`.

- **Style:** outline/stroke only — no filled or duotone icons in product chrome.
- **Stroke weight:** 1.75px default; 2px for large standalone feature icons.
- **Colour:** inherit `currentColor`; gold (`--accent`) only for the single
  emphasised icon in a feature card's chip.
- **Sizing:** 16 / 20 / 24px in UI; up to 32–40px for marketing feature chips.
- **Emoji / unicode as icons:** **never.** Use Lucide.
- Recommended glyphs for IT services: `shield-check`, `server`, `cloud`,
  `monitor`, `lock`, `cpu`, `network`, `life-buoy`, `zap`, `check`,
  `arrow-right`, `phone`, `mail`.

If/when the real codebase provides icons, copy them into `assets/icons/` and
replace the Lucide reference here.

---

## 8. Notes for builders

- Reference **semantic aliases** (`--text-primary`, `--surface-card`,
  `--accent`) in components, not raw scale values, so theming stays portable.
- Gold is a **signal**, not a wash — if everything is gold, nothing is.
- The negative-space construction (logo, mascot) is the brand's signature
  device; reuse it for badges and feature marks rather than inventing new ones.
