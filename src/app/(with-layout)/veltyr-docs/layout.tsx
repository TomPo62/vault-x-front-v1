import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veltyr Documentation | API & Integration Guide",
  description:
    "Explore the comprehensive documentation for Veltyr. Learn how to use Veltyr's decentralized storage platform, integrate APIs, and leverage its features for secure and efficient file management.",
  keywords:
    "Veltyr documentation, Veltyr API guide, decentralized storage docs, file management API, Veltyr integration guide, IPFS file storage docs, secure file storage documentation",
  openGraph: {
    title: "Veltyr Documentation | API & Integration Guide",
    description:
      "Discover Veltyr's full documentation, including API endpoints, integration guides, and examples to help you utilize Veltyr's decentralized storage platform effectively.",
    url: "https://veltyr.bakiverse.com/veltyr-docs",
    siteName: "Veltyr Documentation",
    images: [
      {
        url: "/images/VeltyrLogo.svg",
        width: 800,
        height: 600,
        alt: "Veltyr Documentation Overview",
      },
    ],
    locale: "en_EN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veltyr Documentation | API & Integration Guide",
    description:
      "Access Veltyr's complete documentation, including API endpoints and integration examples for seamless use of decentralized storage.",
    images: ["/images/VeltyrLogo.svg"],
  },
  alternates: {
    canonical: "https://veltyr.bakiverse.com/veltyr-docs",
  },
  other: {
    "og:image:alt": "Veltyr Documentation Overview",
  },
};

export default function VeltyrDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
