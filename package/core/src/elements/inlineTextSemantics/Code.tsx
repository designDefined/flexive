import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveCodeProps } from "../../types/flexiveElementProps";

export function Code({ children, f, style, ...props }: FlexiveCodeProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <code {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </code>
  );
}
