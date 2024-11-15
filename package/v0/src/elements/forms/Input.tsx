import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveInputProps } from "../../types/flexiveElementProps";

export const Input = forwardRef<HTMLInputElement, FlexiveInputProps>(({ f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return <input {...props} style={flexiveStyle} className={flexiveClass} ref={ref} />;
});
