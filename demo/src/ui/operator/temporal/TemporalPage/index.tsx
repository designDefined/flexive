import { Article, H1, Main } from "@flexive/core";
import { UseDebouncedSection } from "../UseDebouncedSection";
import { UseTemporaryStateSection } from "../UseTemporaryStateSection";

export const TemporalPage = () => {
  return (
    <Article>
      <H1>Temporal Operator</H1>
      <Main>
        <UseDebouncedSection />
        <UseTemporaryStateSection />
      </Main>
    </Article>
  );
};
