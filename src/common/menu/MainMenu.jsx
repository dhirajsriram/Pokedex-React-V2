import React from "react";
import Menu from "@material-ui/core/Menu";
import RenderMenuItems from "./RenderMenuitems"

const MainMenu = props => {
  const isMenuOpen = Boolean(props.anchorEl);
  return (
    <Menu
      anchorEl={props.anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={props.menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={props.handleMenuClose}
    >
      <RenderMenuItems handleMenuClose={props.handleMenuClose}></RenderMenuItems>
    </Menu>
  );
};
export default MainMenu;
