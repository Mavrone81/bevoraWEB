Marketing-page building blocks.

```jsx
<SectionHeading kicker="What we do" title="IT that quietly works"
  subtitle="One partner for your infrastructure, security and support." align="center" />

<ServiceCard icon="shield-check" title="Cybersecurity" href="#">
  Endpoint hardening, real-time monitoring and rapid response.
</ServiceCard>
```

`SectionHeading` (kicker + title + subtitle, left/center) · `ServiceCard`
(gold Lucide icon chip + title + copy + hover-arrow link). Load Lucide and call
`lucide.createIcons()` after mount for string icon names.
