import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { createMuiTheme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Types from '../pokemon/Types'
import { ThemeProvider } from '@material-ui/styles';

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
  }
});

function numberPadding(number, size) {
  var s = String(number);
  while (s.length < (size || 2)) { s = "0" + s; }
  return s;
}


export default function Pokemon(props) {
  const classes = useStyles();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetchPokemonData(props.number)
  }, []);

  async function fetchPokemonData(number) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + number)
    response = await response.json()
    setPokemon(response)
  }

  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="300"
            image={"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + numberPadding(props.number, 3) + ".png"}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="subtitle2">
              # {numberPadding(props.number, 3)}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" className={classes.capitalize}>
              {pokemon.name}
            </Typography>
            {pokemon.types && pokemon.types.map(function (val, i) {
              return (
                <Types name={val.type.name} key={i}></Types>
              )
            })}
          </CardContent>
        </CardActionArea>
      </Card>
    </ThemeProvider>
  );
}
