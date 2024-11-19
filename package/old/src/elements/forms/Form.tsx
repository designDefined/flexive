import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveFormProps } from "../../types/flexiveElementProps";

export const Form = forwardRef<HTMLFormElement, FlexiveFormProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <form {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </form>
  );
});
