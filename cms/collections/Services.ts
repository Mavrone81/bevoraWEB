import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "slug", "order"],
    description: "The IT services listed on the site. Order controls display order.",
  },
  access: {
    read: () => true,
  },
  defaultSort: "order",
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "URL-safe id, e.g. 'managed-it'. Used in /services#slug." },
    },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "lifebuoy",
      options: [
        { label: "Life buoy (support)", value: "lifebuoy" },
        { label: "Cloud", value: "cloud" },
        { label: "Shield (security)", value: "shield" },
        { label: "Database (backup)", value: "database" },
        { label: "Network", value: "network" },
        { label: "CPU (consulting)", value: "cpu" },
      ],
    },
    { name: "summary", type: "textarea", required: true },
    { name: "detail", type: "textarea", required: true },
    {
      name: "features",
      type: "array",
      labels: { singular: "Feature", plural: "Features" },
      fields: [{ name: "feature", type: "text", required: true }],
    },
    { name: "order", type: "number", defaultValue: 99 },
  ],
};
