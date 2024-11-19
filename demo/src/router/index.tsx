import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../ui/RootLayout";
import { HomePage } from "../ui/home/HomePage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [{ path: "", element: <HomePage /> }],
  },
]);
