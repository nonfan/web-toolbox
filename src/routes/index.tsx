import React from "react";
import {RouteObject} from "react-router-dom";
import MnemonicWalletPage from "@/pages/MnemonicWalletPage";
import NavigationPage from "@/pages/NavigationPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <NavigationPage/>
  },
  {
    path: "/mnemonic-wallet",
    element: <MnemonicWalletPage/>,
  }
]

export default routes;
