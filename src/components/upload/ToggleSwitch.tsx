import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ToggleSwitch = ({
  cid,
  initialIsPrivate,
  onToggle,
}: {
  cid: string;
  initialIsPrivate: boolean;
  onToggle: () => void;
}) => {
  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);
  const apiKey = localStorage.getItem("apiKey");

  const handleToggle = () => {
    if (!apiKey) {
      toast.error("Please, enter an API Key.");
      return;
    }

    toast.promise(
      axios.post(
        `https://ipfs-api.bakiverse.com/file/toggle-private`,
        null,
        {
          headers: {
            "X-API-Key": apiKey || "",
          },
          params: { cid },
        }
      ).then(() => {
        setIsPrivate(!isPrivate);
        onToggle();
      }),
      {
        loading: "Updating file privacy...",
        success: `File is now ${!isPrivate ? "Private" : "Public"}`,
        error: "Failed to update file privacy",
      }
    );
  };

  return (
    <div
      title={isPrivate ? "File is Private" : "File is Public"}
      className={`w-8 h-4 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 ${isPrivate ? "bg-red-500" : "bg-green-500"}`}
      onClick={handleToggle}
    >
      <div
        className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-200 ${isPrivate ? "translate-x-0" : "translate-x-4"}`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
