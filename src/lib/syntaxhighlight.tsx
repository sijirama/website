"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Props {
  className?: string;
  children: any;
}

const CodeBlock = ({ className, children }: Props) => {
  const [copied, setCopied] = useState(false);

  let lang = "text";
  if (className && className.startsWith("lang-")) {
    lang = className.replace("lang-", "");
  }

  const code = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-4 not-prose">
      {/* Language label */}
      <div className="absolute top-0 left-0 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400 bg-zinc-900 rounded-tl-lg rounded-br-lg border-b border-r border-zinc-700">
        {lang}
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 opacity-0 group-hover:opacity-100 transition-all duration-200"
        title="Copy code"
      >
        {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4" />}
      </button>

      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "2.5rem 1rem 1rem 1rem",
          borderRadius: "0.5rem",
          fontSize: "0.8rem",
          lineHeight: "1.6",
          background: "#18181b", // zinc-900
        }}
        codeTagProps={{
          style: {
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

// markdown-to-jsx uses <pre><code/></pre> for code blocks.
export const PreBlock = ({ children, ...rest }: Props) => {
  if ("type" in children && children["type"] === "code") {
    return CodeBlock(children["props"]);
  }
  return <pre {...rest} className="not-prose">{children}</pre>;
};
