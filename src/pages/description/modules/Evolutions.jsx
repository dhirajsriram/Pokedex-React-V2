import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Pokemon from "../../../common/pokemon/Pokemon";
import Grid from "@material-ui/core/Grid";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Evolutions(props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: props.color,
        contrastText: "#fff"
      },
      secondary: { A400: "#ffffff", contrastText: props.color } // custom color in hex
    }
  });
  var stagesCount = 1;
  const [evolutionData, setEveolutionData] = useState({});
  const [stages, setstages] = useState(0);
  const useStyles = makeStyles(theme => ({
    heading: {
      padding: 4
    },
    skeleton: {
      padding: 8
    },
    pokemon: {
      maxWidth: "unset"
    },
    card: {
      padding: 16
    }
  }));

  useEffect(() => {
    fetchPokemonData(props.pokemonData.id);
  }, [props.pokemonData.id]);

  async function fetchPokemonData(number) {
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
  function getNumber(url) {
    var number = url
      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
      .replace("/", "");
    return number;
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

  const Evolution = props => {
    return (
      <React.Fragment>
        <Grid xs={12 / stages} item className={classes.pokemon}>
          <Pokemon
            first={props.first}
            number={getNumber(props.evolution.species.url)}
            evolution={true}
            descriptionPage={false}
            page={"evolution"}
            evolutionData={props.evolution}
            color={props.color}
          />
        </Grid>
        {props.evolution.evolves_to.length > 1 && (
          <Grid>
            {props.evolution.evolves_to.map(function(val, i) {
              return (
                <Evolution
                  key={i}
                  evolution={val}
                  first={false}
                  color={props.color}
                />
              );
            })}
          </Grid>
        )}

        {props.evolution.evolves_to.length === 1 &&
          props.evolution.evolves_to.map(function(val, i) {
            return (
              <Evolution
                key={i}
                evolution={val}
                first={false}
                color={props.color}
              />
            );
          })}
      </React.Fragment>
    );
  };

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.card}>
        <Typography variant="h6" align="center" className={classes.heading}>
          Evolution
        </Typography>
        {evolutionData.chain ? (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.parentGrid}
          >
            <Evolution
              evolution={evolutionData.chain}
              first={true}
              color={props.color}
            />
          </Grid>
        ) : (
          <SkeletonTheme color="#bdbdbd" highlightColor="#e0e0e0">
        <Skeleton height={300}/>
        </SkeletonTheme>
        )}
      </Card>
    </ThemeProvider>
  );
}
