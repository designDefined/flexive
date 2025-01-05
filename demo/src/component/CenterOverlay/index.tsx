import { Article, bindCSS } from "@flexive/core";
import styles from "./index.module.css";
import { useOverlayControl } from "@flexive/operator";
import { PropsWithChildren } from "react";

const cx = bindCSS(styles);

export const CenterOverlay = ({ children }: PropsWithChildren) => {
  const { close } = useOverlayControl();

  return (
    <Article
      className={cx("CenterOverlay")}
      onClick={() => close()}
      fixed
      top={0}
      left={0}
      sizeM="100vh"
      sizeC="100vw"
      alignC
      alignM
    >
      {children}
    </Article>
  );
};
