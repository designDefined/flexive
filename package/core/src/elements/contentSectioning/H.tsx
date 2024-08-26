import { useFlexiveStyle, useFlexiveClass } from "../../hooks";
import { FlexiveHeadingProps } from "../../types/flexiveElementProps";

export function H1({ children, f, style, ...props }: FlexiveHeadingProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h1 {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </h1>
  );
}

export function H2({ children, f, style, ...props }: FlexiveHeadingProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h2 {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </h2>
  );
}

export function H3({ children, f, style, ...props }: FlexiveHeadingProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h3 {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </h3>
  );
}

export function H4({ children, f, style, ...props }: FlexiveHeadingProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h4 {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </h4>
  );
}

export function H5({ children, f, style, ...props }: FlexiveHeadingProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h5 {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </h5>
  );
}

export function H6({ children, f, style, ...props }: FlexiveHeadingProps) {
  const flexiveStyle = useFlexiveStyle(f, style, false);
  const flexiveClass = useFlexiveClass(props);

  return (
    <h6 {...props} style={flexiveStyle} className={flexiveClass}>
      {children}
    </h6>
  );
}
