// components/docs/ApiPublicFiles.tsx
import ExampleDisplay from "@/components/docs/ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useState } from "react";
import axios, { AxiosError } from "axios";

export const sectionData = [{ id: "api-public-files", title: "API Public Files" }, { id: "api-public-files-example-request", title: "Example" }, { id: "api-public-files-example-response", title: "Expected Response" }];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://ipfs-api.bakiverse.com/public-files?page=1&limit=10</span> \\
  -H "X-API-Key: <span class="text-red-400">YOUR_API_KEY</span>"`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
  "io/ioutil"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/public-files?page=1&limit=10"</span>, nil)
  req.Header.Set(<span class="text-yellow-400">"X-API-Key"</span>, <span class="text-red-400">"YOUR_API_KEY"</span>)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(<span class="text-accent">string(body)</span>)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/public-files?page=1&limit=10'</span>, {
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

const sampleResponse = `{
  "files": [
    {
      "cid": "Qm...",
      "file_name": "example.jpg",
      "mime_type": "image/jpeg",
      "file_size": 1024
    },
    ...
  ],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}`;

export default function ApiPublicFiles({}: DocClicked) {
  const [response, setResponse] = useState<string>("");

  const handleRun = async () => {
    try {
      const result = await axios.get("/api/getPublicFiles", {
        headers: { "X-API-Key": "YOUR_API_KEY" },
        params: { page: 1, limit: 3 },
      });
      setResponse(JSON.stringify(result.data, null, 2)); // Beautify JSON output
    } catch (error: unknown) {
      setResponse(
        `Error: ${
          (error as AxiosError).response?.data || (error as AxiosError).message
        }`
      );
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu de l'API Public Files */}
      <section id="api-public-files" className="space-y-4">
        <h1 className="text-3xl font-bold">API Public Files</h1>
        <p className="text-lg leading-relaxed">
          The <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">GET /public-files</code> endpoint retrieves a paginated list of public files stored on IPFS through VaultX. This request requires an API key.
        </p>
      </section>

      {/* Example Request */}
      <section id="api-public-files-example-request" className="space-y-4">
        <h2 className="text-2xl font-semibold">Example Request</h2>
        <p className="text-lg leading-relaxed">
          Here is how to retrieve public files using different programming languages. Remember to replace <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">YOUR_API_KEY</code> with your actual API key.
        </p>
        <ExampleDisplay
          codeSamples={codeSamples}
          apiKeyWarning={<span className="text-xs">Please replace <span className="text-red-400">YOUR_API_KEY</span> with your actual API key.</span>}
          onRun={handleRun}
          response={response}
        />
      </section>

      {/* Expected Response */}
      <section id="api-public-files-example-response" className="space-y-4">
        <h2 className="text-2xl font-semibold">Expected Response</h2>
        <p className="text-lg leading-relaxed">
          When the request is successful, the server will respond with a JSON object containing metadata of the public files along with pagination information.
        </p>
        <pre className="px-2 break-words whitespace-pre-wrap py-4 pt-8 border border-primary rounded-lg relative">
          <div className="absolute top-2 left-2 items-center flex justify-between">
            <span className="text-xs mb-2 ml-2 text-background bg-primary rounded-sm px-2">
              JSON
            </span>
          </div>
          <code className="text-accent text-sm">{sampleResponse}</code>
        </pre>
      </section>
    </div>
  );
}
