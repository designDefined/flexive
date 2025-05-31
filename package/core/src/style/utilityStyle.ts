import { CSSProperties } from "react";
import { parseBoolable, parseSize, SizeValue } from "./value";

export type UtilityStyle = {
  relative?: boolean;
  static?: boolean;
  fixed?: boolean;
  absolute?: boolean;
  sticky?: boolean;
  top?: SizeValue;
  right?: SizeValue;
  bottom?: SizeValue;
  left?: SizeValue;
  z?: number;
  rad?: SizeValue;
};

export const parseUtilityStyle = (utility: UtilityStyle): CSSProperties => {
  return {
    position: utility.relative
      ? "relative"
      : utility.static
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
    zIndex: parseBoolable(utility.z, 0, undefined),
    borderRadius: parseSize(utility.rad),
  };
};
