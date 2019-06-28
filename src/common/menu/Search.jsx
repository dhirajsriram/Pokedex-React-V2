import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles, fade } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;
  return (
    <InputBase
      inputProps={{
        inputRef: ref,
        ...InputProps,
      }}
      {...other}
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      placeholder={"Search…"}
    />
  );
}

function numberPadding(number, size) {
  var s = String(number);
  while (s.length < (size || 2)) { s = "0" + s; }
  return s;
}

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;
  var number = suggestion.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "")
  return (
    <Link className="default-text" to={"/description/" + number}>
    <MenuItem
      {...itemProps}
      key={suggestion.name}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
        textTransform: "capitalize"
      }}
    >
      <img style={{
        width: "30px",
        margin: "5px"
      }} src={"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + numberPadding(number, 3) + ".png"} alt={suggestion.name + " image"}></img>

      <div>{suggestion.name}</div>
      <div style={{
        color: "#9e9e9e",
        position: "absolute",
        right: "11px",
        top: "10.5px"
      }}>{"#" + numberPadding(number, 3)}</div>
    </MenuItem>
    </Link>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value, pokemonlist, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0 && !showEmpty
    ? []
    : pokemonlist.filter(suggestion => {
      const keep =
        count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;
      if (keep) {
        count += 1;
      }
      return keep;
    });
}

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

export default function Search() {
  const classes = useStyles();
  const [pokemonList, setPokemonList] = useState("");
  useEffect(() => {
    fetchPokemonData()
  }, []);

  async function fetchPokemonData() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=811')
    response = await response.json()
    setPokemonList(response.results)
  }
  return (
    <React.Fragment>
      {pokemonList.length > 0 &&
        <Downshift id="downshift-simple">
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
          }) => {
            const { onBlur, onFocus, ...inputProps } = getInputProps({
              pokemonlist: pokemonList,
              placeholder: 'Search..',
            });

            return (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                {renderInput({
                  fullWidth: true,
                  classes,
                  label: 'Pokemon',
                  inputlabelprops: getLabelProps({ shrink: true }),
                  InputProps: { onBlur, onFocus },
                  inputProps,
                })}

                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {getSuggestions(inputValue, pokemonList).map((suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.name }),
                          highlightedIndex,
                          selectedItem,
                        }),
                      )}
                    </Paper>
                  ) : null}
                </div>
              </div>
            );
          }}
        </Downshift>}
    </React.Fragment>
  );
}
