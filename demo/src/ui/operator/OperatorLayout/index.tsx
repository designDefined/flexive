import styles from "./index.module.css";
import { Article, bindCSS } from "@flexive/core";
import { Outlet } from "react-router-dom";
import { PageNavigator } from "../../../module/PageNavigator";
import { MainContent } from "@component/MainContent";

const cx = bindCSS(styles);

export const OperatorLayout = () => {
  return (
    <Article className={cx("OperatorLayout")}>
      <PageNavigator
        root="operator"
        items={[
          { to: "", name: "home" },
          { to: "/overlay", name: "Overlay" },
          { to: "/react", name: "React" },
          { to: "/temporal", name: "Temporal" },
        ]}
      />
      <MainContent>
        <Outlet />
      </MainContent>
    </Article>
  );
};
