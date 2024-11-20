"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface SearchResult {
  cid: string;
  file_name: string;
  mime_type: string;
}

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const fetchSearchResults = async (page = 1) => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await axios.get(
        "https://ipfs-api.bakiverse.com/search-public-files",
        {
          params: { query, page, limit: 10 },
        }
      );
      setResults(
        page === 1 ? res.data.results : [...results, ...res.data.results]
      );
      setTotalPages(res.data.totalPages);
      setNoResults(res.data.results.length === 0); // Vérifier si aucun résultat
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickFile = (cid: string) => {
    console.log("Click on file", cid);
    router.push(`/public-files/${cid}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    fetchSearchResults();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchSearchResults();
    }
  };

  const loadMoreResults = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      fetchSearchResults(currentPage + 1);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
      setResults([]); // Cache les résultats
      setNoResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={resultsRef}>
      <input
        autoComplete="off"
        type="text"
        placeholder="Search file.."
        className={`px-2 text-sm py-1 border border-primary bg-transparent backdrop-blur-xs text-primary rounded-lg max-w-[120px] ${
          results.length > 0
            ? "max-w-[400px] min-w-[150px]"
            : "focus:max-w-[400px] focus:min-w-[150px]"
        } transition-all duration-300 ease-in-out`}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <button
        onClick={handleSearch}
        className="text-primary hover:text-first-hover transition-one bg-transparent rounded-lg absolute top-1/2 -translate-y-1/2 right-2"
        title="Browse files"
      >
        <LuSearch />
      </button>
      {loading && <p>Loading...</p>}
      {noResults && !loading && (
        <p className="mt-2 absolute">No files found.</p>
      )}
      {results.length > 0 && (
        <div className="absolute left-0 text-sm mt-2 w-[300px] bg-background border border-primary rounded-lg shadow-lg max-h-[300px] overflow-y-scroll custom-scrollbar">
          {results.map((result) => (
            <div
              key={result.cid}
              className="px-4 py-2 border-b"
              onClick={() => handleClickFile(result.cid)}
            >
              <p className="break-all max-w-[80%] truncate">
                Name : {result.file_name}
              </p>
              <p className="break-all max-w-[80%] truncate">
                CID : {result.cid}
              </p>
              <p>Type MIME : {result.mime_type}</p>
            </div>
          ))}
          {currentPage < totalPages && (
            <button
              className="w-full text-blue-500 py-2"
              onClick={loadMoreResults}
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
