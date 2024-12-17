import { Article, PropsOf } from "@flexive/core";

type FullScreenProps = PropsOf<"article">;

export const FullScreen = (props: FullScreenProps) => <Article p={4} pr={2} {...props} />;
