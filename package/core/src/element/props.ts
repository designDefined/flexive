import { JSX } from "react";
import { FlexiveStyle } from "../style";

// Core props
export type FlexiveProps = FlexiveStyle;

// Tags
export type DeprecatedTagNames = "big" | "center" | "keygen" | "menuitem" | "noindex" | "param";
// TODO: Add other invalid tag names
export type FlexiveTagNames = Exclude<keyof JSX.IntrinsicElements & keyof HTMLElementTagNameMap, DeprecatedTagNames>;

// Props of elements
export type PropsOf<T extends FlexiveTagNames> = Omit<JSX.IntrinsicElements[T] & FlexiveProps, "ref">;
export type NativeElementOf<T extends FlexiveTagNames> = HTMLElementTagNameMap[T];
