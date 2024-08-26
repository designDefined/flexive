import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveSpanProps } from "../../types/flexiveElementProps";

export function Span({ children, f, style, ...props }: FlexiveSpanProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <span {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </span>
  );
}
