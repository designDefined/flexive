/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import {
  addRoot,
  ClassNameBinderMap,
  ClassNameMap,
  ComponentMap,
  ComponentMapWithRoot,
  createClassNameBinder,
  createFlexiveStyleBinder,
  FlexiveStyleBinderMap,
  FlexiveStyleMap,
} from "../core/flexiveSystem";
import { FlexiveStyle, isFlexiveStyle } from "../core";

type UseFlexiveSystemParams<Map extends ComponentMap> = {
  f?: FlexiveStyle | FlexiveStyleMap<ComponentMapWithRoot<Map>>;
  className?: string | ClassNameMap<ComponentMapWithRoot<Map>>;
  css?: Record<string, string>;
};

export const useFlexiveSystem = <Map extends ComponentMap>(
  map: Map,
  { className, css, f }: UseFlexiveSystemParams<Map>,
  deps: unknown[] = [],
) => {
  const mapWithRoot: ComponentMapWithRoot<Map> = addRoot(map);

  const cx: ClassNameBinderMap<ComponentMapWithRoot<Map>> = useMemo(() => {
    const classNameMap = (typeof className === "string" ? { root: className } : className) as ClassNameMap<
      ComponentMapWithRoot<Map>
    >;
    return createClassNameBinder(mapWithRoot, css, classNameMap);
  }, [...deps]);

  const fx: FlexiveStyleBinderMap<ComponentMapWithRoot<Map>> = useMemo(() => {
    const styleMap = (isFlexiveStyle(f) ? { root: f } : f) as FlexiveStyleMap<ComponentMapWithRoot<Map>>;
    return createFlexiveStyleBinder(mapWithRoot, styleMap);
  }, [...deps]);

  return { cx, fx };
};
