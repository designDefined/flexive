import { ElementDisplay } from "../style";

/** Per-element defaults passed to {@link buildElement}. */
export type ElementOptions = {
  display?: ElementDisplay;
};

/** Form controls, replaced elements and inline containers: inline-level box with flex inside. */
export const CONTROL_OPTION: ElementOptions = { display: "inline-flex" };

/** Text-level semantics: flows and wraps with the surrounding text. */
export const TEXT_OPTION: ElementOptions = { display: "inline" };

/** Text containers: block so that inline children flow as text. */
export const PROSE_OPTION: ElementOptions = { display: "block" };

/** Elements whose layout relies on the browser default (tables, ruby, hidden or non-rendered ones). */
export const NATIVE_OPTION: ElementOptions = { display: "native" };
