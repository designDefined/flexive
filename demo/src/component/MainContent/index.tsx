import { Article, Div, Main, PropsOf } from "@flexive/core";

type MainContentProps = PropsOf<"article"> & { mainProps?: Omit<PropsOf<"main">, "children"> };

export const MainContent = ({ mainProps, children, ref, ...props }: MainContentProps) => (
  <Article row ref={ref} {...props}>
    <Div grow={1} basis={16} />
    <Main f basis={720} {...mainProps}>
      {children}
    </Main>
    <Div grow={1} basis={16} />
  </Article>
);
