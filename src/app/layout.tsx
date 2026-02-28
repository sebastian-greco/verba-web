import type { Metadata } from "next";
import "./globals.css";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Merriweather:ital,wght@0,400;0,700;0,900;1,400&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-sans antialiased`}>
        <BackgroundBlobs />
        {children}
      </body>
    </html>
  );
}
