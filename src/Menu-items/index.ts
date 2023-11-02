import { MenuItem } from "../interfaces/MenuItem.interface";
import dashboard from "./dashboard";
import users from "./user";
import events from "./events";
import websiteSettings from "./websiteSettings";

export const menuItems: MenuItem[] = [
  dashboard,
  users,
  events,
  websiteSettings,
];
