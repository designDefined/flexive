import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveStrongProps } from "../../types/flexiveElementProps";

export function Strong({ children, f, style, ...props }: FlexiveStrongProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <strong {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </strong>
  );
}
