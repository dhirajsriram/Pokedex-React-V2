import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Pokemon from "../../../common/pokemon/Pokemon";
import Grid from "@material-ui/core/Grid";

export default function Sprites(props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: props.color,
        contrastText: "#fff"
      },
      secondary: { A400: "#ffffff", contrastText: props.color } // custom color in hex
    }
  });

  const [evolutionData, setEveolutionData] = useState({});
  const useStyles = makeStyles(theme => ({
    heading: {
      color: props.color,
      padding:8,
    },
    card : {
      padding :16
    }
    
  }));

  useEffect(() => {
    fetchPokemonData(props.pokemonData.id);
  }, []);

  async function fetchPokemonData(number) {
    let response = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/" + number
    );
    response = await response.json();
    let evolutionResponse = await fetch(response.evolution_chain.url);
    evolutionResponse = await evolutionResponse.json();
    setEveolutionData(evolutionResponse);
  }
  function getNumber(url) {
    var number = url
    .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
    .replace("/", "");
    return number
  }

  const Evolution = props => {
    return (
      <React.Fragment>
        {console.log(props.evolution.species.url)}
        <Grid xs={4} className={classes.pokemon}><Pokemon
                    number={getNumber(props.evolution.species.url)}
                    evolution = {true}
                    descriptionPage={false}
                  /></Grid>
        {props.evolution.evolves_to.length > 0 && props.evolution.evolves_to.map(function(val,i){
          return(<Evolution key={i} evolution={val} />)
        })
        }
      </React.Fragment>
    );
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.card}>
        <Typography variant="h6" align="center" className={classes.heading}>
          Evolution Chain
        </Typography>
        {evolutionData.chain && <Grid container><Evolution evolution={evolutionData.chain} /></Grid>}
      </Card>
    </ThemeProvider>
  );
}
