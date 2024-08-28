import { Div, Main, useFlexiveSystem } from "@flexive/core";
import { useState } from "react";

function App() {
  const [val, setVal] = useState("100");
  const { cx, fx } = useFlexiveSystem(
    { child: { a: true, b: true } },
    { className: "single", f: { flex: [0] } },
    // { className: { root: "root", child: { b: "b" } }, f: { root: { flex: [0] }, child: { a: { flex: [2] } } } },
  );

  console.log(cx.root("App")); // App root
  console.log(cx.child.a("A")); // A
  console.log(cx.child.b("B")); // B b

  console.log(fx.root({ flex: [1, 1, 1] }));
  console.log(fx.child.a({ flex: [3, 3, 3] }));

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
