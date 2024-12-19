import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@ui/home/HomePage";
import { RootLayout } from "@ui/RootLayout";
import { OperatorLayout } from "@ui/operator/OperatorLayout";
import { OperatorHomePage } from "@ui/operator/home/OperatorHomePage";
import { OverlayPage } from "@ui/operator/overlay/OverlayPage/OverlayPage";
import { TemporalPage } from "@ui/operator/temporal/TemporalPage/TemporalPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "operator",
        element: <OperatorLayout />,
        children: [
          { path: "", element: <OperatorHomePage /> },
          { path: "overlay", element: <OverlayPage /> },
          { path: "temporal", element: <TemporalPage /> },
        ],
      },
    ],
  },
]);
