/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlexiveStyle } from "../core";

export const mergeStyle = (...args: FlexiveStyle[]): FlexiveStyle => {
  return args.reduce((acc, cur) => {
    (Object.keys(cur) as (keyof FlexiveStyle)[]).forEach(key => {
      if (Array.isArray(acc[key]) && Array.isArray(cur[key]))
        acc[key] = [...cur[key], ...acc[key].slice(cur[key].length)];
      else acc[key] = cur[key];
    });
    return acc;
  }, {} as any);
};
