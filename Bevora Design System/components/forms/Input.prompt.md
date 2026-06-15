Form controls — all controlled, all share the gold focus ring and 1.5px border.

```jsx
<Input label="Work email" iconLeft={<i data-lucide="mail"></i>} hint="We'll never share it." />
<Select label="Service" options={["Managed IT","Cloud","Cybersecurity"]} />
<Checkbox label="Send me the monthly briefing" checked={ok} onChange={e=>setOk(e.target.checked)} />
<Switch label="24/7 monitoring" checked={on} onChange={e=>setOn(e.target.checked)} />
```

`Input` / `Textarea` (label, hint, error, iconLeft) · `Select` (options as
strings or {value,label}) · `Checkbox` & `Switch` (controlled, gold accent).
