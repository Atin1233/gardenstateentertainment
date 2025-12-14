import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/noise-overlay";
import { CustomCursor } from "@/components/custom-cursor";
import { LenisProvider } from "@/components/lenis-provider";
import { NeonStreaks } from "@/components/ui/neon-streaks";

// Display font - Space Grotesk (modern geometric sans-serif)
const displayFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-harmond",
  display: "swap",
  preload: true,
});

// Body font - Inter (clean, modern sans-serif)
const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nohemi",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Garden State Entertainment | DJ & Event Services",
  description:
    "Garden State Entertainment - Professional DJ and entertainment services for weddings, private parties, corporate events, and more. Entertainment you won't forget.",
  keywords: [
    "DJ Services",
    "Wedding DJ",
    "Event Entertainment",
    "Party DJ",
    "Corporate Events",
    "Garden State Entertainment",
    "New Jersey DJ",
  ],
  authors: [{ name: "Garden State Entertainment" }],
  openGraph: {
    title: "Garden State Entertainment | DJ & Event Services",
    description:
      "Professional DJ and entertainment services. Entertainment you won't forget.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-black text-white font-nohemi antialiased overflow-x-hidden min-h-screen w-full max-w-[100vw]">
        <LenisProvider>
          {/* Noise overlay - Film grain effect */}
          <NoiseOverlay />
          
          {/* Neon color streaks - Subtle ambient lighting */}
          <NeonStreaks />
          
          {/* Custom cursor - Desktop only */}
          <CustomCursor />
          
          {/* Main content */}
          <main className="w-full overflow-x-hidden">{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
