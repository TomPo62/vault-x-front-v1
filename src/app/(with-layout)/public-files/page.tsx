"use client";
import BgGrid from "@/components/ui/BgGrid";
import AllPublicFiles from "@/components/upload/AllPublicFiles";

export default function PublicFilesPage() {
  return (
    <main className="min-h-screen font-[family-name:var(--font-faculty-glyphic)] flex flex-col items-center justify-center py-20 md:py-4">
      <BgGrid />
      <div className="py-12 relative z-[55] md:py-24 max-w-screen-xl px-6 mx-auto lg:px-8 xl:px-4 ">
        <div className="w-full items-center justify-center flex mb-8 relative">
          <AllPublicFiles/>
        </div>
      </div>
    </main>
  );
}
