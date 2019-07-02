import React from 'react';
import { PokemonConsumer } from "../context/pokemonContext";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";

const Suggestion = function(suggestionProps) {
    const {
      suggestion,
      index,
      itemProps,
      highlightedIndex,
      selectedItem
    } = suggestionProps;
  
    function getNumber(url) {
      var number = url
      .replace("https://pokeapi.co/api/v2/pokemon/", "")
      .replace("/", "");
      return number
    }
  
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || "").indexOf(suggestion.name) > -1;
    var number = getNumber(suggestion.url)
    
    return (
      <PokemonConsumer key={index}>{context=>(
      <Link
        className="default-text"
        to={"/description/" + suggestion.name}
      >
        <MenuItem
          {...itemProps}
          key={suggestion.name}
          selected={isHighlighted}
          component="div"
          style={{
            fontWeight: isSelected ? 500 : 400,
            borderRadius: "20px",
            textTransform: "capitalize"
          }}
        >
          <img
            style={{
              width: "75px",
              marginRight: "10px"
            }}
            src={
              "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
              context.numberPadding(number, 3) +
              ".png"
            }
            alt={suggestion.name + " image"}
          />
          <Typography component="div">
            <Box fontWeight="fontWeightMedium" m={1}>
              {suggestion.name}
            </Box>
            <Box fontWeight="fontWeightRegular" m={1}>
              {"#" + context.numberPadding(number, 3)}
            </Box>
          </Typography>
        </MenuItem>
      </Link>)}
      </PokemonConsumer>
    );
  }

  export default Suggestion
  