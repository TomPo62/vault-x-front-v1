import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veltyr | Public Files",
  description:
    "Explore and access public files on Veltyr. Preview, download, and interact with files securely and seamlessly.",
  keywords:
    "Veltyr public files, file previews, file downloads, decentralized file access, IPFS public files, Veltyr file explorer",
  openGraph: {
    title: "Veltyr | Public Files",
    description:
      "Discover public files on Veltyr. Preview and download securely with IPFS technology. Experience decentralized file management.",
    url: "https://veltyr.bakiverse.com/public-files",
    siteName: "Veltyr | Public Files",
    images: [
      {
        url: "/images/VeltyrLogo.svg", // Consistent branding image
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
    title: "Veltyr | Public Files",
    description:
      "Browse, preview, and download public files securely on Veltyr. Powered by IPFS for decentralized file storage.",
    images: ["/images/VeltyrLogo.svg"],
  },
  alternates: {
    canonical: "https://veltyr.bakiverse.com/public-files",
  },
  other: {
    "og:image:alt": "Veltyr Logo",
  },
};

export default function VeltyrPublicFilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
