import { Article, FlexiveArticleProps, useFlexiveSystem } from "@flexive/core";

type PageProps = FlexiveArticleProps;

export function FullScreen({ f, className, children }: PageProps) {
  const { fx, cx } = useFlexiveSystem(true, { f, className });

  return (
    <Article
      className={cx.root()}
      f={fx.root({
        align: ["baseline", "hidden", "100vw", "100vw"],
        justify: ["start", "auto", "100vh", "100vh"],
      })}
    >
      {children}
    </Article>
  );
}
