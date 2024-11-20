"use client";
import toast from "react-hot-toast";
import { LuShare } from "react-icons/lu";
import { IoWarningOutline } from "react-icons/io5";

export default function ShareButton({
  text,
  showWarnToast = true,
  timeout = 5000,
}: {
  text: string;
  showWarnToast?: boolean;
  timeout?: number;
}) {
  const shareClicked = (text: string) => {
    if (showWarnToast) {
      toast.custom(
        <p className="flex gap-2 items-center bg-warn p-2 rounded text-background">
          <IoWarningOutline />
          Check your file is public to share it.
        </p>,
        {
          duration: 2000,
        }
      );
    }
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    const link = "https://ipfs-api.bakiverse.com/file/display?cid=";

    setTimeout(() => {
      window.open(link + text, "_blank");
    }, timeout);
  };
  return (
    <button
    title="Display in new Window and copy SRC to export"
      className="bg-primary hover:bg-first-hover text-background py-2 px-4 rounded mt-2 text-lg transition-one"
      onClick={() => shareClicked(text)}
    >
      <LuShare />
    </button>
  );
}
