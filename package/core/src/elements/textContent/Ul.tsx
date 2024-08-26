import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveUlProps } from "../../types/flexiveElementProps";

export const Ul = forwardRef<HTMLUListElement, FlexiveUlProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <ul {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </ul>
  );
});
