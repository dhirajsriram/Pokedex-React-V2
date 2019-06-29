import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
    textTransform: "capitalize",
  },
}));

const Types = withRouter((props) => {
  const classes = useStyles();
  function redirect(event){
    event.stopPropagation();
    props.history.push("/results/" +  props.name)
  }
  return (
      <Chip style={{border: "2px solid"}}
      label={props.name}
      className={classes.chip}
      onClick={redirect}
      variant="outlined"
    />
  );
})

export default Types;