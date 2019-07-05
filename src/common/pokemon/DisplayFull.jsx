import React from 'react';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Types from "../pokemon/Types";
import Grid from "@material-ui/core/Grid";
import {numberPadding} from "../context/pokemonContext"

const DisplayFull = function(props) {
    return (
      <Grid
        container
        style={
          props.descriptionPage
            ? { background: "rgb(255,255,255,0.5)" }
            : {
                background: props.returnType(props.context) + "80"
              }
        }
      >
        <Grid container item xs={10} spacing={4} className={props.classes.spacing4}>
          <CardContent className={props.classes.cardContent}>
            <Typography
              gutterBottom
              variant="subtitle2"
              className={props.classes.text}
            >

              {props.pokemon.name &&
                "#" + numberPadding(props.number, 3)}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={props.classes.text}
            >
              {props.pokemon.name}
            </Typography>
            {props.pokemon.types &&
              props.pokemon.types.map(function(val, i) {
                return (
                  <Types
                    name={val.type.name}
                    key={i}
                    descriptionPage={props.descriptionPage}
                  />
                );
              })}
          </CardContent>
        </Grid>
        <Grid container item xs={2} spacing={4} className={props.classes.spacing4}>
          <div className={props.classes.image}>
            {props.pokemon.name && (
              <CardMedia
                component="img"
                className={props.classes.pokemonImage}
                alt={props.pokemon.name + " image"}
                height="150"
                style={props.imageLoaded ? { display: "block" } : { display: "none" }}
                onLoad={props.handleImageLoaded}
                onError={props.onError}
                image={
                  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
                  numberPadding(props.number, 3) +
                  ".png"
                }
                title="Contemplative Reptile"
              />
            )}
          </div>
        </Grid>
      </Grid>
    );
  }

  export default DisplayFull;