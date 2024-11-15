import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveHeaderProps } from "../../types/flexiveElementProps";

export const Header = forwardRef<HTMLElement, FlexiveHeaderProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <header {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </header>
  );
});
