import { useCallback, useReducer } from "react";
import { Timeout } from "./common";
import { useEffectOnChange } from "../effect";
import { deepEqual, useDeep } from "../compare";

type DebounceOption = {
  ms?: number;
  leading?: boolean;
  preventRevert?: boolean; // TODO: Better naming
};

type DebounceState<Value> = {
  value: Value;
  timer?: Timeout;
};

type DebounceAction<Value> =
  | [0, Value] // set timer
  | [1, Value] // set value
  | [2]; // reset

type DebounceReducer<Value> = (state: DebounceState<Value>, action: DebounceAction<Value>) => DebounceState<Value>;

export const useDebounce = <T>(_input: T, { ms, leading, preventRevert }: DebounceOption) => {
  const input = useDeep(_input);
  const [{ value, timer }, dispatch] = useReducer<DebounceReducer<T>>(
    (prev, [code, value]) => {
      if (prev.timer) clearTimeout(prev.timer);
      if (code === 2) return { value: prev.value };
      if (code === 1) return { value: value };
      return {
        value: leading && !!prev.timer ? value : prev.value,
        timer: setTimeout(() => dispatch([1, value]), ms),
      };
    },
    { value: input },
  );

  const flush = useCallback(() => dispatch([1, input]), [input]);
  const abort = useCallback(() => dispatch([2]), []);

  useEffectOnChange(() => {
    if (!preventRevert && deepEqual(input, value)) dispatch([2]);
    else dispatch([0, input]);
  }, [input]);

  return {
    value,
    isDebouncing: !!timer,
    flush,
    abort,
  };
};
