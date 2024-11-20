// components/docs/ApiDisplayFile.tsx
import ExampleDisplay from "@/components/docs/ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useState } from "react";

export const sectionData = [
  { id: "api-display-file", title: "API Display File" },
  { id: "api-display-file-cid", title: "File CID" },
  { id: "api-display-file-example-request", title: "Example" },

];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://ipfs-api.bakiverse.com/file/display?cid=YOUR_CID</span>`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/file/display?cid=YOUR_CID"</span>, nil)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  fmt.Println("File displayed successfully!")
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/file/display?cid=YOUR_CID'</span>, {
  method: <span class="text-yellow-400">'GET'</span>
})
  .then(() => console.log("File displayed successfully!"))
  .catch(error => console.error('Error:', error));
`,
};

export default function ApiDisplayFile({}: DocClicked) {
  const [cid, setCid] = useState<string>("Qmf5ryrZCq4JgLxKBQ6AUopS9KBEoymKvpYhYXGZfbYm1V");

  const handleRun = () => {
    setCid(cid); // Exemple de CID pour démonstration
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu de l'API Display File */}
      <section id="api-display-file" className="space-y-4">
        <h1 className="text-3xl font-bold">API Display File</h1>
        <p className="text-lg leading-relaxed">
          The <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">GET /file/display</code> endpoint allows you to display a public file directly in your project using its CID. This is ideal for integrating media (images, videos, etc.) without storing them directly in your project.
        </p>
      </section>

      {/* CID Input */}
      <section id="api-display-file-cid" className="space-y-4">
        <h2 className="text-2xl font-semibold">File CID</h2>
        <input
          type="text"
          placeholder="Enter file CID"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          autoComplete="off"
          className="w-full p-2 border border-primary rounded-lg bg-transparent text-primary"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </section>

      {/* Example Request */}
      <section id="api-display-file-example-request" className="space-y-4">
        <h2 className="text-2xl font-semibold">Example Request</h2>
        <p className="text-lg leading-relaxed">
          Below is an example of how to use this endpoint in various languages. Replace <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">YOUR_CID</code> with the CID of the file you wish to display.
        </p>
        <ExampleDisplay
          apiKeyWarning={<span className="text-xs">Please replace <span className="text-red-400">YOUR_CID</span> with the CID of the file you wish to display.</span>}
          codeSamples={codeSamples}
          onRun={handleRun}
          response={cid} // Utilisé comme source de l'iframe
          isIframe={true}
        />
      </section>
    </div>
  );
}
