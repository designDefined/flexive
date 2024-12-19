import { Button, Div, H1, Input, Main } from "@flexive/core";
import { useOverlay } from "@flexive/operator";
import { useState } from "react";
import { createPortal } from "react-dom";

export const OverlayPage = () => {
  const [input, setInput] = useState({ name: "" });
  const { overlay, open } = useOverlay<{ id: number }>(createPortal);

  return (
    <Main>
      <H1>Overlay Operator</H1>
      <Div row g={8}>
        <Button onClick={() => open({ id: 1 })}>Open 1</Button>
        <Button onClick={() => open({ id: 2 })}>Open 2</Button>
        <Input type="text" value={input.name} onChange={e => setInput({ name: e.target.value })} />
      </Div>
      {overlay(<Div>Opened name: {input.name}</Div>)}
      {overlay(state => (
        <Div>
          Opened id: {state.id} name: {input.name}
        </Div>
      ))}
      {overlay(
        <Div>
          Opened Input
          <Input type="text" value={input.name} onChange={e => setInput({ name: e.target.value })} />
        </Div>,
      )}
    </Main>
  );
};
