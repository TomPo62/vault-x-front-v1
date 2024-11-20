// components/docs/ApiGetPublicFileByCID.tsx
import ExampleDisplay from "@/components/docs/ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useState } from "react";
import axios from "axios";

export const sectionData = [
  { id: "api-get-public-file-by-cid", title: "API Get Public File by CID" },
  {id: "cid-input", title: "CID"},
  { id: "api-get-public-file-by-cid-example-request", title: "Example" },
  {
    id: "api-get-public-file-by-cid-excepted-response",
    title: "Expected Response",
  },
];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://ipfs-api.bakiverse.com/file/public?cid=YOUR_CID</span> \\
  -H "X-API-Key: <span class="text-red-400">YOUR_API_KEY</span>"`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
  "io/ioutil"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/file/public?cid=YOUR_CID"</span>, nil)
  req.Header.Set(<span class="text-yellow-400">"X-API-Key"</span>, <span class="text-red-400">"YOUR_API_KEY"</span>)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(<span class="text-accent">string(body)</span>)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/file/public?cid=YOUR_CID'</span>, {
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

const staticResponse = `{
  "files": [
    {
      "cid": "Qm...",
      "file_name": "example.jpg",
      "mime_type": "image/jpeg",
      "file_size": 1024
    }
  ]
}`;

export default function ApiGetPublicFileByCID({}: DocClicked) {
  const [response, setResponse] = useState<string>("");
  const [cid, setCid] = useState<string>("");

  const handleRun = async () => {
    if (!cid) {
      console.warn("CID is required.");
      setResponse("Please provide a valid CID.");
      return;
    }

    try {
      // Faire appel à l'API SSR
      const res = await axios.get("/api/getPubFileByCID", {
        params: { cid },
      });
      setResponse(JSON.stringify(res.data, null, 2)); // Format JSON pour affichage
    } catch (error) {
      console.error("Error fetching file information:", error);
      setResponse("File is not public or does not exist.");
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu de l'API Get Public File by CID */}
      <section id="api-get-public-file-by-cid" className="space-y-4">
        <h1 className="text-3xl font-bold">API Get Public File by CID</h1>
        <p className="text-lg leading-relaxed">
          The{" "}
          <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">
            GET /file/public
          </code>{" "}
          endpoint allows you to retrieve metadata for a public file by its CID.
          This endpoint requires a valid API key.
        </p>
      </section>

      {/* CID Input */}
      <section id="cid-input" className="space-y-4">
        <h2 className="text-2xl font-semibold">File CID</h2>
        <input
          autoComplete="off"

          type="text"
          placeholder="Enter file CID"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          className="w-full p-2 border border-primary rounded-lg bg-transparent text-primary"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </section>

      {/* Example Request */}
      <section
        id="api-get-public-file-by-cid-example-request"
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold">Example Request</h2>
        <p className="text-lg leading-relaxed">
          Below is an example of how to make a request to this endpoint in
          different languages. Replace{" "}
          <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">
            YOUR_API_KEY
          </code>{" "}
          and{" "}
          <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">
            YOUR_CID
          </code>{" "}
          with the appropriate values.
        </p>
        <ExampleDisplay
          codeSamples={codeSamples}
          apiKeyWarning={
            <span className="text-xs">
              Remember to replace{" "}
              <span className="text-red-400">YOUR_API_KEY</span> and{" "}
              <span className="text-accent">YOUR_CID</span> with actual values.
            </span>
          }
          onRun={handleRun}
          response={response}
        />
      </section>

      {/* Expected Response */}
      <section
        id="api-get-public-file-by-cid-excepted-response"
        className="space-y-4"
      >
        <h2 className="text-2xl font-semibold">Expected Response</h2>
        <p className="text-lg leading-relaxed">
          A successful request will return a JSON object containing metadata for
          the file. Below is an example of the expected response:
        </p>
        <pre className="px-2 break-words whitespace-pre-wrap py-4 pt-8 border border-primary rounded-lg relative">
          <div className="absolute top-2 left-2 items-center flex justify-between">
            <span className="text-xs mb-2 ml-2 text-background bg-primary rounded-sm px-2">
              JSON
            </span>
          </div>
          <code className="text-accent text-sm">{staticResponse}</code>
        </pre>
      </section>
    </div>
  );
}
