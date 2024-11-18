import { Article, PropsWithoutRef } from "@flexive/core";

type FullScreenProps = PropsWithoutRef<"article">;

export const FullScreen = (props: FullScreenProps) => <Article p={24} {...props} />;
