import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../ui/home/HomePage";
import { RootLayout } from "../ui/RootLayout";
import { OperatorPage } from "../ui/operator/OperatorPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "operator", element: <OperatorPage /> },
    ],
  },
]);
