import { MenuItem } from "../interfaces/MenuItem.interface";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";

const hosts: MenuItem = {
  id: "hostsGroup",
  title: "Hosts",
  children: [
    {
      id: "AllHosts",
      title: "All Hosts",
      url: "/hosts/all",
      icon: BadgeTwoToneIcon,
    },
  ],
};

export default hosts;
