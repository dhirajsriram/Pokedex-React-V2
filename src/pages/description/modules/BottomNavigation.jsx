import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';



export default function SimpleBottomNavigation(props) {
    const useStyles = makeStyles({
        root:{
            position:"fixed",
            bottom:0,
            left:0,
            width:"100%"
        },
        selected: {
            backgroundColor:props.color
        },
        button:{
            color:props.color
        }
      });
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction className={classes.button} classes={{ selected: classes.selected }} label="Stats" icon={<RestoreIcon />} />
      <BottomNavigationAction className={classes.button}  classes={{ selected: classes.selected }}  label="Moves" icon={<FavoriteIcon />} />
      <BottomNavigationAction className={classes.button}  classes={{ selected: classes.selected }}  label="Evloutions" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}