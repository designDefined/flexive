import {
  AnchorHTMLAttributes,
  BlockquoteHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FormHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  LiHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { FlexiveComponentProps } from "../core";
import { ComponentMap } from "../core/flexiveSystem";

// common
export type FlexiveElementProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
  Map
>;

// Content Sectioning
export type FlexiveArticleProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;
export type FlexiveAsideProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;
export type FlexiveFooterProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;
export type FlexiveHeaderProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;
export type FlexiveHeadingProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  Map
>;
export type FlexiveMainProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;
export type FlexiveNavProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;
export type FlexiveSectionProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;

// Text Content
export type FlexiveBlockquoteProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>,
  Map
>;
export type FlexiveDivProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  Map
>;
export type FlexiveLiProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
  Map
>;
export type FlexiveOlProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLOListElement>, HTMLOListElement>,
  Map
>;
export type FlexivePProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>,
  Map
>;
export type FlexivePreProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
  Map
>;
export type FlexiveUlProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
  Map
>;

// Inline Text Semantics
export type FlexiveAProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  Map
>;
export type FlexiveCodeProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;
export type FlexiveIProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;
export type FlexiveSpanProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
  Map
>;
export type FlexiveStrongProps<Map extends ComponentMap = true> = FlexiveElementProps<Map>;

// Image and Multimedia
export type FlexiveImgProps = FlexiveComponentProps<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
>;

// Forms
export type FlexiveButtonProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  Map
>;
export type FlexiveFormProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  Map
>;
export type FlexiveInputProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  Map
>;
export type FlexiveLabelProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  Map
>;
export type FlexiveTextareaProps<Map extends ComponentMap = true> = FlexiveComponentProps<
  DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  Map
>;
