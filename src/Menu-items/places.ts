import { MenuItem } from "../interfaces/MenuItem.interface";
import PlaceTwoToneIcon from "@mui/icons-material/PlaceTwoTone";
const places: MenuItem = {
  id: "placesGroup",
  title: "Places",
  children: [
    {
      id: "AllPlaces",
      title: "All Places",
      url: "/places/all",
      icon: PlaceTwoToneIcon,
    },
  ],
};

export default places;
