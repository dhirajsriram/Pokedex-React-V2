import React from 'react';
import { Typography } from '@material-ui/core';
import { Types } from '../context/pokemonContext';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

const sideList = props => (
    <div
      className={props.classes.list}
      role="presentation"
      onClick={props.toggleDrawer(props.side, false)}
      onKeyDown={props.toggleDrawer(props.side, false)}
    >
      <List>
          <Link className="default-text" to={"/"}>
          <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          </Link>
      </List>
      <Divider />
      <List>
        {Types.map((type, i) => (
           <React.Fragment key={i}>{type !== "reset"&& (<Link to={"/results/" + type} key={i} className="default-text">
           <MenuItem
           >
             <img
               className={props.classes.typeImages}
               src={require("../../assets/" + type + ".png")}
               alt={type}
             />
             <Typography className={props.classes.menuItems}>{type}</Typography>
           </MenuItem>
         </Link>)}</React.Fragment>
        ))}
      </List>
      <Divider />  
      <List>
        {['About'].map((text, index) => (
           <Link className="default-text" to={"/" + text} key={text}>
          <ListItem button>
            <ListItemIcon><InfoIcon/></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

export default sideList;