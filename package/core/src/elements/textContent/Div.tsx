import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveDivProps } from "../../types/flexiveElementProps";

export const Div = forwardRef<HTMLDivElement, FlexiveDivProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <div {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </div>
  );
});
