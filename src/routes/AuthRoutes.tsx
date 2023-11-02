import { lazy } from "react";
import Loadable from "../components/Loadable";
import { RouteObject } from "react-router-dom";
import MinimalLayout from "../components/layout/MinimalLayout";
import ForgetPassword from "../views/auth/ForgetPassword";

const Login: React.ComponentType = Loadable(
  lazy(() => import("../views/auth/Login"))
);

export const AuthRoutes: RouteObject = {
  path: "",
  element: <MinimalLayout guard />,
  children: [
    {
      path: "auth/login",
      index: true,
      element: <Login />,
    },
    {
      path: "auth/forgot-password",
      element: <ForgetPassword />,
    },
  ],
};
