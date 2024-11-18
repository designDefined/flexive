import styles from "./HomePage.module.css";
import { bindCSS, Div, H1, H4, Li, Nav, Ol, Section } from "@flexive/core-old";
import { FullScreen } from "../../component/FullScreen/FullScreen";
import { ConnceptSection } from "./ConceptSection/ConceptSection";

const cx = bindCSS(styles);

export function HomePage() {
  return (
    <FullScreen className={cx("HomePage")}>
      <Section
        f={{
          spacing: [40, 180],
          justify: ["center", "hidden", "100vh"],
          align: ["center", "hidden", "100vw"],
        }}
      >
        <Div f={{ flow: ["column", "nowrap", "center"] }}>
          <H1 className={cx("title")}>Flexive</H1>
          <H4>Flexbox-based design system builder for ReactJS</H4>
        </Div>
        <Nav>
          <Ol f={{ flow: ["row"], spacing: [0, 24] }}>
            <Li f={{ flow: ["column", "nowrap", "center", "center"], spacing: [[12, 32]] }} className={cx("tab")}>
              Getting Started
            </Li>
            <Li f={{ flow: ["column", "nowrap", "center", "center"], spacing: [[12, 32]] }} className={cx("tab")}>
              Learn Flexbox
            </Li>
            <Li f={{ flow: ["column", "nowrap", "center", "center"], spacing: [[12, 32]] }} className={cx("tab")}>
              Design Systems
            </Li>
          </Ol>
        </Nav>
      </Section>
      <ConnceptSection />
    </FullScreen>
  );
}
