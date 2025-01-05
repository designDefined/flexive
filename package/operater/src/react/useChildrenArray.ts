import { ReactNode, useMemo } from "react";

const flattenReactNode = (input: ReactNode): ReactNode => {
  if (Array.isArray(input)) return input.flatMap(flattenReactNode);
  return input;
};

// TODO: Check if is there any Iterator<ReactNode> that is not an array.
export const useChildrenArray = (children?: ReactNode): ReactNode[] => {
  const result = useMemo(
    () => (Array.isArray(children) ? children.flatMap(flattenReactNode).filter(child => !!child) : [children]),
    [children],
  );
  return result;
};
