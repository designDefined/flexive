import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveArticleProps } from "../../types/flexiveElementProps";

export const Article = forwardRef<HTMLElement, FlexiveArticleProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <article {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </article>
  );
});
