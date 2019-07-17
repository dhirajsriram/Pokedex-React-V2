import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function Abilities(props) {
  const useStyles = makeStyles({
    card: {
      minWidth: 275
    },
    border: {
      border: "1.5px solid " + props.color,
      padding: 5,
      margin:12,
      borderRadius: "10px",
      textTransform: "capitalize"
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" align="center">
          Moves
        </Typography>
        <Grid container>
          {props.pokemonData.moves.map(function(val, i) {
            return (
              <Grid
                item
                xs={6}
                key={i}
              >
                <Typography variant="subtitle1" align="center" className={classes.border}>
                  {val.move.name.replace(/-/g, " ")}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
