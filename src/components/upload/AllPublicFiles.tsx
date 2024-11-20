"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import FilePreviewDll from "./FilePreviewDll";
import Pagination from "@/components/ui/Pagination";
import ResizableModal from "../ui/ResizableModal";
import toast from "react-hot-toast";
import CopyButton from "../ui/CopyButton";
import SkeletonFileCard from "../ui/SkeletonFileCard";
import ShareButton from "../ui/ShareButton";
import { useRouter } from "next/navigation";
import { TbLayoutNavbarFilled } from "react-icons/tb";

interface PublicFile {
  cid: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  is_private: boolean;
}

const AllPublicFiles = () => {
  const router = useRouter();
  const [files, setFiles] = useState<PublicFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<PublicFile | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const fetchPublicFiles = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/getPublicFiles", {
        params: { page, limit: 8 },
      });
      setFiles(response.data.files);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Error while fetching public files");
      toast.error("Error while fetching public files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicFiles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const goToFilePage = (cid: string) => {
    if (apiKey) {
      router.push(`/public-files/${cid}`);
    } else {
      toast.error("Please, enter an API Key. (Upload Page)");
    }
  };

  return (
    <div className="py-10 w-full max-w-[1400px] px-4 text-primary">
      <h2 className="text-3xl font-bold mb-6">Public files available:</h2>

      {/* Conteneur de prévisualisation unique */}
      {selectedFile && (
        <ResizableModal
          isOpen={!!selectedFile}
          onClose={() => setSelectedFile(null)}
          width="500px"
          height="500px"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Preview of {selectedFile.file_name}
          </h2>
          <FilePreviewDll cid={selectedFile.cid} />
        </ResizableModal>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {/* Grille des fichiers */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonFileCard key={index} />
          ))
        ) : files.length > 0 ? (
          files.map((file, index) => (
            <div
              key={`${file.cid}-${index}`}
              className="flex flex-col justify-between h-full p-4 rounded-lg shadow-md bg-transparent text-primary backdrop-blur-xs"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2 truncate max-w-[80%]">
                  {file.file_name}
                </h3>
                <p>MIME : {file.mime_type}</p>
                <p>Size : {(file.file_size / 1024).toFixed(2)} Ko</p>
                <p className="break-all max-w-[80%] truncate">{file.cid}</p>
              </div>

              <div className="flex items-center justify-around gap-2">
                <button
                  onClick={() => setSelectedFile(file)}
                  className="bg-primary hover:bg-first-hover text-background text-sm py-2 px-4 rounded mt-2 w-full transition-one"
                >
                  Preview
                </button>
                <CopyButton
                  classNameToAdd="text-lg"
                  text={file.cid}
                  title="Copy CID"
                />
                <ShareButton text={file.cid} />
                {apiKey && (
                  <button className="bg-primary hover:bg-first-hover text-background text-lg py-2 px-4 rounded mt-2 transition-one" title={`Go to ${file.file_name} page`} onClick={() => goToFilePage(file.cid)}><TbLayoutNavbarFilled /></button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-2">
            <p>No public files available.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllPublicFiles;
