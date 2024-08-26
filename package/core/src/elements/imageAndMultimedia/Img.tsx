import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveImgProps } from "../../types/flexiveElementProps";

export function Img({ f, style, ...props }: FlexiveImgProps) {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return <img {...props} style={flexiveStyle} className={flexiveClass} />;
}
