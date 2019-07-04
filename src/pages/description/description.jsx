import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Grid from "@material-ui/core/Grid";
import Pokemon from "../../common/pokemon/Pokemon";
import { PokemonConsumer } from "../../common/context/pokemonContext";
import Bio from "./modules/Bio";
import Stats from "./modules/Stats";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Sprites from "./modules/Sprites";
import { findType } from "../../common/context/pokemonContext";
import Icon from "@material-ui/core/Icon";
import TabContainer from "./modules/TabContainer";
import Evolutions from "./modules/Evolutions";

export default function Description(props) {
  const [pokemonData, setPokemonData] = React.useState({});
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  function handleChangeIndex(index) {
    setValue(index);
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
      display: "block",
    },
    BottomNavigation: {
      width: "100%",
      height: "69px",
      position: "fixed",
      bottom: "0",
      left: "0",
      background: "white"
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
  }, [props.match.params.id]);

  async function fetchPokemonData() {
    let response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/" + props.match.params.id
    );
    response = await response.json();
    setPokemonData(response);
  }

  function returnType() {
    return findType(
      pokemonData.types[1]
        ? pokemonData.types[1].type.name
        : pokemonData.types[0].type.name
    );
  }

  return (
    <PokemonConsumer>
      {context => (
        <React.Fragment>
          {pokemonData.name && (
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
                    descriptionPage={true}
                  />
                </div>
              </Grid>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
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
                <TabContainer dir={theme.direction}><div>
                  <Evolutions pokemonData={pokemonData} color={returnType()}/></div></TabContainer>
                <TabContainer dir={theme.direction}>Item Three</TabContainer>
              </SwipeableViews>
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
                </Tabs>
              </footer>
            </Container>
          )}
        </React.Fragment>
      )}
    </PokemonConsumer>
  );
}
