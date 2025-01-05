import { AbsoluteOverlay } from "@component/AbsoluteOverlay";
import { Button } from "@component/Button";
import { CenterOverlay } from "@component/CenterOverlay";
import { Example } from "@component/Example";
import { Modal } from "@component/Modal";
import { RichContent } from "@component/RichContent";
import { H2, Section } from "@flexive/core";
import { useOverlay } from "@flexive/operator";
import { useState } from "react";
import { createPortal } from "react-dom";

export const UseOverlaySection = () => {
  return (
    <Section>
      <H2>useOverlay</H2>
      <p>WIP.</p>
      <RichContent>
        <Example row g={12}>
          <Center />
          <Relative />
        </Example>
      </RichContent>
    </Section>
  );
};

const Center = () => {
  const [text] = useState("hello, world!");
  const { overlay, open } = useOverlay(createPortal);

  return (
    <>
      <Button onClick={() => open()} design="filled">
        Center Overlay
      </Button>
      {overlay(
        <CenterOverlay>
          <Modal sizeC={200} sizeM={300} p={24}>
            {text}
          </Modal>
        </CenterOverlay>,
      )}
    </>
  );
};

const Relative = () => {
  const { overlay, open, close } = useOverlay<DOMRect>(createPortal);

  return (
    <>
      <Button onPointerEnter={e => open(e.currentTarget.getBoundingClientRect())}>Relative Overlay</Button>
      {overlay(rect => (
        <AbsoluteOverlay
          rect={rect}
          onClick={close}
          onPointerLeave={close}
          t={20}
          r={210}
          row
          alignM="end"
          alignC="end"
        >
          <Modal sizeC={200} sizeM={200} p={16} onClick={e => e.stopPropagation()}>
            Relative
          </Modal>
        </AbsoluteOverlay>
      ))}
    </>
  );
};
