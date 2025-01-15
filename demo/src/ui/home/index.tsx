import styles from "./index.module.css";
import { bindCSS, Div, H1, Main } from "@flexive/core";

const cx = bindCSS(styles);

export const HomePage = () => {
  return (
    <Main className={cx("HomePage")}>
      <H1 className={cx("title")}>Flexive</H1>
      <Div sizeM={500} wrap alignC="start" g={200} gM={100}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(val => {
          return (
            <Div key={val} sizeM={80} sizeC={80} alignC alignM style={{ border: "1px solid black" }}>
              {val}
            </Div>
          );
        })}
      </Div>
    </Main>
  );
};
