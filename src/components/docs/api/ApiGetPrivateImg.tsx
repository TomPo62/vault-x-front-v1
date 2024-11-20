// components/docs/ApiGetPrivateImageByCID.tsx
import ExampleDisplay from "../ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export const sectionData = [
  { id: "api-get-private-image-by-cid", title: "API Get Private Image by CID" },
];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://ipfs-api.bakiverse.com/file/private/img?cid=YOUR_CID</span> \\
  -H "X-API-Key: <span class="text-red-400">YOUR_API_KEY</span>"`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/file/private/img?cid=YOUR_CID"</span>, nil)
  req.Header.Set(<span class="text-yellow-400">"X-API-Key"</span>, <span class="text-red-400">"YOUR_API_KEY"</span>)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  fmt.Println("Response status:", resp.Status)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/file/private/img?cid=YOUR_CID'</span>, {
  method: <span class="text-yellow-400">'GET'</span>,
  headers: {
    <span class="text-yellow-400">'X-API-Key'</span>: <span class="text-red-400">'YOUR_API_KEY'</span>
  }
})
  .then(response => response.blob())
  .then(blob => {
    console.log("Private image blob received", blob);
  })
  .catch(error => console.error('Error:', error));
`,
};

export default function ApiGetPrivateImageByCID({}: DocClicked) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    try {
      const res = await axios.get(
        "https://ipfs-api.bakiverse.com/file/private/img",
        {
          params: { cid: "QmXpgZxotFMgh7uWgCP3nZFhASRtDTRgjyEUwH88fNyWUq" },
          headers: {
            "X-API-Key": "RtOquJoeT5cXLBM3f8P3yxPKdeqcDRYRwJ4evgkJAWs=",
          },
          responseType: "blob",
        }
      );
      const mimeType = res.headers["content-type"];
      if (mimeType.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result as string);
        };
        reader.readAsDataURL(res.data);
      } else {
        setError("The provided CID does not correspond to an image.");
      }
    } catch (err) {
      setError("Error fetching private image: " + (err as Error).message);
    }
  };

  useEffect(() => {
    handleRun();
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <section id="api-get-private-image-by-cid" className="space-y-4">
        <h1 className="text-3xl font-bold">API Get Private Image by CID</h1>
        <p className="text-lg leading-relaxed">
          The <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">GET /file/private/img</code> endpoint allows you to retrieve
          a private image using its CID. You must provide a valid API key. If
          the image is not found, is not private, or if the API key is invalid,
          appropriate error messages will be returned.
        </p>
      </section>

      <ExampleDisplay
        codeSamples={codeSamples}
        onRun={handleRun}
        response={
          imageSrc ? (
            <Image
              src={imageSrc}
              alt="Private Image"
              className="w-full rounded-md"
            />
          ) : (
            error
          )
        }
      />
    </div>
  );
}
