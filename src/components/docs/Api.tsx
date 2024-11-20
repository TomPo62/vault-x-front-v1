import { DocClicked } from "@/types/types";

// Documentation de la page API
export const sectionData = [
  { id: "api-overview", title: "API Overview" },
  { id: "api-endpoints", title: "API Endpoints" },
  { id: "api-root-intro", title: "API Root" },
  { id: "api-upload-intro", title: "API Upload" },
  { id: "api-public-files-intro", title: "API Public Files" },
  { id: "api-private-files-intro", title: "API Private Files" },
  { id: "api-search-public-files-intro", title: "API Search Public Files" },
  { id: "api-get-file-by-cid-intro", title: "API Get File by CID" },
  {
    id: "api-get-public-file-by-cid-intro",
    title: "API Get Public File by CID",
  },
  { id: "api-display-file-by-cid-intro", title: "API Display File by CID" },
  { id: "api-get-image-by-cid-intro", title: "API Get Image by CID" },
  {
    id: "api-get-private-image-by-cid-intro",
    title: "API Get Private Image by CID",
  },
  { id: "api-toggle-file-privacy-intro", title: "API Toggle File Privacy" },
  {
    id: "api-get-lottie-file-by-cid-intro",
    title: "API Get Lottie File by CID",
  },
];

export default function Api({ onDocClick }: DocClicked) {
  const handleClick = (id: number) => {
    if (onDocClick) {
      localStorage.setItem("selectedDocId", id.toString());
      onDocClick(id);
    }
  };
  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu de l'API */}
      <section id="api-overview" className="space-y-4">
        <h1 className="text-3xl font-bold">Veltyr API Overview</h1>
        <p className="text-lg leading-relaxed">
          Welcome to the Veltyr API documentation. This guide will help you
          navigate through the various endpoints available, enabling you to
          upload, retrieve, and manage files stored on IPFS through Veltyr.
        </p>
      </section>

      {/* Liste des Endpoints */}
      <section id="api-endpoints" className="space-y-4">
        <h2 className="text-2xl font-semibold">API Endpoints</h2>

        {/* Accueil de l'API */}
        <section id="api-root-intro" className="space-y-2">
          <h3 className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one" onClick={() => handleClick(6)}>
            GET /
          </h3>
          <p>Returns a welcome message confirming the API is running.</p>
        </section>

        {/* Endpoint d'Upload */}
        <section id="api-upload-intro" className="space-y-2">
          <h3 onClick={() => handleClick(7)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">
            POST /upload
          </h3>
          <p>
            Allows you to upload a file to IPFS, with the option to make it
            private or public.
          </p>
        </section>

        {/* Liste des fichiers publics */}
        <section
          id="api-public-files-intro"
          className="space-y-2"

        >
          <h3 onClick={() => handleClick(8)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">GET /public-files</h3>
          <p>
            Retrieves a paginated list of all public files available in Veltyr.
          </p>
        </section>

        {/* Récupération de fichiers privés pour l'API Key */}
        <section
          id="api-private-files-intro"
          className="space-y-2"

        >
          <h3 onClick={() => handleClick(9)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">GET /private-files</h3>
          <p>
            Fetches all files associated with the user&apos;s API key, both private
            and public.
          </p>
        </section>

        {/* Recherche de fichiers publics */}
        <section
          id="api-search-public-files-intro"
          className="space-y-2"

        >
          <h3 onClick={() => handleClick(10)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">GET /search-public-files</h3>
          <p>
            Enables search functionality over public files with pagination
            options.
          </p>
        </section>
        {/* Récupération d'un fichier public par CID */}
        <section
          id="api-get-public-file-by-cid-intro"
          className="space-y-2"

        >
          <h3 onClick={() => handleClick(11)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">GET /file/public</h3>
          <p>Fetches metadata for a public file by CID.</p>
        </section>

        {/* Affichage d'un fichier public */}
        <section
          id="api-display-file-by-cid-intro"
          className="space-y-2"

        >
          <h3 onClick={() => handleClick(12)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">GET /file/display</h3>
          <p>
            Displays a public file directly in the browser without requiring
            download.
          </p>
        </section>

        {/* Récupération d'une image publique par CID */}
        <section
          id="api-get-image-by-cid-intro"
          className="space-y-2"

        >
          <h3 onClick={() => handleClick(13)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">GET /file/img</h3>
          <p>Fetches an image file by CID if it&apos;s public.</p>
        </section>

        {/* Récupération d'une image privée par CID */}
        <section
          id="api-get-private-image-by-cid-intro"
          className="space-y-2"

        >
          <h3 onClick={() => handleClick(14)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">GET /file/private/img</h3>
          <p>
            Fetches a private image by CID, requiring API key authorization.
          </p>
        </section>

        {/* Changement de la confidentialité d'un fichier */}
        <section
          id="api-toggle-file-privacy-intro"
          className="space-y-2"

        >
          <h3 onClick={() => handleClick(15)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">POST /file/toggle-private</h3>
          <p>
            Toggles the privacy status of a file between private and public.
          </p>
        </section>

        {/* Récupération d'un fichier Lottie par CID */}
        <section
          id="api-get-lottie-file-by-cid-intro"
          className="space-y-2"

        >
          <h3 onClick={() => handleClick(16)} className="text-xl font-semibold cursor-pointer hover:text-first-hover transition-one">GET /render-lottie</h3>
          <p>
            Fetches a Lottie animation file (JSON format) by CID if it&apos;s public.
          </p>
        </section>
      </section>
    </div>
  );
}
