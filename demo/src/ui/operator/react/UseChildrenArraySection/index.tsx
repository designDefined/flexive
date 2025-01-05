import { Chip } from "@component/Chip";
import styles from "./index.module.css";
import { bindCSS, Div, H2, H3, Input, Section } from "@flexive/core";
import { useChildrenArray } from "@flexive/operator";
import { PropsWithChildren, useState } from "react";
import { Button } from "@component/Button";
import { CodeBlock } from "@component/CodeBlock";
import { RichContent } from "@component/RichContent";
import { Example } from "@component/Example";

const cx = bindCSS(styles);

export const UseChildrenArraySection = () => {
  const [chipIds, setChipIds] = useState<number[]>([1]);
  const [text, setText] = useState("");

  return (
    <Section className={cx("UseChildrenArraySection")}>
      <H2>useChildrenArray</H2>
      <p>
        <code>useChildrenArray</code> converts component's children into an single, flattened array. This is useful when
        you need to slice or split children inside the component. Text node is regarded as single component. Falsy
        child, such as empty string or <code>null</code> is filtered out.
      </p>
      <H3>Examples</H3>
      <p>You can place special component right after the first child like:</p>
      <RichContent>
        <CodeBlock code={splitterExample} />
      </RichContent>
      <p>No matter how many, or which children passed, 'Always After Head' locates at the second place.</p>
      <RichContent>
        <CodeBlock code={childrenExample} />
        <Example g={16}>
          <Div row alignC g={8}>
            <Div basis={80}>count : {chipIds.length}</Div>
            <Button design="filled" onClick={() => setChipIds(prev => [...prev, (prev[prev.length - 1] ?? 0) + 1])}>
              Add
            </Button>
            <Button onClick={() => setChipIds(prev => prev.slice(0, -1))}>Subtract</Button>
          </Div>
          <Div row g={8}>
            <Div>text :</Div>
            <Input type="text" value={text} onChange={e => setText(e.target.value)} />
          </Div>
          <Splitter>
            {!!text.length && text}
            {chipIds.map(id => (
              <Chip className={cx("item")} key={id}>
                child {id}
              </Chip>
            ))}
          </Splitter>
        </Example>
      </RichContent>
      {/* <H3>Usage</H3> */}
    </Section>
  );
};

const Splitter = ({ children }: PropsWithChildren) => {
  const [head, ...rest] = useChildrenArray(children);

  return (
    <Div className={cx("Splitter")} row alignC g={4}>
      {head}
      {head && <Chip theme="red">Always After Head</Chip>}
      {...rest}
    </Div>
  );
};

const splitterExample = `const Splitter = ({ children }: PropsWithChildren) => {
  const [head, ...rest] = useChildrenArray(children);

  return (
    <Div>
      {head}
      {head && <Chip>Always After Head</Chip>}
      {...rest}
    </Div>
  );
};`;

const childrenExample = `<Splitter>
  {!!text.length && text}
  {chipIds.map(id => (
    <Chip className={cx("item")} key={id}>
      child {id}
    </Chip>
  ))}
</Splitter>`;
