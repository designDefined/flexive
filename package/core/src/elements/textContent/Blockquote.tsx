import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveBlockquoteProps } from "../../types/flexiveElementProps";

export function Blockquote({ children, f, style, ...props }: FlexiveBlockquoteProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <blockquote {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </blockquote>
  );
}
