import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveArticleProps } from "../../types/flexiveElementProps";

export function Article({ children, f, style, ...props }: FlexiveArticleProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <article {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </article>
  );
}
