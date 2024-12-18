import { useCallback, useReducer } from "react";
import { Timeout } from "./common";

type DelayState = { timer?: Timeout; callback?: () => void };

type DelayAction =
  | [0, () => void, number] // set timer
  | [1] // flush
  | [2]; //  cancel

type DelayReducer = (state: DelayState, action: DelayAction) => DelayState;

export const useDelay = () => {
  const [{ timer }, dispatch] = useReducer<DelayReducer>((prev, [code, callback, ms]) => {
    switch (code) {
      case 0:
        if (prev.timer) clearTimeout(prev.timer);
        return { timer: setTimeout(() => callback(), ms), callback };
      case 1:
        if (prev.timer) clearTimeout(prev.timer);
        prev.callback?.();
        return {};
      case 2:
        if (prev.timer) clearTimeout(prev.timer);
        return {};
    }
  }, {});

  const delay = useCallback((callback: () => void, ms: number) => dispatch([0, callback, ms]), []);
  const flush = useCallback(() => dispatch([1]), []);
  const cancel = useCallback(() => dispatch([2]), []);

  return { isDelaying: !!timer, delay, flush, cancel };
};
