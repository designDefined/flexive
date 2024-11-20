import { forwardRef } from "react";
import { FlexiveProps, FlexiveTagNames } from "./props";
import { useFlexiveStyle } from "../style";

export const buildElement = <T extends FlexiveTagNames>(Tag: T) =>
  forwardRef<HTMLElementTagNameMap[T], JSX.IntrinsicElements[T] & FlexiveProps>(
    (
      {
        // layout style
        inline,
        inlineFlex,
        block,
        f,
        grow,
        shrink,
        basis,
        colReverse,
        row,
        rowReverse,
        wrap,
        wrapReverse,
        nowrap,
        alignM,
        alignC,
        alignSelfM,
        alignSelfC,
        sizeM,
        maxM,
        minM,
        sizeC,
        maxC,
        minC,
        p,
        px,
        py,
        pt,
        pr,
        pb,
        pl,
        m,
        mx,
        my,
        mt,
        mr,
        mb,
        ml,
        g,
        over,
        overM,
        overC,
        hide,
        hideM,
        hideC,

        // utility style
        static: _static,
        fixed,
        absolute,
        sticky,
        top,
        right,
        bottom,
        left,
        rad,

        // native style
        style: nativeStyle,

        // rest props
        ...props
      },
      ref,
    ) => {
      const style = useFlexiveStyle({
        inline,
        inlineFlex,
        block,
        f,
        grow,
        shrink,
        basis,
        colReverse,
        row,
        rowReverse,
        wrap,
        wrapReverse,
        nowrap,
        alignM,
        alignC,
        alignSelfM,
        alignSelfC,
        sizeM,
        maxM,
        minM,
        sizeC,
        maxC,
        minC,
        p,
        px,
        py,
        pt,
        pr,
        pb,
        pl,
        m,
        mx,
        my,
        mt,
        mr,
        mb,
        ml,
        g,
        over,
        overM,
        overC,
        hide,
        hideM,
        hideC,
        static: _static,
        fixed,
        absolute,
        sticky,
        top,
        right,
        bottom,
        left,
        rad,
        style: nativeStyle,
      });
      // @ts-expect-error - T is not inferred correctly as a key of JSX.intrinsic elements which has proper JSX call signature.
      return <Tag style={style} ref={ref} {...props} />;
    },
  );
