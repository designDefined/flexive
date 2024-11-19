import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveIProps } from "../../types/flexiveElementProps";

export const I = forwardRef<HTMLElement, FlexiveIProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <i {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </i>
  );
});
