import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import { Types } from "../context/pokemonContext";


const RenderMenuItems = React.forwardRef((props,ref) => {
  const useStyles = makeStyles(theme => ({
    typeImages: {
      filter: "saturate(2)"
    },
    menuItems: {
      display: "inline-flex"
    }
  }));
  const classes = useStyles();
  return (
    <React.Fragment>
      {Types.map(function(type, i) {
        return (
          <span key={i}>
            {type === "reset" ? (
              <Link to={"/"} key={i} className="default-text"> 
                <MenuItem
                  onClick={props.handleMenuClose}
                  className={classes.menuItems}
                >
                  <Icon>close</Icon>
                </MenuItem>
              </Link>
            ) : (
              <Link to={"/results/" + type} key={i}>
                <MenuItem
                  onClick={props.handleMenuClose}
                  className={classes.menuItems}
                >
                  <img
                    className={classes.typeImages}
                    src={require("../../assets/" + type + ".png")}
                    alt={type}
                  />
                </MenuItem>
              </Link>
            )}
          </span>
        );
      })}
    </React.Fragment>
  );
});

export default RenderMenuItems;
