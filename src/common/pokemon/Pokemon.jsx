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
      width: "30%",
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
      width: "70%"
    },
    skeletonImage: {
      width: "12%",
      padding: "0px 20px",
      display: "inline-block",
      position: "absolute"
    },
    "@media (max-width: 800px)": {
      pokemonImage: {
        width: "40%"
      },
      skeletonText:{
        width: "60%"
      },
      skeletonImage : {
        width: "15%",
      },
    },
      "@media (max-width: 600px)": {
        skeletonImage : {
          width: "30%",
        },
    }
  });

  const classes = useStyles();

  useEffect(() => {
    fetchPokemonData(props.number);
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

  return (
    <PokemonConsumer>
      {context => (
        <ThemeProvider theme={theme}>
          {!(pokemon && imageLoaded) &&<SkeletonTheme color="#bdbdbd" highlightColor="#e0e0e0">
            <div className = {classes.skeletonContainer}>
              <div className = {classes.skeletonText}>
                <Skeleton height={25} />
                <Skeleton height={25} />
                <Skeleton height={25} />
              </div>
              <div className = {classes.skeletonImage}>
                <Skeleton height={130}/>
              </div>
            </div>
          </SkeletonTheme>}
          {pokemon.sprites && (
            <Card className={classes.card} style={{display : (pokemon && imageLoaded ? "block" : "none")}} onClick={redirect}>
              <CardActionArea
                style={{
                  background: context.findType(
                    props.match.params.id
                      ? props.match.params.id
                      : pokemon.types[1]
                      ? pokemon.types[1].type.name
                      : pokemon.types[0].type.name
                  )
                }}
              >
                <Grid container>
                  <Grid
                    container
                    item
                    xs={10}
                    spacing={4}
                    className={classes.spacing4}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        className={classes.text}
                      >
                        {pokemon.name && "#" + context.numberPadding(props.number, 3)}
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
                          return <Types name={val.type.name} key={i} />;
                        })}
                    </CardContent>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    spacing={4}
                    className={classes.spacing4}
                  >
                    <div className={classes.image}>
                      {pokemon.name && (
                        <CardMedia
                          component="img"
                          className={classes.pokemonImage}
                          alt={pokemon.name + " image"}
                          height="150"
                          style={
                            imageLoaded
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          onLoad={handleImageLoaded}
                          onError={onError}
                          image={
                            "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
                            context.numberPadding(props.number, 3) +
                            ".png"
                          }
                          title="Contemplative Reptile"
                        />
                      )}
                    </div>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          )}
        </ThemeProvider>
      )}
    </PokemonConsumer>
  );
});

export default Pokemon;
