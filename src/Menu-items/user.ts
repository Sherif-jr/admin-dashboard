import { MenuItem } from "../interfaces/MenuItem.interface";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";

const users: MenuItem = {
  id: "userGroup",
  title: "Users",
  children: [
    {
      id: "AllUsers",
      title: "All Users",
      url: "/users/all",
      icon: PeopleOutlineTwoToneIcon,
    },
  ],
};

export default users;
