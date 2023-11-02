import { MenuItem } from "../interfaces/MenuItem.interface";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import PersonOffTwoToneIcon from "@mui/icons-material/PersonOffTwoTone";
const users: MenuItem = {
  id: "userGroup",
  title: "User",
  children: [
    {
      id: "AllUsers",
      title: "All Users",
      url: "/users/all",
      icon: PeopleOutlineTwoToneIcon,
    },
    {
      id: "BannedUsers",
      title: "Banned Users",
      url: "/users/banned",
      icon: PersonOffTwoToneIcon,
    },
  ],
};

export default users;
