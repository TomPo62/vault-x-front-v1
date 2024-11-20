import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono.ttf",
  variable: "--font-jetbrains-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Veltyr | Lottie Animation Interpreter",
  description:
    "Effortlessly render and display Lottie animations directly in your projects with Veltyr's Lottie Interpreter. Simplify integration without adding Lottie players or files to your codebase.",
  keywords:
    "Veltyr, Lottie Interpreter, render Lottie animations, Lottie player integration, animation rendering, web animations, lightweight Lottie integration, animation tools",
  openGraph: {
    title: "Veltyr | Lottie Animation Interpreter",
    description:
      "Veltyr's Lottie Interpreter allows developers to integrate and render Lottie animations seamlessly without including additional libraries or files in their projects.",
    url: "https://veltyr.bakiverse.com/render-lottie",
    siteName: "Veltyr | Lottie Interpreter",
    images: [
      {
        url: "/images/VeltyrLogo.svg",
        width: 800,
        height: 600,
        alt: "Veltyr Lottie Interpreter - Simplified Animation Rendering",
      },
    ],
    locale: "en_EN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veltyr | Lottie Animation Interpreter",
    description:
      "Render and integrate Lottie animations effortlessly with Veltyr's Lottie Interpreter. No additional libraries required!",
    images: ["/images/VeltyrLogo.svg"],
  },
  alternates: {
    canonical: "https://veltyr.bakiverse.com/render-lottie",
  },
  other: {
    "og:image:alt": "Veltyr Lottie Interpreter - Simplified Animation Rendering",
  },
};

export default function LottieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
