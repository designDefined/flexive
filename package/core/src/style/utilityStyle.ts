////////////////////////////

///////////////////////////

import { CSSProperties } from "react";
import { parseBoolable, parseSize, SizeValue } from "./value";

export type UtilityStyle = {
  relative?: boolean;
  static?: boolean;
  fixed?: boolean;
  absolute?: boolean;
  sticky?: boolean;
  top?: SizeValue | true;
  right?: SizeValue | true;
  bottom?: SizeValue | true;
  left?: SizeValue | true;
  z?: number | true;
  rad?: SizeValue | true;
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
    top: parseSize(parseBoolable(utility.top, 0)),
    right: parseSize(parseBoolable(utility.right, 0)),
    bottom: parseSize(parseBoolable(utility.bottom, 0)),
    left: parseSize(parseBoolable(utility.left, 0)),
    zIndex: parseBoolable(utility.z, 0),
    borderRadius: parseSize(parseBoolable(utility.rad, 0)),
  };
};
