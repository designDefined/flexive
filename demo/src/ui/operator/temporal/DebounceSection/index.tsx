import styles from "./index.module.css";
import { bindCSS, Button, Div, H2, Input, Section, Span } from "@flexive/core";
import { useDebounce } from "@flexive/operator";
import { useState } from "react";

const cx = bindCSS(styles);

export const DebounceSection = () => {
  const [text, setText] = useState("");
  const { value, flush, isDebouncing } = useDebounce({ text }, { ms: 1000 });

  return (
    <Section className={cx("DebounceSection")} g={16}>
      <H2>Debounce</H2>
      <Div row g={8}>
        <Span>Input:</Span>
        <Input type="text" value={text} onChange={e => setText(e.target.value)} />
      </Div>
      <Div className={cx({ isDebouncing })} row g={8}>
        <Span>Debounced:</Span>
        <Span>{value.text}</Span>
      </Div>
      <Button onClick={flush} row alignC alignSelfC="start">
        Flush
      </Button>
    </Section>
  );
};
