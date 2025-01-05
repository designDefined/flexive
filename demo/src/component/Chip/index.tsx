import { bindCSS, Div, PropsOf } from "@flexive/core";
import styles from "./index.module.css";
import { THEME } from "@style/constant";

const cx = bindCSS(styles);

type ChipProps = PropsOf<"div"> & { theme?: THEME };

export const Chip = ({ className, p, theme = "black", ...props }: ChipProps) => (
  <Div className={cx("Chip", theme, className)} px={p ?? 12} py={p ?? 4} rad={100} {...props} />
);
