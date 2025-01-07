import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "@ui/home";
import { RootLayout } from "@ui/RootLayout";
import { OperatorLayout } from "@ui/operator/OperatorLayout";
import { OperatorHomePage } from "@ui/operator/home/OperatorHomePage";
import { OverlayPage } from "@ui/operator/overlay/OverlayPage";
import { TemporalPage } from "@ui/operator/temporal/TemporalPage";
import { ReactPage } from "@ui/operator/react/ReactPage";

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
          { path: "react", element: <ReactPage /> },
          { path: "temporal", element: <TemporalPage /> },
        ],
      },
    ],
  },
]);
