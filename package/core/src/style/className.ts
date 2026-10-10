/**
 * Base class every flexive element carries. It supplies the layout defaults
 * (`display:flex; flex-direction:column; flex:0 0 auto; position:relative`) that used to be
 * written inline on every single element.
 *
 * Elements whose native display is not block-level swap the default `display` through a variant
 * class (see {@link ElementDisplay}), declared after `.flx` with the same specificity.
 * `native` elements don't carry it at all.
 *
 * Requires `import "@flexive/core/style.css";` once in the app entry.
 * Keep in sync with `style.css`.
 */
export const FLX_CLASS = "flx";

/**
 * Default `display` of an element. `native` applies no flexive defaults at all, leaving display,
 * position and flex to the browser.
 */
export type ElementDisplay = "flex" | "inline-flex" | "inline" | "block" | "native";

const DISPLAY_CLASS: Record<Exclude<ElementDisplay, "flex" | "native">, string> = {
  "inline-flex": "flx-inline-flex",
  inline: "flx-inline",
  block: "flx-block",
};

/** Resolves the classes an element always carries, given its default display. Empty for `native`. */
export const parseBaseClassName = (display: ElementDisplay = "flex"): string =>
  display === "native" ? "" : display === "flex" ? FLX_CLASS : `${FLX_CLASS} ${DISPLAY_CLASS[display]}`;

/** Prepends the base classes to the user supplied className. `undefined` when both are empty. */
export const parseFlexiveClassName = (baseClassName: string, className?: string): string | undefined =>
  baseClassName && className ? `${baseClassName} ${className}` : baseClassName || className || undefined;
