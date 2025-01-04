import styles from "./index.module.css";
import { Article, bindCSS, PropsOf } from "@flexive/core";
import { Highlight } from "prism-react-renderer";

const cx = bindCSS(styles);

type CodeBlockProps = PropsOf<"article"> & { code: string; language?: string; lineNumber?: boolean };

export const CodeBlock = ({ code, language = "tsx", lineNumber, className, ...props }: CodeBlockProps) => {
  return (
    <Article className={cx("CodeBlock", className)} p={16} rad={16} {...props}>
      <Highlight code={code} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {lineNumber && <span>{i + 1} </span>}
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Article>
  );
};
