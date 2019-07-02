import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function ImageBlock(props) {
    const useStyles = makeStyles(theme => ({
        root: {
          width:"100%",
          flexGrow: 1,
          borderRadius:"5px"
        },
        header: {
          display: 'flex',
          alignItems: 'center',
          height: 50,
          paddingLeft: theme.spacing(4),
          backgroundColor: props.bgcolor,
          color:"#ffffff"
        },
        img: {
          height: 255,
          display: 'block',
          overflow: 'hidden',
          width: '100%',
          background:props.bgcolor
        },
      }));
      
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  function handleStepChange(step) {
    setActiveStep(step);
  }

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography variant="h6">{props.title}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.imgarr.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step} alt={"pokemonimage-" + index}/>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
}

export default ImageBlock;