import { CSSProperties } from "react";

/*
 * primitives
 */
type Value = number | string;
type TwoDirectionalValue = Value | [Value?, Value?] | { row?: Value; column?: Value };
type FourDirectionalValue =
  | Value
  | [Value?, Value?, Value?, Value?]
  | { top?: Value; right?: Value; bottom?: Value; left?: Value };
type AlignValue = "start" | "center" | "end" | "stretch" | "baseline";
type JustifyValue = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
type OverflowValue = "auto" | "hidden" | "scroll" | "visible";
type DirectionValue = "row" | "column" | "row-reverse" | "column-reverse";
type WrapValue = "nowrap" | "wrap" | "wrap-reverse";

const parseString = (value?: string) => (value && value.length > 0 ? value : undefined);
const parsePixel = (value?: string | number) => (typeof value === "number" ? `${value}px` : value);
const parseDistanceString = (value?: string | number) =>
  value === undefined ? "0" : typeof value === "number" ? (value > 0 ? `${value}px` : "0") : value;
const parseTwoDirectionalValue = (value?: TwoDirectionalValue) => {
  if (Array.isArray(value)) return parseString(value?.map(parseDistanceString).join(" "));
  if (typeof value === "object")
    return Object.keys(value).length > 0
      ? `${parseDistanceString(value.row)} ${parseDistanceString(value.column)}`
      : undefined;
  return value;
};
const parseFourDirectionalValue = (value?: FourDirectionalValue) => {
  if (Array.isArray(value)) {
    const validArray = value.length === 3 ? [...value, undefined] : value;
    return parseString(validArray?.map(parseDistanceString).join(" "));
  }
  if (typeof value === "object") {
    if (Object.keys(value).length === 0) return undefined;
    const { top, right, bottom, left } = value;
    return `${parseDistanceString(top)} ${parseDistanceString(right)} ${parseDistanceString(
      bottom,
    )} ${parseDistanceString(left)}`;
  }
  return value;
};

/*
 * flex
 */

/**
 * [Grow, Shrink, Basis]
 */
type Flex = [number?, number?, Value?];
const defaultFlex: Flex = [0, 0, "auto"];
const parseFlex = (flex?: Flex): string =>
  [
    flex?.[0] ?? defaultFlex[0],
    flex?.[1] ?? defaultFlex[1],
    parsePixel(flex?.[2] !== undefined ? flex[2] : defaultFlex[2]),
  ].join(" ");

/*
 * flow
 */

/**
 * [Align, Overflow, AlignMax, AlignMin]
 */
type Align = [AlignValue?, OverflowValue?, Value?, Value?];

/**
 * [Justify, Overflow, JustifyMax, JustifyMin]
 */
type Justify = [JustifyValue?, OverflowValue?, Value?, Value?];

/**
 * [Direction, Wrap, Align, Justify]
 */
type Flow = [DirectionValue?, WrapValue?, AlignValue?, JustifyValue?];
const defaultFlow: Flow = ["column", "nowrap"];
const parseFlows = (flow: Flow = defaultFlow, align: Align = [], justify: Justify = []): CSSProperties => {
  const isHorizontal = flow[0] === "row" || flow[0] === "row-reverse";
  const alignKey = isHorizontal ? "Height" : "Width";
  const justifyKey = isHorizontal ? "Width" : "Height";

  return {
    flexFlow: `${flow[0]} ${flow[1]}`,
    alignItems: align[0] ?? flow[2],
    justifyContent: justify[0] ?? flow[3],
    [`max${alignKey}`]: align[1],
    [`min${alignKey}`]: align[2],
    [`max${justifyKey}`]: justify[1],
    [`min${justifyKey}`]: justify[2],
    [`overflow${isHorizontal ? "X" : "Y"}`]: justify[3],
    [`overflow${isHorizontal ? "Y" : "X"}`]: align[3],
  };
};

/*
 * spacing
 */

/**
 * [Padding, Gap, Margin]
 */
type Spacing = [FourDirectionalValue?, TwoDirectionalValue?, FourDirectionalValue?];
const parseSpacing = (spacing: Spacing = []): CSSProperties => {
  return {
    padding: parseFourDirectionalValue(spacing[0]),
    gap: parseTwoDirectionalValue(spacing[1]),
    margin: parseFourDirectionalValue(spacing[2]),
  };
};

/*
 * flexive style
 */

/**
 * Inline style object that contains rules for flex-based layouts.
 */
export type FlexiveStyle = {
  flex?: Flex;
  flow?: Flow;
  align?: Align;
  justify?: Justify;
  spacing?: Spacing;
  isInline?: boolean;
  disable?: boolean;
  deps?: unknown[];
};

export const parseFlexiveStyle = (f: Omit<FlexiveStyle, "deps">, defaultIsInline?: boolean): CSSProperties =>
  f.disable
    ? {}
    : {
        display: (f?.isInline ?? defaultIsInline) ? "inline-flex" : "flex",
        flex: parseFlex(f.flex),
        ...parseFlows(f.flow, f.align, f.justify),
        ...parseSpacing(f.spacing),
      };

const keyOfFlexiveStyle = ["flex", "flow", "align", "justify", "spacing", "isInline", "disable"];
export const isFlexiveStyle = (obj: unknown): obj is FlexiveStyle =>
  typeof obj === "object" && obj !== null && Object.keys(obj).every(key => keyOfFlexiveStyle.includes(key));
