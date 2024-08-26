import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveButtonProps } from "../../types/flexiveElementProps";

export const Button = forwardRef<HTMLButtonElement, FlexiveButtonProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return (
    <button {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </button>
  );
});
