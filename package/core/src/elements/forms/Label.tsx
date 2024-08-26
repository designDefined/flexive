import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveLabelProps } from "../../types/flexiveElementProps";

export const Label = forwardRef<HTMLLabelElement, FlexiveLabelProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <label {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </label>
  );
});
