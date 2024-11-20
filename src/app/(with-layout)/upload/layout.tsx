import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veltyr | Upload Files",
  description:
    "Upload your files securely with Veltyr's decentralized platform. Enjoy reliable and efficient file uploads using IPFS technology.",
  keywords:
    "Veltyr upload files, decentralized file upload, secure file storage, IPFS upload, Veltyr platform, upload digital assets",
  openGraph: {
    title: "Veltyr | Upload Files",
    description:
      "Effortlessly upload your files to Veltyr. Leverage IPFS technology for secure, decentralized, and reliable storage.",
    url: "https://veltyr.bakiverse.com/upload",
    siteName: "Veltyr | Upload Files",
    images: [
      {
        url: "/images/VeltyrLogo.svg",
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
    title: "Veltyr | Upload Files",
    description:
      "Easily upload your files securely on Veltyr's decentralized platform. Enjoy peace of mind with IPFS-powered storage.",
    images: ["/images/VeltyrLogo.svg"],
  },
  alternates: {
    canonical: "https://veltyr.bakiverse.com/upload",
  },
  other: {
    "og:image:alt": "Veltyr Logo",
  },
};

export default function VeltyrUploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
