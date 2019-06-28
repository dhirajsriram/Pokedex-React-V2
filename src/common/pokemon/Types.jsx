import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
    textTransform: "capitalize",
  },
}));

function pokemonType(type) {
  switch (type) {
    case "normal":
      return "#A8A878"
    case "fighting":
      return "#C03028"
    case "flying":
      return "#A890F0"
    case "poison":
      return "#b97fc9"
    case "ground":
      return "#E0C068"
    case "rock":
      return "#705848"
    case "ghost":
      return "#705898"
    case "steel":
      return "#B8B8D0"
    case "fire":
      return "#fd7d24"
    case "water":
      return "#4592c4"
    case "grass":
    case "bug":
      return "#729f3f"
    case "electric":
      return "#F8D030"
    case "psychic":
      return "#F85888"
    case "ice":
      return "#37EDF1";
    case "dragon":
      return "#B8A038"
    case "dark":
      return "#3a3a3a";
    case "fairy":
      return "#EE99AC"
    default:
  }
}

export default function Types(props) {
  const classes = useStyles();

  return (
    <Link className="default-text" to={"/results/" +  props.name}>
    <Chip style={{backgroundColor: pokemonType(props.name)}}
      label={props.name}
      className={classes.chip}
    /></Link>
  );
}
