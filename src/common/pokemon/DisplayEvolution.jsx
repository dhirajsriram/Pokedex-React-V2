import React from 'react';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { numberPadding } from "../context/pokemonContext";

const DisplayEvolution = function(props) {
    return (
      <div className={props.classes.evolutionCard}>
        <CardMedia
          component="img"
          className={props.classes.evolutionImage}
          alt={props.pokemon.name + " image"}
          style={props.imageLoaded ? { display: "block" } : { display: "none" }}
          onLoad={props.handleImageLoaded}
          onError={props.onError}
          image={
            "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
            numberPadding(props.number, 3) +
            ".png"
          }
          title={props.pokemon.name + " image"}
        />
        <CardContent className={props.classes.evolutionContent + "cardContent"}>
          <Typography
            gutterBottom
            variant="subtitle2"
            component="h2"
            align="center"
            className={props.classes.evolutionText}
          >
            {props.pokemon.name}
          </Typography>
          <div style={{ color: props.color }}>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h2"
              align="center"
              className={props.classes.evolutionType}
            >
              {props.evolutionData.evolution_details.length > 0 &&
                props.evolutionData.evolution_details[0].trigger.name}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="h2"
              align="center"
              className={props.classes.evolutionType}
            >
              {props.evolutionData.evolution_details.length > 0 &&
                props.evolutionData.evolution_details[0]["min_level"]}
            </Typography>
          </div>
        </CardContent>
      </div>
    );
  }

  export default DisplayEvolution;