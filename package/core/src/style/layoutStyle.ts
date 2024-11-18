import { CSSProperties } from "react";
import {
  AlignValue,
  DirectionalSizeValue,
  isBoolean,
  isSizeValue,
  JustifyValue,
  OverflowValue,
  parseDirectionalSize,
  parseSize,
  SizeValue,
} from "./value";

export type LayoutStyle = {
  /* display */
  inline?: boolean;
  inlineFlex?: boolean;
  block?: boolean;

  /* flex */
  grow?: number | boolean;
  shrink?: number | boolean;
  basis?: SizeValue;

  /* flex flow & align */
  colReverse?: boolean;
  row?: boolean;
  rowReverse?: boolean;
  wrap?: boolean;
  wrapReverse?: boolean;
  nowrap?: boolean;
  mainAlign?: JustifyValue;
  crossAlign?: AlignValue;
  mainSelf?: JustifyValue;
  crossSelf?: AlignValue;

  /* sizing */
  mainSize?: SizeValue;
  mainMax?: SizeValue;
  mainMin?: SizeValue;
  crossSize?: SizeValue;
  crossMax?: SizeValue;
  crossMin?: SizeValue;

  /* spacing */
  p?: SizeValue | DirectionalSizeValue;
  m?: SizeValue | DirectionalSizeValue;
  g?: SizeValue;

  /* overflow */
  mainOver?: OverflowValue | boolean;
  crossOver?: OverflowValue | boolean;
};

type AxisDependentLayoutStyle = Pick<
  LayoutStyle,
  | "colReverse"
  | "row"
  | "rowReverse"
  | "mainAlign"
  | "mainSelf"
  | "crossAlign"
  | "crossSelf"
  | "mainMin"
  | "mainMax"
  | "mainSize"
  | "crossMin"
  | "crossMax"
  | "crossSize"
  | "mainOver"
  | "crossOver"
>;
export const parseAxisStyle = (axis: AxisDependentLayoutStyle): CSSProperties => {
  const isRow = axis.row || axis.rowReverse;
  const main = isRow ? { dir: "X", size: "Width" } : { dir: "Y", size: "Height" };
  const cross = isRow ? { dir: "Y", size: "Height" } : { dir: "X", size: "Width" };

  return {
    flexDirection: axis.row ? "row" : axis.rowReverse ? "row-reverse" : axis.colReverse ? "column-reverse" : "column",
    justifyContent: axis.mainAlign,
    justifySelf: axis.mainSelf,
    alignItems: axis.crossAlign,
    alignSelf: axis.crossSelf,
    [main.size.toLowerCase()]: parseSize(axis.mainSize),
    [`min${main.size}`]: parseSize(axis.mainMin),
    [`max${main.size}`]: parseSize(axis.mainMax),
    [cross.size.toLowerCase()]: parseSize(axis.crossSize),
    [`min${cross.size}`]: parseSize(axis.crossMin),
    [`max${cross.size}`]: parseSize(axis.crossMax),
    [`overflow${main.dir}`]: isBoolean(axis.mainOver) ? (axis.mainOver ? "auto" : "hidden") : axis.mainOver,
    [`overflow${cross.dir}`]: isBoolean(axis.crossOver) ? (axis.crossOver ? "auto" : "hidden") : axis.crossOver,
  };
};

export const parseLayoutStyle = (layout: LayoutStyle): CSSProperties => {
  return {
    /* display */
    display: layout.inline ? "inline" : layout.inlineFlex ? "inline-flex" : layout.block ? "block" : "flex",

    /* flex */
    flexGrow: isBoolean(layout?.grow) ? (layout.grow ? 1 : 0) : layout?.grow,
    flexShrink: isBoolean(layout?.shrink) ? (layout.shrink ? 1 : 0) : layout?.shrink,
    flexBasis: parseSize(layout?.basis),
    flexWrap: layout?.wrap ? "wrap" : layout?.wrapReverse ? "wrap-reverse" : layout?.nowrap ? "nowrap" : undefined,

    /* axis dependent values */
    ...parseAxisStyle(layout),

    // /* spacing */
    padding: isSizeValue(layout?.p) ? parseSize(layout.p) : parseDirectionalSize(layout?.p),
    margin: isSizeValue(layout?.m) ? parseSize(layout.m) : parseDirectionalSize(layout?.m),
    gap: parseSize(layout?.g),
  };
};
