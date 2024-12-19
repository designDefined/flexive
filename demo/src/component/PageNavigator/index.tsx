import styles from "./index.module.css";
import { NavLink } from "react-router-dom";
import { bindCSS, Nav } from "@flexive/core";

const cx = bindCSS(styles);

type PageNavigatorProps = {
  root?: string;
  items: { to: string; name: string }[];
};

export const PageNavigator = ({ root, items }: PageNavigatorProps) => {
  return (
    <Nav className={cx("PageNavigator")} row px={16} py={8} g={24}>
      {items.map(({ to, name }, i) => (
        <NavLink className={cx("item")} key={i} to={root ? `/${root}${to}` : to}>
          {name}
        </NavLink>
      ))}
    </Nav>
  );
};
