import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Drawer from "./Drawer";
import { Link } from "react-router-dom";
import Searchcontainer from "./Searchcontainer";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import MainMenu from "./MainMenu";
import MobileMenu from "./MobileMenu";
import Icon from "@material-ui/core/Icon";
import { findTypeColor } from "../context/pokemonContext";

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
  const [pokemonType, setpokemonType] = React.useState("All Types");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  useEffect(() => {
    let results = "/results/";
    if (window.location.pathname.indexOf("/results/") > -1) {
      setpokemonType(window.location.pathname.replace(results, ""));
    } else {
      setpokemonType("All types");
    }
  }, [window.location.pathname]);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
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
          <div className={classes.sectionDesktop}>
            <Button
              edge="end"
              aria-label="Sort by types"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              variant="contained"
              style={{ backgroundColor: findTypeColor(pokemonType) }}
              className={pokemonType !== "All types" ? classes.typeTheme : ""}
            >
              {pokemonType}
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <Icon>invert_colors</Icon>
            </IconButton>
          </div>
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
