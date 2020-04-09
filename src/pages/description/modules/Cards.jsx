import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CardInfo from "../../../common/pokemon/CardInfo"
import { findTypeColor } from "../../../common/context/pokemonContext";

export default function Cards(props) {
  const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    cardContainer:{
      padding: 10,
      margin: "10px 0px",
      borderRadius: 10,
      border: "2px solid " + findTypeColor(props.pokemonData.types[1]
        ? props.pokemonData.types[1].type.name
        : props.pokemonData.types[0].type.name)
    },
    cardImage: {
      width: "90%",
    }
  });
  const classes = useStyles();
  const [cards, setCards] = React.useState({});
  useEffect(() => {
    fetchCardData();
  }, []);

  async function fetchCardData() {
    try {
      let response = await fetch(
        "https://api.pokemontcg.io/v1/cards?name=" +
          props.pokemonData.species.name
      );
      response = await response.json();
      setCards(response);
    } catch (e) {
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
          {cards && cards.cards ? (
            cards.cards.map(function (val, i) {
              return (
                <Grid container key={i} className={classes.cardContainer}>
                  <Grid item xs={6}>
                  <img src={val.imageUrl} alt="card" className={classes.cardImage}></img></Grid>
                  <Grid item xs={6}>
                    <CardInfo {...props} card={val} />
                  </Grid>
                </Grid>
              );
            })
          ) : (
            <div className="loader-container loader-background">
              <div className="loader" />
            </div>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
