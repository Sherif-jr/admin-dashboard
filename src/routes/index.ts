import { createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { MainRoutes } from "./MainRoutes";
import { Users } from "./Users";
import { Events } from "./Events";
import { WebsiteSettings } from "./WebSiteSettings";

export const router = createBrowserRouter([
  MainRoutes,
  AuthRoutes,
  Users,
  Events,
  WebsiteSettings,
]);
