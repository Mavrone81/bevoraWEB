Display & content primitives.

```jsx
<Card interactive accent>
  <Badge tone="gold" solid>Managed IT</Badge>
  <Stat value="99.98%" label="Uptime" caption="Trailing 12 months" />
</Card>
<Tag onRemove={fn}>Microsoft 365</Tag>
<Avatar name="Wei Lim" size="lg" />
<Alert tone="success" title="Backup complete">All endpoints synced.</Alert>
```

`Card` (interactive lift, accent gold top-rule) · `Badge` (tone + solid) ·
`Tag` (removable chip) · `Avatar` (image/initials) · `Stat` (mono metric) ·
`Alert` (success/warning/danger/info).
