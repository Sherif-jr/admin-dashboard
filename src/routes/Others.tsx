import { lazy } from "react";
import Loadable from "../components/Loadable";
import { RouteObject } from "react-router-dom";
import SidebarLayout from "../components/layout/SidebarLayout";

const AdminManagement: React.ComponentType = Loadable(
  lazy(() => import("../views/Others/AdminManagement/AdminManagement"))
);
const Profile: React.ComponentType = Loadable(
  lazy(() => import("../views/Others/Profile"))
);

export const Others: RouteObject = {
  path: "",
  element: <SidebarLayout guard />,
  children: [
    {
      path: "management/dashboard-admins",
      element: <AdminManagement />,
    },
    {
      path: "management/profile/details",
      element: <Profile />,
    },
  ],
};
