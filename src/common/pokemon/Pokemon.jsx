import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { createMuiTheme } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Types from "../pokemon/Types";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from "@material-ui/styles";
import { withRouter } from "react-router";
import { PokemonConsumer } from "../context/pokemonContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Icon from "@material-ui/core/Icon";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const Pokemon = withRouter((props, context) => {
  const [pokemon, setPokemon] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const useStyles = makeStyles({
    card: {
      maxWidth: "100%"
    },
    image: {
      padding: "16px",
      display: "block",
      margin: "auto",
      width: "unset"
    },
    text: {
      paddingLeft: "8px",
      textTransform: "capitalize"
    },
    spacing4: {
      margin: "-7px"
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
      transition: "all 1s ease"
    },
    pokemonImage: {
      width: "20%",
      position: "absolute",
      right: "0px",
      top: "0px",
      background: "rgba(255,255,255,0.5)",
      borderTopLeftRadius: "70px",
      borderBottomLeftRadius: "70px",
      transition: "all 1s ease"
    },
    skeletonContainer: {
      fontSize: 20,
      lineHeight: 2.5
    },
    skeletonText: {
      display: "inline-block",
      width: "80%"
    },
    evolutionImage: {
      objectFit: "scale-down",
      height: "100px",
      margin: "auto"
    },
    evolutionText: {
      padding: 0,
      textTransform: "capitalize",
      color: "#3a3a3a"
    },
    evolutionParentCard: {
      background: "#ffffff",
      boxShadow: "none"
    },
    evolutionCardAction: {
      margin: "auto",
      borderRadius: 8
    },
    grid: {
      borderRadius: 5
    },
    evolutionContent: {
      padding: 0
    },
    evolutionType : {
      textTransform: "capitalize"
    },
    arrow: {
      color: "#3a3a3a",
      position: "absolute",
      top: "25%"
    },
    skeletonImage: {
      width: "8%",
      padding: "0px 20px",
      display: "inline-block",
      position: "absolute"
    },
    "@media (max-width: 800px)": {
      pokemonImage: {
        width: "40%"
      },
      skeletonText: {
        width: "60%"
      },
      skeletonImage: {
        width: "10%"
      }
    },
    "@media (max-width: 600px)": {
      skeletonImage: {
        width: "30%"
      },
      evolutionImage: {
        height: "50px"
      }
    }
  });

  const classes = useStyles();

  useEffect(() => {
    if (!props.descriptionPage) {
      fetchPokemonData(props.number);
    } else {
      setPokemon(props.pokemonData);
    }
  }, [props.number]);

  async function fetchPokemonData(number) {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + number);
    response = await response.json();
    setPokemon(response);
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

  function returnType(context) {
    return context.findType(
      props.match.params.id && !props.descriptionPage && !props.evolution
        ? props.match.params.id
        : pokemon.types[1]
        ? pokemon.types[1].type.name
        : pokemon.types[0].type.name
    );
  }
  function Lengthwise(props) {
    return (
      <div className={classes.evolutionCard}>
        <CardMedia
          component="img"
          className={classes.evolutionImage}
          alt={pokemon.name + " image"}
          style={imageLoaded ? { display: "block" } : { display: "none" }}
          onLoad={handleImageLoaded}
          onError={onError}
          image={
            "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
            props.context.numberPadding(props.number, 3) +
            ".png"
          }
          title="Contemplative Reptile"
        />

        <CardContent className={classes.evolutionContent}>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="h2"
            align="center"
            className={classes.evolutionText}
          >
            {pokemon.name}
          </Typography>
          <div style={{ color: returnType(props.context) }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h2"
              align="center"
              className={classes.evolutionType}
            >
              {props.evolutionData.evolution_details.length > 0 &&
                props.evolutionData.evolution_details[0].trigger.name}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h2"
              align="center"
              className={classes.evolutionType}
            >
              {props.evolutionData.evolution_details.length > 0 &&
                props.evolutionData.evolution_details[0]["min_level"]}
            </Typography>
          </div>
        </CardContent>
      </div>
    );
  }

  function Widthwise(props) {
    return (
      <Grid
        container
        style={
          props.descriptionPage
            ? { background: "rgb(255,255,255,0.5)" }
            : {
                background: returnType(props.context) + "80"
              }
        }
      >
        <Grid container item xs={10} spacing={4} className={classes.spacing4}>
          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom
              variant="subtitle2"
              className={classes.text}
            >
              {pokemon.name &&
                "#" + props.context.numberPadding(props.number, 3)}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.text}
            >
              {pokemon.name}
            </Typography>
            {pokemon.types &&
              pokemon.types.map(function(val, i) {
                return (
                  <Types
                    name={val.type.name}
                    key={i}
                    descriptionPage={props.descriptionPage}
                  />
                );
              })}
          </CardContent>
        </Grid>
        <Grid container item xs={2} spacing={4} className={classes.spacing4}>
          <div className={classes.image}>
            {pokemon.name && (
              <CardMedia
                component="img"
                className={classes.pokemonImage}
                alt={pokemon.name + " image"}
                height="150"
                style={imageLoaded ? { display: "block" } : { display: "none" }}
                onLoad={handleImageLoaded}
                onError={onError}
                image={
                  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
                  props.context.numberPadding(props.number, 3) +
                  ".png"
                }
                title="Contemplative Reptile"
              />
            )}
          </div>
        </Grid>
      </Grid>
    );
  }

  return (
    <PokemonConsumer>
      {context => (
        <ThemeProvider theme={theme}>
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
                props.descriptionPage
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
                        background: returnType(context)
                      }
                }
                className={props.evolution && classes.evolutionCardAction}
              >
                {props.evolution ? (
                  <React.Fragment>
                    {!props.first && (
                      <Icon className={classes.arrow}>arrow_forward</Icon>
                    )}
                    <Lengthwise
                      context={context}
                      classes={classes}
                      evolutionData={props.evolutionData}
                      descriptionPage={props.descriptionPage}
                      number={props.number}
                      color={returnType(context)}
                    />
                  </React.Fragment>
                ) : (
                  <Widthwise
                    number={props.number}
                    classes={classes}
                    context={context}
                  />
                )}
              </CardActionArea>
            </Card>
          )}
        </ThemeProvider>
      )}
    </PokemonConsumer>
  );
});

export default Pokemon;
