import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveTextareaProps } from "../../types/flexiveElementProps";

export const Textarea = forwardRef<HTMLTextAreaElement, FlexiveTextareaProps>(({ f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return <textarea {...props} style={flexiveStyle} className={flexiveClass} ref={ref} />;
});
