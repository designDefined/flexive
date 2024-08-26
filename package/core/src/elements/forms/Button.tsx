import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveButtonProps } from "../../types/flexiveElementProps";

export function Button({ children, f, style, ...props }: FlexiveButtonProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <button {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </button>
  );
}
