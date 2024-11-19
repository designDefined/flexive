import { CSSProperties, useMemo } from "react";
import { FlexiveStyle, parseFlexiveStyle } from "../core/flexiveStyle";

export const useFlexiveStyle = (
  { deps = [], ...style }: FlexiveStyle = {},
  override?: CSSProperties,
  defaultIsInline?: boolean,
) => {
  const styleObject = useMemo(() => {
    return { ...parseFlexiveStyle(style, defaultIsInline), ...override };
  }, [...deps]);
  return styleObject;
};
