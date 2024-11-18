import { forwardRef } from "react";
import { FlexiveProps, FlexiveTagNames } from "./props";
import { useFlexiveStyle } from "../style";

export const buildElement = <T extends FlexiveTagNames>(Tag: T) =>
  forwardRef<HTMLElementTagNameMap[T], JSX.IntrinsicElements[T] & FlexiveProps>(
    (
      {
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
        style: styleOverride,
        ...props
      },
      ref,
    ) => {
      const style = useFlexiveStyle({
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
        style: styleOverride,
      });
      // @ts-expect-error - T is not inferred correctly as a key of JSX.intrinsic elements which has proper JSX call signature.
      return <Tag style={style} ref={ref} {...props} />;
    },
  );
