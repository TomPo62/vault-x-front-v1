import ExampleDisplay from "@/components/docs/ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useState } from "react";

export const sectionData = [{ id: "api-root", title: "API Root" }, { id: "root-example-request", title: "Example" }, { id: "root-example-response", title: "Expected Response" }];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://ipfs-api.bakiverse.com/</span>`,
  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
  "io/ioutil"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/"</span>, nil)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(<span class="text-accent">string(body)</span>)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/'</span>, {
  method: <span class="text-yellow-400">'GET'</span>,
})
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
`,
};

const sampleResponse = `"Hello, from Baki-IPFS-Service!"`;

export default function ApiRoot({}: DocClicked) {
  const [response, setResponse] = useState<string>("");

  const handleRun = async () => {
    try {
      const response = await fetch("https://ipfs-api.bakiverse.com/", {
        method: "GET",
      });
      const data = await response.text();
      setResponse(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu de l'API Root */}
      <section id="api-root" className="space-y-4">
        <h1 className="text-3xl font-bold">API Root</h1>
        <p className="text-lg leading-relaxed">
          The root endpoint of Veltyr&apos;s API responds with a welcome message,
          confirming that the service is up and running. This response will also
          be returned for any requests made to invalid or non-existent routes.
        </p>
      </section>

      {/* Example Request */}
      <section id="root-example-request" className="space-y-4">
        <h2 className="text-2xl font-semibold">Example Request</h2>
        <p className="text-lg leading-relaxed">
          You can check the API status by making a GET request to the root
          endpoint. Here&apos;s an example of how to do this in various languages:
        </p>
        <ExampleDisplay
          codeSamples={codeSamples}
          onRun={handleRun}
          response={response}
        />
      </section>

      {/* Expected Response */}
      <section id="root-example-response" className="space-y-4">
        <h2 className="text-2xl font-semibold">Expected Response</h2>
        <p className="text-lg leading-relaxed">
          When the request is successful, the server will respond with a simple
          text message. This message is also returned if you request an invalid
          endpoint.
        </p>
        <pre className="px-2 break-words whitespace-pre-wrap py-4 pt-8 border border-primary rounded-lg relative">
          <div className="absolute top-2 left-2 items-center flex justify-between">
            <span className="text-xs mb-2 ml-2 text-background bg-primary rounded-sm px-2">
              TEXT
            </span>
          </div>
          <code className="text-accent text-sm">{sampleResponse}</code>
        </pre>
      </section>
    </div>
  );
}
