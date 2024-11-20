"use client";

import BgGrid from "@/components/ui/BgGrid";
import { useCallback, useState } from "react";
import axios from "axios";
import FilePreviewDll from "@/components/upload/FilePreviewDll";
import UploadFile from "@/components/upload/UploadFile";
import Pagination from "@/components/ui/Pagination";
import ResizableModal from "@/components/ui/ResizableModal";
import toast from "react-hot-toast";
import CopyButton from "@/components/ui/CopyButton";
import SkeletonFileCard from "@/components/ui/SkeletonFileCard";
import ShareButton from "@/components/ui/ShareButton";
import ToggleSwitch from "@/components/upload/ToggleSwitch";
import SearchParamsProvider from "@/components/SearchParamsProvider";
import { HiTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { TbLayoutNavbarFilled } from "react-icons/tb";

interface PrivateFile {
  cid: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  is_private: boolean;
}

export default function UserFilesPage() {
  const router = useRouter();
  const [files, setFiles] = useState<PrivateFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<PrivateFile | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFiles = useCallback(async (apiKey: string, page: number) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/getPrivateFiles", {
        apiKey,
        page,
        limit: 8,
      });

      if (res.data.files) {
        setFiles(res.data.files);
        setTotalPages(res.data.totalPages);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error("Error while fetching private files for API key:", error);
      toast.error("Error while fetching private files");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDeleteFile = async (cid: string, apiKey: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-lg">Are you sure you want to delete this file?</p>
          <div className="flex gap-4">
            <button
              className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await axios.delete(
                    `https://ipfs-api.bakiverse.com/file/delete?cid=${cid}`,
                    {
                      headers: {
                        "X-API-Key": apiKey,
                      },
                    }
                  );
                  toast.success("File deleted successfully");
                  fetchFiles(apiKey, currentPage);
                } catch (error) {
                  toast.error("Error while deleting file");
                  console.error(error);
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-400 text-white py-1 px-3 rounded hover:bg-gray-500"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const goToFilePage = (cid: string, apiKey: string) => {
    if (apiKey) {
      router.push(`/public-files/${cid}`);
    } else {
      toast.error("Please, enter an API Key. (Upload Page)");
    }
  };

  return (
    <main className="min-h-screen font-[family-name:var(--font-faculty-glyphic)] flex flex-col items-center justify-center py-20 md:py-4">
      <BgGrid />
      <div className="py-12 relative z-[55] md:py-24 max-w-screen-xl px-6 mx-auto lg:px-8 xl:px-4">
        <SearchParamsProvider>
          {({ api_key }) => {
            if (!api_key) {
              toast.error("Missing API key");
              return <div>Please provide an API key.</div>;
            }

            if (!loading && files.length === 0) {
              fetchFiles(api_key, currentPage);
            }

            return (
              <>
                <div className="w-full items-center justify-center flex mb-8 relative">
                  <UploadFile
                    onUploadSuccess={() => fetchFiles(api_key, currentPage)}
                  />
                </div>

                {selectedFile && (
                  <ResizableModal
                    isOpen={!!selectedFile}
                    onClose={() => setSelectedFile(null)}
                    width="500px"
                    height="600px"
                  >
                    <h2 className="text-2xl font-semibold mb-4">
                      Preview of {selectedFile.file_name}
                    </h2>
                    <FilePreviewDll cid={selectedFile.cid} />
                  </ResizableModal>
                )}

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                      <SkeletonFileCard key={index} />
                    ))
                  ) : files.length > 0 ? (
                    files.map((file, index) => (
                      <div
                        key={`${file.cid}-${index}`}
                        className="p-4 rounded-lg shadow-md bg-background text-primary relative"
                      >
                        <div className="absolute top-2 right-2 flex items-center">
                          <button
                            className="text-primary hover:text-red-600 transition-one mr-1"
                            onClick={() => handleDeleteFile(file.cid, api_key)}
                            title="Delete file ? 🥹"
                          >
                            <HiTrash />
                          </button>
                          <ToggleSwitch
                            cid={file.cid}
                            initialIsPrivate={file.is_private}
                            onToggle={() => fetchFiles(api_key, currentPage)}
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 truncate max-w-[80%]">
                          {file.file_name}
                        </h3>
                        <p>MIME : {file.mime_type}</p>
                        <p>Size : {(file.file_size / 1024).toFixed(2)} Ko</p>
                        <p className="break-all max-w-[80%] truncate">
                          {file.cid}
                        </p>

                        <div className="flex items-center justify-around gap-2">
                          <button
                            onClick={() => setSelectedFile(file)}
                            className="bg-primary hover:bg-first-hover text-background text-sm py-2 px-4 rounded mt-2 w-full"
                            title={`Preview ${file.file_name}`}
                          >
                            Preview
                          </button>
                          <CopyButton
                            text={file.cid}
                            classNameToAdd="text-lg"
                            title="Copy CID"
                          />
                          <ShareButton text={file.cid} />
                          {!file.is_private && (
                            <button
                              className="bg-primary hover:bg-first-hover text-background text-lg py-2 px-4 rounded mt-2 transition-one"
                              title={`Go to ${file.file_name} page`}
                              onClick={() => goToFilePage(file.cid, api_key)}
                            >
                              <TbLayoutNavbarFilled />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No files available.</p>
                  )}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            );
          }}
        </SearchParamsProvider>
      </div>
    </main>
  );
}
