export type PropsWithClassName = Record<string, unknown> & { className?: string };

export const classifiedProps = Object.entries({
  ["event-click"]: ["onClick", "onMouseDown"],
  ["event-focus"]: ["onInput", "onChange", "onKeydown", "onFocus", "onBlur"],
  ["status-disabled"]: ["disabled"],
  ["status-error"]: ["error"],
});

export const parseFlexiveClass = (props: PropsWithClassName): string =>
  [
    props.className,
    ...classifiedProps.map(([className, keys]) => (keys.some(key => !!props[key]) ? className : undefined)),
  ]
    .filter(c => c !== undefined)
    .join(" ");

export const useFlexiveClass = (props: PropsWithClassName) => {
  return parseFlexiveClass(props); // TODO: memoize
};
