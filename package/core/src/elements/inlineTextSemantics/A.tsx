import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveAProps } from "../../types/flexiveElementProps";

export function A({ children, f, style, ...props }: FlexiveAProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <a {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </a>
  );
}
