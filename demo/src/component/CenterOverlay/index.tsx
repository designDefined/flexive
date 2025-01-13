import { Article, bindCSS, PropsOf } from "@flexive/core";
import styles from "./index.module.css";
import { useOverlayControl } from "@flexive/operator";

const cx = bindCSS(styles);

type CenterOverlayProps = PropsOf<"article"> & { delay?: number };

export const CenterOverlay = ({ delay, className, children, ...props }: CenterOverlayProps) => {
  const { close, closeAfter } = useOverlayControl();

  return (
    <Article
      className={cx("CenterOverlay", className)}
      onClick={() => (delay ? closeAfter(delay) : close())}
      fixed
      top={0}
      left={0}
      sizeM="100vh"
      sizeC="100vw"
      alignC
      alignM
      {...props}
    >
      {children}
    </Article>
  );
};
