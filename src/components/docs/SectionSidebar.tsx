import { RefObject } from "react";

interface SectionSidebarProps {
  sections: { id: string; title: string }[];
  contentRef: RefObject<HTMLDivElement>;
}

export default function SectionSidebar({ sections, contentRef }: SectionSidebarProps) {
  const handleSectionClick = (sectionId: string) => {
    const container = contentRef.current;
    const targetElement = container?.querySelector(`#${sectionId}`);

    if (container && targetElement) {
      // Calcul de la position relative de l'élément cible dans le conteneur
      const offsetTop = targetElement.getBoundingClientRect().top - container.getBoundingClientRect().top;

      // Mise à jour de `scrollTop` pour scroller le conteneur
      container.scrollTo({
        top: offsetTop + container.scrollTop, // Position relative ajustée
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-4 bg-background rounded-lg flex flex-col items-end w-full relative">
      <h3 className="font-bold mb-2 text-lg w-full items-start text-start">On this doc :</h3>
      {sections.map((section) => (
        <p
          key={section.id}
          className="cursor-pointer hover:text-first-hover transition-one mb-2 text-sm w-full text-end"
          onClick={() => handleSectionClick(section.id)}
        >
          {section.title}
        </p>
      ))}
    </div>
  );
}
