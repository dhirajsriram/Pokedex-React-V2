import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { withRouter } from 'react-router';
import { TypeConsumer } from "../../common/context/typesContext";

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
    <TypeConsumer>{context=>
    <Chip style={{backgroundColor: context.findType(props.name)}}
      label={props.name}
      className={classes.chip}
      onClick={redirect}
    />
  }
    </TypeConsumer>
  );
})

export default Types;