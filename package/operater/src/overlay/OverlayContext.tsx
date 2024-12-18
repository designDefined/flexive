import { createContext, PropsWithChildren, useContext } from "react";

type OverlayContextValue = { close: (count?: number) => void; closeList: (() => void)[] };

export const OverlayContext = createContext<OverlayContextValue>({ close: () => {}, closeList: [] });

type OverlayContextProviderProps = PropsWithChildren & { close: () => void };

export const OverlayContextProvider = ({ close: close, children }: OverlayContextProviderProps) => {
  const { closeList } = useContext(OverlayContext);
  return (
    <OverlayContext.Provider
      value={{
        closeList: [...closeList, close],
        close: count => {
          close();
          if (count) closeList.slice(-count).forEach(prevClose => prevClose());
        },
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};
