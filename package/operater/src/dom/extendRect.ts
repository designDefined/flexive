export type ExtendValue = { t?: number; r?: number; b?: number; l?: number };

export const extendRect = (rect: DOMRect, { t = 0, r = 0, b = 0, l = 0 }: ExtendValue, isAboslute?: boolean) => {
  const { x, y, width: w, height: h } = rect;
  const top = y - parse(t, h);
  const left = x - parse(l, w);
  const width = w + parse(l, w) + parse(r, w);
  const height = h + parse(t, h) + parse(b, h);
  return {
    top: isAboslute ? top + window.scrollY : top,
    left: isAboslute ? left + window.scrollX : left,
    width,
    height,
  };
};

const parse = (size: number | ((prev: number) => number), from: number) =>
  typeof size === "function" ? size(from) : size;
