import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveSectionProps } from "../../types/flexiveElementProps";

export const Section = forwardRef<HTMLElement, FlexiveSectionProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <section {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </section>
  );
});
