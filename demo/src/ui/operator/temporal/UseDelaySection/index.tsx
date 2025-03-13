import styles from "./index.module.css";
import { bindCSS, Button, Div, H2, Input, Section, Span } from "@flexive/core";
import { useDelay } from "@flexive/operator";
import { useState } from "react";

const cx = bindCSS(styles);

export const UseDelaySection = () => {
  const [text, setText] = useState("");
  const [delayedText, setDelayedText] = useState("");
  const { delay, isDelaying, flush } = useDelay();

  return (
    <Section className={cx("UseDelaySection")} g={16}>
      <H2>useDelay</H2>
      <Div row g={8}>
        <Span>Input:</Span>
        <Input
          type="text"
          value={text}
          onChange={e => {
            setText(e.target.value);
            delay(() => setDelayedText(e.target.value), 5000);
          }}
        />
      </Div>
      <Div className={cx({ isDelaying })} row g={16}>
        <Div row g={4}>
          <Span>Normal:</Span>
          <Span>{text}</Span>
        </Div>
        <Div row g={4}>
          <Span>Delayed:</Span>
          <Span>{delayedText}</Span>
        </Div>
      </Div>
      <Button onClick={flush} row alignC alignSelfC="start">
        Flush
      </Button>
    </Section>
  );
};
