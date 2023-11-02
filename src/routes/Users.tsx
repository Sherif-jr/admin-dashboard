import { lazy } from "react";
import Loadable from "../components/Loadable";
import { RouteObject } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";

const AllUsers: React.ComponentType = Loadable(
  lazy(() => import("../views/users/AllUsers"))
);

export const Users: RouteObject = {
  path: "",
  element: <SidebarLayout />,
  children: [
    {
      path: "/users/all",
      element: <AllUsers />,
    },
  ],
};
