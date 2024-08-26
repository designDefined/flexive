import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveNavProps } from "../../types/flexiveElementProps";

export function Nav({ children, f, style, ...props }: FlexiveNavProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <nav {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </nav>
  );
}
