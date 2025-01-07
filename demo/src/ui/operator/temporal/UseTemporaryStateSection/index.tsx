import { Button } from "@component/Button";
import { Example } from "@component/Example";
import { RichContent } from "@component/RichContent";
import { Div, H2, Section } from "@flexive/core";
import { useTemporaryState } from "@flexive/operator";

export const UseTemporaryStateSection = () => {
  const [state, set, { saved }] = useTemporaryState(false, { updateOnOverlap: true });
  const [headClicked, click, { reset }] = useTemporaryState(false);
  return (
    <Section>
      <H2>useTemporalState</H2>
      <p>WIP.</p>
      <RichContent>
        <Example g={12}>
          <Div row g={12}>
            <Button onClick={() => set(true, 1000)}>1s</Button>
            <Button onClick={() => set(true, 3000)}>3s</Button>
            <Button onClick={() => set(!state)}>Permanent</Button>
            <Button
              design={headClicked ? "filled" : "outlined"}
              onClick={() => {
                if (!headClicked) click(true, 500);
                else {
                  reset();
                  alert("double clicked");
                }
              }}
            >
              alert on double click
            </Button>
          </Div>
          <Div>current: {state ? "active" : "inactive"}</Div>
          <Div>saved: {saved ? "active" : "inactive"}</Div>
        </Example>
      </RichContent>
    </Section>
  );
};
