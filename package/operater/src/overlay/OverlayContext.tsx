import { createContext, PropsWithChildren, useContext } from "react";

type CloseFunctions = { close: () => void; closeAfter: (ms: number) => void };
type OverlayContextValue = {
  stack: CloseFunctions[];
  close: () => void;
  closeAfter: (ms: number) => void;
  isClosing: boolean;
};

export const OverlayContext = createContext<OverlayContextValue>({
  stack: [],
  close: () => {},
  closeAfter: () => {},
  isClosing: false,
});

type OverlayContextProviderProps = PropsWithChildren & {
  close: () => void;
  closeAfter: (ms: number) => void;
  isClosing: boolean;
};

export const OverlayContextProvider = ({ close, closeAfter, isClosing, children }: OverlayContextProviderProps) => {
  const { stack } = useContext(OverlayContext);
  return (
    <OverlayContext.Provider value={{ stack: [...stack, { close, closeAfter }], close, closeAfter, isClosing }}>
      {children}
    </OverlayContext.Provider>
  );
};
