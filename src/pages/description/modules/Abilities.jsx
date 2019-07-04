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
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    border: {
      border: "1px solid " + props.color,
      padding: 5,
      margin:"10px 0px",
      borderRadius: "20px",
      textTransform: "capitalize"
    },
    filled: {
      background: props.color,
      color: "#ffffff",
      margin:"10px 0px",
      padding: 5,
      borderRadius: "20px",
      textTransform: "capitalize"
    },
    hidden:{
        background: props.color,
        color: "#ffffff",
        borderRadius: "20px",
        textTransform: "capitalize",
        margin: "-38px -10px",
        position:"absolute"
    },
    heading: {
      color: props.color
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" align="center" className={classes.heading}>
          Abilities
        </Typography>
        <Grid container>
          {props.pokemonData.abilities.map(function(val, i) {
            return (
              <Grid
                item
                xs={12}
                key={i}
              >
                <Typography variant="subtitle1" align="center" className={val.is_hidden ? classes.border : classes.filled}>
                  {val.ability.name.replace(/-/g, " ")}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
