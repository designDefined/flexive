import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveLiProps } from "../../types/flexiveElementProps";

export const Li = forwardRef<HTMLLIElement, FlexiveLiProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <li {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </li>
  );
});
