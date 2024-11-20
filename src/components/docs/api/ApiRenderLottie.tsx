import ExampleDisplay from "../ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useState } from "react";

export const sectionData = [
  { id: "api-render-lottie", title: "API Render Lottie" },
  { id: "api-render-lottie-cid", title: "CID" },
  { id: "api-render-lottie-example-request", title: "Example" },
  { id: "api-render-lottie-rendered-lottie", title: "Expected Response" },
];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://veltyr.bakiverse.com/render-lottie?cid=YOUR_CID&textColor=%23e2e2e2</span>`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://veltyr.bakiverse.com/render-lottie?cid=YOUR_CID&textColor=%23e2e2e2"</span>, nil)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  fmt.Println("Response status:", resp.Status)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://veltyr.bakiverse.com/render-lottie?cid=YOUR_CID&textColor=%23e2e2e2'</span>, {
  method: <span class="text-yellow-400">'GET'</span>
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
`,
};

export default function ApiRenderLottie({}: DocClicked) {
  const [error, setError] = useState<string | null>(null);
  const [cid, setCid] = useState<string>(
    "QmZvHecB6uxnLXDnCn6LVSpxN1kYaC9oFmp7d1DRfvCoHo"
  ); // Pour saisir le CID
  const [textColor, setTextColor] = useState<string>("#e2e2e2");
  const [iframeSrc, setIframeSrc] = useState<string | null>(null); // Pour afficher l'iframe avec le CID
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const handleRun = () => {
    if (!cid) {
      setError("Please provide a valid CID."); // Gestion basique des erreurs
      return;
    }

    // Générer l'URL pour l'iframe
    const formattedColor = textColor.startsWith("#") ? textColor : `#${textColor}`;
    setIframeSrc(`${siteUrl}/render-lottie?cid=${cid}&textColor=${encodeURIComponent(formattedColor)}`);
    setError(null);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Description du point de terminaison */}
      <section id="api-render-lottie" className="space-y-4">
        <h1 className="text-3xl font-bold">API Render Lottie</h1>
        <p className="text-lg leading-relaxed">
          The <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">GET /render-lottie</code> endpoint allows you to render a
          Lottie animation dynamically in a web page. Use the <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">cid</code> URL
          parameter to specify the animation to render. Optionally, you can also
          pass a <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">textColor</code> parameter to customize the text color for
          loading and error messages. If no <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">textColor</code> is provided, the
          default is black (<code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">#000000</code>).
        </p>
        <p className="text-lg leading-relaxed">
          Example URL: <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">https://veltyr.bakiverse.com/render-lottie?cid=YOUR_CID&textColor=%23e2e2e2</code>
        </p>
      </section>

      {/* Champ pour saisir le CID */}
      <section id="api-render-lottie-cid" className="space-y-4">
        <h2 className="text-2xl font-semibold">Input Parameters</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-2">
          <label className="block text-sm font-semibold">CID</label>
          <input
          autoComplete="off"

            type="text"
            placeholder="Enter the CID of the Lottie animation"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            className="w-full p-2 border border-primary rounded-lg bg-transparent text-primary"
            autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-semibold">Text Color</label>
          <input
          autoComplete="off"

            type="text"
            placeholder="Enter a HEX color (e.g., #e2e2e2)"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-full p-2 border border-primary rounded-lg bg-transparent text-primary"
            autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          />
        </div>
      </section>

      {/* Exemple d'appel à l'API */}
      <section id="api-render-lottie-example-request" className="space-y-4">
        <ExampleDisplay
          codeSamples={codeSamples}
          apiKeyWarning={
            <span className="text-xs">
              No API key is required for this endpoint.
            </span>
          }
          onRun={handleRun}
        />
      </section>

      {/* Affichage de l'animation Lottie */}
      {iframeSrc && (
        <section id="api-render-lottie-rendered-lottie" className="space-y-4">
          <h2 className="text-2xl font-semibold">Rendered Lottie</h2>
          <div className="w-full mt-4 bg-transparent backdrop-blur-xs text-primary rounded-md relative border border-primary h-[500px] overflow-hidden">
            <iframe
              className="w-full h-full border-none"
              src={iframeSrc}
              title="Rendered Lottie Animation"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
          </div>
        </section>
      )}
    </div>
  );
}
