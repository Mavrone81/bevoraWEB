import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: {
    group: "Content",
    description: "Company details, navigation, stats and the 'why' points shown across the site.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "collapsible",
      label: "Company",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "domain", type: "text" },
        { name: "url", type: "text", admin: { description: "Full site URL, e.g. https://www.bevorasg.com" } },
        { name: "tagline", type: "text" },
        { name: "description", type: "textarea" },
        { name: "email", type: "email" },
        { name: "phone", type: "text" },
        { name: "address", type: "text" },
      ],
    },
    {
      name: "navLinks",
      type: "array",
      label: "Navigation links",
      labels: { singular: "Link", plural: "Links" },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "proofStats",
      type: "array",
      label: "Proof stats",
      labels: { singular: "Stat", plural: "Stats" },
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
        { name: "caption", type: "text" },
      ],
    },
    {
      name: "whyPoints",
      type: "array",
      label: "Why Bevora points",
      labels: { singular: "Point", plural: "Points" },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "detail", type: "textarea", required: true },
      ],
    },
    {
      name: "serviceOptions",
      type: "array",
      label: "Contact form service options",
      labels: { singular: "Option", plural: "Options" },
      fields: [
        { name: "label", type: "text", required: true },
      ],
    },
  ],
};
