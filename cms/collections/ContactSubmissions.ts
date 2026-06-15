import type { CollectionConfig } from "payload";

// Leads captured from the public contact form. Created by the /api/contact
// route via the Payload local API; viewed/triaged by admins in the dashboard.
export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: { singular: "Contact submission", plural: "Contact submissions" },
  admin: {
    useAsTitle: "name",
    group: "Inbox",
    defaultColumns: ["name", "email", "service", "handled", "createdAt"],
    description: "Messages sent through the website contact form.",
  },
  access: {
    // Submissions are created server-side via the local API (overrideAccess).
    // Reading/triage is admin-only.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", admin: { readOnly: true } },
    { name: "email", type: "email", admin: { readOnly: true } },
    { name: "company", type: "text", admin: { readOnly: true } },
    { name: "service", type: "text", admin: { readOnly: true } },
    { name: "message", type: "textarea", admin: { readOnly: true } },
    {
      name: "handled",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Tick once this lead has been followed up." },
    },
  ],
};
