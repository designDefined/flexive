import { Div, PropsOf } from "@flexive/core";
import { extendRect } from "@flexive/operator";
import { useRef } from "react";

type AbsoluteOverlayProps = PropsOf<"div"> & { rect: DOMRect; t?: number; b?: number; l?: number; r?: number };

export const AbsoluteOverlay = ({ rect, t = 0, b = 0, l = 0, r = 0, style, ...props }: AbsoluteOverlayProps) => {
  const position = useRef(extendRect(rect, { t, b, l, r }, true));
  return <Div absolute style={{ ...position.current, ...style }} {...props} />;
};
