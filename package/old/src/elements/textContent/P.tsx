import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexivePProps } from "../../types/flexiveElementProps";

export const P = forwardRef<HTMLParagraphElement, FlexivePProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <p {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </p>
  );
});
