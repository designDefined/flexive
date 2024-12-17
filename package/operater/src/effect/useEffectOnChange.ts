import { useEffect, useRef } from "react";

export const useEffectOnChange: typeof useEffect = (effect, deps) => {
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    return effect();
  }, deps);
};
