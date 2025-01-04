import styles from "./index.module.css";
import { Article, bindCSS, PropsOf } from "@flexive/core";

const cx = bindCSS(styles);

type ExampleProps = PropsOf<"article">;

export const Example = (props: ExampleProps) => (
  <Article className={cx("Example")} p={24} rad={16} {...props}></Article>
);
