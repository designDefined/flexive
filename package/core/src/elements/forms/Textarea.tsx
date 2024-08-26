import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveTextareaProps } from "../../types/flexiveElementProps";

export function Textarea({ f, style, ...props }: FlexiveTextareaProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return <textarea {...props} style={flexiveStyle} className={flexiveClass} />;
}
