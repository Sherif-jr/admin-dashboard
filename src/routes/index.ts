import { createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./AuthRoutes";
import { MainRoutes } from "./MainRoutes";
import { Users } from "./Users";
import { Events } from "./Events";
import { Others } from "./Others";
import { Hosts } from "./Hosts";
import { Places } from "./Places";

export const router = createBrowserRouter([
  MainRoutes,
  AuthRoutes,
  Users,
  Events,
  Hosts,
  Places,
  Others,
]);
