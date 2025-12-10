import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReportsProvider } from "../context/ReportsContext";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MatatuRadar",
  description: "Check fares and safety before you board.",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon-192.png", 
  },
};

export const viewport: Viewport = {
  themeColor: "#FACC15", 
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReportsProvider>
          {children}
        </ReportsProvider>
        
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}