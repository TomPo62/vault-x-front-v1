// components/docs/DocNavigation.tsx
import { docsData } from "@/data/docsData";
import { LuCornerUpLeft, LuCornerUpRight, LuSplit } from "react-icons/lu";

interface DocNavigationProps {
  currentDocId: number;
  onNavigate: (id: number) => void;
}

export default function DocNavigation({
  currentDocId,
  onNavigate,
}: DocNavigationProps) {
  const currentIndex = docsData.findIndex((doc) => doc.id === currentDocId);
  const prevDoc = docsData[currentIndex - 1];
  const nextDoc = docsData[currentIndex + 1];

  const handleClick = (id: number) => {
    localStorage.setItem("selectedDocId", id.toString());
    onNavigate(id);
  };

  return (
    <div className="w-full">
      <h4 className="font-bold mb-2 w-full text-center text-lg flex items-center justify-center gap-2">
        What to do next <LuSplit />
      </h4>
      <div className="flex justify-between p-4 border-t border-primary py-6">
        {prevDoc ? (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={()=>handleClick(prevDoc.id)}
              className="text-primary hover:text-primary-hover font-medium flex items-center gap-2"
            >
              <LuCornerUpLeft /> {prevDoc.title}
            </button>
            {prevDoc.description && prevDoc.descriptionIcon && <p className="text-sm leading-relaxed text-first-hover flex items-center gap-2">{prevDoc.description} <prevDoc.descriptionIcon/></p>}
          </div>
        ) : (
          <div />
        )}
        {nextDoc ? (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleClick(nextDoc.id)}
              className="text-primary hover:text-primary-hover font-medium flex items-center gap-2"
            >
              {nextDoc.title} <LuCornerUpRight />
            </button>
            {nextDoc.description && nextDoc.descriptionIcon && <p className="text-sm leading-relaxed text-first-hover flex items-center gap-2"><nextDoc.descriptionIcon/>{nextDoc.description} </p>}
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
