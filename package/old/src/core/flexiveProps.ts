import { FlexiveStyle } from "./flexiveStyle";
import { ComponentMap, ClassNameMap, FlexiveStyleMap, ComponentMapWithRoot } from "./flexiveSystem";

export type FlexiveComponentProps<OriginalProps extends object, Map extends ComponentMap = true> = Omit<
  OriginalProps,
  "className"
> & {
  className?: string | ClassNameMap<ComponentMapWithRoot<Map>>;
  f?: FlexiveStyle | FlexiveStyleMap<ComponentMapWithRoot<Map>>;
};
