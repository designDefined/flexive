import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveFooterProps } from "../../types/flexiveElementProps";

export function Footer({ children, f, style, ...props }: FlexiveFooterProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <footer {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </footer>
  );
}
