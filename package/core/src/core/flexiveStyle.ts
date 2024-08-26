/*
 * types
 */

/* simple */
type Value = number | string | undefined;

/* flex */
type FlexGrow = number;
type FlexShrink = number;
type FlexBasis = string;
type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

/* justify */
type FlexJustify = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
type FlexJustifyMax = Value;
type FlexJustifyMin = Value;

/* align */
type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
type FlexAlignMax = Value;
type FlexAlignMin = Value;

/* spacing */
type Padding = Value;
type Gap = Value;
type Margin = Value;

/* overflow */
type Overflow = "auto" | "hidden" | "scroll" | "visible";

export type FlexiveStyle = {
  flex?: [FlexGrow?, FlexShrink?, FlexBasis?];
  flow?: [FlexDirection?, FlexWrap?, FlexAlign?, FlexJustify?];
  align?: [FlexAlign?, FlexAlignMax?, FlexAlignMin?];
  justify?: [FlexJustify?, FlexJustifyMax?, FlexJustifyMin?];
  spacing?: [Padding?, Gap?, Margin?];
  isInline?: boolean;
  overflow?: [Overflow?, Overflow?];
};

/*
 * default value
 */
const defaultFlexiveStyle: Required<FlexiveStyle> = {
  flex: [0, 0, "auto"],
  flow: ["column", "nowrap"],
  align: [],
  justify: [],
  spacing: [],
  isInline: false,
  overflow: ["auto"],
};

/*
 * merge
 */
export const flexiveStyleWithDefault = (flexiveStyle: FlexiveStyle, isInline?: boolean): Required<FlexiveStyle> => {
  return Object.keys(defaultFlexiveStyle).reduce((acc, _key) => {
    const key = _key as keyof Required<FlexiveStyle>;
    if (key === "isInline")
      return { ...acc, isInline: flexiveStyle.isInline ?? isInline ?? defaultFlexiveStyle.isInline };
    return { ...acc, [key]: flexiveStyle[key] || defaultFlexiveStyle[key] };
  }, {} as Required<FlexiveStyle>);
};
