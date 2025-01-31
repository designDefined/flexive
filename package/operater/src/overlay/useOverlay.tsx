import { ReactNode, ReactPortal, useCallback, useReducer } from "react";
import { OverlayContextProvider } from "./OverlayContext";
import { useDelay } from "../temporal";

export type OverlayRenderer = (children: ReactNode, container: Element | DocumentFragment) => ReactPortal;

type OverlayOption = { at?: Element | DocumentFragment };

type OverlayState<Context> = { isOpen: false; context?: undefined } | { isOpen: true; context: Context };

type OverlayAction<Context> =
  | [0, Context] // open
  | [1] // close
  | [2, Context]; // update context

type OverlayReducer<Context> = (state: OverlayState<Context>, action: OverlayAction<Context>) => OverlayState<Context>;

export const useOverlay = <Context = undefined,>(renderer: OverlayRenderer, { at }: OverlayOption = {}) => {
  const { delay, isDelaying, duration } = useDelay();
  const [{ isOpen, context }, dispatch] = useReducer<OverlayReducer<Context>>(
    (prev, [code, context]) => {
      if (code === 2) return prev.isOpen ? { ...prev, context } : prev;
      if (code === 1) return { isOpen: false };
      return { isOpen: true, context };
    },
    { isOpen: false },
  );

  const open = useCallback(
    (...context: Context extends undefined ? never[] : [Context]) => dispatch([0, context[0]]),
    [],
  );
  const close = useCallback(() => dispatch([1]), []);
  const closeAfter = useCallback((ms: number) => delay(() => !isDelaying && dispatch([1]), ms), [delay, isDelaying]);
  const update = useCallback((context: Context) => dispatch([2, context]), []);
  const overlay = useCallback(
    (input: ReactNode | ((ctx: Context) => ReactNode)) => {
      if (!isOpen) return undefined;
      const target = typeof input === "function" ? input(context) : input;
      return renderer(
        <OverlayContextProvider close={close} closeAfter={closeAfter} isClosing={isDelaying}>
          {target}
        </OverlayContextProvider>,
        at ?? document.body,
      );
    },
    [isOpen, context, close, closeAfter, isDelaying, at, renderer],
  );

  return { overlay, open, close, update, isOpen, context, isClosing: isDelaying, closeDelay: duration };
};
