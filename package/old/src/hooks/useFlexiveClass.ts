export type PropsWithClassName = Record<string, unknown> & { className?: string };

export const classifiedProps = Object.entries({
  ["f-click"]: ["onClick", "onMouseDown"],
  ["f-focus"]: ["onInput", "onChange", "onKeydown", "onFocus", "onBlur"],
  ["f-disabled"]: ["disabled"],
  ["f-error"]: ["error"],
});

export const parseFlexiveClass = (props: PropsWithClassName): string =>
  [
    props.className,
    ...classifiedProps
      .filter(([className]) => !props.className?.split(" ").some(c => c.startsWith(className)))
      .map(([className, keys]) => (keys.some(key => !!props[key]) ? className : undefined)),
  ]
    .filter(c => c !== undefined)
    .join(" ");

export const useFlexiveClass = (props: PropsWithClassName) => {
  return parseFlexiveClass(props); // TODO: memoize
};
