import { useCallback, useReducer } from "react";
import { Timeout } from "./common";

type TemporaryStateOption = {
  updateOnOverlap?: boolean;
};

type TemporaryState<Value> = {
  current: Value;
  saved: Value;
  timer?: Timeout;
};

type TemporaryStateAction<Value> =
  | [0, Value, number?] // set value
  | [1] // reset
  | [2]; // update

type TemporaryStateReducer<Value> = (
  state: TemporaryState<Value>,
  action: TemporaryStateAction<Value>,
) => TemporaryState<Value>;

export const useTemporaryState = <T>(initialState: T, { updateOnOverlap }: TemporaryStateOption = {}) => {
  const [{ current, saved, timer }, dispatch] = useReducer<TemporaryStateReducer<T>>(
    (prev, [code, value, ms]) => {
      if (prev.timer) clearTimeout(prev.timer);
      if (code === 1) return { current: prev.saved, saved: prev.saved };
      if (code === 2) return { current: prev.current, saved: prev.current };
      if (typeof ms === "undefined") return { current: value, saved: value };
      else {
        return {
          current: value,
          saved: updateOnOverlap ? prev.current : prev.saved,
          timer: setTimeout(() => dispatch([1]), ms),
        };
      }
    },
    { current: initialState, saved: initialState },
  );

  const set = useCallback((input: T, ms?: number) => dispatch([0, input, ms]), []);
  const reset = useCallback(() => dispatch([1]), []);
  const update = useCallback(() => dispatch([2]), []);

  return [current, set, { isTemporary: !!timer, saved, reset, update }] as const;
};
