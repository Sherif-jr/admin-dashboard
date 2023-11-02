import { MenuItem } from "../interfaces/MenuItem.interface";
import DateRangeTwoToneIcon from "@mui/icons-material/DateRangeTwoTone";
const events: MenuItem = {
  id: "eventsGroup",
  title: "Events",
  children: [
    {
      id: "AllEvents",
      title: "All Events",
      url: "/events/all",
      icon: DateRangeTwoToneIcon,
    },
  ],
};

export default events;
