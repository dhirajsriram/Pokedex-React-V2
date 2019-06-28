import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { createMuiTheme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Types from '../pokemon/Types';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
});

const useStyles = makeStyles({
  card: {
    maxWidth: "100%",
  },
  capitalize : {
    textTransform: "capitalize"
  },
  image :{
    padding:"16px",
    display:"block",
    margin:"auto",
    width:"unset"
  },
  spacing4:{
    margin : "-7px"
  },
  pokemonImage:{
    width: "33%",
    position: "absolute",
    left: "64%",
    top: "0px"
  }
});

function numberPadding(number, size) {
  var s = String(number);
  while (s.length < (size || 2)) { s = "0" + s; }
  return s;
}

const Pokemon = React.memo((props) => {
  const classes = useStyles();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetchPokemonData(props.number)
  }, [props.number]);

  async function fetchPokemonData(number) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + number)
    response = await response.json()
    setPokemon(response)
  }

  return (
    <ThemeProvider theme={theme}>
      <SkeletonTheme color="#757575" highlightColor="#616161">
      <Link className="default-text" to={"/description/" + props.number}>
      <Card className={classes.card}>
        <CardActionArea>
        <Grid container>
        <Grid container item xs={8} spacing={4} className={classes.spacing4}>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="subtitle2">
               {pokemon.name ? "#" + numberPadding(props.number, 3) : <Skeleton height={25}/>}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className={classes.capitalize}>
              {pokemon.name || <Skeleton height={30}/>}
            </Typography>
            {pokemon.types ? pokemon.types.map(function (val, i) {
              return (
                <Types name={val.type.name} key={i}></Types>
              )
            }): <Skeleton height={30}></Skeleton>}
          </CardContent>
          </Grid>
          <Grid container item xs={4} spacing={4} className={classes.spacing4}>
          <div className={classes.image}>
          {pokemon.name ?<CardMedia
            component="img"
            className={classes.pokemonImage}
            alt={pokemon.name + " image"}
            height="150"
            image={"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + numberPadding(props.number, 3) + ".png"}
            title="Contemplative Reptile"
          /> : <Skeleton height={100}></Skeleton>}</div>
          </Grid>
          </Grid>
        </CardActionArea>
      </Card></Link>
      </SkeletonTheme>
    </ThemeProvider>
  );
})

export default Pokemon;