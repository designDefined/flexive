import { bindCSS, Button as _Button, PropsOf } from "@flexive/core";
import styles from "./index.module.css";
import { THEME } from "@style/constant";

const cx = bindCSS(styles);

type ButtonProps = PropsOf<"button"> & {
  theme?: THEME;
  design?: "outlined" | "filled";
};

export const Button = ({ className, theme = "black", design = "outlined", p, ...props }: ButtonProps) => (
  <_Button
    className={cx("Button", "heading-sans", theme, design, className)}
    px={p ?? 6}
    py={p ?? 4}
    rad={8}
    {...props}
  />
);
