import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexivePreProps } from "../../types/flexiveElementProps";

export const Pre = forwardRef<HTMLPreElement, FlexivePreProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <pre {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </pre>
  );
});
