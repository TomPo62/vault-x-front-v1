// components/docs/ExampleDisplay.tsx
"use client";
import { ReactNode, useState } from "react";
import CopyButton from "../ui/CopyButton";
import { BsFillPlayFill } from "react-icons/bs";

interface CodeSamples {
  [key: string]: string;
}

interface ExampleDisplayProps {
  codeSamples: CodeSamples;
  apiKeyWarning?: ReactNode;
  onRun?: () => void;
  response?: string | ReactNode;
  isIframe?: boolean;
}

const languages = ["curl", "golang", "nodejs"];

export default function ExampleDisplay({
  codeSamples,
  apiKeyWarning,
  onRun,
  response,
  isIframe = false,
}: ExampleDisplayProps) {
  const [language, setLanguage] = useState<string>("curl");

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className="w-full flex flex-col my-4 items-center gap-4 mx-auto p-4 border border-primary rounded-lg bg-transparent backdrop-blur-xs text-primary">
      <h3 className="text-base font-medium mb-4">Example Code</h3>

      {/* Language Selector */}
      <div className="w-full flex justify-between">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`px-4 py-2 text-sm ${
              language === lang
                ? "bg-primary text-background"
                : "bg-transparent border border-primary"
            } rounded-md`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Code Block */}
      <div className="w-full mt-4 p-4 bg-transparent backdrop-blur-xs text-background rounded-md overflow-auto custom-scrollbar relative pt-12 border border-primary">
        <div className="absolute top-0 left-0 w-full px-4 flex items-center justify-between">
          <span className="text-xs ml-2 text-background bg-primary rounded-sm px-2">
            {language.toUpperCase()}
          </span>
          <div className="flex items-center justify-center">
            {onRun && (
              <button
                onClick={onRun}
                className="mr-2 bg-primary hover:bg-first-hover text-background font-bold py-2 px-4 rounded mt-2 transition-one text-xs" title="Run"
              >
                <BsFillPlayFill />
              </button>
            )}
            <CopyButton
              classNameToAdd="text-xs mr-2"
              text={codeSamples[language]}
              cleanHtml={true}
              
            />
          </div>
        </div>
        <pre className="text-xs px-2 break-words whitespace-pre-wrap text-primary">
          <code
            dangerouslySetInnerHTML={{ __html: codeSamples[language] }}
            className="text-xs px-2 break-words whitespace-pre-wrap leading-relaxed font-[family-name:var(--font-jetbrains-mono)]"
          />
        </pre>
      </div>

      {/* API Key Warning */}
      {apiKeyWarning && (
        <p className="text-xs mt-2 text-first-hover text-center w-full">
          {apiKeyWarning}
        </p>
      )}

      {/* Display API Response */}
      {!isIframe ? (
        <>
          {response && (
            <div className="w-full mt-4 p-4 bg-transparent backdrop-blur-xs text-primary rounded-md text-xs overflow-auto custom-scrollbar relative">
              <h4 className="font-medium mb-2 text-sm">Response:</h4>
              <pre className="break-words whitespace-pre-wrap text-accent border border-primary p-4 rounded-md">
                <code className="text-xs leading-relaxed px-2 break-words whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)]">
                  {response}
                </code>
              </pre>
            </div>
          )}
        </>
      ) : (
        <div className="w-full mt-4 bg-transparent backdrop-blur-xs text-primary rounded-md relative">
          <h4 className="font-medium mb-2 text-sm">Response displayed:</h4>
          {response && (
            <iframe
              className="w-full h-[550px] overflow-auto custom-scrollbar border border-primary rounded-md bg-transparent backdrop-blur-xs"
              src={
                `https://ipfs-api.bakiverse.com/file/display?cid=${response}` ||
                ""
              }
              title="File Display"
              sandbox="allow-same-origin allow-scripts allow-popups"
            ></iframe>
          )}
        </div>
      )}
    </div>
  );
}
