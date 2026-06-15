import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "status", "publishedAt"],
    description: "Blog & news articles.",
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
      admin: { description: "URL slug, e.g. 'why-managed-it'." },
    },
    { name: "excerpt", type: "textarea", admin: { description: "Short summary for cards and previews." } },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "content", type: "richText" },
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
