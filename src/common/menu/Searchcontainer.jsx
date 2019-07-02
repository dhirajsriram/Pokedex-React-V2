import React, { useState, useEffect } from "react";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { makeStyles, fade } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router";
import Suggestion from "./Suggestion";
import SearchInput from "./SearchInput";

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginLeft: 0,
    margin: "0px 8px",
    width: "80%",
    borderRadius: "20px",
    [theme.breakpoints.up("sm")]: {
      margin: "0px 20px",
      width: "82%",
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

const SearchContainer = withRouter((props, context) => {
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
                  <SearchInput fullWidth={true} inputProps={inputProps} classes={classes} label={"Pokemon"} inputlabelprops={getLabelProps({ shrink: true })} inputproperties={{ onBlur, onFocus }}></SearchInput>
                </form>
                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getSuggestions(inputValue, pokemonList).map(
                        (suggestion, index) =>
                          <Suggestion key={index} suggestion={suggestion} index={index} itemProps={getItemProps({ item: suggestion.name })} highlightedIndex={highlightedIndex} selectedItem={selectedItem}></Suggestion>
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

export default SearchContainer;
