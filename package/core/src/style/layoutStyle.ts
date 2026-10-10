import { CSSProperties } from "react";
import {
  AlignValue,
  isUndefined,
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
  grid?: boolean;

  /* flex */
  f?: number | boolean;
  grow?: number | boolean;
  shrink?: number | boolean;
  basis?: SizeValue;

  /* flex flow & align */
  colReverse?: boolean;
  row?: boolean;
  rowReverse?: boolean;
  flexWrap?: boolean | "reverse";
  alignM?: JustifyValue | boolean;
  alignC?: AlignValue | boolean;
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

/**
 * Resolves main/cross axis props into physical CSS properties.
 *
 * The default `flex-direction: column` is not emitted — it comes from the `.flx` class.
 * Only an explicit direction prop produces an inline declaration.
 */
export const parseAxisStyle = (axis: AxisDependentLayoutStyle): CSSProperties => {
  const isRow = !!(axis.row || axis.rowReverse);

  const sizeM = parseSize(parseBoolable(axis.sizeM, 0));
  const minM = parseSize(parseBoolable(axis.minM, 0));
  const maxM = parseSize(parseBoolable(axis.maxM, 0));
  const sizeC = parseSize(parseBoolable(axis.sizeC, 0));
  const minC = parseSize(parseBoolable(axis.minC, 0));
  const maxC = parseSize(parseBoolable(axis.maxC, 0));

  const gapM = parseSize(parseBoolable(axis.gM ?? axis.g, 0));
  const gapC = parseSize(parseBoolable(axis.gC ?? axis.g, 0));
  // `column-gap` is the horizontal spacing (between columns) and `row-gap` the vertical one,
  // so both map to the axes exactly like `width`/`height` and `overflow-x`/`overflow-y` below.
  const columnGap = isRow ? gapM : gapC;
  const rowGap = isRow ? gapC : gapM;
  const gap =
    !isUndefined(rowGap) && !isUndefined(columnGap)
      ? rowGap === columnGap
        ? rowGap
        : `${rowGap} ${columnGap}`
      : undefined;

  const overM = parseBoolable(
    axis.overM ?? (axis.hideM ? "hidden" : undefined) ?? axis.over ?? (axis.hide ? "hidden" : undefined),
    "auto",
    "hidden",
  );
  const overC = parseBoolable(
    axis.overC ?? (axis.hideC ? "hidden" : undefined) ?? axis.over ?? (axis.hide ? "hidden" : undefined),
    "auto",
    "hidden",
  );
  const overflowX = isRow ? overM : overC;
  const overflowY = isRow ? overC : overM;
  const overflow = !isUndefined(overflowX) && overflowX === overflowY ? overflowX : undefined;

  return {
    /* flow */
    flexDirection: axis.row ? "row" : axis.rowReverse ? "row-reverse" : axis.colReverse ? "column-reverse" : undefined,

    /* align */
    justifyContent: parseAlign(parseBoolable(axis.alignM, "center")),
    alignItems: parseAlign(parseBoolable(axis.alignC, "center")),
    alignSelf: parseAlign(parseBoolable(axis.alignSelfC, "center")),

    /* sizing */
    width: isRow ? sizeM : sizeC,
    minWidth: isRow ? minM : minC,
    maxWidth: isRow ? maxM : maxC,
    height: isRow ? sizeC : sizeM,
    minHeight: isRow ? minC : minM,
    maxHeight: isRow ? maxC : maxM,

    /* gap — merged into the shorthand whenever both axes are set */
    gap,
    rowGap: isUndefined(gap) ? rowGap : undefined,
    columnGap: isUndefined(gap) ? columnGap : undefined,

    /* overflow — merged only when both axes resolve to the same value */
    overflow,
    overflowX: isUndefined(overflow) ? overflowX : undefined,
    overflowY: isUndefined(overflow) ? overflowY : undefined,
  };
};

/**
 * The `.flx` class supplies `display:flex`, `flex-direction:column`, `flex:0 0 auto`.
 * Only values an author actually asked for are emitted inline.
 */
export const parseLayoutStyle = (layout: LayoutStyle): CSSProperties => {
  const grow = parseBoolable(layout.grow ?? layout.f, 1, 0);
  const shrink = parseBoolable(layout.shrink ?? layout.f, 1, 0);
  const basis = parseSize(layout.basis);
  // `flex: <grow> <shrink>` would reset the basis to 0%, so the shorthand spells `auto` out.
  // A partially specified flex has to stay longhand or it would reset the other components.
  const flexMerged = !isUndefined(grow) && !isUndefined(shrink);

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
            : layout.grid
              ? "grid"
              : undefined,

    /* axis dependent values: flow, align, sizing, gap, overflow */
    ...parseAxisStyle(layout),

    /* flex */
    flex: flexMerged ? `${grow} ${shrink} ${basis ?? "auto"}` : undefined,
    flexGrow: flexMerged ? undefined : grow,
    flexShrink: flexMerged ? undefined : shrink,
    flexBasis: flexMerged ? undefined : basis,
    flexWrap: layout.flexWrap === "reverse" ? "wrap-reverse" : parseBoolable(layout.flexWrap, "wrap", "nowrap"),

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
