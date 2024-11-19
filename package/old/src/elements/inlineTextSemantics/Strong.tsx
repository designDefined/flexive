import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveStrongProps } from "../../types/flexiveElementProps";

export const Strong = forwardRef<HTMLElement, FlexiveStrongProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <strong {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </strong>
  );
});
