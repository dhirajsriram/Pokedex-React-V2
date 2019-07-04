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
    { type: "Normal", array: ["","/back/"] },
    { type: "Shiny", array: ["/shiny/","/shiny/back/"] }
  ];

  const useStyles = makeStyles(theme => ({
    heading: {
      padding:4
	},
	spriteImage : {
    minHeight:"125px",
    width:"auto",
    height:"auto"
	}
  }));

  const SpriteImg = props => {
    return (
      <img
        src={Spritebase + props.url + props.pokemonData.name + ".gif"}
        alt={props.pokemonData.name + props.url} className={classes.spriteImage} width="400" height="400"
      />
    );
  };

  const classes = useStyles();
  const Spritebase = "http://www.pokestadium.com/sprites/xy/";
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
