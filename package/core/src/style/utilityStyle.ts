import { CSSProperties } from "react";
import { isUndefined, parseBoolable, parseSize, SizeValue } from "./value";

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

/**
 * Merges the four offsets into the `inset` shorthand, but only when all of them are set —
 * a partial `inset` would reset the remaining sides to `auto`.
 */
const parseInset = (top?: string, right?: string, bottom?: string, left?: string): string | undefined => {
  if (isUndefined(top) || isUndefined(right) || isUndefined(bottom) || isUndefined(left)) return undefined;
  if (top === bottom && right === left) return top === right ? top : `${top} ${right}`;
  return `${top} ${right} ${bottom} ${left}`;
};

export const parseUtilityStyle = (utility: UtilityStyle): CSSProperties => {
  const top = parseSize(parseBoolable(utility.top, 0));
  const right = parseSize(parseBoolable(utility.right, 0));
  const bottom = parseSize(parseBoolable(utility.bottom, 0));
  const left = parseSize(parseBoolable(utility.left, 0));
  const inset = parseInset(top, right, bottom, left);

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
              : undefined, // The `.flx` class supplies `position:relative`, so only an explicit position is emitted inline.
    inset,
    top: isUndefined(inset) ? top : undefined,
    right: isUndefined(inset) ? right : undefined,
    bottom: isUndefined(inset) ? bottom : undefined,
    left: isUndefined(inset) ? left : undefined,
    zIndex: parseBoolable(utility.z, 0),
    borderRadius: parseSize(parseBoolable(utility.rad, 0)),
  };
};
