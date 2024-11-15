import { Div, H3, H4, Main, Section } from "@flexive/core";

export function ConnceptSection() {
  return (
    <Section f={{ spacing: [[64, 128], 80] }}>
      <H3 className="weight-bold">Main Concept</H3>
      <Main f={{ spacing: [0, 128] }}>
        <Section f={{ flow: ["row"] }}>
          <Div f={{ flex: [1, 1, 0], spacing: [0, 20] }}>
            <H4>Two functionalities of CSS</H4>
            <p>
              When we stylize web components using CSS, we consider two different aspects of design:{" "}
              <strong>LOOK</strong>, arousing certain feelings or moods with the appearance of components, and{" "}
              <strong>LAYOUT</strong>, placing each component at right place with enough margin to compose integrated
              services.
            </p>
            <p>Although look is shared through various, layout is inconsistent. </p>
          </Div>
          <Div f={{ flex: [1, 1, 0] }}></Div>
        </Section>
        <Section f={{ flow: ["row"] }}>
          <Div f={{ flex: [1, 1, 0], spacing: [0, 20] }}>
            <H4>Two functionalities of CSS</H4>
            <p>
              When we stylize web components using CSS, we consider two different aspects of design:{" "}
              <strong>LOOK</strong>, arousing certain feelings or moods with the appearance of components, and{" "}
              <strong>LAYOUT</strong>, placing each component at right place with enough margin to compose integrated
              services.
            </p>
          </Div>
          <Div f={{ flex: [1, 1, 0] }}></Div>
        </Section>
      </Main>
    </Section>
  );
}
