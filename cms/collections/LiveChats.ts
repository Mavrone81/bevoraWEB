import type { CollectionConfig } from "payload";

// A website chat session bridged to WhatsApp. The widget creates one when a
// visitor is handed to a human; visitor + staff messages are appended here and
// relayed via the WhatsApp Cloud API. `outboundIds` maps the WhatsApp message
// ids we sent to staff back to this session so their replies route correctly.
export const LiveChats: CollectionConfig = {
  slug: "live-chats",
  labels: { singular: "Live chat", plural: "Live chats" },
  admin: {
    useAsTitle: "sessionRef",
    group: "Inbox",
    defaultColumns: ["sessionRef", "visitorName", "status", "updatedAt"],
    description: "Website chats handed to a human and bridged to WhatsApp.",
  },
  access: {
    // Created/updated server-side via the local API; admins read/triage.
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  defaultSort: "-updatedAt",
  fields: [
    { name: "sessionId", type: "text", required: true, index: true, admin: { readOnly: true } },
    { name: "sessionRef", type: "text", admin: { readOnly: true, description: "Short ref shown to staff in WhatsApp." } },
    { name: "visitorName", type: "text", admin: { readOnly: true } },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Closed", value: "closed" },
      ],
    },
    {
      name: "outboundIds",
      type: "array",
      admin: { readOnly: true, description: "WhatsApp message ids sent to staff (for reply routing)." },
      fields: [{ name: "waId", type: "text" }],
    },
    {
      name: "messages",
      type: "array",
      admin: { readOnly: true },
      fields: [
        {
          name: "sender",
          type: "select",
          options: [
            { label: "Visitor", value: "visitor" },
            { label: "Staff", value: "staff" },
            { label: "System", value: "system" },
          ],
        },
        { name: "text", type: "textarea" },
        { name: "at", type: "text" },
      ],
    },
  ],
};
