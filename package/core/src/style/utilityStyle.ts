import { CSSProperties } from "react";
import { parseSize, SizeValue } from "./value";

export type UtilityStyle = {
  static?: boolean;
  fixed?: boolean;
  absolute?: boolean;
  sticky?: boolean;
  top?: SizeValue;
  right?: SizeValue;
  bottom?: SizeValue;
  left?: SizeValue;
  rad?: SizeValue;
};

export const parseUtilityStyle = (utility: UtilityStyle): CSSProperties => {
  return {
    position: utility.static
      ? "static"
      : utility.fixed
        ? "fixed"
        : utility.absolute
          ? "absolute"
          : utility.sticky
            ? "sticky"
            : "relative",
    top: parseSize(utility.top),
    right: parseSize(utility.right),
    bottom: parseSize(utility.bottom),
    left: parseSize(utility.left),
    borderRadius: parseSize(utility.rad),
  };
};
