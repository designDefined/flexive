import { Div, PropsOf } from "@flexive/core";

type RichContentProps = PropsOf<"div">;

export const RichContent = ({ p, ...props }: RichContentProps) => <Div px={p ?? 24} py={p ?? 16} g={32} {...props} />;
