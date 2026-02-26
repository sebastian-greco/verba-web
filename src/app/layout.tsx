import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Verba — Local Speech-to-Text for Mac",
  description:
    "Privacy-first local speech-to-text for Mac. No cloud. No subscription. No account.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${newsreader.variable} antialiased`}>
        <BackgroundBlobs />
        {children}
      </body>
    </html>
  );
}
