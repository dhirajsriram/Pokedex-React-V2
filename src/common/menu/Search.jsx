import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { makeStyles, fade } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router";
import { PokemonConsumer } from "../context/pokemonContext";

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.name) > -1;
  var number = suggestion.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "");
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
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginLeft: 0,
    margin: "0px 8px",
    width: "100%",
    borderRadius: "20px",
    [theme.breakpoints.up("sm")]: {
      margin: "0px 20px",
      width: "100%",
      borderRadius: "20px"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 300
      }
    }
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    borderRadius: "20px"
  }
}));

const Search = withRouter((props, context) => {
  const classes = useStyles();
  const [pokemonList, setPokemonList] = useState("");

  useEffect(() => {
    fetchPokemonData();
  }, []);

  async function fetchPokemonData() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=811");
    response = await response.json();
    setPokemonList(response.results);
  }

  function getSuggestions(value, pokemonlist, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0 && !showEmpty
      ? []
      : pokemonlist.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;
          if (keep) {
            count += 1;
          }
          return keep;
        });
  }

  function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
    return (
      <InputBase
        name="Search-pokemon"
        inputProps={{
          inputRef: ref,
          ...InputProps
        }}
        {...other}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        placeholder={"Search…"}
      />
    );
  }

  function handleForm(e) {
    e.preventDefault();
    var search = document.querySelector("#downshift-simple-input").value;
    props.history.push("/description/" + search.toLowerCase());
  }

  return (
    <React.Fragment>
      {pokemonList.length > 0 && (
        <Downshift id="downshift-simple">
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem
          }) => {
            const { onBlur, onFocus, ...inputProps } = getInputProps({
              pokemonlist: pokemonList,
              placeholder: "Search.."
            });

            return (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form onSubmit={handleForm}>
                  {renderInput({
                    fullWidth: true,
                    classes,
                    label: "Pokemon",
                    inputlabelprops: getLabelProps({ shrink: true }),
                    InputProps: { onBlur, onFocus },
                    inputProps
                  })}
                </form>
                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getSuggestions(inputValue, pokemonList).map(
                        (suggestion, index) =>
                          renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({ item: suggestion.name }),
                            highlightedIndex,
                            selectedItem
                          })
                      )}
                    </Paper>
                  ) : null}
                </div>
              </div>
            );
          }}
        </Downshift>
      )}
    </React.Fragment>
  );
});

export default Search;
