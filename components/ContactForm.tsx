"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Mail } from "lucide-react";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { Select } from "@/components/forms/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { serviceOptions as defaultServiceOptions } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({ serviceOptions = defaultServiceOptions }: { serviceOptions?: string[] }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    service: serviceOptions[0],
    message: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate(): boolean {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) next.email = "We need an email to reply.";
    else if (!emailRe.test(form.email)) next.email = "That email doesn't look right.";
    if (form.message.trim().length < 10) next.message = "A sentence or two helps us prepare.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setForm({ name: "", email: "", company: "", service: serviceOptions[0], message: "" });
    setErrors({});
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "12px 0" }}>
        <Alert tone="success" title="Thanks — we'll be in touch">
          An engineer will reply within one business day to schedule your assessment.
        </Alert>
        <Button variant="secondary" onClick={reset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {status === "error" && (
        <Alert tone="danger" title="That didn't go through">
          Something went wrong sending your message. Please try again, or email us directly.
        </Alert>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="bv-form-row">
        <Input label="Name" placeholder="Your name" value={form.name} onChange={set("name")} error={errors.name} required />
        <Input
          label="Work email"
          type="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
          iconLeft={<Mail size={16} />}
          required
        />
      </div>
      <Input label="Company" placeholder="Company name" value={form.company} onChange={set("company")} />
      <Select label="What can we help with?" value={form.service} onChange={set("service")} options={serviceOptions} />
      <Textarea
        label="Tell us a little more"
        rows={3}
        placeholder="A sentence or two about your setup…"
        value={form.message}
        onChange={set("message")}
        error={errors.message}
      />
      <Button type="submit" variant="accent" size="lg" fullWidth disabled={status === "sending"} iconRight={<ArrowRight size={18} />}>
        {status === "sending" ? "Sending…" : "Request my free assessment"}
      </Button>
    </form>
  );
}
