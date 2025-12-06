import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReportsProvider } from "../context/ReportsContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MatatuRadar",
  description: "Check fares and safety before you board.",
  manifest: "/manifest.json", // LINKING THE MANIFEST HERE
  icons: {
    apple: "/icon-192.png", // Icon for iPhones
  },
};

// Configuring the color of the browser bar (Yellow for Matatu theme)
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
      </body>
    </html>
  );
}