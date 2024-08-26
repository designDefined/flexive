import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveSpanProps } from "../../types/flexiveElementProps";

export const Span = forwardRef<HTMLSpanElement, FlexiveSpanProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <span {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </span>
  );
});
