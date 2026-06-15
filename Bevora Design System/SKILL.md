---
name: bevora-design
description: Use this skill to generate well-branded interfaces and assets for Bevora (BevoraSG.com), an IT-services company, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Map
- `README.md` — brand context, content & visual foundations, iconography.
- `styles.css` → `tokens/*` — link `styles.css` for all CSS custom properties and fonts.
- `assets/` — `bevora-logo-square.png`, `bevora-mark.png` (transparent), `bevora-mascot.svg/.png` (beaver).
- `components/` — React primitives (Button, Card, Input, Badge, ServiceCard, …).
- `ui_kits/website/` — full marketing-site recreation to copy from.
- `templates/` — ready-to-fill starting pages.

## Brand essentials
- Gold (`--accent` `#b8860b`) is a **signal** colour; warm-neutral greys carry layouts.
- Sora (display) · Manrope (UI/body) · JetBrains Mono (metrics).
- Sentence case; "you/we"; **no emoji**; Lucide icons (stroke).
- Negative-space gold badge is the brand's signature device (logo + mascot).
