import { useReducer } from "react";
import { Timeout } from "./common";
import { useChangeEffect } from "../effect";

type DebounceOption = {
  ms?: number;
};

type DebounceState<Value> = {
  value: Value;
  timer?: Timeout;
};

type DebounceReducer<Value> = (state: DebounceState<Value>, action: [0 | 1, Value]) => DebounceState<Value>;

export const useDebounce = <T>(input: T, { ms }: DebounceOption) => {
  const [{ value, timer }, dispatch] = useReducer<DebounceReducer<T>>(
    (prev, [code, value]) => {
      if (prev.timer) clearTimeout(prev.timer);
      if (code === 0) return { value: prev.value, timer: setTimeout(() => dispatch([1, value]), ms) };
      else return { value, timer: undefined };
    },
    { value: input },
  );

  useChangeEffect(() => {
    dispatch([0, input]);
  }, [input]);

  return {
    value,
    isDebouncing: !!timer,
    flush: () => dispatch([1, input]),
  };
};
