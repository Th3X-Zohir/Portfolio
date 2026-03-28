import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jihan — AI-Native Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in AI/LLM systems, real-time platforms, and production SaaS products. 6,700+ commits across 67 repositories. Built systems for e-Judiciary Bangladesh, Daffodil International University, and multiple AI companies.",
  keywords: ["AI developer", "full-stack developer", "TypeScript", "Python", "LLM", "SaaS", "Laravel", "Next.js", "Jihan"],
  authors: [{ name: "Jihan" }],
  openGraph: {
    title: "Jihan — AI-Native Full-Stack Developer",
    description: "Full-Stack Developer specializing in AI systems, real-time platforms, and SaaS products.",
    type: "website",
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
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23F97316'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' font-size='18' font-family='system-ui' font-weight='900' fill='white'>J</text></svg>"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
