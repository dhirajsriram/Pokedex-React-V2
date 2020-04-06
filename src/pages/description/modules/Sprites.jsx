import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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
  const SpriteArr = [
    { type: "Normal", array: ["normal/", "back-normal/"] },
    { type: "Shiny", array: ["shiny/", "back-shiny/"] }
  ];

  const useStyles = makeStyles(theme => ({
    heading: {
      padding:4
	},
	spriteImage : {
    minHeight:"125px",
    width:"auto",
    height:"auto"
  },
  "@media (max-width: 600px)": {
    spriteImage : {
      minHeight:"75px",
    }
  }
  }));

  function onError(e,url) {
    e.target.onerror = null;
    e.target.src = props.pokemonData.sprites.front_default
      ? props.pokemonData.sprites.front_default
      : require("../../../assets/unknown.png");
  }

  const SpriteImg = props => {
    return (
      <img
        src={Spritebase + props.url + props.pokemonData.name + ".gif"} onError={(e)=>onError(e,props.url)}
        alt={props.pokemonData.name + props.url} className={classes.spriteImage} width="400" height="400"
      />
    );
  };

  const classes = useStyles();
  const Spritebase = "https://img.pokemondb.net/sprites/black-white/anim/";
  return (
    <ThemeProvider theme={theme}>
      <Card className={classes.card}>
        
          {SpriteArr.map(function(value, i) {
            return (
				<CardContent key={i}>
                <Typography
                  variant="h6"
                  key={i}
                  align="center"
                  className={classes.heading}
                >
                  {value.type}
                </Typography>
				<Grid container>
                {value.array.map(function(url, i) {
                  return (
                    <Grid item xs={6} align="center" key={i}>
                      <SpriteImg pokemonData={props.pokemonData} url={url} />
                    </Grid>
                  );
				})}
				</Grid>
             </CardContent>
            );
          })}
      </Card>
    </ThemeProvider>
  );
}
