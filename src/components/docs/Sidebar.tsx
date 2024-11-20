// components/docs/Sidebar.tsx
import { docsData } from "@/data/docsData";

interface SidebarProps {
  onDocClick: (docId: number) => void;
  selectedDocId: number;
}

export default function Sidebar({ onDocClick, selectedDocId }: SidebarProps) {

  const handleClick = (id: number) => {
    localStorage.setItem("selectedDocId", id.toString());
    onDocClick(id);
  }
  // Créer une fonction récursive pour afficher la hiérarchie
  const renderTree = (parentId: number | null) => {
    return docsData
      .filter((doc) => doc.parentId === parentId)
      .map((doc) => (
        <div key={doc.id} className={`transition-one ml-${parentId ? 4 : 0}`}>
          <button
            className={`cursor-pointer hover:text-first-hover transition-one ${parentId === null ? "text-lg mb-2 mt-2" : ""} ${selectedDocId === doc.id ? "font-bold" : ""}`}
            onClick={() => handleClick(doc.id)}
          >
            {doc.title}
          </button>
          {/* Appel récursif pour afficher les enfants */}
          {renderTree(doc.id)}
        </div>
      ));
  };

  return <div>{renderTree(null)}</div>;
}
