import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveLiProps } from "../../types/flexiveElementProps";

export function Li({ children, f, style, ...props }: FlexiveLiProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <li {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </li>
  );
}
