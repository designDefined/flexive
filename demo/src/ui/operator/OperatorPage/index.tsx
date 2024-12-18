import { Article, H1 } from "@flexive/core";
import { DebounceSection } from "../temporal/DebounceSection";
import { OverlayPage } from "../overlay/OverlayPage/OverlayPage";

export const OperatorPage = () => (
  <Article f p={16} g={8}>
    <H1>Operator</H1>
    <DebounceSection />
    <OverlayPage />
  </Article>
);
