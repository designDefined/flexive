import { CSSProperties, useMemo } from "react";
import { FlexiveStyle } from "./flexiveStyle";
import { parseLayoutStyle } from "./layoutStyle";

export const useFlexiveStyle = ({
  // layout style
  inline,
  inlineFlex,
  block,
  grow,
  shrink,
  basis,
  colReverse,
  row,
  rowReverse,
  wrap,
  wrapReverse,
  nowrap,
  mainAlign,
  crossAlign,
  mainSelf,
  crossSelf,
  mainSize,
  mainMax,
  mainMin,
  crossSize,
  crossMax,
  crossMin,
  p,
  m,
  g,
  mainOver,
  crossOver,

  // native style
  style: nativeStyle,
}: FlexiveStyle): CSSProperties => {
  const style = useMemo(() => {
    const layoutStyle = parseLayoutStyle({
      inline,
      inlineFlex,
      block,
      grow,
      shrink,
      basis,
      colReverse,
      row,
      rowReverse,
      wrap,
      wrapReverse,
      nowrap,
      mainAlign,
      crossAlign,
      mainSelf,
      crossSelf,
      mainSize,
      mainMax,
      mainMin,
      crossSize,
      crossMax,
      crossMin,
      p,
      m,
      g,
      mainOver,
      crossOver,
    });

    return { ...layoutStyle, ...nativeStyle };
  }, [
    inline,
    inlineFlex,
    block,
    grow,
    shrink,
    basis,
    colReverse,
    row,
    rowReverse,
    wrap,
    wrapReverse,
    nowrap,
    mainAlign,
    crossAlign,
    mainSelf,
    crossSelf,
    mainSize,
    mainMax,
    mainMin,
    crossSize,
    crossMax,
    crossMin,
    p,
    m,
    g,
    mainOver,
    crossOver,
    nativeStyle,
  ]);

  return style;
};