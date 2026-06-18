import type { Metadata, Viewport } from "next";
import {
  Great_Vibes,
  Cormorant_Garamond,
  Jost,
  Noto_Serif_Sinhala,
} from "next/font/google";
import "./globals.css";
import { config } from "@/lib/wedding-config";

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const display = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sinhala = Noto_Serif_Sinhala({
  weight: ["400", "500", "600", "700"],
  subsets: ["sinhala"],
  variable: "--font-sinhala",
  display: "swap",
});

const title = `${config.couple.bride} & ${config.couple.groom} — Wedding Invitation`;

export const metadata: Metadata = {
  title,
  description: `Join us as we celebrate the wedding of ${config.couple.bride} and ${config.couple.groom} on ${config.dateLong}.`,
  openGraph: {
    title,
    description: `You're invited to celebrate our wedding on ${config.dateLong}.`,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFF8F5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${script.variable} ${display.variable} ${body.variable} ${sinhala.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
