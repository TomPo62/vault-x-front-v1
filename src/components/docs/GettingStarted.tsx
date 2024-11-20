import Link from "next/link";
import CopyButton from "../ui/CopyButton";
import { DocClicked } from "@/types/types";

// components/docs/GettingStarted.tsx
export const sectionData = [
  { id: "getting-started-overview", title: "Getting Started Overview" },
  { id: "getting-started-api-key-request", title: "Requesting an API Key" },
  { id: "getting-started-testing-api-key", title: "Testing Your API Key" },
];

const sample = `fetch('https://ipfs-api.bakiverse.com/public-files', {
                  method: 'GET',
                  headers: {
                    'X-API-Key': 'YOUR_API_KEY',
                  }
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error(error));`;

const errorSample = `Invalid API Key.`;

export default function GettingStarted({}: DocClicked) {
  return (
    <div className="space-y-8 pb-8">
      {/* Aperçu du démarrage */}
      <section id="getting-started-overview" className="space-y-4">
        <h1 className="text-3xl font-bold">Veltyr Getting Started</h1>
        <p className="text-lg leading-relaxed">
          Welcome to the Veltyr Getting Started guide! This section will walk
          you through the initial steps to set up and test your access to
          Veltyr. Here, you&apos;ll learn how to request your API key and use it to
          interact with our service.
        </p>
      </section>

      {/* Demande d'une API Key */}
      <section id="getting-started-api-key-request" className="space-y-4">
        <h2 className="text-2xl font-semibold">Requesting an API Key</h2>
        <p className="text-lg leading-relaxed">
          To get started with Veltyr, you&apos;ll need an API key, which allows
          secure access to our service. You can request an API key on our main
          page by following these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-lg leading-relaxed">
          <li>
            Go to the main page of{" "}
            <Link
              className="text-accent hover:text-accentHover transition-one"
              href="/"
              target="_blank"
            >
              Veltyr
            </Link>
            .
          </li>
          <li>Enter your email in the input.</li>
          <li>
            Submit the form, and an API key will be dropped to your mailbox.
          </li>
        </ol>
        <p className="text-base leading-relaxed">
          Once you&apos;ve received the API key, keep it secure, as it will be
          required for all interactions with Veltyr.
        </p>
      </section>

      {/* Test de l'API Key */}
      <section id="getting-started-testing-api-key" className="space-y-4">
        <h2 className="text-2xl font-semibold">Testing Your API Key</h2>
        <p className="text-lg leading-relaxed">
          After receiving your API key, you can test it by making an HTTP
          request to our API. Use the following steps to verify your key:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-lg leading-relaxed">
          <li>Open your favorite API testing tool (e.g., Postman or Curl).</li>
          <li>
            Set up a request to Veltyr&apos;s endpoint (for example,{" "}
            <code className="text-accent text-base">
              https://ipfs-api.bakiverse.com/public-files
            </code>
            ).
          </li>
          <li>
            In the request headers, add a new header with the key{" "}
            <code className="text-accent text-base">X-API-Key</code> and paste
            your API key as the value.
            <br />
            <div className="text-base leading-relaxed flex flex-col ml-2">
              It should look like this:
              <pre className="px-2 break-words whitespace-pre-wrap py-4 pt-6 border border-primary rounded-lg relative">
                <div className="absolute w-full top-0 right-0 items-center flex justify-between">
                  <span className="text-xs mb-2 ml-2 text-background bg-primary rounded-sm px-2">
                    JS
                  </span>
                  <CopyButton classNameToAdd="text-xs mr-2" text={sample} />
                </div>
                <code
                  className="text-accent text-sm "
                  dangerouslySetInnerHTML={{ __html: sample }}
                ></code>
              </pre>
            </div>
          </li>

          <li>
            Send the request. If your API key is valid, you should receive a
            successful response comparable to that of the{" "}
            <span className="text-accent">Try It Out</span> available on the
            right. Otherwise, you may get an authentication error (e.g., 401)
            like this one :
            <pre className="px-2 break-words whitespace-pre-wrap py-4 pt-8 border border-primary rounded-lg relative">
              <div className="absolute w-full top-2 right-0 items-center flex justify-between">
                <span className="text-xs mb-2 ml-2 text-background bg-primary rounded-sm px-2">
                  JSON
                </span>
              </div>
              <code
                className="text-red-500 text-sm"
                dangerouslySetInnerHTML={{ __html: errorSample }}
              ></code>
            </pre>
          </li>
        </ol>
        <p className="text-lg leading-relaxed">
          This step confirms that your API key is working correctly and that you
          are authenticated to use Veltyr&apos;s features.
        </p>
      </section>
    </div>
  );
}
