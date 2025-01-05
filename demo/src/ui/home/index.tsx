import styles from "./index.module.css";
import { bindCSS, H1, Main } from "@flexive/core";

const cx = bindCSS(styles);

export const HomePage = () => {
  return (
    <Main className={cx("HomePage")}>
      <H1 className={cx("title")}>Flexive</H1>
    </Main>
  );
};
