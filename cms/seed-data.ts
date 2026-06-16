// Default content used to (a) seed the database on first boot and
// (b) act as a static fallback if the CMS/database is unavailable.
// Icons are stored as string keys mapped to lucide components in lib/icons.ts.

export const siteDefaults = {
  name: "Bevora",
  domain: "BevoraSG.com",
  url: "https://www.bevorasg.com",
  tagline: "IT services that just work",
  description:
    "Bevora is the Singapore IT partner that keeps your business running — managed support, cloud, and cybersecurity, watched around the clock.",
  email: "Enquiries@bevorasg.com",
  phone: "+65 8991 6966",
  address: "71 Robinson Road, Singapore",
};

// WhatsApp uses the same number as the phone (digits only for wa.me links).
export const whatsappNumber = "+65 8991 6966";

// Pre-filled WhatsApp message so the chat opens with a template the visitor
// completes (name + email + what they need) — gives Bevora context up front.
export const whatsappPretext =
  "Hi Bevora team! I'd like to talk to you about your IT services.\n\nName:\nEmail:\nWhat I need help with:";

// Canonical wa.me deep link WITH the pre-filled message. Use this for every
// WhatsApp button/link so the visitor always lands on the same prompt.
export const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
  whatsappPretext,
)}`;

// All contact email addresses shown on the contact page (first = primary).
export const contactEmails = ["Enquiries@bevorasg.com", "samuel@vorkhive.com"];

export const navLinksDefault = [
  { label: "Services", href: "/services" },
  { label: "Why Bevora", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
];

export type IconKey =
  | "lifebuoy"
  | "cloud"
  | "shield"
  | "database"
  | "network"
  | "cpu";

export interface ServiceSeed {
  slug: string;
  icon: IconKey;
  title: string;
  summary: string;
  detail: string;
  features: string[];
  order: number;
}

export const servicesDefault: ServiceSeed[] = [
  {
    slug: "managed-it",
    icon: "lifebuoy",
    title: "Managed IT support",
    summary: "A responsive help desk and on-site team that fixes issues — often before you notice them.",
    detail:
      "We become your IT department: a named engineer who knows your setup, a help desk that answers fast, and proactive monitoring that catches problems before they reach your team.",
    features: ["Unlimited help desk", "Proactive monitoring & patching", "On-site support across Singapore", "Asset & licence management"],
    order: 1,
  },
  {
    slug: "cloud-migration",
    icon: "cloud",
    title: "Cloud & migration",
    summary: "Move to Microsoft 365 and Azure with zero downtime and a plan that fits your budget.",
    detail:
      "From a first move to the cloud to optimising what you already run, we plan and execute migrations that don't interrupt the work — and right-size the bill afterwards.",
    features: ["Microsoft 365 & Azure", "Zero-downtime migration", "Identity & access (Entra ID)", "Cost optimisation"],
    order: 2,
  },
  {
    slug: "cybersecurity",
    icon: "shield",
    title: "Cybersecurity",
    summary: "Endpoint hardening, real-time threat monitoring and a rapid response when it matters.",
    detail:
      "We harden every endpoint, watch your network in real time, and respond the moment something looks wrong — so a threat never becomes an incident.",
    features: ["Endpoint detection & response", "24/7 threat monitoring", "Phishing & awareness training", "Incident response"],
    order: 3,
  },
  {
    slug: "backup-dr",
    icon: "database",
    title: "Backup & disaster recovery",
    summary: "Automated, tested backups so a bad day never becomes a lost week.",
    detail:
      "Backups you never have to think about — automated, encrypted, and tested for real recovery, with a documented plan for the day you actually need them.",
    features: ["Automated daily backups", "Tested restores", "Off-site & immutable copies", "Documented recovery plan"],
    order: 4,
  },
  {
    slug: "network-infrastructure",
    icon: "network",
    title: "Network & infrastructure",
    summary: "Design, install and maintain the wired and wireless backbone your office runs on.",
    detail:
      "The backbone your office runs on — designed, installed and maintained for speed and reliability, from the server room to the boardroom Wi-Fi.",
    features: ["Network design & install", "Managed firewalls & Wi-Fi", "Structured cabling", "Performance monitoring"],
    order: 5,
  },
  {
    slug: "it-consulting",
    icon: "cpu",
    title: "IT consulting",
    summary: "Senior engineers who plan your roadmap and right-size every investment.",
    detail:
      "Senior engineers who sit on your side of the table — planning the roadmap, sizing investments to the business, and making the technology decisions you don't have time to.",
    features: ["Technology roadmaps", "Budget & procurement advice", "Vendor management", "Virtual CIO"],
    order: 6,
  },
];

export const proofStatsDefault = [
  { value: "99.98%", label: "Uptime", caption: "Across managed infrastructure" },
  { value: "<15min", label: "Response", caption: "Average ticket first-response" },
  { value: "200+", label: "Clients", caption: "Served across Singapore" },
  { value: "24/7", label: "Coverage", caption: "Monitoring, every day" },
];

export const whyPointsDefault = [
  { title: "Fixed monthly pricing", detail: "No surprise invoices — one predictable fee that covers your whole stack." },
  { title: "A team that knows you", detail: "A named engineer who understands your setup, not a different voice every call." },
  { title: "Security built in", detail: "Every plan includes monitoring, patching and backups as standard." },
  { title: "Singapore-based, on-site ready", detail: "Remote-first support backed by engineers who can be at your door." },
];

export const serviceOptionsDefault = [
  "Managed IT support",
  "Cloud & migration",
  "Cybersecurity",
  "Backup & disaster recovery",
  "Network & infrastructure",
  "Something else",
];
