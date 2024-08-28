import { mergeStyle } from "../utils/merge";
import { FlexiveStyle } from "./flexiveStyle";

export type ComponentMap = { [key: string]: ComponentMap | true } | true;
export type ComponentMapWithRoot<Map extends ComponentMap> = Map extends true ? true : { root: true } & Map;
export const isMapEnd = (map: ComponentMap): map is true => map === true;
export const addRoot = <Map extends ComponentMap>(map: Map): ComponentMapWithRoot<Map> =>
  (typeof map === "object" ? { root: true, ...map } : true) as ComponentMapWithRoot<Map>;

export type ClassNameMap<Map> = Map extends true ? string : { [K in keyof Map]?: ClassNameMap<Map[K]> };
export type ClassNameBinder = (className: string) => string;
export type ClassNameBinderMap<Map> = Map extends true
  ? ClassNameBinder
  : { [K in keyof Map]: ClassNameBinderMap<Map[K]> };
const mergeClasses = (...arr: (string | undefined)[]) => arr.filter(c => !!c).join(" ");
export const createClassNameBinder = <Map extends ComponentMap>(
  map: Map,
  classNameMap?: ClassNameMap<Map>,
): ClassNameBinderMap<Map> => {
  if (isMapEnd(map))
    return ((className: string) =>
      mergeClasses(className, classNameMap as string | undefined)) as ClassNameBinderMap<Map>;

  const keyOfMap = Object.keys(map) as (keyof Map)[];
  return keyOfMap.reduce((acc, key) => {
    acc[key] = createClassNameBinder(
      map[key] as ComponentMap,
      classNameMap?.[key as keyof ClassNameMap<Map>] as ClassNameMap<unknown>,
    );
    return acc;
  }, {} as any);
};

export type FlexiveStyleMap<Map> = Map extends true ? FlexiveStyle : { [K in keyof Map]?: FlexiveStyleMap<Map[K]> };

export type FlexiveStyleBinder = (f: FlexiveStyle) => FlexiveStyle;
export type FlexiveStyleBinderMap<Map> = Map extends true
  ? FlexiveStyleBinder
  : { [K in keyof Map]: FlexiveStyleBinderMap<Map[K]> };
export const createFlexiveStyleBinder = <Map extends ComponentMap>(
  map: Map,
  styleMap?: FlexiveStyleMap<Map>,
): FlexiveStyleBinderMap<Map> => {
  if (isMapEnd(map))
    return ((style: FlexiveStyle) => mergeStyle(style, (styleMap ?? {}) as FlexiveStyle)) as FlexiveStyleBinderMap<Map>;

  const keyOfMap = Object.keys(map) as (keyof Map)[];
  return keyOfMap.reduce((acc, key) => {
    acc[key] = createFlexiveStyleBinder(
      map[key] as ComponentMap,
      styleMap?.[key as keyof FlexiveStyleMap<Map>] as FlexiveStyleMap<unknown>,
    );
    return acc;
  }, {} as any);
};
