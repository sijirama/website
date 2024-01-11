import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as CodeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

// I GOT THIS CODE FROM THE FUCKING INTERNET, I'M INNOCENT.

interface Props {
  className: string;
  children: any;
}

const CodeBlock = ({ className, children }: Props) => {
  let lang = "text"; // default monospaced text
  if (className && className.startsWith("lang-")) {
    lang = className.replace("lang-", "");
  }
  return (
    <SyntaxHighlighter language={lang} style={CodeStyle}>
      {children}
    </SyntaxHighlighter>
  );
};

// markdown-to-jsx uses <pre><code/></pre> for code blocks.
export const PreBlock = ({ children, ...rest }: Props) => {
  if ("type" in children && children["type"] === "code") {
    return CodeBlock(children["props"]);
  }
  return <pre {...rest}>{children}</pre>;
};
