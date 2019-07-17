import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Pokemon from "../../../common/pokemon/Pokemon";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";

const Evolutions = withRouter((props) =>{
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: props.color,
        contrastText: "#fff"
      },
      secondary: { A400: "#ffffff", contrastText: props.color } // custom color in hex
    }
  });
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

  function getNumber(url) {
    var number = url
      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
      .replace("/", "");
    return number;
  }

  const Evolution = props => {
    return (
      <React.Fragment>
        <Grid xs={12 / props.stages} item className={classes.pokemon}>
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
          <Grid xs={12 / props.stages}>
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
                stages={props.stages}
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
        {props.evolutionData.chain ? (
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.parentGrid}
          >
            <Evolution
              evolution={props.evolutionData.chain}
              first={true}
              color={props.color}
              stages={props.stages}
            />
          </Grid>
        ) : (
          <div className="loader-evolution"></div>
        )}
      </Card>
    </ThemeProvider>
  );
})

export default Evolutions;
