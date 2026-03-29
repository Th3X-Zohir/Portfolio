import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090B",
};

export const metadata: Metadata = {
  title: "Zohir Rayhan -- AI-Native Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in AI/LLM systems, real-time platforms, and production SaaS products. 6,700+ commits across 67 repositories. Built systems for e-Judiciary Bangladesh, Daffodil International University, and multiple AI companies.",
  keywords: ["AI developer", "full-stack developer", "TypeScript", "Python", "LLM", "SaaS", "Laravel", "Next.js", "Zohir Rayhan", "Bangladesh developer"],
  authors: [{ name: "Zohir Rayhan", url: "https://github.com/Th3X-Zohir" }],
  creator: "Zohir Rayhan",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Zohir Rayhan -- AI-Native Full-Stack Developer",
    description: "Full-Stack Developer specializing in AI systems, real-time platforms, and SaaS products.",
    type: "website",
    url: "https://zohirrayhan.dev",
    siteName: "Zohir Rayhan Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zohir Rayhan -- AI-Native Full-Stack Developer",
    description: "Full-Stack Developer specializing in AI systems, real-time platforms, and SaaS products.",
    creator: "@th3x_zohir",
  },
  metadataBase: new URL("https://zohirrayhan.dev"),
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
