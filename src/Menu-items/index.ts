import { MenuItem } from "../interfaces/MenuItem.interface";
import dashboard from "./dashboard";
import users from "./user";
import events from "./events";
import hosts from "./hosts";
import places from "./places";

export const menuItems: MenuItem[] = [dashboard, users, events, hosts, places];
