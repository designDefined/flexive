import { ReactNode, ReactPortal, useCallback, useReducer } from "react";
import { OverlayContextProvider } from "./OverlayContext";

export type OverlayRenderer = (children: ReactNode, container: Element | DocumentFragment) => ReactPortal;

type OverlayOption = { at?: Element | DocumentFragment };

type OverlayState<Context> = { isOpen: false; context?: undefined } | { isOpen: true; context: Context };

type OverlayAction<Context> =
  | [0, Context] // open
  | [1]; // close

type OverlayReducer<Context> = (state: OverlayState<Context>, action: OverlayAction<Context>) => OverlayState<Context>;

export const useOverlay = <Context = never,>(renderer: OverlayRenderer, { at }: OverlayOption = {}) => {
  const [{ isOpen, context }, dispatch] = useReducer<OverlayReducer<Context>>(
    (prev, [code, context]) => {
      if (code === 0) return { isOpen: true, context };
      if (code === 1) return { isOpen: false };
      return prev;
    },
    { isOpen: false },
  );

  const open = useCallback((context: Context) => dispatch([0, context]), []);
  const close = useCallback(() => dispatch([1]), []);
  const overlay = useCallback(
    (input: ReactNode | ((ctx: Context) => ReactNode)) => {
      if (!isOpen) return undefined;
      const target = typeof input === "function" ? input(context) : input;
      return <OverlayContextProvider close={close}>{renderer(target, at ?? document.body)}</OverlayContextProvider>;
    },
    [isOpen, context, close, at, renderer],
  );

  return { overlay, open, close, isOpen, context };
};
