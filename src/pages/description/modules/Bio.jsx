import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import StatsBlock from "../../../common/pokemon/StatsBlock";

export default function Bio(props) {
  const useStyles = makeStyles({
    card: {},
    media: {
      height: 140
    },
    heading: {
      color: props.color
    }
  });
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <StatsBlock
                  title={"Height"}
                  textcolor={props.color}
                  content={props.pokemonData.height * 10 + " cm"}
                />
              </Grid>
              <Grid item xs={6}>
                <StatsBlock
                  title={"Weight"}
                  textcolor={props.color}
                  content={props.pokemonData.weight / 10 + " kg"}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
