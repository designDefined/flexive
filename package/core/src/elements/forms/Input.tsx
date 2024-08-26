import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveInputProps } from "../../types/flexiveElementProps";

export function Input({ f, style, ...props }: FlexiveInputProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return <input {...props} style={flexiveStyle} className={flexiveClass} />;
}
