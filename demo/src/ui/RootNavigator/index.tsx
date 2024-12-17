import { bindCSS, Nav } from "@flexive/core";
import styles from "./index.module.css";
import { NavLink } from "react-router-dom";

const cx = bindCSS(styles);

export const RootNavigator = () => (
  <Nav className={cx("RootNavigator")} row py={8} g={4}>
    <NavLink className={cx("item")} to="/">
      home
    </NavLink>
    <NavLink className={cx("item")} to="/operator">
      operator
    </NavLink>
  </Nav>
);
