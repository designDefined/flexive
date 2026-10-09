import { LayoutStyle } from "./layoutStyle";
import { UtilityStyle } from "./utilityStyle";

export type NativeStyle = React.CSSProperties;
export type FlexiveStyle = LayoutStyle & UtilityStyle & { style?: NativeStyle };

/**
 * Single source of truth for every key {@link FlexiveStyle} owns.
 *
 * `satisfies Record<keyof FlexiveStyle, true>` makes a missing key, a typo or a surplus key
 * a compile error, so adding a prop to the type forces adding it here — and every consumer
 * (prop splitting, memo dependencies) follows automatically.
 */
export const FLEXIVE_PROP_KEYS = {
  /* display */
  flex: true,
  inline: true,
  inlineFlex: true,
  block: true,
  grid: true,

  /* flex */
  f: true,
  grow: true,
  shrink: true,
  basis: true,

  /* flex flow & align */
  colReverse: true,
  row: true,
  rowReverse: true,
  flexWrap: true,
  alignM: true,
  alignC: true,
  alignSelfM: true,
  alignSelfC: true,

  /* sizing */
  sizeM: true,
  maxM: true,
  minM: true,
  sizeC: true,
  maxC: true,
  minC: true,

  /* spacing */
  p: true,
  px: true,
  py: true,
  pt: true,
  pr: true,
  pb: true,
  pl: true,
  m: true,
  mx: true,
  my: true,
  mt: true,
  mr: true,
  mb: true,
  ml: true,
  g: true,
  gM: true,
  gC: true,

  /* overflow */
  over: true,
  overM: true,
  overC: true,
  hide: true,
  hideM: true,
  hideC: true,

  /* utility */
  relative: true,
  static: true,
  fixed: true,
  absolute: true,
  sticky: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
  z: true,
  rad: true,

  /* native style */
  style: true,
} satisfies Record<keyof FlexiveStyle, true>;

export const FLEXIVE_PROP_KEY_LIST = Object.keys(FLEXIVE_PROP_KEYS) as (keyof FlexiveStyle)[];

export const isFlexiveProp = (key: string): key is keyof FlexiveStyle => key in FLEXIVE_PROP_KEYS;
