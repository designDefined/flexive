import { Article, PropsOf } from "@flexive/core";

type EmptyOverlayProps = PropsOf<"article">;

export const EmptyOverlay = (props: EmptyOverlayProps) => (
  <Article fixed top={0} left={0} sizeM="100vh" sizeC="100vw" {...props} />
);
