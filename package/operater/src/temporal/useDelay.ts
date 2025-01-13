import { useCallback, useReducer } from "react";
import { Timeout } from "./common";

type DelayState =
  | { timer: Timeout; callback: () => void; duration: number }
  | { timer?: undefined; callback?: undefined; duration?: undefined };

type DelayAction =
  | [0, () => void, number] // set timer
  | [1] // flush
  | [2]; // cancel

type DelayReducer = (state: DelayState, action: DelayAction) => DelayState;

export const useDelay = () => {
  const [{ timer, duration }, dispatch] = useReducer<DelayReducer>((prev, [code, callback, ms]) => {
    if (prev.timer) clearTimeout(prev.timer);
    switch (code) {
      case 0:
        return { timer: setTimeout(() => dispatch([1]), ms), callback, duration: ms };
      case 1:
        prev.callback?.();
        return {};
      case 2:
        return {};
    }
  }, {});

  const delay = useCallback((callback: () => void, ms: number) => dispatch([0, callback, ms]), []);
  const flush = useCallback(() => dispatch([1]), []);
  const abort = useCallback(() => dispatch([2]), []);

  return { isDelaying: !!timer, duration, delay, flush, abort };
};
