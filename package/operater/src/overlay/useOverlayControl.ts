import { useContext } from "react";
import { OverlayContext } from "./OverlayContext";

export const useOverlayControl = () => {
  const context = useContext(OverlayContext);
  return context;
};
