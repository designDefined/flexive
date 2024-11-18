import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveAProps } from "../../types/flexiveElementProps";

export const A = forwardRef<HTMLAnchorElement, FlexiveAProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <a {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </a>
  );
});
