import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveOlProps } from "../../types/flexiveElementProps";

export function Ol({ children, f, style, ...props }: FlexiveOlProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <ol {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </ol>
  );
}
