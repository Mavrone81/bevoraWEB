import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case study", plural: "Case studies" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "client", "status", "publishedAt"],
    description: "Client case studies & project showcases.",
  },
  access: {
    read: () => true,
  },
  defaultSort: "-publishedAt",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL slug, e.g. 'acme-cloud-migration'." },
    },
    { name: "client", type: "text", admin: { description: "Client / company name." } },
    { name: "summary", type: "textarea", admin: { description: "Short summary for cards." } },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "content", type: "richText" },
    {
      name: "results",
      type: "array",
      labels: { singular: "Result", plural: "Results" },
      admin: { description: "Headline outcomes, e.g. value '40%' label 'Faster onboarding'." },
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
  ],
};
