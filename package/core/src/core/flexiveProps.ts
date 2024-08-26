import { FlexiveStyle } from "./flexiveStyle";

export type ComponentMap = { [key: string]: ComponentMap | true } | true;

export type ClassNameMap<ComponentMap> = ComponentMap extends true
  ? string
  : { [K in keyof ComponentMap]: ClassNameMap<ComponentMap[K]> };

export type FlexiveStyleMap<ComponentMap> = ComponentMap extends true
  ? FlexiveStyle
  : { [K in keyof ComponentMap]: FlexiveStyleMap<ComponentMap[K]> };

export type FlexiveComponentProps<OriginalProps extends object, Map extends ComponentMap = true> = Omit<
  OriginalProps,
  "className"
> & {
  className?: string | ClassNameMap<Map>;
  f?: FlexiveStyle | FlexiveStyleMap<Map>;
};
