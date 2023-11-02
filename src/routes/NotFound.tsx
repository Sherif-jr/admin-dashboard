import { lazy } from "react";
import Loadable from "../components/Loadable";
import { RouteObject } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";

const NotFound: React.ComponentType = Loadable(
  lazy(() => import("../views/notFound/NotFound"))
);

export const NotFoundRoute: RouteObject = {
  path: "",
  element: <SidebarLayout guard />,
  children: [
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
