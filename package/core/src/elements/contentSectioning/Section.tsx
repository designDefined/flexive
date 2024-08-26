import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveSectionProps } from "../../types/flexiveElementProps";

export function Section({ children, f, style, ...props }: FlexiveSectionProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <section {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </section>
  );
}
