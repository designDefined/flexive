import styles from ".//App.module.css";
import { Div, Main, useFlexiveStyle, useFlexiveSystem } from "@flexive/core";
import { useState } from "react";

function App() {
  const [val, setVal] = useState("100");
  const { cx, fx } = useFlexiveSystem(
    { child: { a: true, b: true } },
    // { className: "single", f: { flex: [0] }, css: styles },
    {
      className: { root: "root", child: { b: "b" } },
      f: { root: { flex: [0] }, child: { a: { flex: [2] } } },
      css: styles,
    },
  );

  const { cx: cx2, fx: fx2 } = useFlexiveSystem(true, {
    className: "NoRoot",
    f: { flex: [0] },
    css: styles,
  });

  console.log(cx.root({ App: true })); // App root
  console.log(cx.child.a("A")); // A
  console.log(cx.child.b({ B: false })); // B b

  console.log(fx.root({ flex: [1, 1, 1] }));
  console.log(fx.child.a({ flex: [3, 3, 3] }));

  console.log(cx2.root("single"));
  console.log(fx2.root({ flex: [4, 4, 4] }));

  console.log(fx2.root());

  const f = useFlexiveStyle({ flow: ["row"], justify: ["center", "scroll"], overflow: ["hidden", "auto"] });
  console.log(f);

  return (
    <Main
      f={{
        align: ["stretch", "auto", `${val}vw`, "100vw"],
        justify: ["center", "auto", "100vh", "100vh"],
      }}
    >
      <input value={val} onChange={e => setVal(e.target.value)} />
      <Div
        f={{
          flex: [1, 0, "auto"],
          spacing: [[10, 20, 30], [], { top: 10, right: 20, bottom: 30, left: 40 }],
        }}
      />
    </Main>
  );
}

export default App;
