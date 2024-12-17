import { FullScreen } from "../../component/FullScreen/FullScreen";
import styles from "./HomePage.module.css";
import { bindCSS, Div } from "@flexive/core";

const cx = bindCSS(styles);

export const HomePage = () => {
  return (
    <FullScreen className={cx("HomePage")}>
      <Div row sizeC={300} style={{ background: "antiquewhite" }}>
        <Div grow shrink basis={0} style={{ background: "red" }}></Div>
        <Div grow shrink style={{ background: "blue" }} row alignC>
          <Div style={{ background: "green" }} row></Div>
        </Div>
      </Div>
    </FullScreen>
  );
};
