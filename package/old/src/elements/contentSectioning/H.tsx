import { forwardRef } from "react";
import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveHeadingProps } from "../../types/flexiveElementProps";

export const H1 = forwardRef<HTMLHeadingElement, FlexiveHeadingProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h1 {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </h1>
  );
});

export const H2 = forwardRef<HTMLHeadingElement, FlexiveHeadingProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h2 {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </h2>
  );
});

export const H3 = forwardRef<HTMLHeadingElement, FlexiveHeadingProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h3 {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </h3>
  );
});

export const H4 = forwardRef<HTMLHeadingElement, FlexiveHeadingProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h4 {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </h4>
  );
});

export const H5 = forwardRef<HTMLHeadingElement, FlexiveHeadingProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h5 {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </h5>
  );
});

export const H6 = forwardRef<HTMLHeadingElement, FlexiveHeadingProps>(({ children, f, style, ...props }, ref) => {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h6 {...props} style={flexiveStyle} className={flexiveClass} ref={ref}>
      {children}
    </h6>
  );
});
