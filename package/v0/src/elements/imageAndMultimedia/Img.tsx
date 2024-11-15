import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveImgProps } from "../../types/flexiveElementProps";

export const Img = forwardRef<HTMLImageElement, FlexiveImgProps>(({ f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, true);
  const flexiveClass = useFlexiveClass(props);

  return <img {...props} style={flexiveStyle} className={flexiveClass} ref={ref} />;
});
