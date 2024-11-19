import styles from "./HomePage.module.css";
import { FullScreen } from "../../component/FullScreen/FullScreen";
import { bindCSS, Div, H1 } from "@flexive/core";

const cx = bindCSS(styles);

export const HomePage = () => {
  return (
    <FullScreen className={cx("HomePage")} py={1} pb={3} style={{ background: "red" }}>
      <H1 className={cx("title")}>Flexive!</H1>
      <Div px={2} py={4} alignSelfC="start" over overM="scroll" hideC>
        Test
      </Div>
      <Div hide hideC overC></Div>
    </FullScreen>
  );
};
