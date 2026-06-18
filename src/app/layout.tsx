import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/Toaster";
import { GlobalEggs } from "@/components/easter-eggs/GlobalEggs";
import { AchievementWatcher } from "@/components/achievements/AchievementWatcher";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { APP } from "@/data/story";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-app",
  display: "swap",
});

export const metadata: Metadata = {
  title: APP.title,
  description: "מסע יום הולדת אינטראקטיבי — מבצע שילי 🎂",
  applicationName: APP.shortTitle,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP.shortTitle,
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FF7EB6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <head>
        {/* iOS PWA: hide Safari UI when launched from the Home Screen. */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={APP.shortTitle} />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        {/* iOS splash screen */}
        <link rel="apple-touch-startup-image" href="/icons/splash.png" />
      </head>
      <body className="antialiased">
        {children}
        <Toaster />
        <AchievementWatcher />
        <GlobalEggs />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
