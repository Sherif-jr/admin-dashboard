import { lazy } from "react";
import Loadable from "../components/Loadable";
import { RouteObject } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";

const Dashboard: React.ComponentType = Loadable(
  lazy(() => import("../views/dashboard/Dashboard"))
);

export const MainRoutes: RouteObject = {
  path: "",
  element: <SidebarLayout />,
  children: [
    {
      index: true,
      element: <Dashboard />,
    },
  ],
};
