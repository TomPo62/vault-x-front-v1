"use client";
import BgGrid from "@/components/ui/BgGrid";
import { useEffect, useRef, useState } from "react";
import Sidebar from "@/components/docs/Sidebar";
import SectionSidebar from "@/components/docs/SectionSidebar";
import { docsData } from "@/data/docsData";
import DocNavigation from "@/components/docs/DocNavigation";

export default function DocsPage() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedDocIDStored = localStorage.getItem("selectedDocId") || null;
    if (selectedDocIDStored) {
      setSelectedDocId(parseInt(selectedDocIDStored));
    } else {
      setSelectedDocId(docsData[0].id);
    }
  }, []);

  const selectedDoc = docsData.find((doc) => doc.id === selectedDocId);
  const sections = selectedDoc ? selectedDoc.sectionData : [];

  return (
    <main className="min-h-screen font-[family-name:var(--font-faculty-glyphic)] flex py-20 md:py-4">
      <BgGrid />
      <div className="py-12 relative z-[55] md:py-24 w-full">
        <div className="flex flex-col lg:flex-row max-w-screen-2xl px-6 mx-auto lg:px-8 xl:px-4">
          {/* Sidebar */}
          <div className="lg:w-[20%] px-4 py-2 hidden lg:block">
            <Sidebar
              onDocClick={setSelectedDocId}
              selectedDocId={selectedDocId || docsData[0].id}
            />
          </div>

          {/* Mobile Sidebar Toggle */}
          <button
            className="block lg:hidden px-4 py-2 mb-4 text-sm text-background bg-primary rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>

          {/* Mobile Sidebar */}
          {sidebarOpen && (
            <div className="fixed top-0 left-0 w-4/5 h-full bg-background z-50 overflow-y-auto custom-scrollbar shadow-md pt-32 px-4 pb-8">
              <Sidebar
                onDocClick={(id) => {
                  setSelectedDocId(id);
                  setSidebarOpen(false);
                }}
                selectedDocId={selectedDocId || docsData[0].id}
              />
              <button
                className="absolute top-32 right-4 text-primary text-lg font-bold"
                onClick={() => setSidebarOpen(false)}
              >
                ✖
              </button>
            </div>
          )}

          {/* Contenu principal */}
          <div
            ref={contentRef}
            className="lg:w-[50%] w-full p-4 min-h-[calc(100vh-100px)] bg-transparent backdrop-blur-xs max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar transition-one"
          >
            {selectedDoc ? (
              <>
                <selectedDoc.component onDocClick={setSelectedDocId} />
                <DocNavigation
                  currentDocId={selectedDocId || docsData[0].id}
                  onNavigate={setSelectedDocId}
                />
              </>
            ) : (
              <p>No document selected.</p>
            )}
          </div>

          {/* Section Sidebar */}
          <div className="lg:w-[30%] w-full p-4 relative max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar hidden lg:block">
            <SectionSidebar sections={sections} contentRef={contentRef} />

            {selectedDoc &&
              selectedDoc.tryItOut &&
              selectedDoc.tryItOutComponent && (
                <selectedDoc.tryItOutComponent />
              )}
          </div>
        </div>
      </div>
    </main>
  );
}
