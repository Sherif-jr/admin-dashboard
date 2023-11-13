import { lazy } from "react";
import Loadable from "../components/Loadable";
import { RouteObject } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";

const AllPlaces: React.ComponentType = Loadable(
  lazy(() => import("../views/places/AllPlaces"))
);

export const Places: RouteObject = {
  path: "",
  element: <SidebarLayout guard />,
  children: [
    {
      path: "/places/all",
      element: <AllPlaces />,
    },
  ],
};
