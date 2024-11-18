import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveBlockquoteProps } from "../../types/flexiveElementProps";

export const Blockquote = forwardRef<HTMLQuoteElement, FlexiveBlockquoteProps>(
  ({ children, f, style, ...props }, ref) => {
    const flexiveStyle = useFlexiveStyle(f, style, false);
    const flexiveClass = useFlexiveClass(props);

    return (
      <blockquote {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
        {children}
      </blockquote>
    );
  },
);
