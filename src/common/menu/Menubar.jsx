import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import Searchcontainer from "./Searchcontainer";
import { withRouter } from "react-router";
import MainMenu from "./MainMenu";
import MobileMenu from "./MobileMenu";

const Menubar = withRouter(props => {
  const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    typeTheme: {
      color: "white"
    }
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }
  
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Drawer />
          <Typography className={classes.title}>
            <Link to="/" className="default-text">
              <img
                src={require("../../assets/Pokedex.png")}
                alt="logo"
                className="logo"
              />
            </Link>
          </Typography>
          <Searchcontainer />
        </Toolbar>
      </AppBar>
      <MainMenu
        menuId={menuId}
        handleMenuClose={handleMenuClose}
        handleMobileMenuClose={handleMobileMenuClose}
        anchorEl={anchorEl}
      />
      <MobileMenu
        mobileMenuId={mobileMenuId}
        handleMenuClose={handleMenuClose}
        handleMobileMenuClose={handleMobileMenuClose}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
      />
    </div>
  );
});

export default Menubar;
