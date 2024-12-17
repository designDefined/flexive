import { useRef } from "react";
import { deepEqual } from ".";

export const useDeep = <T>(input: T) => {
  const prev = useRef(input);
  if (deepEqual(input, prev.current)) return prev.current;
  prev.current = input;
  return input;
};
