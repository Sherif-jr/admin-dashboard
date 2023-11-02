import { lazy } from "react";
import Loadable from "../components/Loadable";
import { RouteObject } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";

const LandingSettings: React.ComponentType = Loadable(
  lazy(() => import("../views/websiteSettings/LandingSettings"))
);

export const WebsiteSettings: RouteObject = {
  path: "",
  element: <SidebarLayout guard />,
  children: [
    {
      path: "/website-settings/landing",
      element: <LandingSettings />,
    },
  ],
};
