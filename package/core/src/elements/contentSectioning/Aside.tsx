import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveAsideProps } from "../../types/flexiveElementProps";

export const Aside = forwardRef<HTMLElement, FlexiveAsideProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <aside {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </aside>
  );
});
