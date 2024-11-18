import { LayoutStyle } from "./layoutStyle";

export type NativeStyle = React.CSSProperties;
export type FlexiveStyle = LayoutStyle & { style?: NativeStyle };
