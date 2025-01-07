import { Article, H1, Main } from "@flexive/core";
import { UseDebounceSection } from "../UseDebounceSection";
import { UseTemporaryStateSection } from "../UseTemporaryStateSection";

export const TemporalPage = () => {
  return (
    <Article>
      <H1>Temporal Operator</H1>
      <Main>
        <UseDebounceSection />
        <UseTemporaryStateSection />
      </Main>
    </Article>
  );
};
