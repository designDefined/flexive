import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveAsideProps } from "../../types/flexiveElementProps";

export function Aside({ children, f, style, ...props }: FlexiveAsideProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <aside {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </aside>
  );
}
