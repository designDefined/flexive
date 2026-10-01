/**
 * Base class every flexive element carries. It supplies the layout defaults
 * (`display:flex; flex-direction:column; flex:0 0 auto; position:relative`) that used to be
 * written inline on every single element.
 *
 * Elements whose native display is not block-level swap the default `display` through a variant
 * class (see {@link ElementDisplay}), declared after `.flx` with the same specificity.
 *
 * Requires `import "@flexive/core/style.css";` once in the app entry.
 * Keep in sync with `style.css`.
 */
export const FLX_CLASS = "flx";

/** Default `display` of an element. `native` reverts to the browser's own default (`display: revert`). */
export type ElementDisplay = "flex" | "inline-flex" | "inline" | "block" | "native";

const DISPLAY_CLASS: Record<Exclude<ElementDisplay, "flex">, string> = {
  "inline-flex": "flx-inline-flex",
  inline: "flx-inline",
  block: "flx-block",
  native: "flx-native",
};

/** Resolves the classes an element always carries, given its default display. */
export const parseBaseClassName = (display: ElementDisplay = "flex"): string =>
  display === "flex" ? FLX_CLASS : `${FLX_CLASS} ${DISPLAY_CLASS[display]}`;

/** Prepends the base classes to the user supplied className. */
export const parseFlexiveClassName = (baseClassName: string, className?: string): string =>
  className ? `${baseClassName} ${className}` : baseClassName;
