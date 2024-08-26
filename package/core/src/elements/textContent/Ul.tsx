import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveUlProps } from "../../types/flexiveElementProps";

export function Ul({ children, f, style, ...props }: FlexiveUlProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <ul {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </ul>
  );
}
