import { createContext, PropsWithChildren, useContext } from "react";

type CloseFunctions = { close: () => void; closeAfter: (ms: number) => void };
type OverlayContextValue = { stack: CloseFunctions[]; close: () => void; closeAfter: (ms: number) => void };

export const OverlayContext = createContext<OverlayContextValue>({ stack: [], close: () => {}, closeAfter: () => {} });

type OverlayContextProviderProps = PropsWithChildren & { close: () => void; closeAfter: (ms: number) => void };

export const OverlayContextProvider = ({ close, closeAfter, children }: OverlayContextProviderProps) => {
  const { stack } = useContext(OverlayContext);
  return (
    <OverlayContext.Provider value={{ stack: [...stack, { close, closeAfter }], close, closeAfter }}>
      {children}
    </OverlayContext.Provider>
  );
};
