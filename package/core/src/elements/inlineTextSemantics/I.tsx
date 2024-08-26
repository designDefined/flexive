import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveIProps } from "../../types/flexiveElementProps";

export function I({ children, f, style, ...props }: FlexiveIProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <i {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </i>
  );
}
