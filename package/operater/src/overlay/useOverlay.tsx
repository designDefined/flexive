import { ReactNode, ReactPortal, useCallback, useReducer } from "react";
import { OverlayContextProvider } from "./OverlayContext";
import { useDelay } from "../temporal";

export type OverlayRenderer = (children: ReactNode, container: Element | DocumentFragment) => ReactPortal;

type OverlayOption = { at?: Element | DocumentFragment };

type OverlayState<Context> = { isOpen: false; context?: undefined } | { isOpen: true; context: Context };

type OverlayAction<Context> =
  | [0, Context] // open
  | [1]; // close

type OverlayReducer<Context> = (state: OverlayState<Context>, action: OverlayAction<Context>) => OverlayState<Context>;

export const useOverlay = <Context = undefined,>(renderer: OverlayRenderer, { at }: OverlayOption = {}) => {
  const { delay, isDelaying, duration } = useDelay();
  const [{ isOpen, context }, dispatch] = useReducer<OverlayReducer<Context>>(
    (prev, [code, context]) => {
      if (code === 0) return { isOpen: true, context };
      if (code === 1) return { isOpen: false };
      return prev;
    },
    { isOpen: false },
  );

  const open = useCallback(
    (...context: Context extends undefined ? Context[] : [Context]) => dispatch([0, context[0]]),
    [],
  );
  const close = useCallback(() => dispatch([1]), []);
  const closeAfter = useCallback((ms: number) => delay(() => dispatch([1]), ms), [delay]);
  const overlay = useCallback(
    (input: ReactNode | ((ctx: Context) => ReactNode)) => {
      if (!isOpen) return undefined;
      const target = typeof input === "function" ? input(context) : input;
      return renderer(
        <OverlayContextProvider close={close} closeAfter={closeAfter}>
          {target}
        </OverlayContextProvider>,
        at ?? document.body,
      );
    },
    [isOpen, context, close, closeAfter, at, renderer],
  );

  return { overlay, open, close, isOpen, context, isClosing: isDelaying, closeDelay: duration };
};
