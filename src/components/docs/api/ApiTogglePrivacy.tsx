import ExampleDisplay from "../ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useState } from "react";

export const sectionData = [
  { id: "api-toggle-privacy", title: "API Toggle Privacy" },
];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">POST</span> <span class="text-accent">https://ipfs-api.bakiverse.com/file/toggle-private?cid=YOUR_CID</span> \\
  -H "X-API-Key: <span class="text-red-400">YOUR_API_KEY</span>"`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"POST"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/file/toggle-private?cid=YOUR_CID"</span>, nil)
  req.Header.Set(<span class="text-yellow-400">"X-API-Key"</span>, <span class="text-red-400">"YOUR_API_KEY"</span>)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  fmt.Println("Response status:", resp.Status)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/file/toggle-private?cid=YOUR_CID'</span>, {
  method: <span class="text-yellow-400">'POST'</span>,
  headers: {
    <span class="text-yellow-400">'X-API-Key'</span>: <span class="text-red-400">'YOUR_API_KEY'</span>
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
`,
};

export default function ApiTogglePrivacy({}: DocClicked) {
  const [cid, setCid] = useState<string>(""); // Pour saisir le CID
  const [response, setResponse] = useState<string | null>(null); // Pour afficher la réponse simulée ou une erreur
  const [error, setError] = useState<string | null>(null);

  const handleRun = () => {
    setError(null);
    setResponse(null);

    if (!cid) {
      setError("Please provide a valid CID.");
      return;
    }

    // Simulation de réponse
    const simulatedResponse = {
      cid,
      is_private: Math.random() > 0.5, // Alterne aléatoirement entre privé et public
      message: "File privacy status updated successfully",
    };

    // Simule un délai pour imiter une requête réseau
    setTimeout(() => {
      setResponse(JSON.stringify(simulatedResponse, null, 2));
    }, 1000); // Délai de 1 seconde
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Description du point de terminaison */}
      <section id="api-toggle-privacy" className="space-y-4">
        <h1 className="text-3xl font-bold">API Toggle Privacy</h1>
        <p className="text-lg leading-relaxed">
          The <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">POST /file/toggle-private</code> endpoint allows you to toggle the privacy status of a file using its CID. You must provide a valid API key to access this endpoint.
        </p>
      </section>

      {/* Champ pour saisir le CID */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Input CID</h2>
        <input
          autoComplete="off"

          type="text"
          placeholder="Enter the CID of the file"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          className="w-full p-2 border border-primary rounded-lg bg-transparent text-primary"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </section>

      {/* ExampleDisplay */}
      <section className="space-y-4">
        <ExampleDisplay
          codeSamples={codeSamples}
          apiKeyWarning={
            <span className="text-xs">
              Please replace <span className="text-red-400">YOUR_API_KEY</span>{" "}
              with your actual API key and{" "}
              <span className="text-green-400">YOUR_CID</span> with the CID of
              the file you want to toggle.
            </span>
          }
          onRun={handleRun}
          isIframe={false}
          response={
            response ? (
              <pre className="break-words whitespace-pre-wrap text-accent border border-primary p-4 rounded-md">
                {response}
              </pre>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : null
          }
        />
      </section>
    </div>
  );
}
