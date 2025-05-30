export type SizeValue = string | number;
export type JustifyValue = "start" | "end" | "center" | "between" | "around" | "evenly";
export type AlignValue = "start" | "end" | "center" | "stretch" | "baseline";
export type OverflowValue = "auto" | "hidden" | "scroll" | "visible";

// predicate
export const isUndefined = (value: unknown): value is undefined => value === undefined;
export const isBoolean = (value: unknown, bool?: boolean): value is boolean =>
  typeof value === "boolean" && (isUndefined(bool) || value === bool);
export const isNumber = (value: unknown): value is number => typeof value === "number";

// parse
export const parseSize: (value?: SizeValue) => string | undefined = value => {
  if (isNumber(value)) return `${value}px`;
  return value;
};

export const parseBoolable = <T>(value: T | boolean, trueValue: T, falseValue?: T) =>
  isBoolean(value) ? (value ? trueValue : falseValue) : value;

export const parseDirectionalSizes = (
  ...params: [SizeValue?, SizeValue?, SizeValue?, SizeValue?, SizeValue?, SizeValue?, SizeValue?]
): string | undefined => {
  if (params.every(p => p === undefined)) return undefined;
  const [rt, x, y, t, r, b, l] = params;
  const result: SizeValue[] = [];
  if (!isUndefined(l) || !isUndefined(r) || !isUndefined(t) || !isUndefined(b)) {
    result.push(t ?? y ?? rt ?? 0);
    result.push(r ?? x ?? rt ?? 0);
    result.push(b ?? y ?? rt ?? 0);
    result.push(l ?? x ?? rt ?? 0);
    return result.map(parseSize).join(" ");
  }
  if (!isUndefined(x) || !isUndefined(y)) {
    result.push(y ?? rt ?? 0);
    result.push(x ?? rt ?? 0);
    return result.map(parseSize).join(" ");
  }
  return parseSize(rt);
};

export const parseAlign = (value?: AlignValue | JustifyValue) => {
  switch (value) {
    case "start":
      return "flex-start";
    case "end":
      return "flex-end";
    case "center":
      return "center";
    case "between":
      return "space-between";
    case "around":
      return "space-around";
    case "evenly":
      return "space-evenly";
    default:
      return value;
  }
};
