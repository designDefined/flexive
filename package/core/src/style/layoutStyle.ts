import { CSSProperties } from "react";
import {
  AlignValue,
  JustifyValue,
  OverflowValue,
  parseBoolable,
  parseDirectionalSizes,
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
  alignM?: JustifyValue;
  alignC?: AlignValue;
  alignSelfM?: JustifyValue;
  alignSelfC?: AlignValue;

  /* sizing */
  sizeM?: SizeValue;
  maxM?: SizeValue;
  minM?: SizeValue;
  sizeC?: SizeValue;
  maxC?: SizeValue;
  minC?: SizeValue;

  /* spacing */
  p?: SizeValue;
  px?: SizeValue;
  py?: SizeValue;
  pt?: SizeValue;
  pr?: SizeValue;
  pb?: SizeValue;
  pl?: SizeValue;

  m?: SizeValue;
  mx?: SizeValue;
  my?: SizeValue;
  mt?: SizeValue;
  mr?: SizeValue;
  mb?: SizeValue;
  ml?: SizeValue;

  g?: SizeValue;

  /* overflow */
  over?: OverflowValue | boolean;
  overM?: OverflowValue | boolean;
  overC?: OverflowValue | boolean;
  hidden?: boolean;
  hiddenM?: boolean;
  hiddenC?: boolean;
};

type AxisDependentLayoutStyle = Pick<
  LayoutStyle,
  | "colReverse"
  | "row"
  | "rowReverse"
  | "alignM"
  | "alignSelfM"
  | "alignC"
  | "alignSelfC"
  | "minM"
  | "maxM"
  | "sizeM"
  | "minC"
  | "maxC"
  | "sizeC"
  | "over"
  | "overM"
  | "overC"
  | "hidden"
  | "hiddenM"
  | "hiddenC"
>;
export const parseAxisStyle = (axis: AxisDependentLayoutStyle): CSSProperties => {
  const isRow = axis.row || axis.rowReverse;
  const main = isRow ? { dir: "X", size: "Width" } : { dir: "Y", size: "Height" };
  const cross = isRow ? { dir: "Y", size: "Height" } : { dir: "X", size: "Width" };

  return {
    flexDirection: axis.row ? "row" : axis.rowReverse ? "row-reverse" : axis.colReverse ? "column-reverse" : "column",
    justifyContent: axis.alignM,
    justifySelf: axis.alignSelfM,
    alignItems: axis.alignC,
    alignSelf: axis.alignSelfC,
    [main.size.toLowerCase()]: parseSize(axis.sizeM),
    [`min${main.size}`]: parseSize(axis.minM),
    [`max${main.size}`]: parseSize(axis.maxM),
    [cross.size.toLowerCase()]: parseSize(axis.sizeC),
    [`min${cross.size}`]: parseSize(axis.minC),
    [`max${cross.size}`]: parseSize(axis.maxC),
    [`overflow${main.dir}`]: parseBoolable(
      axis.overM ?? (axis.hiddenM ? "hidden" : undefined) ?? axis.over ?? (axis.hidden ? "hidden" : undefined),
      "auto",
      "hidden",
    ),
    [`overflow${cross.dir}`]: parseBoolable(
      axis.overC ?? (axis.hiddenC ? "hidden" : undefined) ?? axis.over ?? (axis.hidden ? "hidden" : undefined),
      "auto",
      "hidden",
    ),
  };
};

export const parseLayoutStyle = (layout: LayoutStyle): CSSProperties => {
  return {
    /* display */
    display: layout.inline ? "inline" : layout.inlineFlex ? "inline-flex" : layout.block ? "block" : "flex",

    /* flex */
    flexGrow: parseBoolable(layout.grow, 1, 0),
    flexShrink: parseBoolable(layout.shrink, 1, 0),
    flexBasis: parseSize(layout?.basis) ?? "auto",
    flexWrap: layout?.wrap ? "wrap" : layout?.wrapReverse ? "wrap-reverse" : layout?.nowrap ? "nowrap" : undefined,

    /* axis dependent values */
    ...parseAxisStyle(layout),

    /* spacing */
    padding: parseDirectionalSizes(layout?.p, layout?.px, layout?.py, layout?.pt, layout?.pr, layout?.pb, layout?.pl),
    margin: parseDirectionalSizes(layout?.m, layout?.mx, layout?.my, layout?.mt, layout?.mr, layout?.mb, layout?.ml),
    gap: parseSize(layout?.g),
  };
};
