import { FlexiveStyle } from "../style";

// Core props
export type FlexiveProps = FlexiveStyle;

// Tags
export type DeprecatedTagNames = "big" | "center" | "keygen" | "menuitem" | "noindex" | "param";
// TODO: Add other invalid tag names
export type FlexiveTagNames = Exclude<keyof JSX.IntrinsicElements & keyof HTMLElementTagNameMap, DeprecatedTagNames>;

// Props of elements
export type PropsWithRef<T extends FlexiveTagNames> = JSX.IntrinsicElements[T] & FlexiveProps;
export type PropsWithoutRef<T extends FlexiveTagNames> = Omit<PropsWithRef<T>, "ref">;
