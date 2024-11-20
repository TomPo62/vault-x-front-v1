// components/docs/TryItOutV1.tsx
"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import ExampleDisplay from "./ExampleDisplay";

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://ipfs-api.bakiverse.com/public-files</span> \\
  -H "X-API-Key: <span class="text-red-400">YOUR_API_KEY</span>"`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
  "io/ioutil"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/public-files"</span>, nil)
  req.Header.Set(<span class="text-yellow-400">"X-API-Key"</span>, <span class="text-red-400">"YOUR_API_KEY"</span>)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(<span class="text-accent">string(body)</span>)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/public-files'</span>, {
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

export default function TryItOutV1() {
  const [response, setResponse] = useState<string>("");

  const handleRun = async () => {
    try {
      const limitBtw = Math.floor(Math.random() * 55) + 1;
      const result = await axios.get("/api/getPublicFiles", {
        params: { page: limitBtw, limit: 1 },
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
    <div className="w-full flex flex-col my-4 items-center gap-4 mx-auto p-4 border border-primary rounded-lg bg-transparent backdrop-blur-xs text-primary">
      <ExampleDisplay
        codeSamples={codeSamples}
        apiKeyWarning={<span className="text-xs">Please replace <span className="text-red-400">YOUR_API_KEY</span> with your actual API key.</span>}
        onRun={handleRun}
        response={response}
      />
    </div>
  );
}
