import { Main } from "@flexive/core";
import { RootNavigator } from "../RootNavigator";
import { Outlet } from "react-router-dom";

export const RootLayout = () => (
  <Main>
    <RootNavigator />
    <Outlet />
  </Main>
);
