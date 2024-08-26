import { Div, Main } from "@flexive/core";
import { useState } from "react";

function App() {
  const [val, setVal] = useState("100");
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
