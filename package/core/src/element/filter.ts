import { FLEXIVE_PROP_KEYS } from "../style";
import { FlexiveProps } from "./props";

/** Splits flexive props from the ones that belong on the DOM node, in a single pass. */
export const filterProps = <T extends FlexiveProps>(
  props: T,
): { flexive: FlexiveProps; rest: Omit<T, keyof FlexiveProps> } => {
  const flexive: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};

  for (const key of Object.keys(props)) {
    const value = (props as Record<string, unknown>)[key];
    if (key in FLEXIVE_PROP_KEYS) {
      // undefined keys are dropped so that spreading the result never overrides a defined value
      if (value !== undefined) flexive[key] = value;
    } else {
      rest[key] = value;
    }
  }

  return {
    flexive: flexive as unknown as FlexiveProps,
    rest: rest as unknown as Omit<T, keyof FlexiveProps>,
  };
};
