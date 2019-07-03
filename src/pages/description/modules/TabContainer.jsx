import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

function TabContainer({ children, dir }) {
  const useStyles = makeStyles({
    pokemon: {
      width: "50%",
      margin: "auto",
      display: "block"
    },
    "@media (max-width: 800px)": {
      pokemon: {
        width: "100%"
      }
    }
  });
  const classes = useStyles()
  return (
    <Typography className={classes.pokemon} component="div" dir={dir}>
      {children}
    </Typography>
  );
}

export default TabContainer;

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};
