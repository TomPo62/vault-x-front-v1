import React from "react";
import { LuCornerUpLeft, LuCornerUpRight } from "react-icons/lu";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];

  // Limiter le nombre de pages affichées pour éviter une pagination trop longue
  const maxPagesToShow = 5;
  let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2)); // Commence à 2 pour laisser la place à la première page
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage >= totalPages) {
    endPage = totalPages - 1; // Réserver la place pour la dernière page
    startPage = Math.max(2, endPage - maxPagesToShow + 1); // Ajuster le début pour éviter les débordements
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {/* Bouton Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-primary rounded disabled:opacity-50 text-background hover:bg-first-hover transition-one"
      >
        Previous
      </button>

      {/* Toujours afficher la première page */}
      <button
        onClick={() => onPageChange(1)}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-background text-primary"
            : "bg-primary text-background hover:bg-first-hover transition-one"
        }`}
        title="First Page"
      >
        1
      </button>

      {/* Ajouter des points si nécessaire */}
      {startPage > 2 && <span className="px-2"><LuCornerUpLeft /></span>}

      {/* Affichage des pages dynamiques */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-background text-primary"
              : "bg-primary text-background hover:bg-first-hover transition-one"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Ajouter des points si nécessaire */}
      {endPage < totalPages - 1 && <span className="px-2"><LuCornerUpRight /></span>}

      {/* Toujours afficher la dernière page */}
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-background text-primary"
              : "bg-primary text-background hover:bg-first-hover transition-one"
          }`}
          title="Last Page"
        >
          {totalPages}
        </button>
      )}

      {/* Bouton Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-primary text-background rounded disabled:opacity-50 hover:bg-first-hover transition-one"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
