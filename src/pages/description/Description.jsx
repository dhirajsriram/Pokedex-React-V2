import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pokemon from "../../common/pokemon/Pokemon";
import Bio from "./modules/Bio";
import Stats from "./modules/Stats";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Sprites from "./modules/Sprites";
import { findTypeColor , findTypeColorLighter } from "../../common/context/pokemonContext";
import Icon from "@material-ui/core/Icon";
import TabContainer from "./modules/TabContainer";
import Evolutions from "./modules/Evolutions";
import Moves from "./modules/Moves";
import Cards from "./modules/Cards";
import FourZeroFour from "../404/FourZeroFour";
import fetch from 'isomorphic-fetch';

export default function Description(props) {
  const [pokemonData, setPokemonData] = React.useState({});
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  var stagesCount = 1;
  const [evolutionData, setEveolutionData] = useState({});
  const [stages, setstages] = useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
    window.scrollTo(0, 0);
  }

  const useStyles = makeStyles(theme => ({
    container: {
      margin: "0",
      width: "100% !important",
      minHeight: "100vh",
      maxWidth: "100%",
      overflow: "hidden"
    },
    pokemonBlocks: {
      margin: "20px 0px"
    },
    selected: {
      backgroundColor: pokemonData.types ? returnType : "white"
    },
    pokemon: {
      width: "50%",
      margin: "auto",
      display: "block"
    },
    BottomNavigation: {
      width: "100%",
      height: "69px",
      position: "fixed",
      bottom: "0",
      left: "0",
      background:pokemonData.types ? returnType("lighter-shade") : "white"
    },
    tabs:{
      padding:0
    },
    "@media (max-width: 800px)": {
      pokemon: {
        width: "100%"
      },
      tabs: {
        flexGrow: "1",
        maxWidth: "none",
        flexBasis: "0",
        flexShrink: "1"
      }
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    fetchPokemonData();
    fetchSpeciesData(props.match.params.id);
    resetPage();
  }, [props.match.params.id]);

  async function fetchPokemonData() {
    setPokemonData({});
    try {
      let response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + props.match.params.id
      );
      response = await response.json();
      setPokemonData(response);
    } catch (err) {
      setPokemonData({ error: "true" }); // TypeError: failed to fetch
    }
  }

  function resetPage() {
    setValue(0);
  }

  function returnType(shade) {
    if(shade === "lighter-shade"){
      return findTypeColorLighter(
        pokemonData.types[1]
          ? pokemonData.types[1].type.name
          : pokemonData.types[0].type.name
      );
    }
    else{
    return findTypeColor(
      pokemonData.types[1]
        ? pokemonData.types[1].type.name
        : pokemonData.types[0].type.name
    );
  }
  }

  async function fetchSpeciesData(number) {
    let response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/" + number
    );
    response = await response.json();
    let evolutionResponse = await fetch(response.evolution_chain.url);
    evolutionResponse = await evolutionResponse.json();
    printValues(evolutionResponse);
    setstages(stagesCount);
    setEveolutionData(evolutionResponse);
  }

  function printValues(obj) {
    for (var key in obj) {
      if (typeof obj[key] === "object") {
        if (key === "evolves_to" && obj[key].length > 0) {
          stagesCount = stagesCount + 1;
        }
        printValues(obj[key]);
      }
    }
  }

  return (
    <React.Fragment>
      {pokemonData.name ? (
        <Container
          className={classes.container}
          style={{
            background: returnType()
          }}
          spacing={8}
        >
          <Grid className={classes.pokemon}>
            <div className={classes.pokemonBlocks}>
              <Pokemon
                number={pokemonData.id}
                pokemonData={pokemonData}
                page={"description"}
                descriptionPage={true}
              />
            </div>
          </Grid>
          {value === 0 && (
            <TabContainer dir={theme.direction}>
              <div>
                <Bio pokemonData={pokemonData} color={returnType()} />
              </div>
              <div className={classes.pokemonBlocks}>
                <Stats pokemonData={pokemonData} color={returnType()} />
              </div>
              <div className={classes.pokemonBlocks}>
                <Sprites pokemonData={pokemonData} color={returnType()} />
              </div>
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer dir={theme.direction}>
              <div>
                <Evolutions
                  pokemonData={pokemonData}
                  color={returnType()}
                  stages={stages}
                  evolutionData={evolutionData}
                />
              </div>
            </TabContainer>
          )}
          {value === 2 && (
            <TabContainer dir={theme.direction}>
              <Moves pokemonData={pokemonData} color={returnType()} />
            </TabContainer>
          )}
          {value === 3 && (
            <TabContainer dir={theme.direction}>
              <Cards pokemonData={pokemonData} color={returnType()} />
            </TabContainer>
          )}
          <footer>
            <Tabs
              className={classes.BottomNavigation}
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              color="primary"
              centered
            >
              <Tab
                className={classes.tabs}
                label="Stats"
                classes={{ selected: classes.selected }}
                icon={<Icon>account_circle</Icon>}
              />
              <Tab
                className={classes.tabs}
                label="Evolution"
                classes={{ selected: classes.selected }}
                icon={<Icon>swap_horiz</Icon>}
              />
              <Tab
                className={classes.tabs}
                label="Moves"
                classes={{ selected: classes.selected }}
                icon={<Icon>list</Icon>}
              />
              <Tab
                className={classes.tabs}
                label="Cards"
                classes={{ selected: classes.selected }}
                icon={<Icon>casino</Icon>}
              />
            </Tabs>
          </footer>
        </Container>
      ) : (
        <React.Fragment>
          {pokemonData.error ? (
            <FourZeroFour />
          ) : (
            <div className="loader-container loader-background">
              <div className="loader" />
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
