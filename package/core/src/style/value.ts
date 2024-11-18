export type SizeValue = string | number;
export type DirectionalSizeValue = {
  x?: SizeValue;
  y?: SizeValue;
  t?: SizeValue;
  r?: SizeValue;
  b?: SizeValue;
  l?: SizeValue;
};
export type JustifyValue = "start" | "end" | "center" | "between" | "around" | "evenly";
export type AlignValue = "start" | "end" | "center" | "stretch" | "baseline";
export type OverflowValue = "auto" | "hidden" | "scroll" | "visible";

// predicate
export const isUndefined = (value: unknown): value is undefined => value === undefined;
export const isBoolean = (value: unknown, bool?: boolean): value is boolean =>
  typeof value === "boolean" && (isUndefined(bool) || value === bool);
export const isNumber = (value: unknown): value is number => typeof value === "number";
export const isString = (value: unknown): value is string => typeof value === "string";
export const isSizeValue = (value: unknown): value is SizeValue => isNumber(value) || isString(value);

// parse
export const parseSize: (value?: SizeValue) => string | undefined = value => {
  if (isNumber(value)) return `${value}px`;
  return value;
};
export const parseDirectionalSize = (value?: DirectionalSizeValue): string | undefined => {
  if (value === undefined) return undefined;
  const result: SizeValue[] = [];
  const { x, y, t, r, b, l } = value;
  if (isUndefined(l) || isUndefined(r) || isUndefined(t) || isUndefined(b)) {
    result.push(t ?? 0);
    result.push(r ?? 0);
    result.push(b ?? 0);
    result.push(l ?? 0);
    return result.map(parseSize).join(" ");
  }
  result.push(x ?? 0);
  result.push(y ?? 0);
  return result.map(parseSize).join(" ");
};
