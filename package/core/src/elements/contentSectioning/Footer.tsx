import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveFooterProps } from "../../types/flexiveElementProps";

export const Footer = forwardRef<HTMLElement, FlexiveFooterProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <footer {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </footer>
  );
});
