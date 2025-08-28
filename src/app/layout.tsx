import type { Metadata, Viewport } from "next";
import "./globals.css";
import ModalProvider from "@/components/providers/ModalProvider";
import ChatWidget from "@/components/ui/ChatWidget";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Humanicia - Compagnie Bienveillante et Authentique",
  description:
    "Découvrez Humanicia, votre plateforme de compagnie humaine bienveillante et authentique. Profitez de moments de partage, d'écoute et de présence avec nos agents qualifiés.",
  keywords: [
    "compagnie",
    "bienveillance",
    "présence humaine",
    "écoute",
    "partage",
    "accompagnement",
    "Humanicia",
  ],
  authors: [{ name: "Humanicia" }],
  creator: "Humanicia",
  publisher: "Humanicia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://humanicia.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Humanicia - Compagnie Bienveillante et Authentique",
    description:
      "Découvrez Humanicia, votre plateforme de compagnie humaine bienveillante et authentique. Profitez de moments de partage, d'écoute et de présence avec nos agents qualifiés.",
    url: "https://humanicia.com",
    siteName: "Humanicia",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Humanicia - Compagnie Bienveillante",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Humanicia - Compagnie Bienveillante et Authentique",
    description:
      "Découvrez Humanicia, votre plateforme de compagnie humaine bienveillante et authentique.",
    images: ["/Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/LogoFavIcon.png",
    shortcut: "/LogoFavIcon.png",
    apple: "/LogoFavIcon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={`antialiased`}>
        <ModalProvider>
          {children}
          <ChatWidget />
        </ModalProvider>
      </body>
    </html>
  );
}
