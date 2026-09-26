/**
 * Base class every flexive element carries. It supplies the layout defaults
 * (`display:flex; flex-direction:column; flex:0 0 auto; position:relative`) that used to be
 * written inline on every single element.
 *
 * Requires `import "@flexive/core/style.css";` once in the app entry.
 * Keep in sync with `style.css`.
 */
export const FLX_CLASS = "flx";

/** Prepends {@link FLX_CLASS} to the user supplied className. */
export const parseFlexiveClassName = (className?: string): string =>
  className ? `${FLX_CLASS} ${className}` : FLX_CLASS;
