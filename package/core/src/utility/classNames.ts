import { Falsy } from "./falsy";

export type ExtendedClassName = string | Falsy | Record<string, boolean | Falsy>;

export const parseExtendedClassNames = (classNames: ExtendedClassName[], bind?: Record<string, string>): string => {
  const mapped = classNames
    .filter(c => !!c)
    .flatMap(c =>
      typeof c === "object" && c !== null
        ? Object.entries(c)
            .filter(([, bool]) => !!bool)
            .map(([name]) => name)
        : [c as string],
    );
  const binded = bind === undefined ? mapped : mapped.map(c => bind[c] ?? c);
  return binded.join(" ");
};

export const bindCSS =
  (css: Record<string, string>) =>
  (...classNames: ExtendedClassName[]) =>
    parseExtendedClassNames(classNames, css);
