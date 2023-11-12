import { lazy } from "react";
import Loadable from "../components/Loadable";
import { RouteObject } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";

const AllHosts: React.ComponentType = Loadable(
  lazy(() => import("../views/hosts/AllHosts"))
);

export const Hosts: RouteObject = {
  path: "",
  element: <SidebarLayout guard />,
  children: [
    {
      path: "hosts/all",
      element: <AllHosts />,
    },
  ],
};
