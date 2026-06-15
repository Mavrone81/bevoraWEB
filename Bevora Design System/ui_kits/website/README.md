# Bevora marketing website — UI kit

A high-fidelity recreation of the **Bevora** (BevoraSG.com) marketing home page,
composed entirely from the design-system components and tokens.

> **Note:** the source repo (`Mavrone81/bevoraWEB`) was empty at build time, so
> this kit is an *original on-brand interpretation* of an IT-services marketing
> site — not a copy of a shipped Bevora page. Re-derive against the real site
> when code is available.

## Run it
Open `index.html`. It loads React UMD + Babel, the compiled `_ds_bundle.js`
(two levels up), Lucide icons, then the section scripts.

## Files
| File | Sections |
|---|---|
| `header-hero.jsx` | `Logo`, `Header` (sticky, blur-on-scroll, mobile menu), `Hero` (ink gradient + live-monitoring `StatusPanel`) |
| `sections.jsx` | `TrustBar`, `Services` (6 `ServiceCard`s), `StatsBand` (dark proof band), `WhyBevora` (checklist + mascot panel) |
| `contact-footer.jsx` | `Contact` (working fake form → success `Alert`), `Footer` |
| `app.jsx` | Composition + Lucide bootstrap |

## Interactions
- Sticky header turns translucent/blurred past 12px scroll.
- Mobile (<880px): hamburger toggles the nav; grids collapse to one column.
- Contact form submits to an inline success state (no network).

## Components used
`Button`, `IconButton`, `Badge`, `SectionHeading`, `ServiceCard`, `Input`,
`Textarea`, `Select`, `Alert` — all from `window.BevoraDesignSystem_cc741a`.
