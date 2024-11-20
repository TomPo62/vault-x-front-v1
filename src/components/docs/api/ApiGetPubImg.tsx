// components/docs/ApiGetPublicImageByCID.tsx
import ExampleDisplay from "../ExampleDisplay";
import { DocClicked } from "@/types/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export const sectionData = [
  { id: "api-get-public-image-by-cid", title: "API Get Public Image by CID" },
];

const codeSamples = {
  curl: `<span class="text-blue-400">curl</span> -X <span class="text-yellow-400">GET</span> <span class="text-accent">https://ipfs-api.bakiverse.com/file/img?cid=YOUR_CID</span> \\
  -H "X-API-Key: <span class="text-red-400">YOUR_API_KEY</span>"`,

  golang: `
<span class="text-blue-400">import</span> (
  "fmt"
  "net/http"
)

<span class="text-blue-400">func</span> main() {
  client := &http.Client{}
  req, _ := http.NewRequest(<span class="text-yellow-400">"GET"</span>, <span class="text-accent">"https://ipfs-api.bakiverse.com/file/img?cid=YOUR_CID"</span>, nil)
  req.Header.Set(<span class="text-yellow-400">"X-API-Key"</span>, <span class="text-red-400">"YOUR_API_KEY"</span>)

  resp, _ := client.Do(req)
  defer resp.Body.Close()
  fmt.Println("Response status:", resp.Status)
}`,

  nodejs: `
fetch(<span class="text-accent">'https://ipfs-api.bakiverse.com/file/img?cid=YOUR_CID'</span>, {
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

export default function ApiGetPublicImageByCID({}: DocClicked) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    try {
      const res = await axios.get("https://ipfs-api.bakiverse.com/file/img", {
        params: { cid: "QmdgaQxryHPqVpfxQMeCJV1BpFA5on5fM7DjorYnoLYEXh" },
        headers: {
          "X-API-Key": "RNf-iCEGtz9xecvwPw-f1yn1thOR4gad1ExY-ccZkLw=",
        },
        responseType: "blob",
      });
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
      <section id="api-get-public-image-by-cid" className="space-y-4">
        <h1 className="text-3xl font-bold">API Get Public Image by CID</h1>
        <p className="text-lg leading-relaxed">
          The <code className="text-sm leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">GET /file/img</code> endpoint allows you to retrieve a
          public image using its CID. If the CID does not correspond to an
          image, or if the image is private, appropriate error messages will be
          returned.
        </p>
      </section>

      <ExampleDisplay
        codeSamples={codeSamples}
        onRun={handleRun}
        response={
          imageSrc ? (
            <Image
              src={imageSrc}
              alt="Public Image"
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
