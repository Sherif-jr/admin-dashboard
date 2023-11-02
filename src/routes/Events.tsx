import { lazy } from "react";
import Loadable from "../components/Loadable";
import { RouteObject } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";

const AllEvents: React.ComponentType = Loadable(
  lazy(() => import("../views/events/AllEvents"))
);

export const Events: RouteObject = {
  path: "",
  element: <SidebarLayout />,
  children: [
    {
      path: "/events/all",
      element: <AllEvents />,
    },
  ],
};
