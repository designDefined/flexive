import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveMainProps } from "../../types/flexiveElementProps";

export const Main = forwardRef<HTMLElement, FlexiveMainProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <main {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </main>
  );
});
