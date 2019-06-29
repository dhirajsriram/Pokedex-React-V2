import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { withRouter } from 'react-router';
import Avatar from '@material-ui/core/Avatar';

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
  types : {
    color: "black",
    background:"white"
  }
}));

const Types = withRouter((props) => {
  const classes = useStyles();
  function redirect(event){
    event.stopPropagation();
    props.history.push("/results/" +  props.name)
  }
  return (
      <Chip style={{border: "2px solid"}}
      avatar={<Avatar className={classes.types}></Avatar>}
      label={props.name}
      className={classes.chip}
      onClick={redirect}
      variant="outlined"
    />
  );
})

export default Types;