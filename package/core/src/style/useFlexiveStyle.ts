import { CSSProperties, useMemo } from "react";
import { FLEXIVE_PROP_KEY_LIST, FlexiveStyle } from "./flexiveStyle";
import { parseLayoutStyle } from "./layoutStyle";
import { parseUtilityStyle } from "./utilityStyle";

/**
 * Composes every flexive prop into a single style object.
 *
 * Both parsers read only the keys they know about, so the props object is handed over as is —
 * no intermediate 60-slot literals. The dependency list is derived from
 * {@link FLEXIVE_PROP_KEY_LIST}, so its length is constant and only flexive props invalidate
 * the memo (the native `style` object keeps being compared by reference, as before).
 */
export const useFlexiveStyle = (style: FlexiveStyle): CSSProperties => {
  const deps = FLEXIVE_PROP_KEY_LIST.map(key => style[key]);

  return useMemo(() => {
    const merged: CSSProperties = { ...parseLayoutStyle(style), ...parseUtilityStyle(style), ...style.style };

    // A shorthand (e.g. `gap`) is emitted alongside its longhands (`rowGap`/`columnGap`) explicitly
    // set to `undefined`, so that a later render can revert to the longhands. React still treats an
    // `undefined`-valued key as present and applies it as `node.style[prop] = ""`, and clearing a
    // longhand right after its shorthand is set resets the shorthand's *other* longhand too — wiping
    // out the whole declaration (e.g. `style.gap = "4px"; style.rowGap = ""` clears `column-gap` as
    // a side effect, leaving no gap at all). Dropping `undefined` keys keeps only the winning
    // declaration, so React never issues that clearing write.
    const style_ = merged as unknown as Record<string, unknown>;
    for (const key in style_) if (style_[key] === undefined) delete style_[key];

    return merged;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
