import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveNavProps } from "../../types/flexiveElementProps";

export const Nav = forwardRef<HTMLElement, FlexiveNavProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <nav {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </nav>
  );
});
