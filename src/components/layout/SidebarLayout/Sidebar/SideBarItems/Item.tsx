import { useContext } from "react";
import { Button, ListItem } from "@mui/material";
import { SidebarContext } from "../../../../../context/SidebarContext";
import { MenuItem } from "../../../../../interfaces/MenuItem.interface";
import { NavLink } from "react-router-dom";
import WidgetsTwoToneIcon from "@mui/icons-material/WidgetsTwoTone";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
interface Item {
  item: MenuItem;
}

const Item: React.FC<React.PropsWithChildren<Item>> = ({ item }) => {
  const { closeSidebar } = useContext(SidebarContext);

  return (
    <ListItem component="div">
      <Button
        disableRipple
        component={NavLink}
        onClick={closeSidebar}
        to={item.url}
        startIcon={item.icon ? <item.icon /> : <WidgetsTwoToneIcon />}
      >
        {item.title}
      </Button>
    </ListItem>
  );
};

export default Item;
