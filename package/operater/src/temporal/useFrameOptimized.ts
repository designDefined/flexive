import { useState } from "react";
import { useDeep } from "../compare";
import { useEffectOnChange } from "../effect";

// TODO: Better namimg
export const useFrameOptimized = <T>(_input: T) => {
  const input = useDeep(_input);
  const [value, set] = useState(input);

  useEffectOnChange(() => {
    requestAnimationFrame(() => set(input));
  }, [input]);

  return value;
};
