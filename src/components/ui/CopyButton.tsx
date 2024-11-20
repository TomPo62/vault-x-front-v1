import toast from "react-hot-toast";
import { LuCopy } from "react-icons/lu";

interface CopyButtonProps {
  text: string;
  classNameToAdd?: string | null;
  cleanHtml?: boolean;
  title?: string;
}

// Fonction pour nettoyer le texte HTML
function removeHtmlTags(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export default function CopyButton({
  text,
  classNameToAdd,
  cleanHtml = false,
  title = "Copy",
}: CopyButtonProps) {
  const handleCopy = () => {
    const textToCopy = cleanHtml ? removeHtmlTags(text) : text;
    navigator.clipboard.writeText(textToCopy);
    toast.success("Copied to clipboard!");
  };

  return (
    <button
      className={`bg-primary hover:bg-first-hover text-background py-2 px-4 rounded mt-2 transition-one ${
        classNameToAdd ? classNameToAdd : ""
      }`}
      title={title}
      onClick={handleCopy}
    >
      <LuCopy />
    </button>
  );
}
