import { useContext } from "react";
import { OverlayContext } from "./OverlayContext";

export const useOverlayControl = () => {
  const { close, closeList } = useContext(OverlayContext);
  return { close, closeList };
};
