import { FlexiveTagNames, PropsOf } from "./props";
import { ElementOptions } from "./elementOptions";
import { FLEXIVE_PROP_KEYS, parseBaseClassName, parseFlexiveClassName, useFlexiveStyle } from "../style";

export const buildElement = <T extends FlexiveTagNames>(Tag: T, options: ElementOptions = {}) => {
  // Resolved once per component, not per render.
  const baseClassName = parseBaseClassName(options.display);

  return ({ ref, ...props }: PropsOf<T>) => {
    const style = useFlexiveStyle(props);

    // Single pass over the props: everything flexive owns is consumed above, the rest is DOM.
    const rest: Record<string, unknown> = {};
    for (const key of Object.keys(props)) {
      if (!(key in FLEXIVE_PROP_KEYS)) rest[key] = (props as Record<string, unknown>)[key];
    }

    const className = parseFlexiveClassName(baseClassName, (props as { className?: string }).className);

    // @ts-expect-error - T is not inferred correctly as a key of JSX.intrinsic elements which has proper JSX call signature.
    return <Tag {...rest} className={className} style={style} ref={ref} />;
  };
};
