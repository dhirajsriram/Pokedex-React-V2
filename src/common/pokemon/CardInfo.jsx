import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { mapTypes } from "../context/pokemonContext";

export default function CardInfo(props) {
  const [type, setType] = React.useState("");
  React.useEffect(() => {
    setType(mapTypes(card.types[0]));
  }, []);

  const mapTypesLocal = (type) => mapTypes(type);
  const useStyles = makeStyles({
    name: {
      fontWeight: "500",
    },
    typeImages: {
      filter: "saturate(2)",
      width: "39%",
      paddingLeft: "10px",
    },
  });
  const classes = useStyles();
  const { card } = props;
  return (
    <Grid container>
      <Grid item xs={8}>
        <Typography variant="h6" component="p" className={classes.name}>
          {card.name}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h6" component="p">
          {card.hp}
          {type && (
            <img
              className={classes.typeImages}
              src={require("../../assets/" + type + ".png")}
              alt={card.types[0]}
            />
          )}
        </Typography>
      </Grid>
      {card.ability && (
        <Grid item xs={12}>
          <Typography variant="h6" component="p">
            {card.ability.name}
          </Typography>
          <Typography variant="body1" component="p">
            {card.ability.text}
          </Typography>
        </Grid>
      )}
      {card.attacks &&
        card.attacks.map((attack, index) => (
          <Grid item xs={12}>
            <Grid item xs={5}>
              {attack.cost.map((type, index) => (
                <img
                  className={classes.typeImages}
                  src={require("../../assets/" + mapTypesLocal(type) + ".png")}
                  alt={card.types[0]}
                />
              ))}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="body1" component="p">
                {attack.name}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" component="p">
                {attack.damage}
              </Typography>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}
