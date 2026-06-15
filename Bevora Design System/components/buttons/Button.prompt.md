Bevora button — the primary action control; use for any clickable command.

```jsx
<Button variant="accent" size="lg" iconRight={<i data-lucide="arrow-right"></i>}>
  Book a consultation
</Button>
```

Variants: `primary` (ink/charcoal — default app action), `accent` (gold — the
hero CTA, use once per view), `secondary` (outline), `ghost` (text-only),
`danger`. Sizes `sm | md | lg`. Props: `fullWidth`, `disabled`, `iconLeft`,
`iconRight`. Always sentence case ("Get a free assessment").

`IconButton` is the square icon-only sibling — pass `aria-label` and a Lucide
glyph child.
