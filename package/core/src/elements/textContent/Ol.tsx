import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveOlProps } from "../../types/flexiveElementProps";

export const Ol = forwardRef<HTMLOListElement, FlexiveOlProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <ol {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </ol>
  );
});
