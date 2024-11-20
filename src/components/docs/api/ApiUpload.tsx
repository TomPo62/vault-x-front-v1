// components/docs/ApiUpload.tsx
import ExampleDisplay from "@/components/docs/ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useState } from "react";

export const sectionData = [{ id: "api-upload", title: "API Upload" }, { id: "api-upload-example-request", title: "Example" }, { id: "api-upload-example-response", title: "Expected Response" }];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">POST</span> <span class="text-accent">https://ipfs-api.bakiverse.com/upload</span> \\
  -H "X-API-Key: <span class="text-red-400">YOUR_API_KEY</span>" \\
  -F "file=@path/to/your/file.jpg" \\
  -F "is_private=false"`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
  "mime/multipart"
  "os"
  "bytes"
  "io"
)

<span class="text-blue-400">func</span> main() {
  file, _ := os.Open("path/to/your/file.jpg")
  defer file.Close()

  body := &bytes.Buffer{}
  writer := multipart.NewWriter(body)
  part, _ := writer.CreateFormFile("file", "file.jpg")
  io.Copy(part, file)

  writer.WriteField("is_private", "false")
  writer.Close()

  req, _ := http.NewRequest(<span class="text-yellow-400">"POST"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/upload"</span>, body)
  req.Header.Set(<span class="text-yellow-400">"X-API-Key"</span>, <span class="text-red-400">"YOUR_API_KEY"</span>)
  req.Header.Set("Content-Type", writer.FormDataContentType())

  client := &http.Client{}
  resp, _ := client.Do(req)
  defer resp.Body.Close()
  fmt.Println("Response status:", resp.Status)
}`,

  nodejs: `
const formData = new FormData();
formData.append("file", fs.createReadStream("path/to/your/file.jpg"));
formData.append("is_private", "false");

fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/upload'</span>, {
  method: <span class="text-yellow-400">'POST'</span>,
  headers: {
    <span class="text-yellow-400">'X-API-Key'</span>: <span class="text-red-400">'YOUR_API_KEY'</span>
  },
  body: formData
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
`,
};

const sampleResponse = `{
  "cid": "QmT5gM2prABYv16XmVKt4FHC3beGq8RZrKo9SUJGW7B9o4",
  "message": "File uploaded successfully"
}`;

export default function ApiUpload({}: DocClicked) {
  const [response, setResponse] = useState<string>("");

  const handleRun = async () => {
    try {
      setResponse(sampleResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu de l'API Upload */}
      <section id="api-upload" className="space-y-4">
        <h1 className="text-3xl font-bold">API Upload</h1>
        <p className="text-lg leading-relaxed">
          The <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">POST /upload</code> endpoint allows you to upload a file to the IPFS system. An API key is required for authorization. This endpoint accepts a file and an optional <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">is_private</code> flag.
        </p>
      </section>

      {/* Example Request */}
      <section id="api-upload-example-request" className="space-y-4">
        <h2 className="text-2xl font-semibold">Example Request</h2>
        <p className="text-lg leading-relaxed">
          Here is how to upload a file using different programming languages. Remember to replace <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">YOUR_API_KEY</code> with your actual API key, and specify the correct file path.
        </p>
        <ExampleDisplay
          codeSamples={codeSamples}
          apiKeyWarning={<span className="text-xs">Please replace <span className="text-red-400">YOUR_API_KEY</span> with your actual API key.</span>}
          response={response}
          onRun={handleRun}
        />
      </section>

      {/* Expected Response */}
      <section id="api-upload-example-response" className="space-y-4">
        <h2 className="text-2xl font-semibold">Expected Response</h2>
        <p className="text-lg leading-relaxed">
          If the upload is successful, the server will respond with a JSON object containing the <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">cid</code> (Content Identifier) of the file and a confirmation message.
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
