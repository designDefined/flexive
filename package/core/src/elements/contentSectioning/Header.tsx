import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveHeaderProps } from "../../types/flexiveElementProps";

export function Header({ children, f, style, ...props }: FlexiveHeaderProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <header {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </header>
  );
}
