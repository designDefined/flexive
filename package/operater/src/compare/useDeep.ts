import isEqual from "fast-deep-equal/es6";
import { useRef } from "react";

export const useDeep = <T>(input: T) => {
  const prev = useRef(input);
  if (isEqual(input, prev.current)) return prev.current;
  prev.current = input;
  return input;
};
