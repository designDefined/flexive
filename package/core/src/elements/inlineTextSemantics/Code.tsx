import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveCodeProps } from "../../types/flexiveElementProps";

export const Code = forwardRef<HTMLElement, FlexiveCodeProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <code {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </code>
  );
});
