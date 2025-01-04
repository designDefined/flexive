import { Article, Div, Main, NativeElementOf, PropsOf } from "@flexive/core";
import { forwardRef } from "react";

type MainContentProps = PropsOf<"article"> & { mainProps?: Omit<PropsOf<"main">, "children"> };

export const MainContent = forwardRef<NativeElementOf<"article">, MainContentProps>(
  ({ mainProps, children, ...props }, ref) => (
    <Article row ref={ref} {...props}>
      <Div grow={1} basis={16} />
      <Main f basis={720} {...mainProps}>
        {children}
      </Main>
      <Div grow={1} basis={16} />
    </Article>
  ),
);
