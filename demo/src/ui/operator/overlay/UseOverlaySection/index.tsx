import styles from "./index.module.css";
import { AbsoluteOverlay } from "@component/AbsoluteOverlay";
import { Button } from "@component/Button";
import { CenterOverlay } from "@component/CenterOverlay";
import { Chip } from "@component/Chip";
import { EmptyOverlay } from "@component/EmptyOverlay";
import { Example } from "@component/Example";
import { Modal } from "@component/Modal";
import { RichContent } from "@component/RichContent";
import { bindCSS, H2, H3, Section } from "@flexive/core";
import { useOverlay } from "@flexive/operator";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useFrameOptimized } from "../../../../../../package/operater/src/temporal/useFrameOptimized";

const cx = bindCSS(styles);

export const UseOverlaySection = () => {
  return (
    <Section>
      <H2>useOverlay</H2>
      <p>WIP.</p>
      <Section>
        <RichContent>
          <Example row g={12}>
            <Center />
            <Relative />
          </Example>
        </RichContent>
      </Section>
      <Section>
        <H3>Usage: Drag & Drop</H3>
        <RichContent>
          <DragExample />
        </RichContent>
      </Section>
      <Section>
        <H3>Usage: Open & Close animation</H3>
        <RichContent>
          <Example row>
            <Animated />
          </Example>
        </RichContent>
      </Section>
    </Section>
  );
};

const Center = () => {
  const [text] = useState("hello, world!");
  const { overlay, open } = useOverlay(createPortal, {
    onOpen: () => console.log("opened!"),
    onClose: () => console.log("closed!"),
  });

  return (
    <>
      <Button onClick={open} design="filled">
        Center Overlay
      </Button>
      {overlay(
        <CenterOverlay>
          <Modal sizeC={200} sizeM={300} p={24} onClick={e => e.stopPropagation()}>
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

const DragExample = () => {
  const [result, setResult] = useState("");
  const { overlay, open, close, isOpen, update } = useOverlay<{ x: number; y: number }>(createPortal, {
    onClose: context => setResult(`last dropped at: (${context.x}, ${context.y})`),
  });
  return (
    <Example row alignC g={8}>
      <Chip theme="red" onPointerDown={e => open({ x: e.clientX, y: e.clientY })} style={{ opacity: isOpen ? 0 : 1 }}>
        Drag Me!
      </Chip>
      {result}
      {overlay(({ x, y }) => (
        <EmptyOverlay onPointerMove={e => update({ x: e.clientX, y: e.clientY })} onPointerUp={() => close()}>
          <DraggedChip x={x} y={y} />
        </EmptyOverlay>
      ))}
    </Example>
  );
};

const DraggedChip = ({ x, y }: { x: number; y: number }) => {
  const { ox, oy } = useFrameOptimized({ ox: x, oy: y });
  return (
    <Chip absolute theme="red" left={ox} top={oy}>
      Drag Me!
    </Chip>
  );
};

const Animated = () => {
  const { overlay, open, isClosing } = useOverlay(createPortal);
  return (
    <>
      <Button onClick={open} design="filled">
        Animated Overlay
      </Button>
      {overlay(
        <CenterOverlay className={cx("AnimatedOverlay", { isClosing })} delay={200}>
          <Modal sizeC={200} sizeM={300} p={24} onClick={e => e.stopPropagation()}>
            Animated
          </Modal>
        </CenterOverlay>,
      )}
    </>
  );
};
