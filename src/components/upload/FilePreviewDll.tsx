"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import CopyButton from "../ui/CopyButton";
import { LuDownload } from "react-icons/lu";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface FilePreviewDllProps {
  cid: string;
  className?: string;
  classNameForImg?: string;
  hideShowButton?: boolean;
}

const FilePreviewDll: React.FC<FilePreviewDllProps> = ({
  cid,
  className,
  classNameForImg,
  hideShowButton = true,
}) => {
  const [fileContentUrl, setFileContentUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleEditorWillMount(monaco: any) {
    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6A9955" },
        { token: "keyword", foreground: "569CD6" },
        { token: "string", foreground: "CE9178" },
      ],
      colors: {
        "editor.background": "#1E293B",
        "editor.foreground": "#F8FAFC",
      },
    });
  }

  useEffect(() => {
    const fetchFilePreview = async () => {
      try {
        const response = await axios.get(`/api/getFilePreviewDll?cid=${cid}`, {
          responseType: "arraybuffer",
        });

        const mimeType = response.headers["content-type"];
        const contentDisposition = response.headers["content-disposition"];
        const fileName = contentDisposition
          ? contentDisposition.split("filename=")[1]
          : "file";

        const blob = new Blob([response.data], { type: mimeType });
        const blobUrl = URL.createObjectURL(blob);

        setFileContentUrl(blobUrl);
        setFileType(mimeType);
        setFileName(fileName);

        const codeMimeTypes = [
          "application/javascript",
          "application/json",
          "text/html",
          "text/css",
          "text/plain",
        ];

        if (codeMimeTypes.includes(mimeType) || mimeType.startsWith("text/")) {
          const decoder = new TextDecoder("utf-8");
          const textContent = decoder.decode(response.data);
          setFileContent(textContent);
        }
      } catch (err) {
        console.error(err);
        setError("Error while getting file");
        toast.error("Error while getting file");
      } finally {
        setLoading(false);
      }
    };

    fetchFilePreview();
  }, [cid]);

  const getLanguageFromMimeType = (mimeType: string | null) => {
    if (!mimeType) return "";
    if (mimeType.includes("javascript")) return "javascript";
    if (mimeType.includes("json")) return "json";
    if (mimeType.includes("html")) return "html";
    if (mimeType.includes("css")) return "css";
    if (mimeType.includes("text/plain")) return "text";
    return "";
  };

  if (loading) {
    return <div>Loading file...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {hideShowButton && (
        <div className="mt-4 mb-8 flex items-center gap-2">
          <a
            title="Download File"
            href={fileContentUrl || "#"}
            download={fileName}
            className="bg-primary hover:bg-first-hover text-background py-2 px-4 rounded mt-2 text-lg transition-one"
          >
            <LuDownload />
          </a>
          <CopyButton classNameToAdd="text-lg" text={cid} title="Copy CID" />
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {/* Preview for Images */}
        {fileType && fileType.startsWith("image/") && (
          <Image
            src={fileContentUrl || "/images/placeholder.png"}
            alt={fileName || "File"}
            width={500}
            height={500}
            className={`w-full h-full object-contain ${classNameForImg}`}
          />
        )}

        {/* Preview for PDFs */}
        {fileType && fileType === "application/pdf" && (
          <iframe
            src={fileContentUrl || ""}
            width="100%"
            height="100%"
            title={fileName || "PDF"}
            className="w-full h-full"
          />
        )}

        {/* Preview for Audio */}
        {fileType && fileType.startsWith("audio/") && (
          <audio controls className="w-full mt-4">
            <source src={fileContentUrl || ""} type={fileType} />
            Your browser does not support the audio element.
          </audio>
        )}

        {/* Preview for Video */}
        {fileType && fileType.startsWith("video/") && (
          <video controls className="w-full mt-4">
            <source src={fileContentUrl || ""} type={fileType} />
            Your browser does not support the video element.
          </video>
        )}

        {/* Preview for Text/Code */}
        {fileContent && (
          <Editor
            language={getLanguageFromMimeType(fileType)}
            theme="custom-dark"
            value={fileContent}
            options={{
              readOnly: true,
              automaticLayout: true,
            }}
            beforeMount={handleEditorWillMount}
            className="w-full h-full"
          />
        )}

        {!fileContent &&
          !fileType?.startsWith("image/") &&
          !fileType?.startsWith("audio/") &&
          !fileType?.startsWith("video/") &&
          !fileType?.includes("pdf") && (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-lg font-semibold text-center mb-4">
                No preview available for this file type.
              </p>
              <p className="text-sm text-center">
                File name: <span className="font-bold">{fileName}</span>
              </p>
              <p className="text-sm text-center">
                MIME type: <span className="font-bold">{fileType}</span>
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default FilePreviewDll;
