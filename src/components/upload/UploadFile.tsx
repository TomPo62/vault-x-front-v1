"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { FaLock, FaLockOpen, FaUpload } from "react-icons/fa";
import { ImUpload2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";

interface UploadFileProps {
  onUploadSuccess?: () => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onUploadSuccess }) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [storedApiKeyRetrieved, setStoredApiKeyRetrieved] = useState("");
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [percentUpload, setPercentUpload] = useState<number | null>(null);

  const canBlurInput = apiKey.length > 0;

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setStoredApiKeyRetrieved(storedApiKey);
    } else {
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleTogglePrivate = () => {
    setIsPrivate((prev) => !prev);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please choose a file.");
      return;
    }

    if (!apiKey) {
      toast.error("Please enter an API Key.");
      return;
    }

    setIsLoading(true);
    setPercentUpload(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("is_private", String(isPrivate));

    try {
      const response = await axios.post(
        "https://ipfs-api.bakiverse.com/upload",
        formData,
        {
          headers: {
            "X-API-Key": apiKey,
            "Content-Type": "multipart/form-data",
            "Content-Length": `${file.size}`, // Ajout de la taille
          },
          onUploadProgress: (progressEvent) => {
            if (
              progressEvent.lengthComputable &&
              progressEvent.total !== undefined
            ) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setPercentUpload(percentCompleted);
            } else {
              toast.custom(
                <p className="flex gap-2 items-center bg-warn p-2 rounded text-background">
                  <IoWarningOutline />
                  File upload has started but percentage is not available.
                </p>,
                {
                  duration: 5000,
                }
              );
            }
          },
        }
      );

      const data = response.data;
      console.log("response from upload:", data);

      if (response.status === 200) {
        toast.success(`Upload successful. CID: ${data.cid}`);
        if (onUploadSuccess) onUploadSuccess();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(error);
      if (axiosError.response?.status === 413) {
        toast.error("File too large. Max size is 50MB.");
      } else {
        toast.error("Error while uploading file.");
      }
    } finally {
      setIsLoading(false);
      setPercentUpload(null);
    }
  };

  const deleteApiKey = async () => {
    try {
      if (!apiKey) {
        return;
      }
      localStorage.removeItem("apiKey");
      router.push("/upload");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-10 w-full max-w-[1000px] px-4 text-primary relative z-[50] bg-transparent backdrop-blur-sm ">
      {storedApiKeyRetrieved && (
        <button
          onClick={deleteApiKey}
          className="absolute top-2 right-2 z-[999] text-background bg-primary hover:bg-first-hover py-1 px-2 rounded"
        >
          Remove APIKEY
        </button>
      )}
      <h1 className="text-5xl font-bold mb-6 ">Upload Files</h1>
      <div className="mb-4">
        <label className="block text-lg font-medium">API Key</label>
        <input
          autoComplete="off"
          type="text"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter here your API Key"
          className={`mt-2 p-2 border border-secondary rounded-lg w-full text-primary bg-transparent focus:outline-none transition-one ${
            canBlurInput ? "blur-sm focus:blur-none" : ""
          }`}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>

      <div className="flex gap-4 md:gap-0 flex-col md:flex-row items-center justify-around mt-12">
        <div className="">
          <div className="flex items-center">
            <label
              className={`flex items-center px-4 py-2 rounded-md shadow-md tracking-wide cursor-pointer hover:bg-opacity-90 transition duration-200`}
              title="Choose a file"
            >
              <FaUpload className="w-6 h-6" />
              <span className="ml-2 text-base leading-normal">
                Choose a file
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {selectedFileName && (
              <span className="ml-4 text-sm text-primary truncate max-w-xs">
                {selectedFileName}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Private</span>
          <button
            onClick={handleTogglePrivate}
            className={`p-2 rounded-full ${
              isPrivate ? "bg-red-500" : "bg-accent"
            } hover:bg-opacity-90 transition duration-200`}
            title={
              isPrivate ? "Click to make it Public" : "Click to make it Private"
            }
          >
            {isPrivate ? <FaLock /> : <FaLockOpen />}
          </button>
          <span className="ml-2">{isPrivate ? "Yes" : "No"}</span>
        </div>{" "}
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className={`bg-primary text-background hover:bg-first-hover transition-one py-2 px-4 rounded flex items-center`}
          title={isLoading ? "Upload in progress..." : "Upload"}
        >
          {isLoading ? "Upload in progress..." : "Upload"}{" "}
          <ImUpload2 className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Display upload progress */}
      {percentUpload !== null && (
        <div className="mt-6 w-full">
          <div className="h-2 bg-background border border-first-hover rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${percentUpload}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">{percentUpload}%</p>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
