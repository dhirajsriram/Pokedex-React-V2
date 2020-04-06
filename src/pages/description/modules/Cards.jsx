import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

export default function Cards(props) {
  const useStyles = makeStyles({
    card: {
      minWidth: 275
    }
  });
  const classes = useStyles();
  const [cards, setCards] = React.useState({});
  useEffect(() => {
    fetchCardData();
  }, [])

  async function fetchCardData(number) {
    try {
      let response = await fetch("https://api.pokemontcg.io/v1/cards?name=" + props.pokemonData.species.name)
      response = await response.json();
      setCards(response);
    }
    catch (e) {
      console.error("ERROR - " + e);
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" align="center">
          Cards
        </Typography>
        <Grid container>
          {cards && cards.cards && cards.cards.map(function (val, i) {
            return (
              <Grid
                item
                xs={12}
                key={i}
              >
                <img src={val.imageUrl} alt="card"></img>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
