import styles from "./index.module.css";
import { Article, bindCSS, PropsOf } from "@flexive/core";

const cx = bindCSS(styles);

type ModalProps = PropsOf<"article">;

export const Modal = ({ className, ...props }: ModalProps) => (
  <Article className={cx("Modal", className)} overM rad={16} {...props} />
);
