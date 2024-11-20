"use client";
import BgGrid from "@/components/ui/BgGrid";
const globe = process.env.NEXT_PUBLIC_LOTTIE_GLOB;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
import CreateApiKey from "@/components/upload/CreateApiKey";

export default function Home() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-faculty-glyphic)] flex flex-col items-center justify-center">
      <BgGrid />

      <div className="py-12 relative z-[55] md:py-24">
        <div className="grid max-w-screen-xl px-6 mx-auto lg:px-8 xl:px-2 md:grid-cols-4 xl:grid-cols-5 gap-x-12 lg:gap-x-20">
          <div className="self-center order-2 col-span-2 xl:col-span-3 mt-12 md:order-1 lg:mt-0">
            <h1 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl md:mb-4 lg:mb-8 max-w-full break-words">
              The best way to get files for your projects.
            </h1>
            <p className="mb-6 text-lg xl:text-xl lg:mb-8 xl:mb-10 text-first-hover">
              Veltyr is powered by Bakiverse and IPFS, to provide a secure and
              decentralized storage solution for your files.
            </p>
            <CreateApiKey />
            <p className="text-sm text-gray-500">
              Requesting an API key is free.
            </p>
          </div>
          <div className="order-1 col-span-1 md:order-2 xl:col-span-1 mt-8">
            <iframe
              className="w-64 h-64 sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px] to-anim-bounce"
              src={`${siteUrl}/render-lottie?cid=${globe}&textColor=%23e2e2e2`}
              title="Globe Animation"
            ></iframe>
          </div>
        </div>

        <div className="relative z-[50] flex max-w-6xl mx-auto flex-col items-center justify-center mt-20 bg-transparent h-auto px-6 md:px-12">
          <video className="" width="100%" height="100%" autoPlay muted playsInline loop>
            <source
              src="https://ipfs-api.bakiverse.com/file/display?cid=QmZbaHVi3gxNSXWvYpTZnXMLstrNaBuXRhjHLzig5n9pca"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
}
