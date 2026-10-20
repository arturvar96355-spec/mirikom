import type { Metadata, Viewport } from "next";
import { Tektur, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { BookingProvider } from "@/lib/booking-context";
import { Cursor } from "@/components/motion/Cursor";
import { BookingModal } from "@/components/widgets/BookingModal";
import { site } from "@/content/site";

const tektur = Tektur({ subsets: ["latin", "cyrillic"], variable: "--font-tektur", display: "swap", weight: ["400", "500", "600", "700", "800"] });
const plex = IBM_Plex_Sans({ subsets: ["latin", "cyrillic"], variable: "--font-plex", display: "swap", weight: ["300", "400", "500", "600"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-plex-mono", display: "swap", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Mirikom — сервис BMW с 2000 года, Кунцево",
  description: "Чиним то, что нужно, — и объясняем почему. Независимый сервис BMW на Молодогвардейской, 61с17. Диагностика 6 000 ₽.",
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Mirikom — сервис BMW с 2000 года", description: "Чиним то, что нужно, — и объясняем почему.", images: ["/og.jpg"], locale: "ru_RU", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0b0d10", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${tektur.variable} ${plex.variable} ${plexMono.variable}`}>
      <body>
        <meta name="robots" content="noindex, nofollow" />
        <BookingProvider>
          <LenisProvider>{children}</LenisProvider>
          <Cursor />
          <BookingModal />
        </BookingProvider>
        <span className="sr-only">{site.conceptMark}</span>
      </body>
    </html>
  );
}
