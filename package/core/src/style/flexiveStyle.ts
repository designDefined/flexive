import { LayoutStyle } from "./layoutStyle";
import { UtilityStyle } from "./utilityStyle";

export type NativeStyle = React.CSSProperties;
export type FlexiveStyle = LayoutStyle & UtilityStyle & { style?: NativeStyle };
