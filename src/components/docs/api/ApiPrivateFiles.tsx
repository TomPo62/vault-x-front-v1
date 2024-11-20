// components/docs/ApiPrivateFiles.tsx
import ExampleDisplay from "@/components/docs/ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useState } from "react";

export const sectionData = [{ id: "api-private-files", title: "API Private Files" }, { id: "api-private-files-example-request", title: "Example" }, { id: "api-private-files-example-response", title: "Expected Response" }];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://ipfs-api.bakiverse.com/private-files?page=1&limit=10</span> \\
  -H "X-API-Key: <span class="text-red-400">YOUR_API_KEY</span>"`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
  "io/ioutil"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/private-files?page=1&limit=10"</span>, nil)
  req.Header.Set(<span class="text-yellow-400">"X-API-Key"</span>, <span class="text-red-400">"YOUR_API_KEY"</span>)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(<span class="text-accent">string(body)</span>)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/private-files?page=1&limit=10'</span>, {
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
      "file_name": "private_example.pdf",
      "mime_type": "application/pdf",
      "file_size": 2048,
      "is_private": true
    },
    ...
  ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}`;

export default function ApiPrivateFiles({}: DocClicked) {
  const [response, setResponse] = useState<string>("");

  const handleRun = async () => {
    // Pas d'appel réel ici pour des raisons de sécurité, seulement un exemple
    setResponse(sampleResponse);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu de l'API Private Files */}
      <section id="api-private-files" className="space-y-4">
        <h1 className="text-3xl font-bold">API Private Files</h1>
        <p className="text-lg leading-relaxed">
          The <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">GET /private-files</code> endpoint retrieves a paginated list of private files associated with the provided API key. This endpoint requires a valid API key in the request header for authorization.
        </p>
      </section>

      {/* Example Request */}
      <section id="api-private-files-example-request" className="space-y-4">
        <h2 className="text-2xl font-semibold">Example Request</h2>
        <p className="text-lg leading-relaxed">
          Here is how to retrieve private files using different programming languages. Remember to replace <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">YOUR_API_KEY</code> with your actual API key.
        </p>
        <ExampleDisplay
          codeSamples={codeSamples}
          apiKeyWarning={<span className="text-xs">Please replace <span className="text-red-400">YOUR_API_KEY</span> with your actual API key.</span>}
          onRun={handleRun}
          response={response}
        />
      </section>

      {/* Expected Response */}
      <section id="api-private-files-example-response" className="space-y-4">
        <h2 className="text-2xl font-semibold">Expected Response</h2>
        <p className="text-lg leading-relaxed">
          When the request is successful, the server will respond with a JSON object containing metadata of the private files along with pagination information.
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
