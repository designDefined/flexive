import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveMainProps } from "../../types/flexiveElementProps";

export function Main({ children, f, style, ...props }: FlexiveMainProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <main {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </main>
  );
}
