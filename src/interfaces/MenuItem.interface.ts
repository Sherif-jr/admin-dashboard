// import { ReactElement } from "react";

export interface MenuItem {
  id: string;
  title: string;
  url?: string;
  caption?: string;
  icon?: React.ComponentType;
  children?: Array<MenuItem>;
}
