import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import { Toaster } from "react-hot-toast";
import ApiHealthCheck from "@/components/main/ApiHealthCheck";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const facultyGlyphic = localFont({
  src: "../fonts/FunnelDisplay.ttf",
  variable: "--font-faculty-glyphic",
  weight: "400", // ou le poids approprié de la police, si disponible
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono.ttf",
  variable: "--font-jetbrains-mono",
  weight: "400", // ou le poids approprié de la police, si disponible
});

export const metadata: Metadata = {
  title: "Veltyr | Decentralized and Secure Storage Solution",
  description:
    "Veltyr by Bakiverse: A cutting-edge decentralized storage platform leveraging IPFS to ensure secure, tamper-proof, and highly accessible file management for developers and users.",
  keywords:
    "Veltyr, Bakiverse, decentralized storage, secure file storage, IPFS, tamper-proof storage, data autonomy, file management, developer-friendly API, resilient storage, data integrity, modern storage solution",
  metadataBase: new URL("https://veltyr.bakiverse.com"),
  openGraph: {
    title: "Veltyr | Decentralized and Secure Storage Solution",
    description:
      "Veltyr offers a decentralized, tamper-proof storage platform with IPFS, providing developers and users with unmatched security, accessibility, and data ownership.",
    url: "https://veltyr.bakiverse.com",
    siteName: "Veltyr",
    images: [
      {
        url: "/images/VeltyrLogo.svg",
        width: 800,
        height: 600,
        alt: "Veltyr Logo - Decentralized Storage Solution",
      },
    ],
    locale: "en_EN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veltyr | Decentralized and Secure Storage Solution",
    description:
      "Experience the future of decentralized storage with Veltyr. Tamper-proof, highly accessible, and secure file management tailored for modern needs.",
    images: ["/images/VeltyrLogo.svg"],
  },
  alternates: {
    canonical: "https://veltyr.bakiverse.com/",
  },
  other: {
    "og:image:alt": "Veltyr Logo - Decentralized Storage Solution",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${facultyGlyphic.variable} ${jetbrainsMono.variable} antialiased  font-[family-name:var(--font-faculty-glyphic)]`}
      >
        <Navbar />

        {children}
        <ApiHealthCheck />
        <Toaster
          position="top-right"
          toastOptions={{
            // Style de base pour tous les toasts
            style: {
              fontFamily: "var(--font-faculty-glyphic)",
            },
            // Success Toast
            success: {
              duration: 4000,
              style: {
                backgroundColor: "var(--text-primary)", // Couleur de fond pour les succès
                color: "var(--background)", // Couleur de texte
                maxWidth: "400px",
                wordBreak: "break-word",
              },
              iconTheme: {
                primary: "var(--background)", // Couleur de l'icône (fond)
                secondary: "var(--text-primary)", // Couleur de l'icône (texte)
              },
            },
            // Error Toast
            error: {
              duration: 4000,
              style: {
                backgroundColor: "red",
                color: "var(--background)",
              },
              iconTheme: {
                primary: "var(--background)",
                secondary: "red",
              },
            },
            // Default Toast
            blank: {
              duration: 3000,
              style: {
                backgroundColor: "var(--background)", // Couleur de fond pour les messages neutres
                color: "var(--text-primary)",
              },
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
