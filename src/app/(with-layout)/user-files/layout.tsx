import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veltyr | Manage Your Files",
  description:
    "Effortlessly manage your files with Veltyr's decentralized platform. Upload, organize, and secure your digital assets with ease.",
  keywords:
    "Veltyr user files, file management, decentralized storage, secure file management, IPFS file manager, upload files, organize files, Veltyr platform",
  openGraph: {
    title: "Veltyr | Manage Your Files",
    description:
      "Take control of your digital assets with Veltyr. Easily upload, manage, and organize your files using our secure decentralized storage solution.",
    url: "https://veltyr.bakiverse.com/user-files",
    siteName: "Veltyr | User Files",
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
    title: "Veltyr | Manage Your Files",
    description:
      "Effortlessly manage your files on Veltyr's decentralized platform. Upload, organize, and secure your digital assets seamlessly.",
    images: ["/images/VeltyrLogo.svg"],
  },
  alternates: {
    canonical: "https://veltyr.bakiverse.com/user-files",
  },
  other: {
    "og:image:alt": "Veltyr Logo",
  },
};

export default function VeltyrUserFilesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
