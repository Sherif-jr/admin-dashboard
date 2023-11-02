import { MenuItem } from "../interfaces/MenuItem.interface";
import FileOpenTwoToneIcon from "@mui/icons-material/FileOpenTwoTone";
const websiteSettings: MenuItem = {
  id: "settingsGroup",
  title: "Website Settings",
  children: [
    {
      id: "landingPageSettings",
      title: "Landing Page",
      url: "/website-settings/landing",
      icon: FileOpenTwoToneIcon,
    },
  ],
};

export default websiteSettings;
