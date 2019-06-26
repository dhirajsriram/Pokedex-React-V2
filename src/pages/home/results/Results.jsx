import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pokemon from '../../../common/pokemon/Pokemon';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function NestedGrid() {
  const classes = useStyles();
  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={4}>
          <Pokemon></Pokemon>
        </Grid>
        <Grid item xs={12} sm={4}>
        <Pokemon></Pokemon>
        </Grid>
        <Grid item xs={12} sm={4}>
        <Pokemon></Pokemon>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid container item xs={12} spacing={4}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}