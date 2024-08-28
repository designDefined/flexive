/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlexiveStyle } from "../core";

// export const deepMerge = <T>(arg1: T, arg2: T): T => {
//   if (Array.isArray(arg1) && Array.isArray(arg2)) {
//     const longer = arg1.length > arg2.length ? arg1 : arg2;
//     const shorter = arg1.length > arg2.length ? arg2 : arg1;
//     return longer.map((item, index) => deepMerge(item, shorter[index])) as T;
//   }
//   if (typeof arg1 === "object" && arg1 && typeof arg2 === "object" && arg2) {
//     return Object.keys({ ...arg2, ...arg1 }).reduce((acc, key) => {
//       acc[key as keyof T] = deepMerge(arg1[key as keyof T], arg2[key as keyof T]);
//       return acc;
//     }, {} as T);
//   }
//   return arg1 ?? arg2;
// };

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
