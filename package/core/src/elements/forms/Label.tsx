import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveLabelProps } from "../../types/flexiveElementProps";

export function Label({ children, f, style, ...props }: FlexiveLabelProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <label {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </label>
  );
}
