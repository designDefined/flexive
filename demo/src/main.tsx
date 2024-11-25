import "./style/index.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { filterProps } from "@flexive/core";

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);

console.log(filterProps({ f: true, p: 20, a: "ASDF", ccc: 123 }));
