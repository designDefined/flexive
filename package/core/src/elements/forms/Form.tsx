import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveFormProps } from "../../types/flexiveElementProps";

export function Form({ children, f, style, ...props }: FlexiveFormProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <form {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </form>
  );
}
