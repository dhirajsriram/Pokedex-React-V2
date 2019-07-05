import React from "react";
import { numberPadding, getNumber } from "../context/pokemonContext";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  menuItems: {
    borderRadius: "20px",
    textTransform: "capitalize"
  },
  image: {
    width: "75px",
    marginRight: "10px"
  }
});


const Suggestion = function(suggestionProps) {
  const classes = useStyles();
  const { suggestion, index, itemProps, highlightedIndex } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  var number = getNumber(suggestion.url);

  return (
    <React.Fragment>
      <Link className="default-text" to={"/description/" + suggestion.name}>
        <MenuItem
          {...itemProps}
          key={suggestion.name}
          selected={isHighlighted}
          component="div"
          className={classes.menuItems}
        >
          <img
            className={classes.image}
            src={
              "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
              numberPadding(number, 3) +
              ".png"
            }
            alt={suggestion.name + " image"}
          />
          <Typography component="div">
            <Box fontWeight="fontWeightMedium" m={1}>
              {suggestion.name}
            </Box>
            <Box fontWeight="fontWeightRegular" m={1}>
              {"#" + numberPadding(number, 3)}
            </Box>
          </Typography>
        </MenuItem>
      </Link>
    </React.Fragment>
  );
};

export default Suggestion;
