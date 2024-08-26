import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexivePreProps } from "../../types/flexiveElementProps";

export function Pre({ children, f, style, ...props }: FlexivePreProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <pre {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </pre>
  );
}
