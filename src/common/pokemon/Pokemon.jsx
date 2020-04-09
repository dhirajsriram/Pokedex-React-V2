import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { createMuiTheme } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import { ThemeProvider } from "@material-ui/styles";
import { withRouter } from "react-router";
import { findTypeColor } from "../context/pokemonContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Icon from "@material-ui/core/Icon";
import DisplayEvolution from "./DisplayEvolution";
import DisplayFull from "./DisplayFull";
import fetch from "isomorphic-fetch";

const Pokemon = withRouter((props, context) => {
  const [pokemon, setPokemon] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const useStyles = makeStyles({
    card: {
      maxWidth: "100%",
    },
    image: {
      padding: "16px",
      display: "block",
      margin: "auto",
      width: "unset",
    },
    text: {
      paddingLeft: "8px",
      textTransform: "capitalize",
    },
    spacing4: {
      margin: "-7px",
    },
    loaderImage: {
      width: "18%",
      height: "100%",
      position: "absolute",
      right: "0px",
      top: "0px",
      background: "rgba(255,255,255,0.5)",
      borderTopLeftRadius: "70px",
      borderBottomLeftRadius: "70px",
      transition: "all 1s ease",
    },
    pokemonImage: {
      width: 150,
      position: "absolute",
      right: "0px",
      top: "0px",
      background: "rgba(255,255,255,0.5)",
      borderTopLeftRadius: "70px",
      borderBottomLeftRadius: "70px",
      transition: "all 1s ease",
    },
    skeletonContainer: {
      fontSize: 20,
      lineHeight: 2.5,
    },
    skeletonText: {
      display: "inline-block",
      width: "80%",
      paddingTop: 3,
    },
    evolutionImage: {
      objectFit: "scale-down",
      height: "150px",
      margin: "auto",
    },
    evolutionText: {
      padding: 0,
      textTransform: "capitalize",
      color: "#3a3a3a",
    },
    evolutionParentCard: {
      background: "#ffffff",
      boxShadow: "none",
    },
    evolutionCardAction: {
      margin: "auto",
      borderRadius: 8,
    },
    grid: {
      borderRadius: 5,
    },
    evolutionContent: {
      padding: 0,
    },
    evolutionType: {
      textTransform: "capitalize",
    },
    arrow: {
      position: "absolute",
      top: "25%",
      left: "-3%",
      fontSize: 40,
    },
    arrow2: {
      position: "absolute",
      top: "25%",
      left: "0%",
      fontSize: 40,
    },
    skeletonImage: {
      width: "8%",
      padding: "0px 20px",
      display: "inline-block",
      position: "absolute",
    },
    "@media (max-width: 800px)": {
      skeletonText: {
        width: "60%",
      },
      skeletonImage: {
        width: "10%",
      },
    },
    "@media (max-width: 600px)": {
      skeletonImage: {
        width: "30%",
      },
      evolutionImage: {
        height: "50px",
      },
      arrow2: {
        display: "none",
      },
    },
  });

  const classes = useStyles();

  function mockPokemonData(data) {
    return {
      sprites: [],
      types: [],
      id: data.species.url
        .replace("https://pokeapi.co/api/v2/pokemon/", "")
        .replace("/", ""),
      name: data.species.name,
    };
  }

  useEffect(() => {
    if (props.descriptionPage) {
      setPokemon(props.pokemonData);
    } else if (props.evolution) {
      setPokemon(mockPokemonData(props.evolutionData));
    } else if (props.Listing) {
      fetchPokemonData(props.number);
    }
  }, [props]);

  async function fetchPokemonData(number) {
    try {
      let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + number);
      response = await response.json();
      setPokemon(response);
    } catch (e) {
      console.error("ERROR - " + e);
    }
  }

  function handleImageLoaded(e) {
    setImageLoaded(true);
  }

  function onError(e) {
    e.target.onerror = null;
    e.target.src = pokemon.sprites.front_default
      ? pokemon.sprites.front_default
      : require("../../assets/unknown.png");
  }

  function redirect(target) {
    props.history.push("/description/" + pokemon.name);
  }

  function returnType() {
    switch (props.page) {
      case "Listing":
        return findTypeColor(
          props.match.params.id
            ? props.match.params.id
            : pokemon.types[1]
            ? pokemon.types[1].type.name
            : pokemon.types[0].type.name
        );
      case "evolution":
        return props.color;
      case "description":
        return findTypeColor(
          pokemon.types[1]
            ? pokemon.types[1].type.name
            : pokemon.types[0].type.name
        );
      default:
        return 0;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      {/* Loader for listing pages */}
      {!props.evolution && !(pokemon && imageLoaded) && (
        <SkeletonTheme color="#bdbdbd" highlightColor="#e0e0e0">
          <div className={classes.skeletonContainer}>
            <div className={classes.skeletonText}>
              <Skeleton height={25} />
              <Skeleton height={25} />
              <Skeleton height={25} />
            </div>
            <div className={classes.skeletonImage}>
              <Skeleton height={130} />
            </div>
          </div>
        </SkeletonTheme>
      )}
      {pokemon.sprites && (
        <Card
          className={
            props.evolution ? classes.evolutionParentCard : classes.card
          }
          style={
            props.descriptionPage && !props.evolution
              ? { background: returnType(context) }
              : { display: pokemon && imageLoaded ? "block" : "none" }
          }
          onClick={redirect}
        >
          <CardActionArea
            style={
              props.descriptionPage || props.evolution
                ? { background: "rgb(255,255,255,0.5)" }
                : {
                    background: returnType(context),
                  }
            }
            className={props.evolution && classes.evolutionCardAction}
          >
            {props.evolution ? (
              <React.Fragment>
                {!props.first && (
                  <div>
                    <Icon
                      className={classes.arrow}
                      style={{ color: returnType(context) }}
                    >
                      keyboard_arrow_right
                    </Icon>
                    <Icon
                      className={classes.arrow2}
                      style={{ color: returnType(context) }}
                    >
                      keyboard_arrow_right
                    </Icon>
                  </div>
                )}
                {/* Display Evolution data */}
                <DisplayEvolution
                  context={context}
                  classes={classes}
                  evolutionData={props.evolutionData}
                  descriptionPage={props.descriptionPage}
                  number={props.number}
                  color={returnType(context)}
                  pokemon={pokemon}
                  firs={props.first}
                  imageLoaded={imageLoaded}
                  handleImageLoaded={handleImageLoaded}
                  first={props.first}
                  evolution={true}
                />
              </React.Fragment>
            ) : (
              //  Display all data in descriptionPage
              <DisplayFull
                handleImageLoaded={handleImageLoaded}
                returnType={returnType}
                number={props.number}
                classes={classes}
                context={context}
                onError={onError}
                pokemon={pokemon}
                imageLoaded={imageLoaded}
              />
            )}
          </CardActionArea>
        </Card>
      )}
    </ThemeProvider>
  );
});

export default Pokemon;
