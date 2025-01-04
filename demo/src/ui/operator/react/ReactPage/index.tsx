import styles from "./index.module.css";
import { Article, bindCSS, H1, Header, Main, Section } from "@flexive/core";
import { UseChildrenArraySection } from "../UseChildrenArraySection";

const cx = bindCSS(styles);

export const ReactPage = () => {
  return (
    <Article className={cx("ReactPage")}>
      <H1> React Operator</H1>
      <Main>
        <UseChildrenArraySection />
      </Main>
    </Article>
  );
};
