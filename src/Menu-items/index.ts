import { MenuItem } from "../interfaces/MenuItem.interface";
import dashboard from "./dashboard";
import users from "./user";
import events from "./events";
import websiteSettings from "./websiteSettings";
import hosts from "./hosts";

export const menuItems: MenuItem[] = [
  dashboard,
  users,
  events,
  hosts,
  websiteSettings,
];
