import styles from "./HomePage.module.css";
import { FullScreen } from "../../component/FullScreen/FullScreen";
import { bindCSS, Div, H1 } from "@flexive/core";

const cx = bindCSS(styles);

export const HomePage = () => {
  return (
    <FullScreen className={cx("HomePage")} py={1} pb={3} style={{ background: "red" }} rad={20}>
      <H1 className={cx("title")} absolute right={40} top={200}>
        Flexive!
      </H1>
      <Div px={2} py={4} alignSelfC="start" over overM="scroll" hideC>
        Test
      </Div>
      <Div hide hideC overC></Div>
    </FullScreen>
  );
};
