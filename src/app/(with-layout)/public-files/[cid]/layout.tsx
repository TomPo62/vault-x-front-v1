import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veltyr | File Preview",
  description:
    "Preview and interact with individual files on Veltyr. Securely view and download files powered by decentralized IPFS technology.",
  keywords:
    "Veltyr file preview, decentralized file preview, secure file preview, IPFS file preview, file download, Veltyr file explorer",
  openGraph: {
    title: "Veltyr | File Preview",
    description:
      "Discover a detailed preview of individual files on Veltyr. View, download, and interact with files stored securely using IPFS technology.",
    url: "https://veltyr.bakiverse.com/public-files/[cid]",
    siteName: "Veltyr | File Preview",
    images: [
      {
        url: "/images/VeltyrLogo.svg", // Maintains consistent branding
        width: 800,
        height: 600,
        alt: "Veltyr Logo",
      },
    ],
    locale: "en_EN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veltyr | File Preview",
    description:
      "View and interact with individual files on Veltyr. Explore decentralized file previews powered by IPFS.",
    images: ["/images/VeltyrLogo.svg"],
  },
  alternates: {
    canonical: "https://veltyr.bakiverse.com/public-files/[cid]",
  },
  other: {
    "og:image:alt": "Veltyr Logo",
  },
};

export default function VeltyrFilePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
