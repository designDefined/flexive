import { CSSProperties } from "react";
import {
  AlignValue,
  JustifyValue,
  OverflowValue,
  parseAlign,
  parseBoolable,
  parseDirectionalSizes,
  parseSize,
  SizeValue,
} from "./value";

export type LayoutStyle = {
  /* display */
  flex?: boolean;
  inline?: boolean;
  inlineFlex?: boolean;
  block?: boolean;

  /* flex */
  f?: number | boolean;
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
  alignM?: JustifyValue | boolean;
  alignC?: AlignValue | boolean;
  alignSelfM?: JustifyValue | boolean; // TODO: Deprecate value. justify-content doesn't work in flexbox layout
  alignSelfC?: AlignValue | boolean;

  /* sizing */
  sizeM?: SizeValue | true;
  maxM?: SizeValue | true;
  minM?: SizeValue | true;
  sizeC?: SizeValue | true;
  maxC?: SizeValue | true;
  minC?: SizeValue | true;

  /* spacing */
  p?: SizeValue | true;
  px?: SizeValue | true;
  py?: SizeValue | true;
  pt?: SizeValue | true;
  pr?: SizeValue | true;
  pb?: SizeValue | true;
  pl?: SizeValue | true;

  m?: SizeValue | true;
  mx?: SizeValue | true;
  my?: SizeValue | true;
  mt?: SizeValue | true;
  mr?: SizeValue | true;
  mb?: SizeValue | true;
  ml?: SizeValue | true;

  g?: SizeValue | true;
  gM?: SizeValue | true;
  gC?: SizeValue | true;

  /* overflow */
  over?: OverflowValue | boolean;
  overM?: OverflowValue | boolean;
  overC?: OverflowValue | boolean;
  hide?: boolean;
  hideM?: boolean;
  hideC?: boolean;
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
  | "g"
  | "gM"
  | "gC"
  | "over"
  | "overM"
  | "overC"
  | "hide"
  | "hideM"
  | "hideC"
>;
export const parseAxisStyle = (axis: AxisDependentLayoutStyle): CSSProperties => {
  const isRow = axis.row || axis.rowReverse;
  const main = isRow ? { dir: "X", size: "Width", grid: "row" } : { dir: "Y", size: "Height", grid: "column" };
  const cross = isRow ? { dir: "Y", size: "Height", grid: "column" } : { dir: "X", size: "Width", grid: "row" };

  return {
    flexDirection: axis.row ? "row" : axis.rowReverse ? "row-reverse" : axis.colReverse ? "column-reverse" : "column",
    justifyContent: parseAlign(parseBoolable(axis.alignM, "center")),
    justifySelf: parseAlign(parseBoolable(axis.alignSelfM, "center")),
    alignItems: parseAlign(parseBoolable(axis.alignC, "center")),
    alignSelf: parseAlign(parseBoolable(axis.alignSelfC, "center")),
    [main.size.toLowerCase()]: parseSize(parseBoolable(axis.sizeM, 0)),
    [`min${main.size}`]: parseSize(parseBoolable(axis.minM, 0)),
    [`max${main.size}`]: parseSize(parseBoolable(axis.maxM, 0)),
    [cross.size.toLowerCase()]: parseSize(parseBoolable(axis.sizeC, 0)),
    [`min${cross.size}`]: parseSize(parseBoolable(axis.minC, 0)),
    [`max${cross.size}`]: parseSize(parseBoolable(axis.maxC, 0)),
    [`${main.grid}Gap`]: parseSize(parseBoolable(axis.gM ?? axis.g, 0)),
    [`${cross.grid}Gap`]: parseSize(parseBoolable(axis.gC ?? axis.g, 0)),
    [`overflow${main.dir}`]: parseBoolable(
      axis.overM ?? (axis.hideM ? "hidden" : undefined) ?? axis.over ?? (axis.hide ? "hidden" : undefined),
      "auto",
      "hidden",
    ),
    [`overflow${cross.dir}`]: parseBoolable(
      axis.overC ?? (axis.hideC ? "hidden" : undefined) ?? axis.over ?? (axis.hide ? "hidden" : undefined),
      "auto",
      "hidden",
    ),
  };
};

export const parseLayoutStyle = (layout: LayoutStyle): CSSProperties => {
  return {
    /* display */
    display: layout.flex
      ? "flex"
      : layout.inlineFlex
        ? "inline-flex"
        : layout.inline
          ? "inline"
          : layout.block
            ? "block"
            : "flex",

    /* flex */
    flexGrow: parseBoolable(layout.grow ?? layout.f, 1, 0) ?? 0,
    flexShrink: parseBoolable(layout.shrink ?? layout.f, 1, 0) ?? 0,
    flexBasis: parseSize(layout?.basis) ?? "auto",
    flexWrap: layout?.wrap ? "wrap" : layout?.wrapReverse ? "wrap-reverse" : layout?.nowrap ? "nowrap" : undefined,

    /* axis dependent values */
    ...parseAxisStyle(layout),

    /* spacing */
    padding: parseDirectionalSizes(
      parseBoolable(layout?.p, 0),
      parseBoolable(layout?.px, 0),
      parseBoolable(layout?.py, 0),
      parseBoolable(layout?.pt, 0),
      parseBoolable(layout?.pr, 0),
      parseBoolable(layout?.pb, 0),
      parseBoolable(layout?.pl, 0),
    ),
    margin: parseDirectionalSizes(
      parseBoolable(layout?.m, 0),
      parseBoolable(layout?.mx, 0),
      parseBoolable(layout?.my, 0),
      parseBoolable(layout?.mt, 0),
      parseBoolable(layout?.mr, 0),
      parseBoolable(layout?.mb, 0),
      parseBoolable(layout?.ml, 0),
    ),
  };
};
