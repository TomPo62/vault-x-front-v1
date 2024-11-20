// components/docs/ApiSearchPubFiles.tsx
import ExampleDisplay from "@/components/docs/ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useState } from "react";
import axios from "axios";

export const sectionData = [{ id: "api-search-public-files", title: "API Search Public Files" }, {id: "search-query", title: "Search Query"}, { id: "api-search-public-files-example-request", title: "Example" }, { id: "api-search-public-files-example-response", title: "Expected Response" }];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://ipfs-api.bakiverse.com/search-public-files?query=example&page=1&limit=10</span> \\
  -H "X-API-Key: <span class="text-red-400">YOUR_API_KEY</span>"`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
  "io/ioutil"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/search-public-files?query=example&page=1&limit=10"</span>, nil)
  req.Header.Set(<span class="text-yellow-400">"X-API-Key"</span>, <span class="text-red-400">"YOUR_API_KEY"</span>)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(<span class="text-accent">string(body)</span>)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/search-public-files?query=example&page=1&limit=10'</span>, {
  method: <span class="text-yellow-400">'GET'</span>,
  headers: {
    <span class="text-yellow-400">'X-API-Key'</span>: <span class="text-red-400">'YOUR_API_KEY'</span>
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
`,
};

const staticRes = `{
  "files": [
    {
      "cid": "Qm...",
      "file_name": "example.jpg",
      "mime_type": "image/jpeg",
      "file_size": 1024
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}`;

export default function ApiSearchPubFiles({}: DocClicked) {
  const [response, setResponse] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const handleRun = async () => {
    if (!query) {
      console.warn("Search query is required.");
      return;
    }

    try {
      const res = await axios.get("https://ipfs-api.bakiverse.com/search-public-files", {
        params: { query, page: 1, limit: 10 },
      });
      setResponse(JSON.stringify(res.data, null, 2)); // Format JSON pour affichage
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setResponse("An error occurred during the search.");
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu de l'API Search Public Files */}
      <section id="api-search-public-files" className="space-y-4">
        <h1 className="text-3xl font-bold">API Search Public Files</h1>
        <p className="text-lg leading-relaxed">
          The <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">GET /search-public-files</code> endpoint allows you to search for public files based on a query string. This endpoint requires a valid API key and supports pagination.
        </p>
      </section>

      {/* Query Input */}
      <section id="search-query" className="space-y-4">
        <h2 className="text-2xl font-semibold">Search Query</h2>
        <input
          autoComplete="off"

          type="text"
          placeholder="Enter search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-primary rounded-lg bg-transparent text-primary"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </section>

      {/* Example Request */}
      <section id="api-search-public-files-example-request" className="space-y-4">
        <h2 className="text-2xl font-semibold">Example Request</h2>
        <p className="text-lg leading-relaxed">
          Here is how to perform a search request with different languages. Remember to replace <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">YOUR_API_KEY</code> with your actual API key.
        </p>
        <ExampleDisplay
          codeSamples={codeSamples}
          apiKeyWarning={<span className="text-xs">Please replace <span className="text-red-400">YOUR_API_KEY</span> with your actual API key.</span>}
          onRun={handleRun}
          response={response}
        />
      </section>

      {/* Expected Response */}
      <section id="api-search-public-files-example-response" className="space-y-4">
        <h2 className="text-2xl font-semibold">Expected Response</h2>
        <p className="text-lg leading-relaxed">
          When the search is successful, the server will respond with a JSON object containing the search results and pagination details.
        </p>
        <pre className="px-2 break-words whitespace-pre-wrap py-4 pt-8 border border-primary rounded-lg relative">
          <div className="absolute top-2 left-2 items-center flex justify-between">
            <span className="text-xs mb-2 ml-2 text-background bg-primary rounded-sm px-2">
              JSON
            </span>
          </div>
          <code className="text-accent text-sm">{staticRes}</code>
        </pre>
      </section>
    </div>
  );
}
