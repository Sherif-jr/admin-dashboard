import { Box, styled } from "@mui/material";
import GroupItem from "../SideBarItems/GroupItem";
import Item from "../SideBarItems/Item";
import { menuItems } from "../../../../../Menu-items";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

function SidebarMenu() {
  return (
    <>
      <MenuWrapper>
        {menuItems.map((group) => (
          <GroupItem item={group} key={group.id}>
            {group.children.map((item) => (
              <Item item={item} />
            ))}
          </GroupItem>
        ))}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
