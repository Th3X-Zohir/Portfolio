import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Th3X-Zohir — AI-Native Full-Stack Developer",
  description:
    "I build production AI systems, real-time platforms, and data pipelines. 6,700+ commits across 67 repositories. AI/LLM, SaaS, and real-time expertise.",
  keywords: ["AI developer", "full-stack", "TypeScript", "Python", "LLM", "SaaS", "real-time systems"],
  authors: [{ name: "Th3X-Zohir" }],
  openGraph: {
    title: "Th3X-Zohir — AI-Native Full-Stack Developer",
    description: "Building production AI systems, real-time platforms, and data pipelines.",
    type: "website",
    url: "https://github.com/Th3X-Zohir",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@th3x_zohir",
  },
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
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%236366f1'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='18' font-family='system-ui' font-weight='800' fill='white'>J</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
