import type { Metadata } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { getSiteSettings } from "@/lib/content";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    keywords: [
      "IT services Singapore",
      "managed IT",
      "cloud migration",
      "cybersecurity",
      "Microsoft 365",
      "Azure",
      "backup and disaster recovery",
    ],
    openGraph: {
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      url: site.url,
      siteName: site.name,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
    },
    icons: { icon: "/assets/bevora-mark.svg" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { navLinks } = await getSiteSettings();
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body>
        <Header navLinks={navLinks} />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
