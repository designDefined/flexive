import { ExtendedClassName, parseExtendedClassNames } from "../utils/classNames";

export const bindCSS =
  (css: Record<string, string>) =>
  (...classNames: ExtendedClassName[]) =>
    parseExtendedClassNames(classNames, css);
