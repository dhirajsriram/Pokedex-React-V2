import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Types } from "../context/pokemonContext";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const MainMenu = (props) => {
    const isMenuOpen = Boolean(props.anchorEl);
    const useStyles = makeStyles((theme) => ({
		typeImages: {
			filter: 'saturate(2)'
		},
		menuItems: {
			display: 'inline-flex'
		},
    }));
    const classes = useStyles();
    return(
    <Menu
        anchorEl={props.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={props.menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={props.handleMenuClose}
    >
        {Types.map(function(type, i) {
            return (
                <Link to={'/results/' + type} key={i}>
                    <MenuItem onClick={() =>props.handleMenuClose(type)} className={classes.menuItems}>
                        <img
                            className={classes.typeImages}
                            src={require('../../assets/' + type + '.png')}
                            alt={type}
                        />
                    </MenuItem>
                </Link>
            );
        })}
    </Menu>)
};
export default MainMenu;