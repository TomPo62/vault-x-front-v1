"use client";
import BgGrid from "@/components/ui/BgGrid";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import FilePreviewDll from "@/components/upload/FilePreviewDll";
import CopyButton from "@/components/ui/CopyButton";
import toast from "react-hot-toast";
import ShareButton from "@/components/ui/ShareButton";
import { LuDownload } from "react-icons/lu";

interface FileInfos {
  file_name: string;
  file_size: number;
  cid: string;
  mime_type: string;
}

export default function CidPage() {
  const apiKey = localStorage.getItem("apiKey") || ""
  const { cid } = useParams();
  const [file, setFile] = useState<FileInfos | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const getFileInfos = useCallback(async () => {
    toast.promise(
      axios
        .get(`https://ipfs-api.bakiverse.com/file/public`, {
          headers: { "X-API-Key": apiKey },
          params: { cid },
        })
        .then((res) => {
          setFile(res.data[0]);
        }),
      {
        loading: "Loading file details...",
        success: "File details loaded!",
        error: "Failed to load file info, please check your API key (Upload Page)",
      }
    );
  }, [apiKey, cid]);

  const getBlobURL = useCallback(async () => {
    if (!cid || !file) return null;
    try {
      const response = await axios.get(`/api/getFilePreviewDll?cid=${cid}`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: file.mime_type });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error while getting file preview:", error);
      toast.error("Failed to download file");
      return null;
    }
  }, [cid, file]);

  useEffect(() => {
    if (cid) getFileInfos();
  }, [cid]);

  useEffect(() => {
    const prepareDownload = async () => {
      if (file) {
        const url = await getBlobURL();
        setBlobUrl(url);
      }
    };

    prepareDownload();
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return (
    <main className="min-h-screen my-8 font-[family-name:var(--font-faculty-glyphic)] flex items-center justify-center bg-background text-primary px-6 md:px-0">
      <BgGrid />
      <div className="relative z-[55] max-w-screen-xl w-full px-8 py-8 bg-transparent backdrop-blur-xs rounded-lg shadow-lg flex items-center gap-8 border border-primary">
        {file ? (
          <>
            <div>
              <FilePreviewDll
                cid={cid as string}
                classNameForImg="border border-primary rounded-lg"
                hideShowButton={false}
              />
            </div>
            <div className="flex flex-col gap-4 text-primary w-1/2 h-full">
              <h1 className="text-2xl font-bold text-primary text-left mb-4">
                {file.file_name}
              </h1>
              <p>
                <strong>File Size:</strong> {(file.file_size / 1024).toFixed(2)}{" "}
                KB
              </p>
              <p>
                <strong>MIME Type:</strong> {file.mime_type}
              </p>
              <p className="break-all max-w-[90%] truncate">
                <strong className="">CID:</strong> {file.cid}
              </p>
              <div className="w-full flex justify-around p-4 items-center">
                <a
                  title="Download File"
                  href={blobUrl || "#"}
                  download={file.file_name}
                  className="bg-primary hover:bg-first-hover text-background py-2 px-4 rounded mt-2 text-lg transition-one"
                >
                  <LuDownload />
                </a>
                <CopyButton text={file.cid} title="Copy CID" />
                <ShareButton
                  text={file.cid}
                  showWarnToast={false}
                  timeout={3000}
                />
              </div>
            </div>
          </>
        ) : (
          //erreur ou chargement ?

          <p className="text-center text-gray-400">Fetching file details...</p>
        )}
      </div>
    </main>
  );
}
