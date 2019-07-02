import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Types } from "../context/pokemonContext";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const MobileMenu= (props) => { 
    const isMobileMenuOpen = Boolean(props.mobileMoreAnchorEl);
    const useStyles = makeStyles((theme) => ({
		typeImages: {
			filter: 'saturate(2)'
		},
		menuItems: {
			display: 'inline-flex'
		},
    }));
    const classes = useStyles();
    return (
    <Menu
        anchorEl={props.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={props.mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={props.handleMobileMenuClose}
        className="mobileMenu"
    >
        {Types.map(function(type, i) {
            return (
                <Link to={'/results/' + type} key={i}>
                    <MenuItem onClick={() =>props.handleMenuClose} className={classes.menuItems}>
                        <img
                            className={classes.typeImages}
                            src={require('../../assets/' + type + '.png')}
                            alt={type}
                        />
                    </MenuItem>
                </Link>
            );
        })}
    </Menu>
)};

export default MobileMenu;