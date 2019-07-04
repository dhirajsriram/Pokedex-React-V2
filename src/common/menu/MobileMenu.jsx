import React from "react";
import Menu from "@material-ui/core/Menu";
import RenderMenuItems from "./RenderMenuitems"


const MobileMenu = props => {
  const isMobileMenuOpen = Boolean(props.mobileMoreAnchorEl);
  return (
    <Menu
      anchorEl={props.mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={props.mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={props.handleMenuClose}
      className="mobileMenu"
    >
      <RenderMenuItems handleMenuClose={props.handleMenuClose}></RenderMenuItems>
    </Menu>
  );
};

export default MobileMenu;
