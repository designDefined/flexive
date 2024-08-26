import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexivePProps } from "../../types/flexiveElementProps";

export function P({ children, f, style, ...props }: FlexivePProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <p {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </p>
  );
}
